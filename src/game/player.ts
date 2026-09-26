import * as THREE from "three";
import type { DesktopInput } from "./input";
export class FpsPlayer {
  velocity = new THREE.Vector3(); yaw = 0; pitch = 0; grounded = true; crouched = false; sprinting = false; health = 100;
  constructor(readonly camera: THREE.PerspectiveCamera, readonly colliders: THREE.Box3[]) { camera.position.set(-10, 1.7, 9); camera.rotation.order = "YXZ"; }
  look(x: number, y: number, sensitivity: number) { this.yaw -= x * sensitivity; this.pitch = THREE.MathUtils.clamp(this.pitch - y * sensitivity, -1.45, 1.45); }
  update(dt: number, input: DesktopInput) {
    this.crouched = input.keys.has("ControlLeft"); this.sprinting = input.keys.has("ShiftLeft") && !this.crouched;
    const forward = Number(input.keys.has("KeyW")) - Number(input.keys.has("KeyS")); const strafe = Number(input.keys.has("KeyD")) - Number(input.keys.has("KeyA"));
    // Three.js cameras face negative Z at zero yaw, so forward input must match that view direction.
    const direction = new THREE.Vector3(strafe, 0, -forward).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    const speed = this.crouched ? 3 : this.sprinting ? 7.2 : 5; const accel = this.grounded ? 35 : 10;
    this.velocity.x += (direction.x * speed - this.velocity.x) * Math.min(1, accel * dt); this.velocity.z += (direction.z * speed - this.velocity.z) * Math.min(1, accel * dt);
    if (input.keys.has("Space") && this.grounded) { this.velocity.y = 6.2; this.grounded = false; }
    this.velocity.y -= 18 * dt; const next = this.camera.position.clone().addScaledVector(this.velocity, dt); const feet = this.crouched ? .95 : 1.7;
    if (next.y <= feet) { next.y = feet; this.velocity.y = 0; this.grounded = true; }
    const body = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(next.x, next.y - .75, next.z), new THREE.Vector3(.65, 1.5, .65));
    if (!this.colliders.some(box => box.intersectsBox(body))) this.camera.position.copy(next); else { this.velocity.x = 0; this.velocity.z = 0; }
    this.camera.rotation.y = this.yaw; this.camera.rotation.x = this.pitch;
  }
}
