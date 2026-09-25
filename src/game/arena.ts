import { playSound } from "./audio";

type ArenaResult = { won: boolean; accuracy: number; eliminations: number };
type Seat = "host" | "guest";
type Player = { x: number; z: number; aimX: number; aimY: number; health: number };
type ServerMessage =
  | { type: "joined"; room: string; seat: Seat }
  | { type: "state"; started: boolean; players: Record<Seat, Player> }
  | { type: "shot"; seat: Seat; hit: boolean; health: number }
  | { type: "result"; winner: Seat }
  | { type: "opponent-left" }
  | { type: "error"; message: string };

let stop: (() => void) | undefined;

function arenaUrl() {
  const configured = import.meta.env.VITE_ARENA_SERVER_URL?.trim();
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    url.protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol;
    if (url.protocol !== "ws:" && url.protocol !== "wss:") return undefined;
    url.pathname = `${url.pathname.replace(/\/$/, "")}/v1/arena`.replace(/\/v1\/arena\/v1\/arena$/, "/v1/arena");
    return url.toString();
  } catch { return undefined; }
}

export function arenaView() {
  const configured = Boolean(arenaUrl());
  return `<section class="arena-game"><div class="arena-heading"><p class="eyebrow">LIVE 1V1 ARENA</p><h1>IRON YARD</h1><p>Join a room, then clear your real rival before they clear you.</p></div><div class="arena-lobby"><p id="arena-connection" aria-live="polite">${configured ? "CREATE A ROOM OR JOIN A FRIEND" : "ARENA SERVER URL REQUIRED"}</p>${configured ? `<div><button id="arena-create" class="primary">CREATE ROOM</button><label>ROOM CODE <input id="arena-room-code" maxlength="6" autocomplete="off" /></label><button id="arena-join" class="outline">JOIN ROOM</button></div>` : `<p>Add <code>VITE_ARENA_SERVER_URL</code> to the Vite build environment and redeploy.</p>`}</div><div class="arena-loadout" aria-label="Choose loadout"><button class="outline" data-arena-loadout="sidearm" aria-pressed="true"><b>RANGER SIDEARM</b><span>6 rounds · heavy hit</span></button><button class="outline" data-arena-loadout="carbine" aria-pressed="false"><b>BRUSH CARBINE</b><span>12 rounds · rapid fire</span></button></div><div class="arena-frame"><canvas id="arena-canvas" aria-label="Iron Yard arena"></canvas><div class="arena-reticle" aria-hidden="true">+</div><div class="arena-status"><span id="arena-health">ARMOR 100</span><span id="arena-ammo">6 / 24</span><span id="arena-rival">RIVAL --</span></div><div id="arena-message" class="arena-message">JOIN A ROOM TO ENGAGE</div></div><div class="arena-controls"><button id="arena-fire" class="primary" disabled>FIRE</button><button id="arena-reload" class="outline" disabled>RELOAD</button></div><p class="trace-hint">WASD / ARROW KEYS MOVE. MOVE POINTER TO AIM. CLICK OR FIRE TO SHOOT. R TO RELOAD.</p><p class="arena-local-note">REAL-TIME 1V1: server-validated rooms, position snapshots, and server-resolved hits.</p></section>`;
}

