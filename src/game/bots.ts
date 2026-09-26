import * as THREE from "three";

export type BotDifficulty = "easy" | "normal" | "hard";
type BotTuning = { reactionMs: number; desiredRange: number; accuracy: number; fireMs: number; burst: number; reloadMs: number; speed: number };
const tuning: Record<BotDifficulty, BotTuning> = {
  easy: { reactionMs: 620, desiredRange: 10, accuracy: .38, fireMs: 310, burst: 3, reloadMs: 1300, speed: 2.3 },
  normal: { reactionMs: 360, desiredRange: 11, accuracy: .68, fireMs: 185, burst: 5, reloadMs: 950, speed: 3.1 },
  hard: { reactionMs: 180, desiredRange: 12, accuracy: .86, fireMs: 125, burst: 7, reloadMs: 700, speed: 3.8 },
};
export type Bot = {
  group: THREE.Group; health: number; velocity: THREE.Vector3; spawn: THREE.Vector3; seed: number;
  lastSeen: THREE.Vector3; cover?: THREE.Vector3; nextDecision: number; reactionUntil: number; nextShot: number; reloadUntil: number; burstShots: number; strafe: number;
};

const random = (bot: Bot) => { bot.seed = (bot.seed * 1664525 + 1013904223) >>> 0; return bot.seed / 4294967296; };
const lineClear = (from: THREE.Vector3, to: THREE.Vector3, colliders: THREE.Box3[]) => {
  const direction = to.clone().sub(from); const distance = direction.length();
  if (!distance) return true;
  const ray = new THREE.Ray(from, direction.multiplyScalar(1 / distance)); const point = new THREE.Vector3();
  return !colliders.some(box => Boolean(ray.intersectBox(box, point)) && point.distanceTo(from) < distance - .04);
};
const canStandAt = (position: THREE.Vector3, colliders: THREE.Box3[]) => !colliders.some(box => box.intersectsBox(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(position.x, .9, position.z), new THREE.Vector3(.7, 1.8, .7))));

export function resetBot(bot: Bot, now: number) {
  bot.velocity.set(0, 0, 0); bot.lastSeen.copy(bot.spawn); bot.cover = undefined; bot.nextDecision = now; bot.reactionUntil = now + 400; bot.nextShot = now; bot.reloadUntil = 0; bot.burstShots = 0; bot.strafe = 1;
}

export function updateBot(bot: Bot, player: THREE.Vector3, now: number, dt: number, colliders: THREE.Box3[], coverPoints: THREE.Vector3[], shoot: (origin: THREE.Vector3, direction: THREE.Vector3) => void, difficulty: BotDifficulty = "normal") {
  const config = tuning[difficulty]; const origin = bot.group.position.clone().add(new THREE.Vector3(0, 1.25, 0)); const target = player.clone(); target.y = 1.25;
  const visible = lineClear(origin, target, colliders); const flatPlayer = player.clone().sub(bot.group.position); flatPlayer.y = 0; const distance = flatPlayer.length();
  if (visible) bot.lastSeen.copy(player);
  if (now >= bot.nextDecision) {
    bot.nextDecision = now + 420 + random(bot) * 280; bot.strafe = random(bot) < .5 ? -1 : 1;
    if (!visible) {
      const candidates = coverPoints.filter(point => point.distanceTo(bot.group.position) < 16 && !lineClear(point.clone().add(new THREE.Vector3(0, 1.2, 0)), target, colliders));
      bot.cover = candidates.sort((a, b) => a.distanceTo(bot.group.position) - b.distanceTo(bot.group.position))[0]?.clone();
    } else if (distance < config.desiredRange * .7) bot.cover = undefined;
  }
  const aimAt = visible ? player : bot.cover ?? bot.lastSeen;
  bot.group.lookAt(aimAt.x, bot.group.position.y, aimAt.z);
  if (visible && now >= bot.reactionUntil && now >= bot.nextShot && now >= bot.reloadUntil && distance < 22) {
    const aim = target.sub(origin).normalize(); const inaccuracy = (1 - config.accuracy) * .12;
    aim.x += (random(bot) - .5) * inaccuracy; aim.y += (random(bot) - .5) * inaccuracy; aim.z += (random(bot) - .5) * inaccuracy; aim.normalize();
    shoot(origin, aim); bot.nextShot = now + config.fireMs; bot.burstShots++;
    if (bot.burstShots >= config.burst) { bot.burstShots = 0; bot.reloadUntil = now + config.reloadMs; }
  }
  if (visible && bot.reactionUntil < now - 1000) bot.reactionUntil = now + config.reactionMs;
  if (!visible) bot.reactionUntil = now + config.reactionMs;
  const goal = (!visible && bot.cover ? bot.cover : visible && distance > config.desiredRange ? player : visible && distance < config.desiredRange * .7 ? bot.group.position.clone().sub(flatPlayer.normalize().multiplyScalar(4)) : visible ? bot.group.position : bot.lastSeen).clone();
  const move = goal.sub(bot.group.position); move.y = 0;
  if (visible && distance < config.desiredRange * 1.3) move.add(new THREE.Vector3(-flatPlayer.z, 0, flatPlayer.x).normalize().multiplyScalar(config.speed * .65 * bot.strafe));
  if (move.lengthSq() > .04) move.normalize().multiplyScalar(config.speed);
  bot.velocity.lerp(move, Math.min(1, dt * 5)); const next = bot.group.position.clone().addScaledVector(bot.velocity, dt);
  if (canStandAt(next, colliders)) bot.group.position.copy(next); else { bot.velocity.multiplyScalar(-.2); bot.strafe *= -1; }
}
