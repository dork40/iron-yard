import type { WeaponId } from "./weapons";

export type ArenaPhase = "menu" | "warmup" | "buy" | "live" | "round-end";
export type BotDifficulty = "rookie" | "standard" | "veteran";
export type ArenaConfig = { difficulty: BotDifficulty; botCount: 1 | 2 | 3 };

export const defaultArenaConfig: ArenaConfig = { difficulty: "standard", botCount: 1 };

export class TacticalRound {
  phase: ArenaPhase = "menu";
  cash = 3200;
  eliminations = 0;
  deaths = 0;
  endsAt = 0;

  start(now: number) { this.phase = "warmup"; this.eliminations = 0; this.deaths = 0; this.endsAt = now + 5_000; }
  tick(now: number) {
    if (this.phase === "warmup" && now >= this.endsAt) { this.phase = "buy"; this.endsAt = now + 15_000; }
    else if (this.phase === "buy" && now >= this.endsAt) { this.phase = "live"; this.endsAt = now + 90_000; }
    else if (this.phase === "live" && (now >= this.endsAt || this.eliminations >= 8)) { this.phase = "round-end"; this.endsAt = now + 7_000; }
    else if (this.phase === "round-end" && now >= this.endsAt) this.start(now);
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
  label(now: number) { return `${this.phase.replace("-", " ").toUpperCase()} · ${Math.max(0, Math.ceil((this.endsAt - now) / 1000))} SEC`; }
}
