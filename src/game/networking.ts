export type ArenaSeat = "host" | "guest";
export type ArenaPeer = { x: number; z: number; yaw: number; pitch: number; health: number; kills: number; deaths: number };
export type ArenaMetrics = { transport: "websocket" | "webtransport"; rttMs: number; jitterMs: number; snapshotLoss: number; snapshotsPerSecond: number; serverTick: number; serverLagMs: number; simulatedDrops: number };
export type NetworkSimulation = { latencyMs: number; jitterMs: number; lossPercent: number };
export type ArenaRegion = { id: string; label: string; url: string; statusUrl?: string; webTransportUrl?: string };
export type ArenaNetworkEvent =
  | { type: "connection"; status: "connecting" | "connected" | "reconnecting" | "closed"; transport?: "websocket" | "webtransport"; reason?: string }
  | { type: "joined"; room: string; seat: ArenaSeat; reconnectToken: string; region: string; tickRate: number; snapshotRate: number }
  | { type: "state"; started: boolean; serverTick: number; serverTime: number; ack: Record<ArenaSeat, number>; players: Record<ArenaSeat, ArenaPeer> }
  | { type: "shot"; seat: ArenaSeat; hit: boolean; health: number }
  | { type: "elimination"; killer: ArenaSeat; victim: ArenaSeat; kills: number; deaths: number }
  | { type: "respawn"; seat: ArenaSeat; player: ArenaPeer }
  | { type: "opponent-left"; reconnecting: boolean }
  | { type: "metrics"; value: ArenaMetrics }
  | { type: "error"; message: string };

type TransportHandlers = { open: () => void; message: (value: string) => void; error: () => void; close: (reason?: string) => void };
interface ArenaTransport { readonly kind: "websocket" | "webtransport"; open(): void; send(value: string): void; close(): void; }

interface WebTransportSession {
  ready: Promise<void>;
  closed: Promise<void>;
  datagrams: { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> };
  close(): void;
}
declare const WebTransport: { new(url: string): WebTransportSession } | undefined;

const encoder = new TextEncoder(), decoder = new TextDecoder();
const numberIn = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
const defaultSimulation: NetworkSimulation = { latencyMs: 0, jitterMs: 0, lossPercent: 0 };

function configuredSimulation(): NetworkSimulation {
  const raw = import.meta.env.VITE_ARENA_NET_SIMULATION?.trim();
  if (!raw) return { ...defaultSimulation };
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    return { latencyMs: numberIn(value.latencyMs, 0, 0, 2_000), jitterMs: numberIn(value.jitterMs, 0, 0, 1_000), lossPercent: numberIn(value.lossPercent, 0, 0, 50) };
  } catch { return { ...defaultSimulation }; }
}

export function arenaSocketUrl(base = import.meta.env.VITE_ARENA_SERVER_URL?.trim()) {
  if (!base) return;
  try {
    const url = new URL(base);
    url.protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol;
    url.pathname = "/v1/arena";
    return /^wss?:$/.test(url.protocol) ? url.toString() : undefined;
  } catch { return; }
}

export function arenaWebTransportUrl() {
  const raw = import.meta.env.VITE_ARENA_WEBTRANSPORT_URL?.trim();
  try { return raw && new URL(raw).protocol === "https:" ? raw : undefined; } catch { return; }
}

export function arenaRegions(): ArenaRegion[] {
  const raw = import.meta.env.VITE_ARENA_REGIONS?.trim();
  if (!raw) return [];
  try {
    const values = JSON.parse(raw) as unknown;
    if (!Array.isArray(values)) return [];
    return values.flatMap(value => {
      if (!value || typeof value !== "object") return [];
      const region = value as Record<string, unknown>;
      return typeof region.id === "string" && typeof region.label === "string" && typeof region.url === "string" ? [{ id: region.id, label: region.label, url: region.url, statusUrl: typeof region.statusUrl === "string" ? region.statusUrl : undefined, webTransportUrl: typeof region.webTransportUrl === "string" ? region.webTransportUrl : undefined }] : [];
    });
  } catch { return []; }
}

// Directory entries are static build configuration; this probes only the status endpoint and does not allocate a match.
export async function estimateArenaRegionPing(region: ArenaRegion, timeoutMs = 1_500) {
  const controller = new AbortController(), started = performance.now(), timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const endpoint = region.statusUrl ?? new URL("/v1/status", region.url).toString();
    const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("Status unavailable");
    return { region, rttMs: Math.round(performance.now() - started), status: await response.json() as unknown };
  } finally { window.clearTimeout(timer); }
}

