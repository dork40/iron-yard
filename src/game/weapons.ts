export type WeaponId = "frontier-rifle" | "modern-rifle" | "pistol";
export type WeaponSpec = { id: WeaponId; name: string; automatic: boolean; magazine: number; reserve: number; damage: number; headshot: number; fireMs: number; reloadMs: number; recoil: number; spread: number; price: number; sound: "frontier" | "modern" | "pistol" };

export const weapons: Record<WeaponId, WeaponSpec> = {
  "frontier-rifle": { id: "frontier-rifle", name: "BRAMBLE-47", automatic: true, magazine: 30, reserve: 90, damage: 27, headshot: 76, fireMs: 108, reloadMs: 1850, recoil: .029, spread: .011, price: 1800, sound: "frontier" },
  "modern-rifle": { id: "modern-rifle", name: "YARDLINE-5", automatic: true, magazine: 28, reserve: 84, damage: 23, headshot: 68, fireMs: 82, reloadMs: 1650, recoil: .021, spread: .007, price: 2400, sound: "modern" },
  pistol: { id: "pistol", name: "RANGER PISTOL", automatic: false, magazine: 12, reserve: 48, damage: 42, headshot: 96, fireMs: 260, reloadMs: 1250, recoil: .045, spread: .004, price: 0, sound: "pistol" },
};

export class WeaponState {
  spec: WeaponSpec = weapons.pistol; ammo = this.spec.magazine; reserve = this.spec.reserve; reloading = false; private lastShot = 0;
  select(id: WeaponId) { this.spec = weapons[id]; this.ammo = this.spec.magazine; this.reserve = this.spec.reserve; }
  canFire(now: number) { return !this.reloading && this.ammo > 0 && now - this.lastShot >= this.spec.fireMs; }
  fired(now: number) { this.lastShot = now; this.ammo--; }
  reload(done: () => void) { if (this.reloading || this.ammo === this.spec.magazine || !this.reserve) return; this.reloading = true; window.setTimeout(() => { const add = Math.min(this.spec.magazine - this.ammo, this.reserve); this.ammo += add; this.reserve -= add; this.reloading = false; done(); }, this.spec.reloadMs); }
}
