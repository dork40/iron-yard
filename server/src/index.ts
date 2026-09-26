import crypto from "node:crypto";
import http from "node:http";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { WebSocketServer, type WebSocket } from "ws";
import { z } from "zod";

const boundedInteger = (raw: string | undefined, fallback: number, min: number, max: number) => {
  const value = Number(raw);
  return Number.isInteger(value) && value >= min && value <= max ? value : fallback;
};
const port = boundedInteger(process.env.PORT, 8080, 1, 65_535);
const origins = (process.env.ALLOWED_ORIGINS ?? "").split(",").map(value => value.trim()).filter(Boolean);
const region = (process.env.ARENA_REGION ?? "local").trim().slice(0, 32) || "local";
const tickRate = boundedInteger(process.env.TICK_RATE, 60, 30, 120);
const snapshotRate = boundedInteger(process.env.SNAPSHOT_RATE, 30, 1, tickRate);
const maxRewindMs = boundedInteger(process.env.MAX_REWIND_MS, 150, 0, 300);
const pingWarnMs = boundedInteger(process.env.PING_WARN_MS, 120, 1, 5_000);
const reconnectMs = boundedInteger(process.env.RECONNECT_MS, 30_000, 1_000, 120_000);
const turnSecret = process.env.TURN_SHARED_SECRET;
const turnTicketSecret = process.env.TURN_TICKET_SECRET;
const turnUrls = (process.env.TURN_URLS ?? "").split(",").map(value => value.trim()).filter(Boolean);
const ttlSeconds = Math.min(3600, Math.max(60, Number(process.env.TURN_TTL_SECONDS ?? 600)));
const validTurnUrls = turnUrls.length > 0 && turnUrls.every(url => /^turns?:\/\//i.test(url));
if (process.env.NODE_ENV === "production" && !origins.length) throw new Error("Production requires exact allowed browser origins.");

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin(origin, callback) { callback(null, Boolean(origin && origins.includes(origin))); }, methods: ["GET"], maxAge: 86400 }));
app.use("/v1/turn-credentials", (request, response, next) => {
  const origin = request.get("origin");
  if (!origin || !origins.includes(origin)) return response.status(403).json({ error: "Untrusted browser origin." });
  return next();
});
app.use("/v1/turn-credentials", rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false }));

function verifyTurnTicket(ticket: string | undefined) {
  if (!ticket || !turnTicketSecret) return null;
  const [encodedPayload, suppliedSignature, ...extra] = ticket.split(".");
  if (!encodedPayload || !suppliedSignature || extra.length) return null;
  const expectedSignature = crypto.createHmac("sha256", turnTicketSecret).update(encodedPayload).digest("base64url");
  if (suppliedSignature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(suppliedSignature), Buffer.from(expectedSignature))) return null;
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as { sub?: unknown; exp?: unknown };
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.sub !== "string" || !payload.sub || payload.sub.length > 128 || typeof payload.exp !== "number" || !Number.isInteger(payload.exp) || payload.exp <= now || payload.exp > now + 900) return null;
    return { sub: payload.sub, exp: payload.exp };
  } catch { return null; }
}
app.get("/v1/turn-credentials", (request, response) => {
  const supplied = request.get("authorization")?.replace(/^Bearer\s+/i, "");
  response.set({ "Cache-Control": "no-store", Vary: "Origin, Authorization" });
  if (!turnSecret || !validTurnUrls || !turnTicketSecret) return response.status(503).json({ error: "TURN issuer is not configured." });
  const ticket = verifyTurnTicket(supplied);
  if (!ticket) return response.status(401).json({ error: "A valid short-lived TURN ticket is required." });
  const now = Math.floor(Date.now() / 1000), expires = now + Math.min(ttlSeconds, ticket.exp - now);
  const username = `${expires}:hn-${crypto.createHash("sha256").update(ticket.sub).digest("hex").slice(0, 20)}`;
  return response.json({ iceServers: [{ urls: turnUrls, username, credential: crypto.createHmac("sha1", turnSecret).update(username).digest("base64") }], expiresAt: new Date(expires * 1000).toISOString() });
});

