export class DesktopInput {
  readonly keys = new Set<string>();
  constructor(private readonly target: HTMLElement, private readonly look: (x: number, y: number) => void, private readonly fire: () => void) {
    document.addEventListener("keydown", this.down); document.addEventListener("keyup", this.up); document.addEventListener("mousemove", this.move); target.addEventListener("mousedown", this.mouse);
  }
  private down = (event: KeyboardEvent) => { if (["KeyW", "KeyA", "KeyS", "KeyD", "KeyR", "Space", "ShiftLeft", "ControlLeft"].includes(event.code)) event.preventDefault(); this.keys.add(event.code); };
  private up = (event: KeyboardEvent) => this.keys.delete(event.code);
  private move = (event: MouseEvent) => { if (document.pointerLockElement === this.target) this.look(event.movementX, event.movementY); };
  private mouse = () => { if (document.pointerLockElement === this.target) this.fire(); };
  destroy() { document.removeEventListener("keydown", this.down); document.removeEventListener("keyup", this.up); document.removeEventListener("mousemove", this.move); this.target.removeEventListener("mousedown", this.mouse); }
}
