import type { MovementInput } from "./input";

export type TouchOptions = { joystick: "fixed" | "floating"; size: number; opacity: number; horizontalSensitivity: number; verticalSensitivity: number; haptics: boolean };

export class TouchInput {
  private stickPointer?: number;
  private aimPointer?: number;
  private firePointers = new Set<number>();
  private crouchPointers = new Set<number>();
  private adsPointers = new Set<number>();
  private jumpUntil = 0;
  private lastAim?: { x: number; y: number };
  private center = { x: 0, y: 0 };

  constructor(private readonly root: HTMLElement, private readonly stickArea: HTMLElement, private readonly aimArea: HTMLElement, private readonly stick: HTMLElement, private options: TouchOptions, private readonly look: (x: number, y: number) => void, private readonly fire: () => void, private readonly reload: () => void) {
    stickArea.addEventListener("pointerdown", this.startStick);
    stickArea.addEventListener("pointermove", this.moveStick);
    stickArea.addEventListener("pointerup", this.endStick);
    stickArea.addEventListener("pointercancel", this.endStick);
    stickArea.addEventListener("lostpointercapture", this.endStick);
    aimArea.addEventListener("pointerdown", this.startAim);
    aimArea.addEventListener("pointermove", this.moveAim);
    aimArea.addEventListener("pointerup", this.endAim);
    aimArea.addEventListener("pointercancel", this.endAim);
    aimArea.addEventListener("lostpointercapture", this.endAim);
    root.querySelectorAll<HTMLElement>("[data-touch-action]").forEach(button => {
      button.addEventListener("pointerdown", this.actionDown);
      button.addEventListener("pointerup", this.actionUp);
      button.addEventListener("pointercancel", this.actionUp);
      button.addEventListener("lostpointercapture", this.actionUp);
    });
    window.addEventListener("blur", this.reset);
    document.addEventListener("visibilitychange", this.visibility);
    this.applyOptions(options);
  }