type Client = { socket: WebSocket; room?: string; seat?: "host" | "guest" };
type Match = { startedAt: number; actions: Partial<Record<"host" | "guest", { receivedAt: number }>> };
const rooms = new Map<string, Set<Client>>(), matches = new Map<string, Match>();
const joinMessage = z.object({ type: z.literal("join"), room: z.string().regex(/^[A-Z0-9]{6}$/), seat: z.enum(["host", "guest"]) });
const actionMessage = z.object({ type: z.literal("action"), reactionMs: z.number().finite().min(0).max(10_000) });
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
function send(socket: WebSocket, payload: object) { if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(payload)); }
function broadcast(room: string, payload: object) { rooms.get(room)?.forEach(client => send(client.socket, payload)); }
wss.on("connection", socket => {
  const client: Client = { socket };
  socket.on("message", raw => {
    try {
      const message = JSON.parse(raw.toString()) as unknown, join = joinMessage.safeParse(message);
      if (join.success) {
        client.room = join.data.room; client.seat = join.data.seat;
        const occupants = rooms.get(client.room) ?? new Set<Client>();
        if ([...occupants].some(item => item.seat === client.seat)) return send(socket, { type: "error", message: "Seat is already occupied." });
        occupants.add(client); rooms.set(client.room, occupants);
        if (occupants.size === 2) { const startedAt = Date.now() + 3000; matches.set(client.room, { startedAt, actions: {} }); broadcast(client.room, { type: "round-start", startedAt }); }
        return;
      }
      const action = actionMessage.safeParse(message), match = client.room ? matches.get(client.room) : undefined;
      if (!action.success || !match || !client.seat || Date.now() < match.startedAt) return send(socket, { type: "error", message: "Invalid or premature action." });
      if (match.actions[client.seat]) return send(socket, { type: "error", message: "Action already recorded." });
      match.actions[client.seat] = { receivedAt: Date.now() };
      if (match.actions.host && match.actions.guest) { const winner = match.actions.host.receivedAt === match.actions.guest.receivedAt ? "tie" : match.actions.host.receivedAt < match.actions.guest.receivedAt ? "host" : "guest"; broadcast(client.room!, { type: "round-result", winner }); matches.delete(client.room!); }
    } catch { send(socket, { type: "error", message: "Malformed message." }); }
  });
  socket.on("close", () => { if (!client.room) return; const occupants = rooms.get(client.room); occupants?.delete(client); if (!occupants?.size) { rooms.delete(client.room); matches.delete(client.room); } });
});

