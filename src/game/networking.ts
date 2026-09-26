export type ArenaPeer = { x: number; z: number; yaw: number; pitch: number; health: number; kills: number; deaths: number };
export type ArenaNetworkEvent =
  | { type: "connection"; status: "connecting" | "connected" | "reconnecting" | "closed" }
  | { type: "joined"; room: string; seat: "host" | "guest"; reconnectToken: string }
  | { type: "state"; started: boolean; players: Record<"host" | "guest", ArenaPeer> }
  | { type: "shot"; seat: "host" | "guest"; hit: boolean; health: number }
  | { type: "elimination"; killer: "host" | "guest"; victim: "host" | "guest"; kills: number; deaths: number }
  | { type: "respawn"; seat: "host" | "guest"; player: ArenaPeer }
  | { type: "opponent-left"; reconnecting: boolean }
  | { type: "error"; message: string };

export function arenaSocketUrl() {
  const raw = import.meta.env.VITE_ARENA_SERVER_URL?.trim();
  if (!raw) return;
  try {
    const url = new URL(raw);
    url.protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol;
    url.pathname = "/v1/arena";
    return /^wss?:$/.test(url.protocol) ? url.toString() : undefined;
  } catch { return; }
}

export class ArenaNetwork {
  socket?: WebSocket;
  private room?: string;
  private reconnectToken?: string;
  private reconnectAttempts = 0;
  private intentionalClose = false;
  private retryTimer?: number;
  private listener?: (event: ArenaNetworkEvent) => void;

  connect(kind: "create" | "join", room: string, onEvent: (event: ArenaNetworkEvent) => void) {
    if (!arenaSocketUrl()) return false;
    this.close();
    this.intentionalClose = false;
    this.reconnectAttempts = 0;
    this.listener = onEvent;
    this.open(kind === "create" ? { type: "create" } : { type: "join", room });
    return true;
  }

  send(value: object) {
    if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify(value));
  }

  close() {
    this.intentionalClose = true;
    window.clearTimeout(this.retryTimer);
    if (this.socket?.readyState === WebSocket.OPEN) this.send({ type: "leave" });
    this.socket?.close();
    this.socket = undefined;
    this.room = undefined;
    this.reconnectToken = undefined;
    this.reconnectAttempts = 0;
  }

  private open(message: { type: "create" } | { type: "join"; room: string } | { type: "resume"; room: string; reconnectToken: string }) {
    const url = arenaSocketUrl();
    if (!url || !this.listener) return;
    this.listener({ type: "connection", status: this.reconnectAttempts ? "reconnecting" : "connecting" });
    const socket = this.socket = new WebSocket(url);
    socket.onopen = () => {
      this.listener?.({ type: "connection", status: "connected" });
      this.send(message);
    };
    socket.onmessage = event => {
      try {
        const payload = JSON.parse(event.data) as ArenaNetworkEvent;
        if (payload.type === "joined") {
          this.room = payload.room;
          this.reconnectToken = payload.reconnectToken;
          this.reconnectAttempts = 0;
        }
        this.listener?.(payload);
      } catch { /* Ignore invalid server packets. */ }
    };
    socket.onerror = () => this.listener?.({ type: "error", message: "Arena connection failed." });
    socket.onclose = () => {
      if (socket !== this.socket) return;
      this.socket = undefined;
      if (this.intentionalClose) return;
      if (this.room && this.reconnectToken && this.reconnectAttempts < 3) {
        this.reconnectAttempts++;
        this.listener?.({ type: "connection", status: "reconnecting" });
        this.retryTimer = window.setTimeout(() => this.open({ type: "resume", room: this.room!, reconnectToken: this.reconnectToken! }), this.reconnectAttempts * 1_000);
        return;
      }
      this.listener?.({ type: "connection", status: "closed" });
    };
  }
}