class WebSocketArenaTransport implements ArenaTransport {
  readonly kind = "websocket" as const;
  private socket?: WebSocket;
  constructor(private readonly url: string, private readonly handlers: TransportHandlers) {}
  open() {
    const socket = this.socket = new WebSocket(this.url);
    socket.onopen = this.handlers.open;
    socket.onmessage = event => this.handlers.message(typeof event.data === "string" ? event.data : "");
    socket.onerror = this.handlers.error;
    socket.onclose = event => this.handlers.close(event.reason || (event.code ? `Socket closed (${event.code}).` : undefined));
  }
  send(value: string) { if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(value); }
  close() { this.socket?.close(); this.socket = undefined; }
}

// This uses WebTransport datagrams only when a separately deployed compatible endpoint is explicitly configured.
class WebTransportArenaTransport implements ArenaTransport {
  readonly kind = "webtransport" as const;
  private session?: WebTransportSession;
  private writer?: WritableStreamDefaultWriter<Uint8Array>;
  private closed = false;
  constructor(private readonly url: string, private readonly handlers: TransportHandlers) {}
  open() { void this.start(); }
  private async start() {
    try {
      if (typeof WebTransport === "undefined") throw new Error("WebTransport is unavailable.");
      const session = this.session = new WebTransport(this.url);
      await session.ready;
      if (this.closed) return;
      this.writer = session.datagrams.writable.getWriter();
      this.handlers.open();
      void this.read(session);
      void session.closed.then(() => this.handlers.close()).catch(() => { if (!this.closed) this.handlers.error(); });
    } catch { this.handlers.error(); this.handlers.close(); }
  }
  private async read(session: WebTransportSession) {
    try {
      const reader = session.datagrams.readable.getReader();
      for (;;) { const next = await reader.read(); if (next.done) break; this.handlers.message(decoder.decode(next.value)); }
    } catch { if (!this.closed) this.handlers.error(); }
  }
  send(value: string) { void this.writer?.write(encoder.encode(value)).catch(() => this.handlers.error()); }
  close() { this.closed = true; this.writer?.releaseLock(); this.session?.close(); this.session = undefined; }
}

export class ArenaNetwork {
  private transport?: ArenaTransport;
  private room?: string;
  private reconnectToken?: string;
  private reconnectAttempts = 0;
  private intentionalClose = false;
  private retryTimer?: number;
  private pingTimer?: number;
  private listener?: (event: ArenaNetworkEvent) => void;
  private simulation = configuredSimulation();
  private metrics: ArenaMetrics = { transport: "websocket", rttMs: 0, jitterMs: 0, snapshotLoss: 0, snapshotsPerSecond: 0, serverTick: 0, serverLagMs: 0, simulatedDrops: 0 };
  private lastRtt = 0;
  private lastSnapshotTick = 0;
  private snapshotCount = 0;
  private snapshotWindowAt = performance.now();
  private snapshotRate = 30;
  private inputSequence = 0;

  connect(kind: "create" | "join", room: string, onEvent: (event: ArenaNetworkEvent) => void) {
    if (!arenaSocketUrl()) return false;
    this.close();
    this.intentionalClose = false;
    this.reconnectAttempts = 0;
    this.listener = onEvent;
    this.open(kind === "create" ? { type: "create" } : { type: "join", room });
    return true;
  }