type ArenaSeat = "host" | "guest";
type ArenaMapId = "iron-yard" | "freight-terminal" | "foundry";
type ArenaInput = { sequence: number; moveX: number; moveZ: number; sprint: boolean; crouch: boolean; jump: boolean; yaw: number; pitch: number; receivedAt: number };
type ArenaPlayer = { x: number; y: number; z: number; velocityY: number; yaw: number; pitch: number; health: number; kills: number; deaths: number; lastShotAt: number; input: ArenaInput; ack: number };
type ArenaHistory = { tick: number; players: Record<ArenaSeat, Pick<ArenaPlayer, "x" | "y" | "z" | "yaw" | "pitch">> };
type ArenaRoom = { map: ArenaMapId; clients: Partial<Record<ArenaSeat, WebSocket>>; reconnectTokens: Partial<Record<ArenaSeat, string>>; disconnectTimers: Partial<Record<ArenaSeat, NodeJS.Timeout>>; players: Record<ArenaSeat, ArenaPlayer>; history: ArenaHistory[]; started: boolean };
type ArenaQueueEntry = { socket: WebSocket; map: ArenaMapId | "any" };
const arenaRooms = new Map<string, ArenaRoom>();
const arenaQueue: ArenaQueueEntry[] = [], arenaAssignments = new Map<WebSocket, { roomCode: string; seat: ArenaSeat }>();
let arenaTick = 0, lastTickDurationMs = 0, tickLagMs = 0, maxTickLagMs = 0, expectedTickAt = Date.now();
const arenaRoomCode = () => crypto.randomBytes(3).toString("hex").toUpperCase();
const arenaMap = z.enum(["iron-yard", "freight-terminal", "foundry"]);
const arenaJoin = z.discriminatedUnion("type", [z.object({ type: z.literal("create"), map: arenaMap.optional() }).strict(), z.object({ type: z.literal("join"), room: z.string().regex(/^[A-Z0-9]{6}$/) }).strict(), z.object({ type: z.literal("resume"), room: z.string().regex(/^[A-Z0-9]{6}$/), reconnectToken: z.string().regex(/^[a-f0-9]{48}$/) }).strict()]);
const arenaQueueMessage = z.object({ type: z.literal("queue"), map: z.union([arenaMap, z.literal("any")]) }).strict();
const arenaCancelQueue = z.object({ type: z.literal("cancel-queue") }).strict();
const arenaLeave = z.object({ type: z.literal("leave") }).strict();
const arenaInput = z.object({ type: z.literal("input"), sequence: z.number().int().min(1).max(2_147_483_647), moveX: z.number().finite().min(-1).max(1), moveZ: z.number().finite().min(-1).max(1), sprint: z.boolean(), crouch: z.boolean(), jump: z.boolean(), yaw: z.number().finite().min(-100).max(100), pitch: z.number().finite().min(-1.3).max(1.3) }).strict();
const arenaShot = z.object({ type: z.literal("shot"), loadout: z.enum(["sidearm", "carbine"]), yaw: z.number().finite().min(-100).max(100), pitch: z.number().finite().min(-1.3).max(1.3), shotTick: z.number().int().min(0).max(2_147_483_647) }).strict();
const arenaPing = z.object({ type: z.literal("ping"), sentAt: z.number().finite().min(0).max(1e12) }).strict();
const arenaLayouts: Record<ArenaMapId, { bounds: [number, number, number, number]; walls: readonly (readonly [number, number, number, number])[]; spawns: readonly [number, number, number][] }> = {
  "iron-yard": { bounds: [-25.5, 25.5, -25.5, 25.5], walls: [[-25.5, 25.5, -25.5, -24.5], [-25.5, 25.5, 24.5, 25.5], [-25.5, -24.5, -25.5, 25.5], [24.5, 25.5, -25.5, 25.5], [-1.7, 1.7, -7.5, 7.5], [-14.5, -7.5, -9.7, -6.3], [6.5, 13.5, 5.3, 8.7], [-11.7, -8.3, 9, 13], [10.3, 13.7, -14, -10]], spawns: [[-16, 11, 2.75], [16, -11, -.4]] },
  "freight-terminal": { bounds: [-33.5, 33.5, -19.5, 19.5], walls: [[-33.5, 33.5, -19.5, -18.5], [-33.5, 33.5, 18.5, 19.5], [-33.5, -32.5, -19.5, 19.5], [32.5, 33.5, -19.5, 19.5], [-26, -16, -11.75, -8.25], [-26, -16, 6.25, 9.75], [-11, -1, 8.25, 11.75], [2, 12, -10.75, -7.25], [16, 26, 7.25, 10.75], [19, 29, -9.75, -6.25], [-29.6, -28.4, -2.75, 2.75], [-12.6, -11.4, -2.75, 2.75], [2.4, 3.6, -2.75, 2.75], [17.4, 18.6, -2.75, 2.75], [29.4, 30.6, -2.75, 2.75]], spawns: [[-28, 12, 2.5], [29, -13, -.6]] },
  foundry: { bounds: [-21.5, 21.5, -21.5, 21.5], walls: [[-21.5, 21.5, -21.5, -20.5], [-21.5, 21.5, 20.5, 21.5], [-21.5, -20.5, -21.5, 21.5], [20.5, 21.5, -21.5, 21.5], [-7.5, 7.5, -17, -13], [-13.05, -10.95, -5.05, -2.95], [10.95, 13.05, -5.05, -2.95], [-13.05, -10.95, 6.95, 9.05], [10.95, 13.05, 6.95, 9.05], [-9.5, -2.5, 3.6, 6.4], [3.5, 10.5, 3.6, 6.4], [-18, -14, 11, 15], [14, 18, 11, 15]], spawns: [[-10, 16, 2.7], [15, -8, -.45]] },
};
function insideArenaWall(map: ArenaMapId, x: number, z: number) { return arenaLayouts[map].walls.some(([minX, maxX, minZ, maxZ]) => x > minX - .45 && x < maxX + .45 && z > minZ - .45 && z < maxZ + .45); }
function wallBeforeTarget(map: ArenaMapId, x: number, z: number, directionX: number, directionZ: number, targetDistance: number) { let nearest = Infinity; for (const [minX, maxX, minZ, maxZ] of arenaLayouts[map].walls) { let near = -Infinity, far = Infinity; for (const [origin, direction, min, max] of [[x, directionX, minX, maxX], [z, directionZ, minZ, maxZ]] as const) { if (Math.abs(direction) < .000001) { if (origin < min || origin > max) { near = Infinity; break; } continue; } const first = (min - origin) / direction, second = (max - origin) / direction; near = Math.max(near, Math.min(first, second)); far = Math.min(far, Math.max(first, second)); } if (near <= far && far >= 0) nearest = Math.min(nearest, Math.max(0, near)); } return nearest < targetDistance; }
function arenaSend(socket: WebSocket, payload: object) { if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(payload)); }
function publicArenaPlayer(player: ArenaPlayer) { return { x: player.x, y: player.y, z: player.z, yaw: player.yaw, pitch: player.pitch, health: player.health, kills: player.kills, deaths: player.deaths }; }
function arenaSnapshot(room: ArenaRoom) { return { type: "state", map: room.map, started: room.started, serverTick: arenaTick, serverTime: Date.now(), ack: { host: room.players.host.ack, guest: room.players.guest.ack }, players: { host: publicArenaPlayer(room.players.host), guest: publicArenaPlayer(room.players.guest) } }; }
function broadcastArena(room: ArenaRoom, payload: object) { Object.values(room.clients).forEach(socket => socket && arenaSend(socket, payload)); }
function newArenaPlayer(x: number, z: number, yaw: number, score?: Pick<ArenaPlayer, "kills" | "deaths">): ArenaPlayer { return { x, y: 0, z, velocityY: 0, yaw, pitch: 0, health: 100, kills: score?.kills ?? 0, deaths: score?.deaths ?? 0, lastShotAt: 0, input: { sequence: 0, moveX: 0, moveZ: 0, sprint: false, crouch: false, jump: false, yaw, pitch: 0, receivedAt: Date.now() }, ack: 0 }; }
function newArenaRoom(map: ArenaMapId, host: WebSocket, guest?: WebSocket) { let roomCode: string; do { roomCode = arenaRoomCode(); } while (arenaRooms.has(roomCode)); const [hostX, hostZ, hostYaw] = arenaLayouts[map].spawns[0], [guestX, guestZ, guestYaw] = arenaLayouts[map].spawns[1]; const room: ArenaRoom = { map, clients: { host, ...(guest ? { guest } : {}) }, reconnectTokens: { host: crypto.randomBytes(24).toString("hex"), ...(guest ? { guest: crypto.randomBytes(24).toString("hex") } : {}) }, disconnectTimers: {}, players: { host: newArenaPlayer(hostX / 8, (1 - hostZ) / 12, hostYaw), guest: newArenaPlayer(guestX / 8, (1 - guestZ) / 12, guestYaw) }, history: [], started: Boolean(guest) }; arenaRooms.set(roomCode, room); return { roomCode, room }; }
function removeArenaQueue(socket: WebSocket) { const index = arenaQueue.findIndex(entry => entry.socket === socket); if (index >= 0) arenaQueue.splice(index, 1); return index >= 0; }
function queueMap(first: ArenaMapId | "any", second: ArenaMapId | "any"): ArenaMapId | undefined { if (first === "any" && second === "any") return arenaTick % 3 === 0 ? "iron-yard" : arenaTick % 3 === 1 ? "freight-terminal" : "foundry"; if (first === "any") return second === "any" ? undefined : second; if (second === "any" || first === second) return first; return undefined; }
function matchArenaQueue() { for (let first = 0; first < arenaQueue.length; first++) for (let second = first + 1; second < arenaQueue.length; second++) { const host = arenaQueue[first], guest = arenaQueue[second]; if (host.socket.readyState !== host.socket.OPEN || guest.socket.readyState !== guest.socket.OPEN) continue; const map = queueMap(host.map, guest.map); if (!map) continue; arenaQueue.splice(second, 1); arenaQueue.splice(first, 1); const { roomCode, room } = newArenaRoom(map, host.socket, guest.socket); arenaAssignments.set(host.socket, { roomCode, seat: "host" }); arenaAssignments.set(guest.socket, { roomCode, seat: "guest" }); arenaSend(host.socket, { type: "joined", room: roomCode, seat: "host", reconnectToken: room.reconnectTokens.host, map, region, tickRate, snapshotRate }); arenaSend(guest.socket, { type: "joined", room: roomCode, seat: "guest", reconnectToken: room.reconnectTokens.guest, map, region, tickRate, snapshotRate }); broadcastArena(room, arenaSnapshot(room)); return matchArenaQueue(); } }
function clearArenaDisconnect(room: ArenaRoom, seat: ArenaSeat) { const timer = room.disconnectTimers[seat]; if (timer) clearTimeout(timer); delete room.disconnectTimers[seat]; }
function discardArenaSeat(roomCode: string, room: ArenaRoom, seat: ArenaSeat) { clearArenaDisconnect(room, seat); delete room.clients[seat]; delete room.reconnectTokens[seat]; const rival: ArenaSeat = seat === "host" ? "guest" : "host"; room.started = false; if (room.clients[rival]) broadcastArena(room, { type: "opponent-left", reconnecting: false }); else if (!room.reconnectTokens.host && !room.reconnectTokens.guest) arenaRooms.delete(roomCode); }
function simulateArenaPlayer(player: ArenaPlayer, now: number, room: ArenaRoom) {
  const input = player.input;
  player.yaw = input.yaw; player.pitch = input.pitch;
  if (now - input.receivedAt <= 250 && input.jump && player.y <= 0) player.velocityY = 6.2;
  player.velocityY -= 18 / tickRate; player.y += player.velocityY / tickRate;
  if (player.y <= 0) { player.y = 0; player.velocityY = 0; }
  if (now - input.receivedAt > 250) return;
  const length = Math.hypot(input.moveX, input.moveZ) || 1, speed = input.crouch ? 3 : input.sprint ? 7.2 : 5;
  const worldX = player.x * 8, worldZ = 1 - player.z * 12;
  const dx = (input.moveX * Math.cos(input.yaw) - input.moveZ * Math.sin(input.yaw)) / length;
  const dz = (-input.moveX * Math.sin(input.yaw) - input.moveZ * Math.cos(input.yaw)) / length;
  const nextX = worldX + dx * speed / tickRate, nextZ = worldZ + dz * speed / tickRate;
  const [minX, maxX, minZ, maxZ] = arenaLayouts[room.map].bounds;
  if (nextX > minX && nextX < maxX && nextZ > minZ && nextZ < maxZ && !insideArenaWall(room.map, nextX, nextZ)) { player.x = nextX / 8; player.z = (1 - nextZ) / 12; }
}
function recordHistory(room: ArenaRoom) { room.history.push({ tick: arenaTick, players: { host: { x: room.players.host.x, y: room.players.host.y, z: room.players.host.z, yaw: room.players.host.yaw, pitch: room.players.host.pitch }, guest: { x: room.players.guest.x, y: room.players.guest.y, z: room.players.guest.z, yaw: room.players.guest.yaw, pitch: room.players.guest.pitch } } }); const cutoff = arenaTick - Math.ceil(maxRewindMs * tickRate / 1000) - 2; while (room.history.length && room.history[0].tick < cutoff) room.history.shift(); }
function rewindTarget(room: ArenaRoom, seat: ArenaSeat, requestedTick: number) { const oldest = Math.max(0, arenaTick - Math.ceil(maxRewindMs * tickRate / 1000)); const wanted = Math.min(arenaTick, Math.max(oldest, requestedTick)); return room.history.reduce((nearest, sample) => Math.abs(sample.tick - wanted) < Math.abs(nearest.tick - wanted) ? sample : nearest, room.history[room.history.length - 1])?.players[seat]; }

