export type ArenaPeer = { x: number; z: number; yaw: number; pitch: number; health: number };
export type ArenaNetworkEvent = { type: "joined"; room: string; seat: "host" | "guest" } | { type: "state"; started: boolean; players: Record<"host" | "guest", ArenaPeer> } | { type: "shot"; seat: "host" | "guest"; hit: boolean; health: number } | { type: "respawn"; seat: "host" | "guest"; player: ArenaPeer } | { type: "result"; winner: "host" | "guest" } | { type: "opponent-left" } | { type: "error"; message: string };
export function arenaSocketUrl() { const raw = import.meta.env.VITE_ARENA_SERVER_URL?.trim(); if (!raw) return; try { const url = new URL(raw); url.protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol; url.pathname = "/v1/arena"; return /^wss?:$/.test(url.protocol) ? url.toString() : undefined; } catch { return; } }
export class ArenaNetwork {
  socket?: WebSocket;
  connect(kind: "create" | "join", room: string, onEvent: (event: ArenaNetworkEvent) => void) { const url = arenaSocketUrl(); if (!url) return false; this.socket = new WebSocket(url); this.socket.onopen = () => this.send(kind === "create" ? { type: "create" } : { type: "join", room }); this.socket.onmessage = event => { try { onEvent(JSON.parse(event.data) as ArenaNetworkEvent); } catch { /* Ignore invalid packets. */ } }; this.socket.onerror = () => onEvent({ type: "error", message: "Connection failed." }); return true; }
  send(value: object) { if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify(value)); }
  close() { this.socket?.close(); this.socket = undefined; }
}
