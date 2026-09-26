import * as THREE from "three";
import { playSound } from "./audio";
import { resetBot, updateBot, type Bot } from "./bots";
import { paintCrosshair } from "./crosshair";
import { DesktopInput } from "./input";
import { arenaMaps, buildArenaMap, type ArenaMap, type ArenaMapId } from "./maps";
import { ArenaNetwork, arenaSocketUrl, type ArenaNetworkEvent } from "./networking";
import { FpsPlayer } from "./player";
import { Recoil } from "./recoil";
import { applyGraphicsSettings, createFighter, createRenderer, createWeapon, triggerFighterFire, triggerWeaponFire, updateFighter, updateWeaponViewModel } from "./rendering";
import { crosshairCode, defaultSettings, graphicsPresets, importCrosshair, loadSettings, saveSettings, type BindingAction, type GraphicsQuality } from "./settings";
import { weapons, WeaponState, type WeaponId } from "./weapons";
import { arenaView as arenaMenuView, updateArenaHud } from "./arena-ui";
import { defaultArenaConfig, TacticalRound, type ArenaConfig } from "./arena-state";

type ArenaResult = { won: boolean; accuracy: number; eliminations: number };
type ArenaPanel = "buy" | "loadout" | "settings" | "pause";
let stop: (() => void) | undefined;

export function arenaView() { return arenaMenuView(Boolean(arenaSocketUrl()), defaultArenaConfig); }

