export type WeaponId = "rifle" | "pistol";
export type WeaponSpec = { id: WeaponId; name: string; magazine: number; reserve: number; damage: number; headshot: number; fireMs: number; reloadMs: number; recoil: number; spread: number };
export const weapons: Record<WeaponId, WeaponSpec> = {
  rifle: { id: "rifle", name: "MESA RIFLE", magazine: 30, reserve: 90, damage: 25, headshot: 72, fireMs: 95, reloadMs: 1750, recoil: .025, spread: .009 },
  pistol: { id: "pistol", name: "RANGER PISTOL", magazine: 12, reserve: 48, damage: 42, headshot: 96, fireMs: 260, reloadMs: 1250, recoil: .045, spread: .004 },
};
export class WeaponState { spec: WeaponSpec = weapons.rifle; ammo = 30; reserve = 90; reloading = false; private lastShot = 0; select(id: WeaponId) { this.spec = weapons[id]; this.ammo = this.spec.magazine; this.reserve = this.spec.reserve; } canFire(now: number) { return !this.reloading && this.ammo > 0 && now - this.lastShot >= this.spec.fireMs; } fired(now: number) { this.lastShot = now; this.ammo--; } reload(done: () => void) { if (this.reloading || this.ammo === this.spec.magazine || !this.reserve) return; this.reloading = true; window.setTimeout(() => { const add = Math.min(this.spec.magazine - this.ammo, this.reserve); this.ammo += add; this.reserve -= add; this.reloading = false; done(); }, this.spec.reloadMs); } }
