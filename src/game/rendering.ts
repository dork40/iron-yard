import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { GraphicsSettings } from "./settings";
import type { WeaponId } from "./weapons";
const textureLoader = new THREE.TextureLoader();
const fighterLoader = new GLTFLoader();
const fighterAssets = new Map<string, Promise<GLTF>>();

type FighterState = {
  fallback: THREE.Group; motion: THREE.Group; mixer?: THREE.AnimationMixer; hasClip: boolean;
  phase: number; lastPosition: THREE.Vector3; firingUntil: number;
};
type WeaponViewState = {
  slide: Array<{ object: THREE.Object3D; position: THREE.Vector3 }>;
  magazine?: { object: THREE.Object3D; position: THREE.Vector3; rotation: THREE.Euler };
  lastShot: number;
};
type FighterHost = THREE.Group & { userData: { fighter?: FighterState } };
type WeaponViewModel = THREE.Group & { userData: { weaponView?: WeaponViewState } };
const fighterFiles = ["character-a", "character-f", "character-k", "character-p"] as const;
export type FighterVariant = typeof fighterFiles[number];

function loadFighterAsset(variant: FighterVariant) {
  let asset = fighterAssets.get(variant);
  if (!asset) {
    asset = fighterLoader.loadAsync(`/characters/Models/GLB%20format/${variant}.glb`);
    fighterAssets.set(variant, asset);
  }
  return asset;
}

function texture(path: string, color = false) {
  const value = textureLoader.load(path);
  value.wrapS = value.wrapT = THREE.RepeatWrapping;
  if (color) value.colorSpace = THREE.SRGBColorSpace;
  return value;
}

export function arenaMaterial(kind: "concrete" | "rust") {
  if (kind === "concrete") {
    const map = texture("/textures/concrete-floor-albedo.png", true), roughnessMap = texture("/textures/concrete-floor-roughness.png");
    map.repeat.set(8, 8); roughnessMap.repeat.set(8, 8);
    return new THREE.MeshStandardMaterial({ map, roughnessMap, roughness: .82, metalness: .04 });
  }
  const map = texture("/textures/rusted-metal-albedo.png", true); map.repeat.set(2, 2);
  return new THREE.MeshStandardMaterial({ map, roughness: .64, metalness: .38 });
}

export function weaponMaterial(kind: "steel" | "wood" | "polymer") {
  if (kind === "steel") {
    const map = texture("/textures/gun-metal-albedo.png", true); map.repeat.set(2.6, 1.35); map.offset.set(.12, .08);
    return new THREE.MeshStandardMaterial({ map, color: "#d1dddd", metalness: .42, roughness: .38 });
  }
  if (kind === "wood") {
    const map = texture("/textures/gun-wood-albedo.jpg", true); map.repeat.set(2.2, 1.15); map.offset.set(.05, .18);
    return new THREE.MeshStandardMaterial({ map, color: "#d8b08a", metalness: .02, roughness: .5 });
  }
  const map = texture("/textures/gun-metal-albedo.png", true); map.repeat.set(2, 1.2); map.offset.set(.18, .04);
  return new THREE.MeshStandardMaterial({ map, color: "#53636a", metalness: .28, roughness: .52 });
}

