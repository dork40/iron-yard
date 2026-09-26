import type { WeaponId } from "./weapons";

export type ArenaPhase = "menu" | "buy" | "live" | "round-end";
export type BotDifficulty = "rookie" | "standard" | "veteran";
export type ArenaConfig = { difficulty: BotDifficulty; botCount: 1 | 2 | 3 };

export const defaultArenaConfig: ArenaConfig = { difficulty: "standard", botCount: 1 };

export class TacticalRound {
  phase: ArenaPhase = "menu";
  cash = 3200;
  eliminations = 0;
  deaths = 0;
  endsAt = 0;

  start(now: number) { this.phase = "buy"; this.eliminations = 0; this.deaths = 0; this.endsAt = now + 30_000; }
  tick(now: number) {
    if (this.phase === "buy" && now >= this.endsAt) { this.phase = "live"; this.endsAt = now + 90_000; return this.phase; }
    if (this.phase === "live" && (now >= this.endsAt || this.eliminations >= 8)) { this.phase = "round-end"; this.endsAt = now + 7_000; return this.phase; }
    if (this.phase === "round-end" && now >= this.endsAt) { this.start(now); return this.phase; }
  }
  canBuy(inBuyZone: boolean) { return this.phase === "buy" && inBuyZone; }
  buy(id: WeaponId, price: number, owned: Set<WeaponId>, inBuyZone: boolean) {
    if (!this.canBuy(inBuyZone)) return "BUYING IS OPEN ONLY IN THE START ZONE.";
    if (owned.has(id)) return "ALREADY OWNED.";
    if (price > this.cash) return `NEED $${price - this.cash} MORE.`;
    this.cash -= price; owned.add(id); return "";
  }
  elimination() { this.eliminations++; this.cash += 300; }
  death() { this.deaths++; this.cash = Math.max(0, this.cash - 300); }
  label(now: number) {
    const seconds = Math.max(0, Math.ceil((this.endsAt - now) / 1000));
    return this.phase === "buy" ? `BUY PHASE: ${seconds} SEC` : this.phase === "live" ? `LIVE ROUND: ${seconds} SEC` : this.phase === "round-end" ? `ROUND COMPLETE: ${seconds} SEC` : "MATCH NOT STARTED";
  }
}