const arenaWss = new WebSocketServer({ noServer: true });
arenaWss.on("connection", (socket, request) => {
  const origin = request.headers.origin;
  if (origins.length && (!origin || !origins.includes(origin))) return socket.close(1008, "Untrusted browser origin.");
  let roomCode: string | undefined, seat: ArenaSeat | undefined, rateWindowAt = Date.now(), rateCount = 0, explicitLeave = false;
  socket.on("message", raw => {
    try {
      if (!roomCode) { const assignment = arenaAssignments.get(socket); if (assignment) { roomCode = assignment.roomCode; seat = assignment.seat; arenaAssignments.delete(socket); } }
      const now = Date.now();
      if (now - rateWindowAt >= 1_000) { rateWindowAt = now; rateCount = 0; }
      if (++rateCount > 150) return socket.close(1008, "Arena message rate exceeded.");
      const rawText = Buffer.isBuffer(raw) ? raw.toString() : Array.isArray(raw) ? Buffer.concat(raw).toString() : Buffer.from(raw).toString();
      if (Buffer.byteLength(rawText) > 1024) return socket.close(1008, "Arena message is too large.");
      const message = JSON.parse(rawText) as unknown, queueing = arenaQueueMessage.safeParse(message), cancelQueue = arenaCancelQueue.safeParse(message), joining = arenaJoin.safeParse(message);
      if (queueing.success) {
        if (roomCode) return arenaSend(socket, { type: "error", message: "Leave your current room before entering Quick Game." });
        removeArenaQueue(socket); arenaQueue.push({ socket, map: queueing.data.map }); arenaSend(socket, { type: "queue-status", searching: true, map: queueing.data.map }); matchArenaQueue(); return;
      }
      if (cancelQueue.success) { removeArenaQueue(socket); return arenaSend(socket, { type: "queue-status", searching: false }); }
      if (joining.success) {
        if (roomCode) return arenaSend(socket, { type: "error", message: "Already joined a room." });
        if (joining.data.type === "create") {
          const created = newArenaRoom(joining.data.map ?? "iron-yard", socket); roomCode = created.roomCode; seat = "host";
        } else if (joining.data.type === "join") {
          roomCode = joining.data.room; const room = arenaRooms.get(roomCode);
          if (!room) return arenaSend(socket, { type: "error", message: "Room not found. Check the code." });
          if (room.clients.guest || room.reconnectTokens.guest) return arenaSend(socket, { type: "error", message: "Room is full or its guest is reconnecting." });
          seat = "guest"; room.clients.guest = socket; room.reconnectTokens.guest = crypto.randomBytes(24).toString("hex"); room.started = Boolean(room.clients.host && room.clients.guest);
        } else {
          roomCode = joining.data.room; const room = arenaRooms.get(roomCode);
          const resumedSeat = room && (room.reconnectTokens.host === joining.data.reconnectToken ? "host" : room.reconnectTokens.guest === joining.data.reconnectToken ? "guest" : undefined);
          if (!room || !resumedSeat || room.clients[resumedSeat]) return arenaSend(socket, { type: "error", message: "That reconnect reservation is no longer available." });
          seat = resumedSeat; clearArenaDisconnect(room, seat); room.clients[seat] = socket; room.started = Boolean(room.clients.host && room.clients.guest);
        }
        const room = arenaRooms.get(roomCode)!;
        arenaSend(socket, { type: "joined", room: roomCode, seat, reconnectToken: room.reconnectTokens[seat]!, map: room.map, region, tickRate, snapshotRate }); broadcastArena(room, arenaSnapshot(room)); return;
      }
      if (arenaLeave.safeParse(message).success) { if (!roomCode || !seat) { removeArenaQueue(socket); socket.close(); return; } explicitLeave = true; discardArenaSeat(roomCode, arenaRooms.get(roomCode)!, seat); socket.close(); return; }
      const room = roomCode ? arenaRooms.get(roomCode) : undefined;
      if (!room || !seat) return arenaSend(socket, { type: "error", message: "Join a room first." });
      const ping = arenaPing.safeParse(message);
      if (ping.success) return arenaSend(socket, { type: "pong", sentAt: ping.data.sentAt, serverTick: arenaTick, serverLagMs: tickLagMs, pingWarningMs: pingWarnMs });
      if (!room.started) return arenaSend(socket, { type: "error", message: "Wait for a rival." });
      const input = arenaInput.safeParse(message);
      if (input.success) { const player = room.players[seat]; if (input.data.sequence <= player.ack) return; player.input = { ...input.data, receivedAt: now }; player.ack = input.data.sequence; return; }
      const shot = arenaShot.safeParse(message);
      if (!shot.success) return arenaSend(socket, { type: "error", message: "Invalid arena message." });
      const shooter = room.players[seat], targetSeat: ArenaSeat = seat === "host" ? "guest" : "host", target = rewindTarget(room, targetSeat, shot.data.shotTick);
      const cooldown = shot.data.loadout === "sidearm" ? 150 : 90;
      if (!target || now - shooter.lastShotAt < cooldown) return;
      if (Math.abs(shot.data.yaw - shooter.yaw) > .8 || Math.abs(shot.data.pitch - shooter.pitch) > .45) return arenaSend(socket, { type: "error", message: "Aim is out of sync. Keep moving before firing." });
      shooter.lastShotAt = now;
      const sx = shooter.x * 8, sy = shooter.y + 1.72, sz = 1 - shooter.z * 12, tx = target.x * 8, ty = target.y + 1.05, tz = 1 - target.z * 12;
      const dirX = -Math.sin(shot.data.yaw) * Math.cos(shot.data.pitch), dirY = Math.sin(shot.data.pitch), dirZ = -Math.cos(shot.data.yaw) * Math.cos(shot.data.pitch);
      const along = (tx - sx) * dirX + (ty - sy) * dirY + (tz - sz) * dirZ;
      const distance = Math.hypot(tx - sx - along * dirX, ty - sy - along * dirY, tz - sz - along * dirZ);
      const hit = along > 0 && along < 32 && distance < (shot.data.loadout === "sidearm" ? .3 : .44) && !wallBeforeTarget(room.map, sx, sz, dirX, dirZ, along);
      const liveTarget = room.players[targetSeat];
      if (hit) liveTarget.health = Math.max(0, liveTarget.health - (shot.data.loadout === "sidearm" ? 28 : 16));
      broadcastArena(room, { type: "shot", seat, hit, health: liveTarget.health });
      if (liveTarget.health === 0) { shooter.kills++; liveTarget.deaths++; broadcastArena(room, { type: "elimination", killer: seat, victim: targetSeat, kills: shooter.kills, deaths: liveTarget.deaths }); const [spawnX, spawnZ, spawnYaw] = arenaLayouts[room.map].spawns[targetSeat === "host" ? 0 : 1], spawn = newArenaPlayer(spawnX / 8, (1 - spawnZ) / 12, spawnYaw, liveTarget); room.players[targetSeat] = spawn; broadcastArena(room, { type: "respawn", seat: targetSeat, player: publicArenaPlayer(spawn) }); }
    } catch { arenaSend(socket, { type: "error", message: "Malformed arena message." }); }
  });
  socket.on("close", () => { removeArenaQueue(socket); const assignment = !roomCode ? arenaAssignments.get(socket) : undefined; const assignedRoom = roomCode ?? assignment?.roomCode, assignedSeat = seat ?? assignment?.seat; arenaAssignments.delete(socket); const room = assignedRoom ? arenaRooms.get(assignedRoom) : undefined; if (!room || !assignedSeat || explicitLeave || room.clients[assignedSeat] !== socket) return; delete room.clients[assignedSeat]; room.started = false; const rival: ArenaSeat = assignedSeat === "host" ? "guest" : "host"; if (room.clients[rival]) broadcastArena(room, { type: "opponent-left", reconnecting: true }); room.disconnectTimers[assignedSeat] = setTimeout(() => discardArenaSeat(assignedRoom!, room, assignedSeat!), reconnectMs); });
});