export function applyGraphicsSettings(renderer: THREE.WebGLRenderer, graphics: GraphicsSettings) { renderer.setPixelRatio(Math.min(devicePixelRatio, graphics.pixelRatio)); renderer.shadowMap.enabled = graphics.shadows; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }
export function createRenderer(host: HTMLElement, graphics: GraphicsSettings) { const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" }); applyGraphicsSettings(renderer, graphics); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; host.replaceChildren(renderer.domElement); return renderer; }
export function proceduralMaterial(kind: "steel" | "wood" | "polymer" | "concrete" | "brick") { const canvas = document.createElement("canvas"); canvas.width = canvas.height = 128; const ctx = canvas.getContext("2d")!; const colors = { steel: ["#30383a","#161b1d"], wood: ["#7a482b","#3d2117"], polymer: ["#35434a","#1c2529"], concrete: ["#777b76","#4e5350"], brick: ["#8b5340","#4e2d27"] }[kind]; ctx.fillStyle = colors[0]; ctx.fillRect(0,0,128,128); for (let i=0;i<240;i++) { ctx.fillStyle = `${colors[1]}${Math.floor(20 + Math.random()*55).toString(16).padStart(2,"0")}`; const x=Math.random()*128,y=Math.random()*128; ctx.fillRect(x,y,kind === "wood" ? 16+Math.random()*38 : 1+Math.random()*5,kind === "wood" ? 1 : 1+Math.random()*4); } if (kind === "brick") { ctx.strokeStyle="#32201c"; ctx.lineWidth=3; for(let y=0;y<128;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(128,y);ctx.stroke();for(let x=(y/24%2)*18;x<128;x+=36){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+24);ctx.stroke();}} } const texture=new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace; texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.repeat.set(2,2); return new THREE.MeshStandardMaterial({ map:texture, color:"#ffffff", metalness:kind === "steel" ? .78 : .04, roughness:kind === "steel" ? .32 : .78 }); }
export function createWeapon(camera: THREE.Camera, id: WeaponId) {
  const group = new THREE.Group() as WeaponViewModel, steel = weaponMaterial("steel"), wood = weaponMaterial("wood"), polymer = weaponMaterial("polymer"), slide: WeaponViewState["slide"] = [];
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number, rotation = 0, moves = false) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); mesh.rotation.x = rotation; group.add(mesh);
    if (moves) slide.push({ object: mesh, position: mesh.position.clone() });
    return mesh;
  };
  let magazine: WeaponViewState["magazine"];
  if (id === "frontier-rifle") {
    add(new THREE.BoxGeometry(.18, .17, .64), steel, .3, -.27, -.68, 0, true); add(new THREE.CylinderGeometry(.033, .045, .75, 10), steel, .3, -.23, -1.24, Math.PI / 2, true); add(new THREE.BoxGeometry(.17, .12, .45), wood, .3, -.26, -1.03); add(new THREE.BoxGeometry(.12, .29, .17), wood, .3, -.43, -.48, -.2);
    const mesh = add(new THREE.BoxGeometry(.13, .37, .18), steel, .3, -.48, -.72, -.35); magazine = { object: mesh, position: mesh.position.clone(), rotation: mesh.rotation.clone() };
  } else if (id === "modern-rifle") {
    add(new THREE.BoxGeometry(.17, .15, .58), polymer, .3, -.27, -.68, 0, true); add(new THREE.CylinderGeometry(.028, .036, .78, 10), steel, .3, -.23, -1.28, Math.PI / 2, true); add(new THREE.BoxGeometry(.11, .25, .15), polymer, .3, -.43, -.5, -.24); const mesh = add(new THREE.BoxGeometry(.1, .32, .14), polymer, .3, -.45, -.75, -.05); magazine = { object: mesh, position: mesh.position.clone(), rotation: mesh.rotation.clone() }; add(new THREE.BoxGeometry(.08, .05, .22), steel, .3, -.1, -.9);
  } else {
    // Larger separate parts keep the existing local albedo maps legible in the first-person view.
    add(new THREE.BoxGeometry(.2, .17, .42), steel, .3, -.29, -.65, 0, true);
    add(new THREE.BoxGeometry(.17, .11, .25), steel, .3, -.36, -.89, 0, true);
    add(new THREE.CylinderGeometry(.038, .046, .38, 12), steel, .3, -.27, -1.02, Math.PI / 2, true);
    add(new THREE.BoxGeometry(.145, .32, .18), wood, .3, -.48, -.52, -.24);
    add(new THREE.BoxGeometry(.15, .035, .2), wood, .3, -.59, -.52, -.24);
    const mesh = add(new THREE.BoxGeometry(.1, .22, .14), steel, .3, -.42, -.6); magazine = { object: mesh, position: mesh.position.clone(), rotation: mesh.rotation.clone() };
  }
  group.userData.weaponView = { slide, magazine, lastShot: -Infinity }; camera.add(group); return group;
}

export function triggerWeaponFire(group: THREE.Group, now: number) {
  const state = (group as WeaponViewModel).userData.weaponView;
  if (state) state.lastShot = now;
}

export function updateWeaponViewModel(group: THREE.Group, now: number, speed: number, aiming: boolean, reloadProgress: number) {
  const state = (group as WeaponViewModel).userData.weaponView;
  if (!state) return;
  const movement = Math.min(1, speed / 7), sway = now * .008;
  group.position.x = aiming ? .14 : .28 + Math.sin(sway) * .014 * movement;
  group.position.y = aiming ? -.18 : -.28 + Math.cos(sway * .8) * .011 * movement;
  group.position.z = aiming ? -.12 : Math.sin(sway * .55) * .018 * movement;
  const shot = THREE.MathUtils.clamp(1 - (now - state.lastShot) / 100, 0, 1);
  state.slide.forEach(part => { part.object.position.copy(part.position); part.object.position.z += shot * .055; });
  if (state.magazine) {
    const dip = Math.sin(THREE.MathUtils.clamp(reloadProgress, 0, 1) * Math.PI);
    state.magazine.object.position.copy(state.magazine.position).y -= dip * .24;
    state.magazine.object.rotation.copy(state.magazine.rotation); state.magazine.object.rotation.z += dip * .35;
  }
}

