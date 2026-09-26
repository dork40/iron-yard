import type { KeyBindings } from "./settings";
export class DesktopInput {
  readonly keys = new Set<string>();
  firing = false;
  constructor(private readonly target: HTMLElement, private readonly look: (x: number, y: number) => void, private readonly fire: () => void, private readonly aim: () => void, readonly bindings: KeyBindings) {
    document.addEventListener("keydown", this.down); document.addEventListener("keyup", this.up); document.addEventListener("mousemove", this.move); document.addEventListener("pointerlockchange", this.lockChange); window.addEventListener("blur", this.reset); target.addEventListener("mousedown", this.mouse); document.addEventListener("mouseup", this.release);
  }
  private down = (event: KeyboardEvent) => { if ([...Object.values(this.bindings), "ShiftLeft", "ControlLeft"].includes(event.code)) event.preventDefault(); this.keys.add(event.code); };
  private up = (event: KeyboardEvent) => this.keys.delete(event.code);
  private move = (event: MouseEvent) => { if (document.pointerLockElement === this.target) this.look(event.movementX, event.movementY); };
  private mouse = (event: MouseEvent) => {
    if (document.pointerLockElement !== this.target) return;
    if (event.button === 0) { this.firing = true; this.fire(); }
    if (event.button === 2) this.aim();
  };
  private release = (event: MouseEvent) => { if (event.button === 0) this.firing = false; };
  private reset = () => { this.firing = false; };
  private lockChange = () => { if (document.pointerLockElement !== this.target) this.reset(); };
  destroy() { document.removeEventListener("keydown", this.down); document.removeEventListener("keyup", this.up); document.removeEventListener("mousemove", this.move); document.removeEventListener("pointerlockchange", this.lockChange); window.removeEventListener("blur", this.reset); document.removeEventListener("mouseup", this.release); this.target.removeEventListener("mousedown", this.mouse); }
}
