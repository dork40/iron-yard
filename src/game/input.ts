export class DesktopInput {
  readonly keys = new Set<string>();
  firing = false;
  constructor(private readonly target: HTMLElement, private readonly look: (x: number, y: number) => void, private readonly fire: () => void) {
    document.addEventListener("keydown", this.down); document.addEventListener("keyup", this.up); document.addEventListener("mousemove", this.move); target.addEventListener("mousedown", this.mouse); document.addEventListener("mouseup", this.release);
  }
  private down = (event: KeyboardEvent) => { if (["KeyW", "KeyA", "KeyS", "KeyD", "KeyR", "Space", "ShiftLeft", "ControlLeft"].includes(event.code)) event.preventDefault(); this.keys.add(event.code); };
  private up = (event: KeyboardEvent) => this.keys.delete(event.code);
  private move = (event: MouseEvent) => { if (document.pointerLockElement === this.target) this.look(event.movementX, event.movementY); };
  private mouse = () => { if (document.pointerLockElement === this.target) { this.firing = true; this.fire(); } };
  private release = () => { this.firing = false; };
  destroy() { document.removeEventListener("keydown", this.down); document.removeEventListener("keyup", this.up); document.removeEventListener("mousemove", this.move); document.removeEventListener("mouseup", this.release); this.target.removeEventListener("mousedown", this.mouse); }
}