export function mountArena(_onComplete: (result: ArenaResult) => void) {
  stop?.();
  const arenaFrame = document.querySelector<HTMLElement>(".arena-frame"), host = document.querySelector<HTMLElement>("#arena-canvas"), message = document.querySelector<HTMLElement>("#arena-message"), lock = document.querySelector<HTMLButtonElement>("#arena-lock"), health = document.querySelector<HTMLElement>("#arena-health"), ammo = document.querySelector<HTMLElement>("#arena-ammo"), rival = document.querySelector<HTMLElement>("#arena-rival"), phase = document.querySelector<HTMLElement>("#arena-phase"), cash = document.querySelector<HTMLElement>("#arena-cash"), score = document.querySelector<HTMLElement>("#arena-score"), reticle = document.querySelector<HTMLElement>("#arena-crosshair"), pause = document.querySelector<HTMLElement>("#arena-pause"), feedback = document.querySelector<HTMLElement>("#arena-feedback"), buyCash = document.querySelector<HTMLElement>("#arena-buy-cash"), buyPhase = document.querySelector<HTMLElement>("#arena-buy-phase"), buyZone = document.querySelector<HTMLElement>("#arena-buy-zone"), buyRequirement = document.querySelector<HTMLElement>("#arena-buy-requirement"), fullscreen = document.querySelector<HTMLButtonElement>("#arena-fullscreen"), onlineStatus = document.querySelector<HTMLElement>("#arena-online-status"), copyRoom = document.querySelector<HTMLButtonElement>("#arena-copy-room"), shareRoom = document.querySelector<HTMLButtonElement>("#arena-share-room"), leaveRoom = document.querySelector<HTMLButtonElement>("#arena-leave");
  if (!arenaFrame || !host || !message || !lock || !health || !ammo || !rival || !phase || !cash || !score || !reticle || !pause || !feedback || !buyCash || !buyPhase || !buyZone || !buyRequirement || !fullscreen) return;

  const settings = loadSettings(), scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(settings.fov, 16 / 9, .05, 90), renderer = createRenderer(host, settings.graphics), colliders: THREE.Box3[] = [], initialMap = buildArenaMap(scene, "iron-yard"), player = new FpsPlayer(camera, colliders), weapon = new WeaponState(), recoil = new Recoil(), network = new ArenaNetwork(), tactical = new TacticalRound();
  colliders.push(...initialMap.colliders); camera.position.copy(initialMap.playerSpawn); scene.add(camera);
  const hemisphere = new THREE.HemisphereLight("#dce9ed", "#343334", 2), sun = new THREE.DirectionalLight("#ffe0bb", 3); sun.castShadow = settings.graphics.shadows; scene.add(hemisphere, sun);
  let gun = createWeapon(camera, weapon.spec.id), bots: Bot[] = [], remote: THREE.Group | undefined, seat: "host" | "guest" | undefined, online = false, active = false, aiming = false, shots = 0, hits = 0, kills = 0, onlineKills = 0, onlineDeaths = 0, currentRoom = "", lastSync = 0, lastFrame = performance.now(), config: ArenaConfig = { ...defaultArenaConfig }, openPanel: ArenaPanel | undefined, pausedAt = 0, binding: BindingAction | undefined;
  const owned = new Set<WeaponId>(["pistol"]);
  const raycaster = new THREE.Raycaster(), muzzle = new THREE.PointLight("#ffbd72", 0, 4); camera.add(muzzle);
  let activeMap: ArenaMap = initialMap;
  const applyAtmosphere = (map: ArenaMap) => {
    const atmosphere = map.atmosphere;
    scene.background = new THREE.Color(atmosphere.background); scene.fog = new THREE.Fog(atmosphere.fog, atmosphere.fogNear, atmosphere.fogFar);
    hemisphere.color.set(atmosphere.sky); hemisphere.groundColor.set(atmosphere.ground); sun.color.set(atmosphere.light); sun.position.set(...atmosphere.lightPosition); sun.intensity = atmosphere.lightIntensity;
  };
  const disposeMap = (map: ArenaMap) => {
    const materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
    map.group.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); } });
    materials.forEach(material => { Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); }); material.dispose(); }); textures.forEach(texture => texture.dispose()); scene.remove(map.group);
  };
  const setMap = (id: ArenaMapId) => {
    disposeMap(activeMap); activeMap = buildArenaMap(scene, id); colliders.splice(0, colliders.length, ...activeMap.colliders); applyAtmosphere(activeMap);
  };
  applyAtmosphere(activeMap);
  const inBuyZone = () => camera.position.distanceTo(activeMap.playerSpawn) < activeMap.buyRadius;
  const panels: Record<ArenaPanel, HTMLElement> = {
    buy: document.querySelector<HTMLElement>("#arena-buy-panel")!,
    loadout: document.querySelector<HTMLElement>("#arena-loadout-panel")!,
    settings: document.querySelector<HTMLElement>("#arena-settings-panel")!,
    pause: document.querySelector<HTMLElement>("#arena-pause-panel")!,
  };

  const updateActionPanels = (now = performance.now()) => {
    const canBuy = !online && tactical.canBuy(inBuyZone());
    buyCash.textContent = `CASH $${tactical.cash}`;
    buyPhase.textContent = online ? "ONLINE LOADOUT LOCKED" : tactical.phase === "buy" ? tactical.label(now) : "BUY CLOSED";
    buyZone.textContent = inBuyZone() ? "IN START ZONE" : "START ZONE REQUIRED";
    buyRequirement.textContent = online ? "Weapons are fixed for this match." : canBuy ? "Select a weapon to buy and equip it." : tactical.phase !== "buy" ? "Buying is available during the next buy phase." : "Return to the start zone to buy.";
    document.querySelectorAll<HTMLButtonElement>("[data-weapon]").forEach(button => {
      const id = button.dataset.weapon as WeaponId, spec = weapons[id], isOwned = owned.has(id), equipped = weapon.spec.id === id, purchasing = button.hasAttribute("data-arena-loadout");
      const state = equipped ? "EQUIPPED" : isOwned ? "OWNED · EQUIP" : purchasing ? spec.price > tactical.cash ? `NEED $${spec.price - tactical.cash}` : canBuy ? "BUY" : "LOCKED" : "NOT OWNED";
      button.querySelector("[data-weapon-state]")!.textContent = state;
      button.disabled = purchasing ? !isOwned && (!canBuy || spec.price > tactical.cash) : !isOwned;
      button.dataset.owned = String(isOwned);
      button.dataset.equipped = String(equipped);
    });
  };
  const updateHud = (now = performance.now()) => {
    updateArenaHud({ health, ammo, rival, phase, cash, score }, { health: player.health, ammo: weapon.reloading ? "RELOADING" : `${weapon.ammo} / ${weapon.reserve}`, rival: online ? "RIVAL LIVE" : `${bots.length} BOT${bots.length === 1 ? "" : "S"}`, phase: online ? "live" : tactical.phase, phaseLabel: online ? `ONLINE 1V1${currentRoom ? ` · ${currentRoom}` : ""}` : tactical.label(now), cash: tactical.cash, eliminations: online ? onlineKills : tactical.eliminations, deaths: online ? onlineDeaths : tactical.deaths });
    updateActionPanels(now);
  };
  const panelPausesRound = (panel: ArenaPanel) => !online && (panel === "settings" || panel === "pause");
  const resumeRoundTimer = () => {
    if (!pausedAt) return;
    tactical.endsAt += performance.now() - pausedAt;
    pausedAt = 0;
  };
  const closePanel = () => {
    if (!openPanel) return;
    if (panelPausesRound(openPanel)) resumeRoundTimer();
    panels[openPanel].hidden = true;
    openPanel = undefined;
    pause.hidden = document.pointerLockElement === renderer.domElement || !active;
    updateHud();
  };
  const showPanel = (panel: ArenaPanel) => {
    if (openPanel === panel) { closePanel(); return; }
    if (openPanel) {
      if (panelPausesRound(openPanel) && !panelPausesRound(panel)) resumeRoundTimer();
      panels[openPanel].hidden = true;
    }
    if (active && !pausedAt && panelPausesRound(panel)) pausedAt = performance.now();
    openPanel = panel;
    document.exitPointerLock?.();
    panels[panel].hidden = false;
    pause.hidden = true;
    updateHud();
  };
  const spawnBots = () => { bots.forEach(bot => scene.remove(bot.group)); bots = Array.from({ length: config.botCount }, (_, i) => { const group = createFighter(i ? "#405e6a" : "#6a4e47", i % 2 ? "character-f" : "character-a"), spawn = activeMap.botSpawns[i % activeMap.botSpawns.length]; group.position.copy(spawn); scene.add(group); const bot: Bot = { group, health: 100, velocity: new THREE.Vector3(), spawn: group.position.clone(), seed: 0x1a2b3c4d + i, lastSeen: group.position.clone(), nextDecision: 0, reactionUntil: 0, nextShot: 0, reloadUntil: 0, burstShots: 0, strafe: i % 2 ? -1 : 1 }; resetBot(bot, performance.now()); return bot; }); };
  const spawnInBuyZone = () => { camera.position.copy(activeMap.playerSpawn); player.velocity.set(0, 0, 0); player.health = 100; };
  const deploy = (isOnline = false, mapId: ArenaMapId = "iron-yard") => { setMap(mapId); online = isOnline; pausedAt = 0; if (online) { bots.forEach(bot => scene.remove(bot.group)); bots = []; remote?.removeFromParent(); remote = undefined; onlineKills = 0; onlineDeaths = 0; leaveRoom!.hidden = false; } else { spawnBots(); tactical.start(performance.now()); spawnInBuyZone(); leaveRoom!.hidden = true; } active = true; lock.hidden = false; document.querySelectorAll<HTMLButtonElement>("#arena-fire,#arena-reload,#arena-ads").forEach(button => button.disabled = false); message.textContent = online ? "RIVAL CONNECTED. IRON YARD IS THE ONLINE MAP. CLICK TO DEPLOY." : `${activeMap.name.toUpperCase()} BUY PHASE STARTED. PRESS B TO BUY WEAPONS.`; updateHud(); };
  const tracer = (from: THREE.Vector3, to: THREE.Vector3, color = "#ffd28a") => { const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color })); scene.add(line); window.setTimeout(() => { scene.remove(line); line.geometry.dispose(); (line.material as THREE.Material).dispose(); }, 90); };
  const wallDistance = (from: THREE.Vector3, direction: THREE.Vector3) => { let nearest = Infinity; for (const box of colliders) { const point = new THREE.Vector3(); if (raycaster.ray.set(from, direction).intersectBox(box, point)) nearest = Math.min(nearest, point.distanceTo(from)); } return nearest; };
  const hitFeedback = (text: string) => { feedback.textContent = text; window.setTimeout(() => { feedback.textContent = ""; }, 380); };
  const fire = () => { const now = performance.now(); if (!active || openPanel || document.pointerLockElement !== renderer.domElement || !weapon.canFire(now) || (!online && tactical.phase === "round-end")) return; weapon.fired(now); triggerWeaponFire(gun, now); shots++; recoil.kick(weapon.spec.recoil, weapon.spec.recoil * .55); muzzle.intensity = 5; window.setTimeout(() => muzzle.intensity = 0, 35); const origin = camera.position.clone(), direction = new THREE.Vector3(); camera.getWorldDirection(direction); direction.x += (Math.random() - .5) * weapon.spec.spread; direction.y += (Math.random() - .5) * weapon.spec.spread; direction.normalize(); raycaster.set(origin, direction); const wall = wallDistance(origin, direction), impacts = bots.flatMap(bot => { const hit = raycaster.intersectObject(bot.group, true)[0]; return hit && hit.distance < wall ? [{ bot, hit }] : []; }).sort((a, b) => a.hit.distance - b.hit.distance); const impact = impacts[0]?.hit.point ?? origin.clone().addScaledVector(direction, Math.min(wall, 35)); tracer(origin, impact); if (online) network.send({ type: "shot", loadout: weapon.spec.id === "pistol" ? "sidearm" : "carbine", yaw: player.yaw, pitch: player.pitch }); else if (impacts[0]) { const { bot, hit } = impacts[0], headshot = hit.point.y - bot.group.position.y > 1.35; bot.health -= headshot ? weapon.spec.headshot : weapon.spec.damage; hits++; hitFeedback(headshot ? "HEADSHOT" : "HIT"); playSound("impact"); if (bot.health <= 0) { kills++; tactical.elimination(); bot.health = 100; bot.group.position.copy(bot.spawn); resetBot(bot, now); message.textContent = "ELIMINATION. +$300. TARGET REDEPLOYED."; } } playSound(({ frontier: "frontier-shot", modern: "modern-shot", pistol: "pistol-shot" } as const)[weapon.spec.sound]); updateHud(now); };
  const input = new DesktopInput(renderer.domElement, (x, y) => player.look(x, y, settings.sensitivity), fire, () => aiming = !aiming, settings.bindings);
  const request = () => { if (active && !openPanel) renderer.domElement.requestPointerLock().catch(() => message.textContent = "POINTER LOCK WAS BLOCKED. CLICK AGAIN."); };
  const resize = () => { const bounds = host.getBoundingClientRect(); renderer.setSize(bounds.width, bounds.height, false); camera.aspect = bounds.width / bounds.height; camera.updateProjectionMatrix(); };
  const observer = new ResizeObserver(resize); observer.observe(host); resize(); paintCrosshair(reticle, settings.crosshair);
  const reload = () => {
    if (!active || openPanel || document.pointerLockElement !== renderer.domElement) return;
    const result = weapon.reload(() => { playSound("reload"); message.textContent = "RELOAD COMPLETE."; updateHud(); });
    if (result === "started") message.textContent = "RELOADING...";
    if (result === "reloading") message.textContent = "RELOAD IN PROGRESS.";
    if (result === "full") message.textContent = "MAGAZINE FULL.";
    if (result === "empty") message.textContent = "NO RESERVE AMMO.";
    updateHud();
  };
  const equip = (id: WeaponId) => { weapon.select(id); camera.remove(gun); gun = createWeapon(camera, id); message.textContent = `${weapons[id].name} EQUIPPED.`; updateHud(); };
  const buy = (id: WeaponId) => { if (!owned.has(id)) { const notice = tactical.buy(id, weapons[id].price, owned, inBuyZone()); if (notice) { message.textContent = notice; updateHud(); return; } message.textContent = `${weapons[id].name} PURCHASED.`; } equip(id); };
  const applySpawn = (value: { x: number; z: number; yaw: number; pitch: number; health: number }) => { camera.position.set(value.x * 8, 1.7, 1 - value.z * 12); player.yaw = value.yaw; player.pitch = value.pitch; player.velocity.set(0, 0, 0); player.health = value.health; };
  const setOnlineStatus = (text: string) => { if (onlineStatus) onlineStatus.textContent = text; };
  const updateRoomSharing = () => {
    if (copyRoom) copyRoom.disabled = !currentRoom;
    if (shareRoom) shareRoom.hidden = !currentRoom || !navigator.share;
  };
  const handleNetwork = (event: ArenaNetworkEvent) => {
    if (event.type === "connection") {
      if (event.status === "connecting") setOnlineStatus("CONNECTING TO THE PRIVATE 1V1 SERVER...");
      if (event.status === "connected") setOnlineStatus("CONNECTED. CONFIRMING YOUR ROOM...");
      if (event.status === "reconnecting") { active = false; document.exitPointerLock?.(); message.textContent = "CONNECTION DROPPED. RECONNECTING TO YOUR RESERVED SEAT..."; setOnlineStatus("RECONNECTING. YOUR SEAT IS RESERVED FOR 30 SECONDS."); }
      if (event.status === "closed") { active = false; document.exitPointerLock?.(); message.textContent = "CONNECTION CLOSED. CREATE OR JOIN A ROOM TO TRY AGAIN."; setOnlineStatus("CONNECTION CLOSED. THE PRIVATE SERVER MAY BE UNAVAILABLE."); }
      return;
    }
    if (event.type === "joined") { seat = event.seat; currentRoom = event.room; updateRoomSharing(); message.textContent = `ROOM ${event.room}. WAITING FOR RIVAL.`; setOnlineStatus(event.seat === "host" ? `ROOM ${event.room} CREATED. SHARE THE CODE; PLAY STARTS AUTOMATICALLY WHEN THEY JOIN.` : `JOINED ROOM ${event.room}. WAITING FOR THE HOST TO START.`); return; }
    if (event.type === "state" && !event.started) { if (seat) setOnlineStatus(`ROOM ${currentRoom}. WAITING FOR THE OTHER PLAYER.`); return; }
    if (event.type === "state" && event.started && !active) deploy(true);
    if (event.type === "state" && active && seat) {
      const own = event.players[seat], other = event.players[seat === "host" ? "guest" : "host"];
      if (!remote) { remote = createFighter("#405e6a", "character-k"); scene.add(remote); applySpawn(own); }
      remote.position.lerp(new THREE.Vector3(other.x * 8, 0, 1 - other.z * 12), .35);
      remote.rotation.y = other.yaw + Math.PI;
      player.health = own.health; onlineKills = own.kills; onlineDeaths = own.deaths;
      setOnlineStatus(`ROOM ${currentRoom}. LIVE: ${own.kills} ELIMS / ${own.deaths} DEATHS.`);
      updateHud();
      return;
    }
    if (event.type === "shot") { if (event.seat !== seat && remote) triggerFighterFire(remote, performance.now()); hitFeedback(event.hit ? "HIT CONFIRMED" : "SHOT WIDE"); return; }
    if (event.type === "elimination") { hitFeedback(event.killer === seat ? "ELIMINATION" : "YOU WERE ELIMINATED"); message.textContent = event.killer === seat ? "ELIMINATION CONFIRMED." : "YOU WERE ELIMINATED. RESPAWNING."; return; }
    if (event.type === "respawn") { if (event.seat === seat) applySpawn(event.player); message.textContent = event.seat === seat ? "YOU RESPAWNED" : "RIVAL RESPAWNED"; return; }
    if (event.type === "opponent-left") { active = false; document.exitPointerLock?.(); message.textContent = event.reconnecting ? "RIVAL DISCONNECTED. THEIR SEAT IS HELD FOR 30 SECONDS." : "RIVAL LEFT THE PRIVATE ROOM."; setOnlineStatus(event.reconnecting ? "RIVAL DISCONNECTED. WAITING FOR THEIR RECONNECT." : "RIVAL LEFT. CREATE A NEW ROOM OR RETURN TO SITE."); return; }
    if (event.type === "error") { message.textContent = event.message; setOnlineStatus(event.message); }
  };
  let suppressPauseForFullscreenExit = false;
  const onLockChange = () => { const locked = document.pointerLockElement === renderer.domElement; pause.hidden = locked || !active || Boolean(openPanel) || suppressPauseForFullscreenExit; lock.hidden = locked; };
  const syncSettingsControls = () => {
    const sensitivity = document.querySelector<HTMLInputElement>("#fps-sensitivity"), sensitivityValue = document.querySelector<HTMLOutputElement>("#fps-sensitivity-value"), color = document.querySelector<HTMLInputElement>("#cross-color"), size = document.querySelector<HTMLInputElement>("#cross-size"), quality = document.querySelector<HTMLSelectElement>("#graphics-quality"), pixelRatio = document.querySelector<HTMLInputElement>("#graphics-pixel-ratio"), shadows = document.querySelector<HTMLInputElement>("#graphics-shadows");
    if (sensitivity) sensitivity.value = String(settings.sensitivity); if (sensitivityValue) sensitivityValue.value = settings.sensitivity.toFixed(4); if (color) color.value = settings.crosshair.color; if (size) size.value = String(settings.crosshair.size); if (quality) quality.value = settings.graphics.quality; if (pixelRatio) pixelRatio.value = String(settings.graphics.pixelRatio); if (shadows) shadows.checked = settings.graphics.shadows;
    document.querySelectorAll<HTMLButtonElement>("[data-bind]").forEach(button => { const action = button.dataset.bind as BindingAction; button.querySelector("b")!.textContent = settings.bindings[action].replace("Key", ""); });
  };
  const graphics = () => { applyGraphicsSettings(renderer, settings.graphics); sun.castShadow = settings.graphics.shadows; resize(); saveSettings(settings); };
  const sensitivity = document.querySelector<HTMLInputElement>("#fps-sensitivity"), sensitivityValue = document.querySelector<HTMLOutputElement>("#fps-sensitivity-value"), color = document.querySelector<HTMLInputElement>("#cross-color"), size = document.querySelector<HTMLInputElement>("#cross-size"), quality = document.querySelector<HTMLSelectElement>("#graphics-quality"), pixelRatio = document.querySelector<HTMLInputElement>("#graphics-pixel-ratio"), shadows = document.querySelector<HTMLInputElement>("#graphics-shadows");
  if (sensitivity) sensitivity.oninput = () => { settings.sensitivity = Number(sensitivity.value); if (sensitivityValue) sensitivityValue.value = settings.sensitivity.toFixed(4); saveSettings(settings); };
  if (color) color.oninput = () => { settings.crosshair.color = color.value; paintCrosshair(reticle, settings.crosshair); saveSettings(settings); };
  if (size) size.oninput = () => { settings.crosshair.size = Number(size.value); paintCrosshair(reticle, settings.crosshair); saveSettings(settings); };
  if (quality) quality.onchange = () => { settings.graphics = { ...graphicsPresets[quality.value as GraphicsQuality] }; graphics(); };
  if (pixelRatio) pixelRatio.oninput = () => { settings.graphics.pixelRatio = Number(pixelRatio.value); graphics(); };
  if (shadows) shadows.onchange = () => { settings.graphics.shadows = shadows.checked; graphics(); };
  document.querySelector("#settings-reset")?.addEventListener("click", () => { const defaults = structuredClone(defaultSettings); settings.sensitivity = defaults.sensitivity; settings.fov = defaults.fov; Object.assign(settings.crosshair, defaults.crosshair); Object.assign(settings.graphics, defaults.graphics); Object.assign(settings.bindings, defaults.bindings); paintCrosshair(reticle, settings.crosshair); graphics(); syncSettingsControls(); document.querySelector("#binding-notice")!.textContent = "DEFAULT SETTINGS RESTORED."; });
  document.querySelector("#cross-share")?.addEventListener("click", () => navigator.clipboard?.writeText(crosshairCode(settings.crosshair)));
  document.querySelector<HTMLInputElement>("#cross-import")?.addEventListener("change", event => { const value = importCrosshair((event.target as HTMLInputElement).value); if (value) { settings.crosshair = value; paintCrosshair(reticle, value); saveSettings(settings); syncSettingsControls(); } });
  syncSettingsControls(); updateHud();
  document.querySelector("#arena-bot")?.addEventListener("click", () => { config = { difficulty: document.querySelector<HTMLSelectElement>("#arena-difficulty")?.value as ArenaConfig["difficulty"] ?? "standard", botCount: Number(document.querySelector<HTMLSelectElement>("#arena-bot-count")?.value ?? 1) as ArenaConfig["botCount"] }; const selectedMap = document.querySelector<HTMLSelectElement>("#arena-map")?.value as ArenaMapId; deploy(false, arenaMaps[selectedMap] ? selectedMap : "iron-yard"); });
  document.querySelector("#arena-create")?.addEventListener("click", () => { if (network.connect("create", "", handleNetwork)) { currentRoom = ""; updateRoomSharing(); message.textContent = "CREATING PRIVATE ROOM..."; } });
  document.querySelector("#arena-join")?.addEventListener("click", () => { const code = document.querySelector<HTMLInputElement>("#arena-room-code")?.value.trim().toUpperCase() ?? ""; if (!/^[A-Z0-9]{6}$/.test(code)) { setOnlineStatus("ENTER THE SIX-CHARACTER ROOM CODE."); return; } if (network.connect("join", code, handleNetwork)) { currentRoom = ""; updateRoomSharing(); message.textContent = "JOINING PRIVATE ROOM..."; } });
  copyRoom?.addEventListener("click", () => { if (!currentRoom || !navigator.clipboard) return; void navigator.clipboard.writeText(currentRoom).then(() => setOnlineStatus(`ROOM CODE ${currentRoom} COPIED.`)).catch(() => setOnlineStatus("THE BROWSER COULD NOT COPY THE ROOM CODE.")); });
  shareRoom?.addEventListener("click", () => { if (!currentRoom || !navigator.share) return; void navigator.share({ title: "High Noon Showdown: Iron Yard", text: `Join my Iron Yard private 1v1 room: ${currentRoom}` }).catch(() => undefined); });
  leaveRoom?.addEventListener("click", () => { network.close(); active = false; online = false; currentRoom = ""; remote?.removeFromParent(); remote = undefined; leaveRoom.hidden = true; updateRoomSharing(); document.exitPointerLock?.(); message.textContent = "YOU LEFT THE PRIVATE ROOM."; setOnlineStatus("YOU LEFT THE PRIVATE ROOM. CREATE OR JOIN ANOTHER CODE."); updateHud(); });
  document.querySelectorAll<HTMLButtonElement>("[data-arena-panel]").forEach(button => button.addEventListener("click", () => showPanel(button.dataset.arenaPanel as ArenaPanel)));
  document.querySelectorAll<HTMLButtonElement>("[data-arena-close]").forEach(button => button.addEventListener("click", closePanel));
  document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(button => button.addEventListener("click", () => buy(button.dataset.arenaLoadout as WeaponId)));
  document.querySelectorAll<HTMLButtonElement>("[data-arena-equip]").forEach(button => button.addEventListener("click", () => { const id = button.dataset.arenaEquip as WeaponId; if (owned.has(id)) equip(id); }));
  document.querySelector("#arena-return-panel")?.addEventListener("click", () => document.querySelector<HTMLButtonElement>("#arena-return")?.click());
  const updateFullscreen = () => { const isFullscreen = document.fullscreenElement === arenaFrame; fullscreen.textContent = isFullscreen ? "EXIT FULL SCREEN (F)" : "FULL SCREEN (F)"; fullscreen.setAttribute("aria-pressed", String(isFullscreen)); if (!isFullscreen && suppressPauseForFullscreenExit) { pause.hidden = true; window.setTimeout(() => suppressPauseForFullscreenExit = false, 0); } };
  const toggleFullscreen = () => {
    if (document.fullscreenElement === arenaFrame) void document.exitFullscreen().catch(() => undefined);
    else if (!document.fullscreenElement && document.fullscreenEnabled) void arenaFrame.requestFullscreen().catch(() => message.textContent = "FULLSCREEN WAS BLOCKED BY THE BROWSER.");
  };
  fullscreen.addEventListener("click", toggleFullscreen); document.addEventListener("fullscreenchange", updateFullscreen); updateFullscreen();
  lock.addEventListener("click", request); renderer.domElement.addEventListener("click", request); renderer.domElement.addEventListener("contextmenu", event => event.preventDefault());
  const onKeyDown = (event: KeyboardEvent) => {
    if (binding) { const conflict = Object.entries(settings.bindings).find(([action, key]) => action !== binding && key === event.code); if (conflict) document.querySelector("#binding-notice")!.textContent = `${event.code.replace("Key", "")} IS ALREADY ${conflict[0].toUpperCase()}.`; else { settings.bindings[binding] = event.code; saveSettings(settings); syncSettingsControls(); document.querySelector("#binding-notice")!.textContent = "BINDING SAVED."; } binding = undefined; event.preventDefault(); return; }
    if (event.code === "Escape") { if (document.fullscreenElement === arenaFrame) { suppressPauseForFullscreenExit = true; void document.exitFullscreen().catch(() => suppressPauseForFullscreenExit = false); event.preventDefault(); return; } if (document.pointerLockElement === renderer.domElement) showPanel("pause"); else closePanel(); event.preventDefault(); return; }
    if (event.code === "KeyB" && !event.repeat) { showPanel("buy"); event.preventDefault(); return; }
    if (event.code === "KeyF" && !event.repeat) { toggleFullscreen(); event.preventDefault(); return; }
    if (!event.repeat && event.code === settings.bindings.reload && active && document.pointerLockElement === renderer.domElement) reload();
  };
  document.querySelectorAll<HTMLButtonElement>("[data-bind]").forEach(button => button.addEventListener("click", () => { binding = button.dataset.bind as BindingAction; document.querySelector("#binding-notice")!.textContent = `PRESS A KEY FOR ${binding.toUpperCase()}.`; }));
  document.addEventListener("keydown", onKeyDown); document.addEventListener("pointerlockchange", onLockChange);
  let raf = 0;
  const frame = (now: number) => {
    const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now;
    if (active && !online && !pausedAt) {
      const phaseChange = tactical.tick(now);
      if (phaseChange === "live") message.textContent = "LIVE ROUND STARTED.";
      if (phaseChange === "round-end") message.textContent = "ROUND COMPLETE. BUY STARTS SOON.";
      if (phaseChange === "buy") { spawnInBuyZone(); message.textContent = "BUY PHASE STARTED. PRESS B TO BUY WEAPONS."; }
    }
    if (active && openPanel && !pausedAt) updateHud(now);
    if (active && !openPanel) {
      if (document.pointerLockElement === renderer.domElement) player.update(dt, input);
      if (input.firing && weapon.spec.automatic) fire();
      recoil.update(dt); gun.rotation.x = -recoil.pitch; gun.rotation.y = recoil.yaw;
      updateWeaponViewModel(gun, now, player.velocity.length(), aiming, weapon.reloadProgress(now));
      const targetFov = aiming ? 58 : settings.fov; camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 12); camera.updateProjectionMatrix();
      const botDifficulty = config.difficulty === "rookie" ? "easy" : config.difficulty === "veteran" ? "hard" : "normal";
      bots.forEach(bot => updateBot(bot, camera.position, now, dt, colliders, activeMap.coverPoints, (from, direction) => {
        if (tactical.phase !== "live") return;
        triggerFighterFire(bot.group, now);
        const body = camera.position.clone(); body.y -= .45;
        const along = body.clone().sub(from).dot(direction), wall = wallDistance(from, direction);
        const closest = from.clone().addScaledVector(direction, Math.max(0, along));
        const hit = along > 0 && along < wall && closest.distanceTo(body) < .55;
        tracer(from, hit ? body : from.clone().addScaledVector(direction, Math.min(wall, 28)), "#ff6957");
        playSound("modern-shot");
        if (hit) {
          player.health = Math.max(0, player.health - 12); hitFeedback("BOT HIT");
          if (!player.health) { tactical.death(); spawnInBuyZone(); message.textContent = "RESPAWNED. -$300."; }
        }
      }, botDifficulty));
      bots.forEach(bot => updateFighter(bot.group, dt, now));
      if (remote) updateFighter(remote, dt, now);
      if (online && now - lastSync > 67) { lastSync = now; network.send({ type: "state", x: camera.position.x / 8, z: (1 - camera.position.z) / 12, yaw: player.yaw, pitch: player.pitch }); }
      updateHud(now);
    }
    renderer.render(scene, camera); raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  stop = () => { cancelAnimationFrame(raf); weapon.cancelReload(); network.close(); input.destroy(); observer.disconnect(); document.exitPointerLock?.(); document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerlockchange", onLockChange); document.removeEventListener("fullscreenchange", updateFullscreen); disposeMap(activeMap); renderer.dispose(); host.replaceChildren(); stop = undefined; };
  return stop;
}

export function unmountArena() { stop?.(); }
