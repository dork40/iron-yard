import * as THREE from "three";
import { playSound } from "./audio";

type ArenaResult = { won: boolean; accuracy: number; eliminations: number };
type Seat = "host" | "guest";
type Player = { x: number; z: number; yaw: number; pitch: number; health: number };
type ServerMessage =
  | { type: "joined"; room: string; seat: Seat }
  | { type: "state"; started: boolean; players: Record<Seat, Player> }
  | { type: "shot"; seat: Seat; hit: boolean; health: number }
  | { type: "result"; winner: Seat }
  | { type: "opponent-left" }
  | { type: "error"; message: string };

let stop: (() => void) | undefined;

function arenaUrl() {
  const configured = import.meta.env.VITE_ARENA_SERVER_URL?.trim();
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    url.protocol = url.protocol === "https:" ? "wss:" : url.protocol === "http:" ? "ws:" : url.protocol;
    if (url.protocol !== "ws:" && url.protocol !== "wss:") return undefined;
    url.pathname = `${url.pathname.replace(/\/$/, "")}/v1/arena`.replace(/\/v1\/arena\/v1\/arena$/, "/v1/arena");
    return url.toString();
  } catch { return undefined; }
}

export function arenaView() {
  const configured = Boolean(arenaUrl());
  return `<section class="arena-game"><div class="arena-heading"><p class="eyebrow">LIVE 1V1 ARENA · REAL-TIME 3D</p><h1>IRON YARD</h1><p>A close-quarters duel in a textured WebGL arena. Create a room or join a friend.</p></div><div class="arena-lobby"><p id="arena-connection" aria-live="polite">${configured ? "CREATE A ROOM OR JOIN A FRIEND" : "ARENA SERVER URL REQUIRED"}</p>${configured ? `<div><button id="arena-create" class="primary">CREATE ROOM</button><label>ROOM CODE <input id="arena-room-code" maxlength="6" autocomplete="off" /></label><button id="arena-join" class="outline">JOIN ROOM</button></div>` : `<p>Add <code>VITE_ARENA_SERVER_URL</code> to the Vite build environment and redeploy.</p>`}</div><div class="arena-loadout" aria-label="Choose loadout"><button class="outline" data-arena-loadout="sidearm" aria-pressed="true"><b>RANGER SIDEARM</b><span>6 rounds · heavy hit</span></button><button class="outline" data-arena-loadout="carbine" aria-pressed="false"><b>BRUSH CARBINE</b><span>12 rounds · rapid fire</span></button></div><div class="arena-frame"><div id="arena-canvas" aria-label="Iron Yard first-person 3D arena"></div><button id="arena-lock" class="arena-lock" type="button">CLICK TO ENTER ARENA</button><div class="arena-reticle" aria-hidden="true"><i></i><b></b></div><div class="arena-status"><span id="arena-health">ARMOR 100</span><span id="arena-ammo">6 / 24</span><span id="arena-rival">RIVAL --</span></div><div id="arena-message" class="arena-message">JOIN A ROOM TO ENGAGE</div></div><div class="arena-controls"><button id="arena-fire" class="primary" disabled>FIRE</button><button id="arena-reload" class="outline" disabled>RELOAD</button></div><p class="trace-hint">CLICK ARENA TO LOCK MOUSE · WASD MOVE · MOUSE AIM · CLICK OR FIRE TO SHOOT · R RELOAD · ESC RELEASES MOUSE</p><p class="arena-local-note">REAL-TIME 1V1: server-validated rooms, player states, and hits.</p></section>`;
}