export function mountArena(onComplete: (result: ArenaResult) => void) {
  stop?.();
  const canvas = document.querySelector<HTMLCanvasElement>("#arena-canvas"); const context = canvas?.getContext("2d");
  const health = document.querySelector<HTMLElement>("#arena-health"); const ammo = document.querySelector<HTMLElement>("#arena-ammo"); const rival = document.querySelector<HTMLElement>("#arena-rival"); const message = document.querySelector<HTMLElement>("#arena-message");
  const fireButton = document.querySelector<HTMLButtonElement>("#arena-fire"); const reloadButton = document.querySelector<HTMLButtonElement>("#arena-reload");
  if (!canvas || !context || !health || !ammo || !rival || !message || !fireButton || !reloadButton) return;
  let socket: WebSocket | undefined; let seat: Seat | undefined; let remote: Player | undefined; let local: Player = { x: 0, z: 0, aimX: .5, aimY: .5, health: 100 };
  let bullets = 6; let reserve = 24; let loadout: "sidearm" | "carbine" = "sidearm"; let shots = 0; let hits = 0; let recoil = 0; let reloading = false; let active = false; let lastShotAt = 0; let lastFrame = performance.now(); let lastSync = 0;
  const keys = new Set<string>();
  const send = (payload: object) => { if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload)); };
  const magazine = () => loadout === "sidearm" ? 6 : 12;
  const updateHud = () => { health.textContent = `ARMOR ${Math.ceil(local.health)}`; ammo.textContent = reloading ? "RELOADING" : `${bullets} / ${reserve}`; rival.textContent = `RIVAL ${remote ? Math.ceil(remote.health) : "--"}`; fireButton.disabled = !active; reloadButton.disabled = !active; };
  const finish = (won: boolean, text: string) => { if (!active) return; active = false; message.textContent = text; updateHud(); onComplete({ won, accuracy: shots ? Math.round(hits / shots * 100) : 0, eliminations: won ? 1 : 0 }); };
  const resize = () => { const bounds = canvas.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1; canvas.width = Math.round(bounds.width * ratio); canvas.height = Math.round(bounds.height * ratio); context.setTransform(ratio, 0, 0, ratio, 0, 0); };
  const reload = () => { if (!active || reloading || bullets === magazine() || !reserve) return; reloading = true; updateHud(); playSound("click"); window.setTimeout(() => { if (!active) return; const loaded = Math.min(magazine() - bullets, reserve); bullets += loaded; reserve -= loaded; reloading = false; updateHud(); }, loadout === "sidearm" ? 850 : 1100); };
  const shoot = () => { if (!active || reloading || performance.now() - lastShotAt < (loadout === "sidearm" ? 150 : 90)) return; if (!bullets) return reload(); lastShotAt = performance.now(); bullets--; shots++; recoil = Math.min(1, recoil + .28); send({ type: "shot", loadout, aimX: local.aimX, aimY: local.aimY }); playSound("shot"); updateHud(); };
  const pointer = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); local.aimX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)); local.aimY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)); };
  const connect = (kind: "create" | "join") => {
    const url = arenaUrl(); if (!url) return;
    const code = document.querySelector<HTMLInputElement>("#arena-room-code")?.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "") ?? "";
    if (kind === "join" && code.length !== 6) { message.textContent = "ENTER A SIX-CHARACTER ROOM CODE"; return; }
    socket?.close(); message.textContent = "CONNECTING TO ARENA...";
    socket = new WebSocket(url);
    socket.onopen = () => send(kind === "create" ? { type: "create" } : { type: "join", room: code });
    socket.onmessage = event => {
      let data: ServerMessage; try { data = JSON.parse(event.data) as ServerMessage; } catch { return; }
      if (data.type === "joined") { seat = data.seat; message.textContent = data.seat === "host" ? `ROOM ${data.room} CREATED. WAITING FOR RIVAL.` : `JOINED ROOM ${data.room}. WAITING FOR BELL.`; }
      if (data.type === "state") { if (!seat) return; local = data.players[seat]; remote = data.players[seat === "host" ? "guest" : "host"]; if (data.started && !active) { active = true; message.textContent = "RIVAL CONNECTED. ENGAGE."; } updateHud(); }
      if (data.type === "shot") { if (data.hit) { if (data.seat === seat) { hits++; message.textContent = "HIT CONFIRMED"; playSound("bottle"); } else { message.textContent = "INCOMING FIRE"; playSound("negative"); } } else if (data.seat === seat) message.textContent = "SHOT WIDE"; }
      if (data.type === "result" && seat) finish(data.winner === seat, data.winner === seat ? "YARD SECURED" : "YARD LOST");
      if (data.type === "opponent-left") finish(false, "RIVAL DISCONNECTED");
      if (data.type === "error") message.textContent = data.message.toUpperCase();
    };
    socket.onclose = () => { if (active) finish(false, "ARENA CONNECTION LOST"); };
    socket.onerror = () => { message.textContent = "ARENA CONNECTION FAILED"; };
  };
  document.querySelector("#arena-create")?.addEventListener("click", () => connect("create")); document.querySelector("#arena-join")?.addEventListener("click", () => connect("join"));
  document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(button => button.addEventListener("click", () => { if (shots || reloading) return; loadout = button.dataset.arenaLoadout === "carbine" ? "carbine" : "sidearm"; bullets = magazine(); reserve = loadout === "sidearm" ? 24 : 36; document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(option => option.setAttribute("aria-pressed", String(option === button))); updateHud(); }));
  const onKeyDown = (event: KeyboardEvent) => { if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyR"].includes(event.code)) event.preventDefault(); if (event.code === "KeyR") reload(); else keys.add(event.code); };
  const onKeyUp = (event: KeyboardEvent) => keys.delete(event.code);
  canvas.addEventListener("pointermove", pointer); canvas.addEventListener("pointerdown", event => { pointer(event); shoot(); }); fireButton.addEventListener("click", shoot); reloadButton.addEventListener("click", reload); document.addEventListener("keydown", onKeyDown); document.addEventListener("keyup", onKeyUp); window.addEventListener("resize", resize);
  resize(); updateHud();
  const frame = (now: number) => { const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now; if (active) { const speed = .48 * dt; if (keys.has("KeyA") || keys.has("ArrowLeft")) local.x = Math.max(-.75, local.x - speed); if (keys.has("KeyD") || keys.has("ArrowRight")) local.x = Math.min(.75, local.x + speed); if (keys.has("KeyW") || keys.has("ArrowUp")) local.z = Math.min(.6, local.z + speed); if (keys.has("KeyS") || keys.has("ArrowDown")) local.z = Math.max(-.3, local.z - speed); recoil = Math.max(0, recoil - dt * 1.8); if (now - lastSync > 67) { lastSync = now; send({ type: "state", x: local.x, z: local.z, aimX: local.aimX, aimY: local.aimY }); } } drawArena(context, canvas.clientWidth, canvas.clientHeight, remote, local, recoil); requestAnimationFrame(frame); };
  requestAnimationFrame(frame);
  stop = () => { active = false; socket?.close(); canvas.removeEventListener("pointermove", pointer); document.removeEventListener("keydown", onKeyDown); document.removeEventListener("keyup", onKeyUp); window.removeEventListener("resize", resize); stop = undefined; };
  return stop;
}