  get enabled() { return this.root.dataset.enabled === "true"; }
  get firing() { return this.firePointers.size > 0; }
  get aiming() { return this.adsPointers.size > 0; }
  movement(): MovementInput {
    const dx = Number(this.stick.dataset.x ?? 0), dy = Number(this.stick.dataset.y ?? 0);
    return { moveX: dx, moveZ: -dy, sprint: Math.hypot(dx, dy) > .82 && !this.crouchPointers.size, crouch: this.crouchPointers.size > 0, jump: performance.now() < this.jumpUntil };
  }
  setEnabled(value: boolean) { this.root.dataset.enabled = String(value); if (!value) this.reset(); }
  applyOptions(options: TouchOptions) { this.options = options; this.root.style.setProperty("--touch-size", `${options.size}px`); this.root.style.setProperty("--touch-opacity", String(options.opacity / 100)); this.root.dataset.joystick = options.joystick; this.positionFixedStick(); }
  private pointer = (event: PointerEvent) => event.pointerType === "touch" || event.pointerType === "pen";
  private startStick = (event: PointerEvent) => {
    if (!this.enabled || !this.pointer(event) || this.stickPointer !== undefined) return;
    this.stickPointer = event.pointerId; this.center = this.options.joystick === "floating" ? { x: event.clientX, y: event.clientY } : this.centerOf(this.stickArea); this.stickArea.setPointerCapture(event.pointerId); this.placeStick(event.clientX, event.clientY); event.preventDefault();
  };
  private moveStick = (event: PointerEvent) => { if (event.pointerId !== this.stickPointer) return; this.placeStick(event.clientX, event.clientY); event.preventDefault(); };
  private endStick = (event: PointerEvent) => { if (event.pointerId !== this.stickPointer) return; this.stickPointer = undefined; this.stick.dataset.x = "0"; this.stick.dataset.y = "0"; this.stick.style.transform = "translate(-50%,-50%)"; event.preventDefault(); };
  private startAim = (event: PointerEvent) => { if (!this.enabled || !this.pointer(event) || this.aimPointer !== undefined) return; this.aimPointer = event.pointerId; this.lastAim = { x: event.clientX, y: event.clientY }; this.aimArea.setPointerCapture(event.pointerId); event.preventDefault(); };
  private moveAim = (event: PointerEvent) => { if (event.pointerId !== this.aimPointer || !this.lastAim) return; this.look((event.clientX - this.lastAim.x) * this.options.horizontalSensitivity, (event.clientY - this.lastAim.y) * this.options.verticalSensitivity); this.lastAim = { x: event.clientX, y: event.clientY }; event.preventDefault(); };
  private endAim = (event: PointerEvent) => { if (event.pointerId !== this.aimPointer) return; this.aimPointer = undefined; this.lastAim = undefined; event.preventDefault(); };
  private actionDown = (event: PointerEvent) => { if (!this.enabled || !this.pointer(event)) return; const action = (event.currentTarget as HTMLElement).dataset.touchAction; (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId); if (action === "fire") { this.firePointers.add(event.pointerId); this.fire(); } if (action === "ads") this.adsPointers.add(event.pointerId); if (action === "crouch") this.crouchPointers.add(event.pointerId); if (action === "jump") this.jumpUntil = performance.now() + 120; if (action === "reload") this.reload(); if (this.options.haptics) navigator.vibrate?.(8); event.preventDefault(); };
  private actionUp = (event: PointerEvent) => { const action = (event.currentTarget as HTMLElement).dataset.touchAction; if (action === "fire") this.firePointers.delete(event.pointerId); if (action === "ads") this.adsPointers.delete(event.pointerId); if (action === "crouch") this.crouchPointers.delete(event.pointerId); event.preventDefault(); };
  private centerOf(element: HTMLElement) { const rect = element.getBoundingClientRect(), offset = this.options.size * 1.1; return { x: rect.left + offset, y: rect.bottom - offset }; }
  private placeStick(x: number, y: number) { const radius = this.options.size * .44, dx = x - this.center.x, dy = y - this.center.y, length = Math.hypot(dx, dy), scale = length > radius ? radius / length : 1, moveX = Math.max(-1, Math.min(1, dx * scale / radius)), moveY = Math.max(-1, Math.min(1, dy * scale / radius)); this.stick.style.left = `${this.center.x - this.stickArea.getBoundingClientRect().left}px`; this.stick.style.top = `${this.center.y - this.stickArea.getBoundingClientRect().top}px`; this.stick.style.transform = `translate(calc(-50% + ${moveX * radius}px),calc(-50% + ${moveY * radius}px))`; this.stick.dataset.x = String(moveX); this.stick.dataset.y = String(moveY); }
  private visibility = () => { if (document.hidden) this.reset(); };
  private positionFixedStick() { if (this.options.joystick !== "fixed") return; const rect = this.stickArea.getBoundingClientRect(), offset = this.options.size * 1.1; this.stick.style.left = `${offset}px`; this.stick.style.top = `${Math.max(offset, rect.height - offset)}px`; }
  private reset = () => { this.stickPointer = undefined; this.aimPointer = undefined; this.firePointers.clear(); this.crouchPointers.clear(); this.adsPointers.clear(); this.lastAim = undefined; this.stick.dataset.x = "0"; this.stick.dataset.y = "0"; this.stick.style.transform = "translate(-50%,-50%)"; this.positionFixedStick(); };
  destroy() { this.reset(); this.stickArea.removeEventListener("pointerdown", this.startStick); this.stickArea.removeEventListener("pointermove", this.moveStick); this.stickArea.removeEventListener("pointerup", this.endStick); this.stickArea.removeEventListener("pointercancel", this.endStick); this.stickArea.removeEventListener("lostpointercapture", this.endStick); this.aimArea.removeEventListener("pointerdown", this.startAim); this.aimArea.removeEventListener("pointermove", this.moveAim); this.aimArea.removeEventListener("pointerup", this.endAim); this.aimArea.removeEventListener("pointercancel", this.endAim); this.aimArea.removeEventListener("lostpointercapture", this.endAim); window.removeEventListener("blur", this.reset); document.removeEventListener("visibilitychange", this.visibility); }
}
