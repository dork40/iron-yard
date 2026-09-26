import * as THREE from "three";
import { playSound } from "./audio";
import { resetBot, updateBot, type Bot } from "./bots";
import { paintCrosshair } from "./crosshair";
import { DesktopInput } from "./input";
import { buildIronYard, ironYardCoverPoints } from "./maps";
import { ArenaNetwork, arenaSocketUrl, type ArenaNetworkEvent } from "./networking";
import { FpsPlayer } from "./player";
import { Recoil } from "./recoil";
import { applyGraphicsSettings, createFighter, createRenderer, createWeapon } from "./rendering";
import { crosshairCode, graphicsPresets, importCrosshair, loadSettings, saveSettings, type GraphicsQuality } from "./settings";
import { weapons, WeaponState, type WeaponId } from "./weapons";

type ArenaResult = { won: boolean; accuracy: number; eliminations: number };
let stop: (() => void) | undefined;

export function arenaView() {
  const online = Boolean(arenaSocketUrl());
  return `<section class="arena-game"><div class="arena-heading"><p class="eyebrow">DESKTOP FPS VERTICAL SLICE</p><h1>IRON YARD</h1><p>Original industrial yard. Practice against a bot or open a lightweight 1v1 room.</p></div><div class="arena-lobby"><p id="arena-connection">PRACTICE IS READY</p><div><button id="arena-bot" class="primary">PLAY TRAINING BOT</button>${online ? `<button id="arena-create" class="outline">CREATE 1V1</button><label>ROOM <input id="arena-room-code" maxlength="6" /></label><button id="arena-join" class="outline">JOIN</button>` : `<small>Set VITE_ARENA_SERVER_URL to enable 1v1 rooms.</small>`}</div></div><div class="arena-loadout"><button class="outline" data-arena-loadout="rifle" aria-pressed="true"><b>MESA RIFLE</b><span>30 rounds · full automatic · patterned recoil</span></button><button class="outline" data-arena-loadout="pistol" aria-pressed="false"><b>RANGER PISTOL</b><span>12 rounds · precise sidearm</span></button></div><div class="arena-frame"><div id="arena-canvas"></div><button id="arena-lock" class="arena-lock" hidden>CLICK TO PLAY</button><div id="arena-crosshair" class="arena-reticle"><i></i><b></b><em></em></div><div class="arena-status"><span id="arena-health">HEALTH 100</span><span id="arena-ammo">30 / 90</span><span id="arena-rival">BOT 100</span></div><div id="arena-message" class="arena-message">SELECT TRAINING OR CREATE A ROOM</div><div id="arena-pause" class="arena-pause" hidden><b>PAUSED</b><span>Click the yard to resume</span></div></div><div class="arena-controls"><button id="arena-fire" class="primary" disabled>FIRE</button><button id="arena-reload" class="outline" disabled>RELOAD</button><button id="arena-ads" class="outline" disabled>AIM</button><button id="fullscreen-toggle" class="outline fullscreen-toggle" aria-pressed="false">FULL SCREEN</button></div><details class="arena-settings"><summary>RETICLE, MOUSE & GRAPHICS</summary><label>SENSITIVITY <input id="fps-sensitivity" type="range" min="0.001" max="0.006" step="0.0002" /></label><label>COLOR <input id="cross-color" type="color" /></label><label>SIZE <input id="cross-size" type="range" min="4" max="18" /></label><label>QUALITY <select id="graphics-quality"><option value="low">LOW</option><option value="medium">MEDIUM</option><option value="high">HIGH</option></select></label><label>PIXEL RATIO <input id="graphics-pixel-ratio" type="range" min="0.5" max="2" step="0.1" /></label><label class="arena-check"><input id="graphics-shadows" type="checkbox" /> SHADOWS</label><button id="cross-share" class="outline">COPY RETICLE</button><label>IMPORT <input id="cross-import" /></label></details></section>`;
}