export function mountArena(onComplete: (result: ArenaResult) => void) {
  stop?.();
  const host = document.querySelector<HTMLElement>("#arena-canvas");
  const health = document.querySelector<HTMLElement>("#arena-health");
  const ammo = document.querySelector<HTMLElement>("#arena-ammo");
  const rival = document.querySelector<HTMLElement>("#arena-rival");
  const message = document.querySelector<HTMLElement>("#arena-message");
  const fireButton = document.querySelector<HTMLButtonElement>("#arena-fire");
  const reloadButton = document.querySelector<HTMLButtonElement>("#arena-reload");
  const lockButton = document.querySelector<HTMLButtonElement>("#arena-lock");
  if (!host || !health || !ammo || !rival || !message || !fireButton || !reloadButton || !lockButton) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#8999a1");
  scene.fog = new THREE.Fog("#8999a1", 20, 62);
  const camera = new THREE.PerspectiveCamera(78, 16 / 9, .08, 90);
  camera.position.set(-4, 1.72, 7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.replaceChildren(renderer.domElement);

  const texture = (base: string, seam: string, kind: "brick" | "concrete" | "floor") => {
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d")!; ctx.fillStyle = base; ctx.fillRect(0, 0, 512, 512);
    if (kind === "brick") {
      ctx.strokeStyle = seam; ctx.lineWidth = 5;
      for (let y = 0; y <= 512; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke(); }
      for (let row = 0; row < 8; row++) for (let x = row % 2 ? -32 : 0; x < 512; x += 128) { ctx.beginPath(); ctx.moveTo(x, row * 64); ctx.lineTo(x, row * 64 + 64); ctx.stroke(); }
    } else if (kind === "floor") {
      ctx.strokeStyle = seam; ctx.lineWidth = 3;
      for (let x = 0; x < 512; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke(); }
      for (let y = 0; y < 512; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke(); }
    }
    let seed = 37;
    for (let i = 0; i < 4200; i++) { seed = (seed * 16807) % 2147483647; const x = seed % 512; seed = (seed * 16807) % 2147483647; const y = seed % 512; const alpha = .025 + (seed % 10) / 220; ctx.fillStyle = (seed & 1) ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`; ctx.fillRect(x, y, 1 + (seed % 3), 1 + (seed % 3)); }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = renderer.capabilities.getMaxAnisotropy(); return map;
  };
  const brick = texture("#826d5d", "#52493f", "brick"); brick.repeat.set(3, 2);
  const concrete = texture("#62686b", "#4e5457", "concrete");
  const floorMap = texture("#595950", "#373a37", "floor"); floorMap.repeat.set(14, 14);
  scene.add(new THREE.HemisphereLight("#d9e8ef", "#3a332c", 2.1));
  const sun = new THREE.DirectionalLight("#ffe3bd", 3.1); sun.position.set(-9, 15, 5); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); scene.add(sun);
  const fill = new THREE.PointLight("#c58a5d", 26, 20); fill.position.set(0, 5, -5); scene.add(fill);
  const mat = (map: THREE.Texture, color = "#ffffff", roughness = .88) => new THREE.MeshStandardMaterial({ map, color, roughness });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 42), mat(floorMap)); floor.rotation.x = -Math.PI / 2; floor.position.set(0, -.08, -5); floor.receiveShadow = true; scene.add(floor);
  const addBox = (x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material, cast = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); mesh.position.set(x, y, z); mesh.castShadow = cast; mesh.receiveShadow = true; scene.add(mesh); return mesh;
  };
  addBox(0, 2, -25, 34, 4, 1, mat(brick)); addBox(-17, 2, -5, 1, 4, 40, mat(brick)); addBox(17, 2, -5, 1, 4, 40, mat(brick)); addBox(0, 2, 15, 34, 4, 1, mat(brick));
  const cover = mat(concrete, "#c0b8a7");
  addBox(-9, .8, -8, 4.5, 1.6, 2.5, cover); addBox(8, .8, -1, 4.2, 1.6, 2.6, cover);
  addBox(-4, 1.1, 1, 2.8, 2.2, 2.8, cover); addBox(4.2, 1.1, -10, 2.8, 2.2, 2.8, cover);
  addBox(0, .65, -6, 5.4, 1.3, 1.4, cover); addBox(0, 1.15, -15, 6.5, 2.3, 1.2, mat(brick));
  const lampMat = new THREE.MeshStandardMaterial({ color: "#ffce8a", emissive: "#ff9b45", emissiveIntensity: 3 });
  for (const x of [-13, 13]) { addBox(x, 3.75, -4, .15, .1, .8, lampMat, false); const light = new THREE.PointLight("#ffad65", 15, 12); light.position.set(x, 3.4, -4); scene.add(light); }

  const opponent = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(.33, .8, 5, 8), new THREE.MeshStandardMaterial({ color: "#344750", roughness: .85 })); body.position.y = .88; body.castShadow = true; opponent.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(.22, 12, 8), new THREE.MeshStandardMaterial({ color: "#c89470", roughness: .9 })); head.position.y = 1.58; head.castShadow = true; opponent.add(head); scene.add(opponent);
  const weapon = new THREE.Group();
  const gunMat = new THREE.MeshStandardMaterial({ color: "#222b30", metalness: .72, roughness: .3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: "#644c3b", roughness: .8 });
  const receiver = new THREE.Mesh(new THREE.BoxGeometry(.16, .16, .52), gunMat); receiver.position.set(.32, -.24, -.55); weapon.add(receiver);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.038, .045, .43, 10), gunMat); barrel.rotation.x = Math.PI / 2; barrel.position.set(.32, -.2, -.94); weapon.add(barrel);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(.11, .22, .13), gripMat); grip.position.set(.31, -.4, -.45); grip.rotation.x = -.15; weapon.add(grip);
  const sight = new THREE.Mesh(new THREE.BoxGeometry(.045, .055, .1), gunMat); sight.position.set(.32, -.14, -.65); weapon.add(sight); camera.add(weapon); scene.add(camera);
  const flash = new THREE.PointLight("#ffb86a", 0, 3); camera.add(flash);

  let socket: WebSocket | undefined; let seat: Seat | undefined; let remote: Player | undefined;
  let local = { x: -.18, z: .6, yaw: 0, pitch: 0, health: 100 };
  let bullets = 6; let reserve = 24; let loadout: "sidearm" | "carbine" = "sidearm"; let shots = 0; let hits = 0;
  let recoil = 0; let reloading = false; let active = false; let lastShotAt = 0; let lastFrame = performance.now(); let lastSync = 0; let connected = false;
  const keys = new Set<string>(); const clock = new THREE.Clock();
  const magazine = () => loadout === "sidearm" ? 6 : 12;
  const updateHud = () => { health.textContent = `ARMOR ${Math.max(0, Math.ceil(local.health))}`; ammo.textContent = reloading ? "RELOADING" : `${bullets} / ${reserve}`; rival.textContent = `RIVAL ${remote ? Math.ceil(remote.health) : "--"}`; fireButton.disabled = !active; reloadButton.disabled = !active; };
  const finish = (won: boolean, text: string) => { if (!active) return; active = false; document.exitPointerLock?.(); message.textContent = text; updateHud(); onComplete({ won, accuracy: shots ? Math.round(hits / shots * 100) : 0, eliminations: won ? 1 : 0 }); };
  const resize = () => { const bounds = host.getBoundingClientRect(); if (!bounds.width || !bounds.height) return; renderer.setSize(bounds.width, bounds.height, false); camera.aspect = bounds.width / bounds.height; camera.updateProjectionMatrix(); };
  const syncPosition = () => { camera.position.set(local.x * 8, 1.72, 1 - local.z * 12); };
  const reload = () => { if (!active || reloading || bullets === magazine() || reserve === 0) return; reloading = true; updateHud(); playSound("click"); window.setTimeout(() => { if (!active) return; const loaded = Math.min(magazine() - bullets, reserve); bullets += loaded; reserve -= loaded; reloading = false; updateHud(); }, loadout === "sidearm" ? 850 : 1100); };
  const shoot = () => { if (!active || !connected || reloading || performance.now() - lastShotAt < (loadout === "sidearm" ? 230 : 105)) return; if (!bullets) return reload(); lastShotAt = performance.now(); bullets--; shots++; recoil = Math.min(.12, recoil + .045); weapon.position.y = -.04; flash.intensity = 5; window.setTimeout(() => { flash.intensity = 0; }, 45); socket?.send(JSON.stringify({ type: "shot", loadout, yaw: local.yaw, pitch: local.pitch })); playSound("shot"); updateHud(); };
  const pointerMove = (event: MouseEvent) => { if (document.pointerLockElement !== renderer.domElement) return; local.yaw -= event.movementX * .0022; local.pitch = THREE.MathUtils.clamp(local.pitch - event.movementY * .002, -1.2, 1.2); };
  const pointerClick = () => { if (active && connected && document.pointerLockElement !== renderer.domElement) void renderer.domElement.requestPointerLock(); };
  const connect = (kind: "create" | "join") => {
    const url = arenaUrl(); if (!url) return;
    const code = document.querySelector<HTMLInputElement>("#arena-room-code")?.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "") ?? "";
    if (kind === "join" && code.length !== 6) { message.textContent = "ENTER A SIX-CHARACTER ROOM CODE"; return; }
    socket?.close(); message.textContent = "CONNECTING TO ARENA..."; connected = false; active = false;
    socket = new WebSocket(url);
    socket.onopen = () => socket?.send(JSON.stringify(kind === "create" ? { type: "create" } : { type: "join", room: code }));
    socket.onmessage = event => {
      let data: ServerMessage; try { data = JSON.parse(event.data) as ServerMessage; } catch { return; }
      if (data.type === "joined") { seat = data.seat; message.textContent = data.seat === "host" ? `ROOM ${data.room} CREATED. WAITING FOR RIVAL.` : `JOINED ROOM ${data.room}. WAITING FOR BELL.`; }
      if (data.type === "state") { if (!seat) return; const own = data.players[seat]; remote = data.players[seat === "host" ? "guest" : "host"]; local.health = own.health; if (!active) { local.x = own.x; local.z = own.z; local.yaw = own.yaw; local.pitch = own.pitch; syncPosition(); } if (data.started && !active) { connected = true; active = true; lockButton.hidden = false; message.textContent = "RIVAL CONNECTED. CLICK THE ARENA, THEN MOVE."; } updateHud(); }
      if (data.type === "shot") { if (data.seat === seat && data.hit) { hits++; message.textContent = "HIT CONFIRMED"; playSound("bottle"); } else if (data.seat !== seat && data.hit) { message.textContent = "INCOMING FIRE"; playSound("negative"); } else if (data.seat === seat) message.textContent = "SHOT WIDE"; }
      if (data.type === "result" && seat) finish(data.winner === seat, data.winner === seat ? "YARD SECURED" : "YARD LOST");
      if (data.type === "opponent-left") finish(false, "RIVAL DISCONNECTED");
      if (data.type === "error") message.textContent = data.message.toUpperCase();
    };
    socket.onclose = () => { connected = false; if (active) finish(false, "ARENA CONNECTION LOST"); else message.textContent = "ARENA CONNECTION CLOSED"; };
    socket.onerror = () => { message.textContent = "ARENA CONNECTION FAILED"; };
  };
  const onKeyDown = (event: KeyboardEvent) => { if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyR", "Space"].includes(event.code) && active) event.preventDefault(); if (event.code === "KeyR") reload(); else if (event.code === "Space" && !event.repeat) shoot(); else keys.add(event.code); };
  const onKeyUp = (event: KeyboardEvent) => keys.delete(event.code);
  const onBlur = () => keys.clear();
  const onLockChange = () => { lockButton.hidden = document.pointerLockElement === renderer.domElement; };
  document.querySelector("#arena-create")?.addEventListener("click", () => connect("create"));
  document.querySelector("#arena-join")?.addEventListener("click", () => connect("join"));
  document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(button => button.addEventListener("click", () => { if (shots || reloading) return; loadout = button.dataset.arenaLoadout === "carbine" ? "carbine" : "sidearm"; bullets = magazine(); reserve = loadout === "sidearm" ? 24 : 36; document.querySelectorAll<HTMLButtonElement>("[data-arena-loadout]").forEach(option => option.setAttribute("aria-pressed", String(option === button))); updateHud(); }));
  lockButton.addEventListener("click", pointerClick); renderer.domElement.addEventListener("click", () => { if (active && document.pointerLockElement !== renderer.domElement) void renderer.domElement.requestPointerLock(); else shoot(); });
  renderer.domElement.addEventListener("mousemove", pointerMove); fireButton.addEventListener("click", shoot); reloadButton.addEventListener("click", reload);
  document.addEventListener("keydown", onKeyDown); document.addEventListener("keyup", onKeyUp); document.addEventListener("pointerlockchange", onLockChange); window.addEventListener("blur", onBlur);
  const observer = new ResizeObserver(resize); observer.observe(host); resize(); updateHud();

  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now;
    if (active) {
      const forward = Number(keys.has("KeyW") || keys.has("ArrowUp")) - Number(keys.has("KeyS") || keys.has("ArrowDown"));
      const strafe = Number(keys.has("KeyD") || keys.has("ArrowRight")) - Number(keys.has("KeyA") || keys.has("ArrowLeft"));
      const dir = new THREE.Vector3(Math.sin(local.yaw), 0, Math.cos(local.yaw)); const right = new THREE.Vector3(dir.z, 0, -dir.x);
      camera.position.addScaledVector(dir, forward * 5.2 * dt); camera.position.addScaledVector(right, strafe * 5.2 * dt);
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -15.1, 15.1); camera.position.z = THREE.MathUtils.clamp(camera.position.z, -23.1, 13.1);
      local.x = camera.position.x / 8; local.z = (1 - camera.position.z) / 12;
      camera.rotation.order = "YXZ"; camera.rotation.y = local.yaw; camera.rotation.x = local.pitch;
      recoil = Math.max(0, recoil - dt * .4); weapon.position.y += (0 - weapon.position.y) * Math.min(1, dt * 15); weapon.rotation.x = -recoil * .5;
      flash.intensity = Math.max(0, flash.intensity - dt * 40);
      if (remote) { const rx = remote.x * 8; const rz = 1 - remote.z * 12; opponent.position.set(rx, 0, rz); opponent.rotation.y = remote.yaw; }
      if (now - lastSync > 67 && socket?.readyState === WebSocket.OPEN) { lastSync = now; socket.send(JSON.stringify({ type: "state", x: local.x, z: local.z, yaw: local.yaw, pitch: local.pitch })); }
    }
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);
  stop = () => { cancelAnimationFrame(raf); active = false; socket?.close(); observer.disconnect(); document.exitPointerLock?.(); document.removeEventListener("keydown", onKeyDown); document.removeEventListener("keyup", onKeyUp); document.removeEventListener("pointerlockchange", onLockChange); window.removeEventListener("blur", onBlur); renderer.dispose(); scene.traverse((object: THREE.Object3D) => { const mesh = object as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach((item: THREE.Material) => item.dispose()); else if (mesh.material) mesh.material.dispose(); }); host.replaceChildren(); stop = undefined; };
  return stop;
}

export function unmountArena() { stop?.(); }