function arenaStep() {
  const startedAt = Date.now(); expectedTickAt += 1_000 / tickRate; tickLagMs = Math.max(0, startedAt - expectedTickAt); maxTickLagMs = Math.max(maxTickLagMs, tickLagMs); arenaTick++;
  arenaRooms.forEach(room => { if (!room.started) return; simulateArenaPlayer(room.players.host, startedAt, room); simulateArenaPlayer(room.players.guest, startedAt, room); recordHistory(room); if (arenaTick % Math.max(1, Math.round(tickRate / snapshotRate)) === 0) broadcastArena(room, arenaSnapshot(room)); });
  lastTickDurationMs = Date.now() - startedAt;
}
setInterval(arenaStep, 1_000 / tickRate).unref();
app.get("/health", (_request, response) => response.json({ status: "ok", region, tickRate, snapshotRate, tick: arenaTick, tickLagMs, lastTickDurationMs, rooms: arenaRooms.size, players: [...arenaRooms.values()].reduce((count, room) => count + Number(Boolean(room.clients.host)) + Number(Boolean(room.clients.guest)), 0) }));
app.get("/v1/status", (_request, response) => response.set("Cache-Control", "no-store").json({ status: "ok", region, tickRate, snapshotRate, maxRewindMs, pingWarnMs, tick: arenaTick, tickLagMs, maxTickLagMs, lastTickDurationMs, rooms: arenaRooms.size, players: [...arenaRooms.values()].reduce((count, room) => count + Number(Boolean(room.clients.host)) + Number(Boolean(room.clients.guest)), 0) }));
server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const target = pathname === "/v1/rounds" ? wss : pathname === "/v1/arena" ? arenaWss : undefined;
  if (!target) return socket.destroy();
  target.handleUpgrade(request, socket, head, client => target.emit("connection", client, request));
});
server.listen(port, "0.0.0.0", () => console.log(`Authority service listening on ${port} (${region}, ${tickRate} Hz)`));
