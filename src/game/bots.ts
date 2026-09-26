import * as THREE from "three";
export type Bot = { group: THREE.Group; health: number; nextThink: number; velocity: THREE.Vector3; spawn: THREE.Vector3 };
export function updateBot(bot: Bot, player: THREE.Vector3, now: number, dt: number, shoot: (origin: THREE.Vector3, direction: THREE.Vector3) => void) {
  const toPlayer = player.clone().sub(bot.group.position); toPlayer.y = 0; const distance = toPlayer.length(); bot.group.lookAt(player.x, bot.group.position.y, player.z);
  if (now > bot.nextThink) { bot.nextThink = now + 280 + Math.random() * 420; if (distance < 19 && Math.random() > .35) shoot(bot.group.position.clone().add(new THREE.Vector3(0, 1.25, 0)), toPlayer.normalize()); }
  const desired = distance > 8 ? toPlayer.normalize().multiplyScalar(2.8) : new THREE.Vector3(Math.sin(now / 700), 0, Math.cos(now / 700)).multiplyScalar(1.6);
  bot.velocity.lerp(desired, Math.min(1, dt * 4)); bot.group.position.addScaledVector(bot.velocity, dt);
}
