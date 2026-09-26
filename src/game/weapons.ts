export type WeaponId = "frontier-rifle" | "modern-rifle" | "smg" | "sniper-rifle" | "pistol";
export type WeaponSpec = { id: WeaponId; name: string; automatic: boolean; magazine: number; reserve: number; damage: number; headshot: number; fireMs: number; reloadMs: number; recoil: number; spread: number; price: number; sound: "frontier" | "modern" | "pistol" };

export const weapons: Record<WeaponId, WeaponSpec> = {
  "frontier-rifle": { id: "frontier-rifle", name: "BRAMBLE-47 AR", automatic: true, magazine: 30, reserve: 90, damage: 34, headshot: 102, fireMs: 108, reloadMs: 1850, recoil: .029, spread: .011, price: 1800, sound: "frontier" },
  "modern-rifle": { id: "modern-rifle", name: "YARDLINE-5 AR", automatic: true, magazine: 28, reserve: 84, damage: 34, headshot: 102, fireMs: 82, reloadMs: 1650, recoil: .021, spread: .007, price: 2400, sound: "modern" },
  smg: { id: "smg", name: "CINDER SMG", automatic: true, magazine: 36, reserve: 108, damage: 25, headshot: 70, fireMs: 68, reloadMs: 1450, recoil: .019, spread: .018, price: 2100, sound: "modern" },
  "sniper-rifle": { id: "sniper-rifle", name: "LONESTAR SNIPER", automatic: false, magazine: 5, reserve: 25, damage: 100, headshot: 160, fireMs: 1100, reloadMs: 2300, recoil: .085, spread: .0008, price: 4200, sound: "frontier" },
  pistol: { id: "pistol", name: "RANGER PISTOL", automatic: false, magazine: 12, reserve: 48, damage: 25, headshot: 75, fireMs: 260, reloadMs: 1250, recoil: .045, spread: .004, price: 0, sound: "pistol" },
};

export class WeaponState {
  spec: WeaponSpec = weapons.pistol; ammo = this.spec.magazine; reserve = this.spec.reserve; reloading = false; private lastShot = 0; private reloadStartedAt = 0; private reloadTimer: number | undefined; private reloadGeneration = 0;
  select(id: WeaponId) { this.cancelReload(); this.spec = weapons[id]; this.ammo = this.spec.magazine; this.reserve = this.spec.reserve; }
  canFire(now: number) { return !this.reloading && this.ammo > 0 && now - this.lastShot >= this.spec.fireMs; }
  fired(now: number) { this.lastShot = now; this.ammo--; }
  reloadProgress(now: number) { return this.reloading ? Math.min(1, (now - this.reloadStartedAt) / this.spec.reloadMs) : 0; }
  cancelReload() { this.reloadGeneration++; if (this.reloadTimer !== undefined) window.clearTimeout(this.reloadTimer); this.reloadTimer = undefined; this.reloading = false; this.reloadStartedAt = 0; }
  reload(done: () => void): "started" | "reloading" | "full" | "empty" {
    if (this.reloading) return "reloading";
    if (this.ammo >= this.spec.magazine) return "full";
    if (!this.reserve) return "empty";
    const generation = ++this.reloadGeneration;
    const spec = this.spec;
    this.reloading = true;
    this.reloadStartedAt = performance.now();
    this.reloadTimer = window.setTimeout(() => {
      if (generation !== this.reloadGeneration || this.spec !== spec) return;
      const add = Math.min(this.spec.magazine - this.ammo, this.reserve);
      this.ammo += add;
      this.reserve -= add;
      this.reloadTimer = undefined;
      this.reloading = false;
      this.reloadStartedAt = 0;
      done();
    }, this.spec.reloadMs);
    return "started";
  }
}