export function unmountArena() { stop?.(); }

function drawArena(context: CanvasRenderingContext2D, width: number, height: number, enemy: Player | undefined, player: Player, recoil: number) {
  context.clearRect(0, 0, width, height); context.fillStyle = "#718493"; context.fillRect(0, 0, width, height * .5); context.fillStyle = "#252a2f"; context.fillRect(0, height * .5, width, height * .5);
  context.fillStyle = "rgba(245,239,225,.12)"; for (let i = 1; i < 8; i++) context.fillRect(0, height * (.5 + i * i / 120), width, 1);
  const wall = (x: number, y: number, w: number, h: number, color: string) => { context.fillStyle = color; context.fillRect(x, y, w, h); context.fillStyle = "rgba(0,0,0,.22)"; context.fillRect(x + w * .12, y + h * .18, w * .18, h); };
  wall(width * .04 + player.x * 30, height * .29, width * .18, height * .36, "#4b4c48"); wall(width * .76 + player.x * 18, height * .25, width * .16, height * .42, "#525052"); wall(width * .4 + player.x * 12, height * .39, width * .19, height * .19, "#3c4141");
  if (enemy) { const ex = width * (.5 + (enemy.x - player.x) * .43); const ey = height * (.46 + (enemy.z - player.z) * .13); const scale = 1.15 - enemy.z * .45; context.save(); context.translate(ex, ey); context.scale(scale, scale); context.fillStyle = enemy.health < 35 ? "#a94b46" : "#28323a"; context.fillRect(-14, -32, 28, 54); context.fillStyle = "#e1b18d"; context.fillRect(-9, -45, 18, 15); context.fillStyle = "#161a1e"; context.fillRect(-18, -51, 36, 8); context.restore(); }
  context.fillStyle = "rgba(8,9,11,.72)"; context.fillRect(width * .5 - 78, height - 58 + recoil * 15, 156, 60); context.fillStyle = "#8c9397"; context.fillRect(width * .5 - 16, height - 82 + recoil * 15, 32, 50);
}