export function mountArena(onComplete: (result: ArenaResult) => void) {
   stop?.();
   const loadout = document.querySelector<HTMLElement>(".arena-loadout");
   if (loadout) {
     loadout.insertAdjacentHTML("beforebegin", `<div class="arena-buybar"><span>BOT TRAINING BUY MENU</span><b id="arena-cash">$3200</b><small>Eliminations award $300. Purchases reset ammunition.</small></div>`);
     loadout.innerHTML = `<button class="outline" data-arena-loadout="frontier-rifle" aria-pressed="false"><b>BRAMBLE-47 · $1800</b><span>Wood and steel, curved magazine, steady automatic fire</span></button><button class="outline" data-arena-loadout="modern-rifle" aria-pressed="false"><b>YARDLINE-5 · $2400</b><span>Polymer modern rifle, fast and controlled</span></button><button class="outline" data-arena-loadout="pistol" aria-pressed="true"><b>RANGER PISTOL · FREE</b><span>12 rounds · precise sidearm</span></button>`;
   }
   const host = document.querySelector<HTMLElement>("#arena-canvas");
  const message = document.querySelector<HTMLElement>("#arena-message");
  const lock = document.querySelector<HTMLButtonElement>("#arena-lock");
  const health = document.querySelector<HTMLElement>("#arena-health");
  const ammo = document.querySelector<HTMLElement>("#arena-ammo");
  const rival = document.querySelector<HTMLElement>("#arena-rival");
  const reticle = document.querySelector<HTMLElement>("#arena-crosshair");
  const pause = document.querySelector<HTMLElement>("#arena-pause");
  if (!host || !message || !lock || !health || !ammo || !rival || !reticle || !pause) return;

  const settings = loadSettings();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(settings.fov, 16 / 9, .05, 90);
  const renderer = createRenderer(host, settings.graphics);
  const colliders = buildIronYard(scene);
  const player = new FpsPlayer(camera, colliders);
  const weapon = new WeaponState();
  const recoil = new Recoil();
  const network = new ArenaNetwork();
  scene.add(camera);
  scene.background = new THREE.Color("#9aabb0");
  scene.fog = new THREE.Fog("#9aabb0", 24, 58);
  scene.add(new THREE.HemisphereLight("#dce9ed", "#343334", 2));
  const sun = new THREE.DirectionalLight("#ffe0bb", 3);
  sun.position.set(-10, 16, 8);
  sun.castShadow = settings.graphics.shadows;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);
   let gun = createWeapon(camera, weapon.spec.id);
  const muzzle = new THREE.PointLight("#ffbd72", 0, 4);
  camera.add(muzzle);

  let bot: Bot | undefined;
  let remote: THREE.Group | undefined;
  let seat: "host" | "guest" | undefined;
  let online = false;
  let active = false;
  let aiming = false;
  let receivedSpawn = false;
  let shots = 0;
  let hits = 0;
  let kills = 0;
  let lastSync = 0;
  let lastFrame = performance.now();
  const raycaster = new THREE.Raycaster();
   let cash = 3200;
   const owned = new Set<WeaponId>(["pistol"]);
   const cashHud = document.querySelector<HTMLElement>("#arena-cash");
   const updateHud = () => { health.textContent = `HEALTH ${Math.ceil(player.health)}`; ammo.textContent = weapon.reloading ? "RELOADING" : `${weapon.ammo} / ${weapon.reserve}`; rival.textContent = online ? "RIVAL LIVE" : `BOT ${Math.max(0, Math.ceil(bot?.health ?? 0))}`; if (cashHud) cashHud.textContent = online ? "LOADOUT LOCKED" : `$${cash}`; };
  const spawnBot = () => { const group = createFighter("#6a4e47"); group.position.set(10, 0, -9); scene.add(group); bot = { group, health: 100, velocity: new THREE.Vector3(), spawn: group.position.clone(), seed: 0x1a2b3c4d, lastSeen: group.position.clone(), nextDecision: 0, reactionUntil: 0, nextShot: 0, reloadUntil: 0, burstShots: 0, strafe: 1 }; resetBot(bot, performance.now()); };
  const start = (isOnline = false) => { online = isOnline; if (online && bot) { scene.remove(bot.group); bot = undefined; } if (!online && !bot) spawnBot(); active = true; lock.hidden = false; document.querySelectorAll<HTMLButtonElement>("#arena-fire,#arena-reload,#arena-ads").forEach(button => button.disabled = false); message.textContent = online ? "RIVAL CONNECTED. CLICK TO PLAY." : "TRAINING BOT ACTIVE. CLICK TO PLAY."; updateHud(); };
  const tracer = (from: THREE.Vector3, to: THREE.Vector3) => { const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color: "#ffd28a" })); scene.add(line); setTimeout(() => { scene.remove(line); line.geometry.dispose(); (line.material as THREE.Material).dispose(); }, 70); };
  const wallDistance = (from: THREE.Vector3, direction: THREE.Vector3) => { let nearest = Infinity; for (const box of colliders) { const point = new THREE.Vector3(); if (raycaster.ray.set(from, direction).intersectBox(box, point)) nearest = Math.min(nearest, point.distanceTo(from)); } return nearest; };
   const damageBot = (head: boolean) => { if (!bot) return; bot.health -= head ? weapon.spec.headshot : weapon.spec.damage; hits++; playSound("impact"); if (bot.health <= 0) { kills++; cash += 300; bot.health = 100; bot.group.position.copy(bot.spawn); resetBot(bot, performance.now()); message.textContent = "ELIMINATION. +$300. BOT RESPAWNED."; } updateHud(); };
   const fire = () => { const now = performance.now(); if (!active || document.pointerLockElement !== renderer.domElement || !weapon.canFire(now)) return; weapon.fired(now); shots++; recoil.kick(weapon.spec.recoil, weapon.spec.recoil * .55); muzzle.intensity = 5; setTimeout(() => muzzle.intensity = 0, 35); const origin = camera.position.clone(); const direction = new THREE.Vector3(); camera.getWorldDirection(direction); direction.x += (Math.random() - .5) * weapon.spec.spread; direction.y += (Math.random() - .5) * weapon.spec.spread; direction.normalize(); raycaster.set(origin, direction); const wall = wallDistance(origin, direction); const hit = bot ? raycaster.intersectObject(bot.group, true)[0] : undefined; const impact = hit && hit.distance < wall ? hit.point : origin.clone().addScaledVector(direction, Math.min(wall, 35)); tracer(origin, impact); if (online) network.send({ type: "shot", loadout: weapon.spec.id === "pistol" ? "sidearm" : "carbine", yaw: player.yaw, pitch: player.pitch }); else if (hit && hit.distance < wall) damageBot(hit.object.position.y > .9); else if (!online && wall < Infinity) playSound("impact"); playSound(({ frontier: "frontier-shot", modern: "modern-shot", pistol: "pistol-shot" } as const)[weapon.spec.sound]); updateHud(); };
  const input = new DesktopInput(renderer.domElement, (x, y) => player.look(x, y, settings.sensitivity), fire);
  const request = () => { if (active) renderer.domElement.requestPointerLock().catch(() => message.textContent = "POINTER LOCK WAS BLOCKED. CLICK AGAIN."); };
  const resize = () => { const bounds = host.getBoundingClientRect(); renderer.setSize(bounds.width, bounds.height, false); camera.aspect = bounds.width / bounds.height; camera.updateProjectionMatrix(); };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  paintCrosshair(reticle, settings.crosshair);
  const beginOnline = () => { active = false; lock.hidden = true; if (bot) { scene.remove(bot.group); bot = undefined; } online = true; };
   const reload = () => weapon.reload(() => { playSound("reload"); updateHud(); });
  const applySpawn = (value: { x: number; z: number; yaw: number; pitch: number; health: number }) => { camera.position.set(value.x * 8, 1.7, 1 - value.z * 12); player.yaw = value.yaw; player.pitch = value.pitch; player.velocity.set(0, 0, 0); player.health = value.health; receivedSpawn = true; };
  const handleNetwork = (event: ArenaNetworkEvent) => { if (event.type === "joined") { seat = event.seat; message.textContent = `ROOM ${event.room}. WAITING FOR RIVAL.`; } if (event.type === "state" && event.started && !active) start(true); if (event.type === "state" && active && seat) { const own = event.players[seat], other = event.players[seat === "host" ? "guest" : "host"]; if (!receivedSpawn) applySpawn(own); if (!remote) { remote = createFighter("#405e6a"); scene.add(remote); } remote.position.set(other.x * 8, 0, 1 - other.z * 12); player.health = own.health; updateHud(); } if (event.type === "shot") message.textContent = event.hit ? "HIT CONFIRMED" : "SHOT WIDE"; if (event.type === "respawn") { if (event.seat === seat) applySpawn(event.player); message.textContent = event.seat === seat ? "YOU RESPAWNED" : "RIVAL RESPAWNED"; } if (event.type === "result") { active = false; message.textContent = "ROUND COMPLETE"; onComplete({ won: event.winner === seat, accuracy: shots ? Math.round(hits / shots * 100) : 0, eliminations: kills }); } if (event.type === "error") message.textContent = event.message; };
  const onKeyDown = (event: KeyboardEvent) => { if (event.code === "KeyR") reload(); };
  const onLockChange = () => { pause.hidden = document.pointerLockElement === renderer.domElement || !active; lock.hidden = document.pointerLockElement === renderer.domElement; };
  document.querySelector("#arena-bot")?.addEventListener("click", () => start());
  document.querySelector("#arena-create")?.addEventListener("click", () => { beginOnline(); if (network.connect("create", "", handleNetwork)) message.textContent = "CREATING ROOM..."; });
  document.querySelector("#arena-join")?.addEventListener("click", () => { const code = document.querySelector<HTMLInputElement>("#arena-room-code")?.value.trim().toUpperCase() ?? ""; if (code.length === 6) { beginOnline(); if (network.connect("join", code, handleNetwork)) message.textContent = "JOINING ROOM..."; } });
   document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(button => button.addEventListener("click", () => { const id = button.dataset.arenaLoadout as WeaponId; const next = weapons[id]; if (online) { message.textContent = "LOADOUTS ARE AVAILABLE IN BOT TRAINING."; return; } if (!owned.has(id) && next.price > cash) { message.textContent = `NEED $${next.price - cash} MORE FOR ${next.name}.`; return; } if (!owned.has(id)) { cash -= next.price; owned.add(id); } weapon.select(id); camera.remove(gun); gun.traverse(item => { const mesh = item as THREE.Mesh; mesh.geometry?.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach(material => material.dispose()); else mesh.material?.dispose(); }); gun = createWeapon(camera, id); document.querySelectorAll("[data-arena-loadout]").forEach(item => item.setAttribute("aria-pressed", String(item === button))); message.textContent = `${next.name} EQUIPPED.`; updateHud(); }));
  document.querySelector("#arena-fire")?.addEventListener("click", fire);
  document.querySelector("#arena-reload")?.addEventListener("click", reload);
  document.querySelector("#arena-ads")?.addEventListener("click", () => aiming = !aiming);
  lock.addEventListener("click", request);
  renderer.domElement.addEventListener("click", request);
  renderer.domElement.addEventListener("contextmenu", event => { event.preventDefault(); aiming = !aiming; });
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("pointerlockchange", onLockChange);
  const sensitivity = document.querySelector<HTMLInputElement>("#fps-sensitivity");
  const color = document.querySelector<HTMLInputElement>("#cross-color");
  const size = document.querySelector<HTMLInputElement>("#cross-size");
  const quality = document.querySelector<HTMLSelectElement>("#graphics-quality");
  const pixelRatio = document.querySelector<HTMLInputElement>("#graphics-pixel-ratio");
  const shadows = document.querySelector<HTMLInputElement>("#graphics-shadows");
  const applyGraphics = () => { applyGraphicsSettings(renderer, settings.graphics); sun.castShadow = settings.graphics.shadows; resize(); saveSettings(settings); };
  if (sensitivity) { sensitivity.value = String(settings.sensitivity); sensitivity.oninput = () => { settings.sensitivity = Number(sensitivity.value); saveSettings(settings); }; }
  if (color) { color.value = settings.crosshair.color; color.oninput = () => { settings.crosshair.color = color.value; paintCrosshair(reticle, settings.crosshair); saveSettings(settings); }; }
  if (size) { size.value = String(settings.crosshair.size); size.oninput = () => { settings.crosshair.size = Number(size.value); paintCrosshair(reticle, settings.crosshair); saveSettings(settings); }; }
  if (quality) { quality.value = settings.graphics.quality; quality.onchange = () => { settings.graphics = { ...graphicsPresets[quality.value as GraphicsQuality] }; if (pixelRatio) pixelRatio.value = String(settings.graphics.pixelRatio); if (shadows) shadows.checked = settings.graphics.shadows; applyGraphics(); }; }
  if (pixelRatio) { pixelRatio.value = String(settings.graphics.pixelRatio); pixelRatio.oninput = () => { settings.graphics.pixelRatio = Number(pixelRatio.value); applyGraphics(); }; }
  if (shadows) { shadows.checked = settings.graphics.shadows; shadows.onchange = () => { settings.graphics.shadows = shadows.checked; applyGraphics(); }; }
  document.querySelector("#cross-share")?.addEventListener("click", () => navigator.clipboard?.writeText(crosshairCode(settings.crosshair)));
  document.querySelector<HTMLInputElement>("#cross-import")?.addEventListener("change", event => { const value = importCrosshair((event.target as HTMLInputElement).value); if (value) { settings.crosshair = value; paintCrosshair(reticle, value); saveSettings(settings); } });
  let raf = 0;
  const frame = (now: number) => { const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now; if (active) { player.update(dt, input); if (input.firing && weapon.spec.automatic) fire(); recoil.update(dt); gun.rotation.x = -recoil.pitch; gun.rotation.y = recoil.yaw; const targetFov = aiming ? 58 : settings.fov; camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 12); camera.updateProjectionMatrix(); if (bot) updateBot(bot, camera.position, now, dt, colliders, ironYardCoverPoints, (from, direction) => { raycaster.set(from, direction); const wall = wallDistance(from, direction); const body = camera.position.clone(); body.y -= .45; const toPlayer = body.sub(from); const alongRay = toPlayer.dot(direction); const miss = alongRay < 0 || body.sub(from.clone().addScaledVector(direction, alongRay)).length() > .48; tracer(from, from.clone().addScaledVector(direction, Math.min(wall, Math.max(0, alongRay)))); if (!miss && alongRay < wall) { player.health = Math.max(0, player.health - 12); message.textContent = "YOU WERE HIT"; if (!player.health) { player.health = 100; camera.position.set(-10, 1.7, 9); message.textContent = "RESPAWNED"; } updateHud(); } }); if (online && now - lastSync > 67) { lastSync = now; network.send({ type: "state", x: camera.position.x / 8, z: (1 - camera.position.z) / 12, yaw: player.yaw, pitch: player.pitch }); } } renderer.render(scene, camera); raf = requestAnimationFrame(frame); };
  raf = requestAnimationFrame(frame);
  start();
  stop = () => { cancelAnimationFrame(raf); network.close(); input.destroy(); observer.disconnect(); document.exitPointerLock?.(); document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerlockchange", onLockChange); renderer.dispose(); scene.traverse(object => { const mesh = object as THREE.Mesh; mesh.geometry?.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach(material => material.dispose()); else mesh.material?.dispose(); }); host.replaceChildren(); stop = undefined; };
  return stop;
}

export function unmountArena() { stop?.(); }