export function createFighter(color = "#4e6670", variant: FighterVariant = "character-a") {
  const group = new THREE.Group() as FighterHost, motion = new THREE.Group(), fallback = new THREE.Group();
  const cloth = new THREE.MeshStandardMaterial({ color, roughness: .8 }), skin = new THREE.MeshStandardMaterial({ color: "#8e614a", roughness: .9 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(.34, .8, 5, 8), cloth), head = new THREE.Mesh(new THREE.SphereGeometry(.23, 12, 8), skin);
  body.position.y = .85; head.position.y = 1.58; fallback.add(body, head); motion.add(fallback); group.add(motion);
  // These retain stable combat raycasts even when a model's individual mesh layout differs.
  const hitboxMaterial = new THREE.MeshBasicMaterial({ colorWrite: false });
  const hitBody = new THREE.Mesh(new THREE.CapsuleGeometry(.34, .8, 5, 8), hitboxMaterial), hitHead = new THREE.Mesh(new THREE.SphereGeometry(.23, 12, 8), hitboxMaterial);
  hitBody.position.y = .85; hitHead.position.y = 1.58; group.add(hitBody, hitHead);
  const state: FighterState = { fallback, motion, hasClip: false, phase: Math.random() * Math.PI * 2, lastPosition: group.position.clone(), firingUntil: 0 };
  group.userData.fighter = state;
  loadFighterAsset(variant).then(gltf => {
    const model = cloneSkeleton(gltf.scene); const bounds = new THREE.Box3().setFromObject(model), height = Math.max(.001, bounds.max.y - bounds.min.y), scale = 1.72 / height;
    model.scale.setScalar(scale); model.position.y = -bounds.min.y * scale;
    let meshes = 0, texturedMeshes = 0, fallbackMaterials = 0;
    model.traverse(item => {
      if (!(item instanceof THREE.Mesh)) return;
      meshes++; item.castShadow = true; item.receiveShadow = true;
      const materials = Array.isArray(item.material) ? item.material : [item.material];
      item.material = materials.map(source => {
        const material = source.clone() as THREE.Material & { map?: THREE.Texture; vertexColors?: boolean };
        const hasMap = Boolean(material.map?.source.data);
        if (material.map) { material.map.colorSpace = THREE.SRGBColorSpace; if (hasMap) texturedMeshes++; }
        if (material.vertexColors && !item.geometry.getAttribute("color")) material.vertexColors = false;
        if (material instanceof THREE.MeshStandardMaterial) {
          if (!hasMap) { material.color.set("#b9a992"); fallbackMaterials++; }
          material.emissive.setRGB(.025, .025, .025);
        }
        material.needsUpdate = true;
        return material;
      }) as THREE.Material | THREE.Material[];
    });
    state.motion.remove(state.fallback); state.motion.add(model);
    console.info("[Iron Yard] Textured character loaded", { variant, meshes, texturedMeshes, fallbackMaterials });
    if (gltf.animations.length) { state.mixer = new THREE.AnimationMixer(model); state.mixer.clipAction(gltf.animations[0]).play(); state.hasClip = true; }
  }).catch(error => { console.warn("[Iron Yard] Character GLB failed; retaining fallback", { variant, error }); });
  return group;
}

export function triggerFighterFire(group: THREE.Group, now: number) {
  const state = (group as FighterHost).userData.fighter;
  if (state) state.firingUntil = now + 120;
}

export function updateFighter(group: THREE.Group, dt: number, now: number) {
  const state = (group as FighterHost).userData.fighter;
  if (!state) return;
  state.mixer?.update(dt);
  if (state.hasClip) return;
  const speed = group.position.distanceTo(state.lastPosition) / Math.max(dt, .001); state.lastPosition.copy(group.position);
  const moving = Math.min(1, speed / 4), firing = Math.max(0, (state.firingUntil - now) / 120);
  state.motion.position.y = Math.sin(now * .011 + state.phase) * (.008 + moving * .026);
  state.motion.rotation.y = Math.sin(now * .004 + state.phase) * (.035 + moving * .025);
  state.motion.rotation.z = firing * -.13;
}