  setSimulation(value: Partial<NetworkSimulation>) {
    this.simulation = { latencyMs: numberIn(value.latencyMs, this.simulation.latencyMs, 0, 2_000), jitterMs: numberIn(value.jitterMs, this.simulation.jitterMs, 0, 1_000), lossPercent: numberIn(value.lossPercent, this.simulation.lossPercent, 0, 50) };
    this.emitMetrics();
  }
  simulationSettings() { return { ...this.simulation }; }
  serverTick() { return this.metrics.serverTick; }
  sendInput(value: { moveX: number; moveZ: number; sprint: boolean; crouch: boolean; jump: boolean; yaw: number; pitch: number }) {
    const sequence = ++this.inputSequence;
    this.send({ type: "input", sequence, ...value });
    return sequence;
  }
  send(value: object) { this.sendRaw(JSON.stringify(value)); }
  close() {
    this.intentionalClose = true;
    window.clearTimeout(this.retryTimer); window.clearInterval(this.pingTimer);
    this.transport?.send(JSON.stringify({ type: "leave" }));
    this.transport?.close(); this.transport = undefined;
    this.room = undefined; this.reconnectToken = undefined; this.reconnectAttempts = 0;
  }
  private open(message: { type: "create" } | { type: "join"; room: string } | { type: "resume"; room: string; reconnectToken: string }, forceWebSocket = false) {
    const socketUrl = arenaSocketUrl();
    if (!socketUrl || !this.listener) return;
    this.listener({ type: "connection", status: this.reconnectAttempts ? "reconnecting" : "connecting" });
    const webTransportUrl = !forceWebSocket ? arenaWebTransportUrl() : undefined;
    let opened = false, fallbackStarted = false;
    const fallback = () => {
      if (fallbackStarted || forceWebSocket || !webTransportUrl || this.intentionalClose) return;
      fallbackStarted = true; this.transport?.close(); this.open(message, true);
    };
    const handlers: TransportHandlers = {
      open: () => { opened = true; this.metrics.transport = this.transport?.kind ?? "websocket"; this.listener?.({ type: "connection", status: "connected", transport: this.metrics.transport }); this.sendRaw(JSON.stringify(message), false); this.startPings(); this.emitMetrics(); },
      message: value => this.handleMessage(value),
      error: () => { if (!opened && webTransportUrl && !forceWebSocket) fallback(); else this.listener?.({ type: "error", message: "Arena connection failed." }); },
       close: reason => { if (!opened) { if (webTransportUrl && !forceWebSocket) fallback(); else this.listener?.({ type: "connection", status: "closed", reason }); return; } if (this.transport && !fallbackStarted) this.handleClose(message, reason); },
    };
    this.transport = webTransportUrl ? new WebTransportArenaTransport(webTransportUrl, handlers) : new WebSocketArenaTransport(socketUrl, handlers);
    this.transport.open();
  }
  private handleClose(message: { type: "create" } | { type: "join"; room: string } | { type: "resume"; room: string; reconnectToken: string }, reason?: string) {
    this.transport = undefined; window.clearInterval(this.pingTimer);
    if (this.intentionalClose) return;
    if (this.room && this.reconnectToken && this.reconnectAttempts < 3) {
      this.reconnectAttempts++;
      this.listener?.({ type: "connection", status: "reconnecting" });
      this.retryTimer = window.setTimeout(() => this.open({ type: "resume", room: this.room!, reconnectToken: this.reconnectToken! }), this.reconnectAttempts * 1_000);
      return;
    }
    this.listener?.({ type: "connection", status: "closed", reason });
  }
  private sendRaw(value: string, simulate = true) {
    const packet = JSON.parse(value) as { type?: string };
    const simulated = simulate && ["input", "shot", "ping"].includes(packet.type ?? "");
    if (simulated && Math.random() * 100 < this.simulation.lossPercent) { this.metrics.simulatedDrops++; this.emitMetrics(); return; }
    const delay = simulated ? Math.max(0, this.simulation.latencyMs + (Math.random() * 2 - 1) * this.simulation.jitterMs) : 0;
    if (delay) window.setTimeout(() => this.transport?.send(value), delay); else this.transport?.send(value);
  }
  private handleMessage(raw: string) {
    try {
      const payload = JSON.parse(raw) as (ArenaNetworkEvent | { type: "pong"; sentAt?: unknown; serverTick?: unknown; serverLagMs?: unknown });
      if (payload.type === "pong") {
        if (typeof payload.sentAt === "number") {
          const rtt = Math.max(0, performance.now() - payload.sentAt);
          this.metrics.jitterMs = this.lastRtt ? Math.round(Math.abs(rtt - this.lastRtt)) : 0;
          this.metrics.rttMs = Math.round(rtt); this.lastRtt = rtt;
          this.metrics.serverTick = typeof payload.serverTick === "number" ? payload.serverTick : this.metrics.serverTick;
          this.metrics.serverLagMs = numberIn(payload.serverLagMs, this.metrics.serverLagMs, 0, 10_000); this.emitMetrics();
        }
        return;
      }
      if (payload.type === "joined") { this.room = payload.room; this.reconnectToken = payload.reconnectToken; this.reconnectAttempts = 0; this.snapshotRate = payload.snapshotRate || 30; }
      if (payload.type === "state") this.observeSnapshot(payload);
      this.listener?.(payload);
    } catch { /* Ignore malformed transport data. */ }
  }
  private observeSnapshot(snapshot: Extract<ArenaNetworkEvent, { type: "state" }>) {
    const step = Math.max(1, Math.round(60 / this.snapshotRate));
    if (this.lastSnapshotTick) this.metrics.snapshotLoss += Math.max(0, Math.round((snapshot.serverTick - this.lastSnapshotTick) / step) - 1);
    this.lastSnapshotTick = snapshot.serverTick; this.metrics.serverTick = snapshot.serverTick; this.snapshotCount++;
    const now = performance.now();
    if (now - this.snapshotWindowAt >= 1_000) { this.metrics.snapshotsPerSecond = Math.round(this.snapshotCount * 1_000 / (now - this.snapshotWindowAt)); this.snapshotCount = 0; this.snapshotWindowAt = now; }
    this.emitMetrics();
  }
  private startPings() { window.clearInterval(this.pingTimer); this.pingTimer = window.setInterval(() => this.send({ type: "ping", sentAt: performance.now() }), 1_000); this.send({ type: "ping", sentAt: performance.now() }); }
  private emitMetrics() { this.listener?.({ type: "metrics", value: { ...this.metrics } }); }
}
