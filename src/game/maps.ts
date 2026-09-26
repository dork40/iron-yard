import * as THREE from "three";
import { arenaMaterial, proceduralMaterial } from "./rendering";

export type ArenaMapId = "iron-yard" | "freight-terminal" | "foundry";
type Atmosphere = { background: string; fog: string; fogNear: number; fogFar: number; sky: string; ground: string; light: string; lightPosition: [number, number, number]; lightIntensity: number };
export type ArenaMap = { id: ArenaMapId; name: string; description: string; group: THREE.Group; colliders: THREE.Box3[]; coverPoints: THREE.Vector3[]; playerSpawn: THREE.Vector3; botSpawns: THREE.Vector3[]; buyRadius: number; atmosphere: Atmosphere };

export const arenaMaps: Record<ArenaMapId, Pick<ArenaMap, "id" | "name" | "description">> = {
  "iron-yard": { id: "iron-yard", name: "Iron Yard", description: "Balanced industrial lanes around the crane divider." },
  "freight-terminal": { id: "freight-terminal", name: "Freight Terminal", description: "Long container lanes with hard cover and open crossings." },
  foundry: { id: "foundry", name: "Foundry", description: "A hot interior of furnace bays, columns, and close angles." },
};

export const arenaMapIds = Object.keys(arenaMaps) as ArenaMapId[];

type Builder = (group: THREE.Group, colliders: THREE.Box3[]) => Omit<ArenaMap, "group" | "colliders">;

function createBuilder(group: THREE.Group, colliders: THREE.Box3[]) {
  const concrete = arenaMaterial("concrete");
  const rust = arenaMaterial("rust");
  const brick = proceduralMaterial("brick");
  const steel = proceduralMaterial("steel");
  const blue = proceduralMaterial("steel"); blue.color.set("#315d70");
  const amber = proceduralMaterial("steel"); amber.color.set("#8a4c28");
  const black = proceduralMaterial("concrete"); black.color.set("#293035");
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material = concrete, solid = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z); mesh.castShadow = mesh.receiveShadow = true; group.add(mesh);
    if (solid) colliders.push(new THREE.Box3().setFromObject(mesh));
    return mesh;
  };
  const floor = (w: number, d: number, material: THREE.Material = concrete) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
    mesh.rotation.x = -Math.PI / 2; mesh.receiveShadow = true; group.add(mesh);
  };
  const walls = (w: number, d: number, material: THREE.Material = brick, height = 4) => {
    box(0, height / 2, -d / 2, w, height, 1, material); box(0, height / 2, d / 2, w, height, 1, material);
    box(-w / 2, height / 2, 0, 1, height, d, material); box(w / 2, height / 2, 0, 1, height, d, material);
  };
  const beacon = (x: number, z: number, color: string, height = 4) => {
    const lamp = new THREE.PointLight(color, 3.2, 13, 2); lamp.position.set(x, height, z); group.add(lamp);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(.45, .22, .45), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2 }));
    cap.position.set(x, height - .25, z); group.add(cap);
  };
  return { box, floor, walls, beacon, concrete, rust, brick, steel, blue, amber, black };
}

const buildIronYard: Builder = (group, colliders) => {
  const { box, floor, walls, beacon, brick, rust, steel, amber } = createBuilder(group, colliders);
  floor(52, 52); walls(52, 52, brick);
  // The central divider creates two routes while the gantry and striped bays make orientation immediate.
  box(0, 1.25, 0, 3.4, 2.5, 15, steel); box(-11, 1.25, -8, 7, 2.5, 3.4, rust); box(10, 1.25, 7, 7, 2.5, 3.4, rust);
  box(-10, 1.25, 11, 3.4, 2.5, 4, amber); box(12, 1.25, -12, 3.4, 2.5, 4, amber);
  box(-17, 2.8, -2, .65, 5.6, .65, steel); box(-7, 2.8, -2, .65, 5.6, .65, steel); box(-12, 5.3, -2, 11, .7, .7, steel);
  box(-12, 3.6, -2, .45, 2.8, .45, amber, false); beacon(-12, -2, "#f2ad50", 5.2); beacon(16, 15, "#69b9ce");
  return { ...arenaMaps["iron-yard"], coverPoints: [[-13, -7], [-8, -10], [7, 6], [13, 7], [0, -7], [0, 8], [-10, 12], [12, -13], [-16, 2], [16, -3]].map(([x, z]) => new THREE.Vector3(x, 0, z)), playerSpawn: new THREE.Vector3(-16, 1.7, 11), botSpawns: [new THREE.Vector3(16, 0, -11), new THREE.Vector3(5, 0, -15), new THREE.Vector3(15, 0, 9)], buyRadius: 6.5, atmosphere: { background: "#8da6ae", fog: "#8da6ae", fogNear: 26, fogFar: 63, sky: "#d9e8e9", ground: "#293137", light: "#ffe0bb", lightPosition: [-10, 16, 8], lightIntensity: 3 } };
};

const buildFreightTerminal: Builder = (group, colliders) => {
  const { box, floor, walls, beacon, brick, steel, blue, amber, black } = createBuilder(group, colliders);
  floor(68, 40, black); walls(68, 40, brick);
  // Staggered containers preserve long sightlines but offer a safe move between each lane.
  const containers: Array<[number, number, THREE.Material]> = [[-21, -10, blue], [-21, 8, amber], [-6, 10, blue], [7, -9, amber], [21, 9, blue], [24, -8, amber]];
  containers.forEach(([x, z, material]) => box(x, 1.6, z, 10, 3.2, 3.5, material));
  [[-29, 0], [-12, 0], [3, 0], [18, 0], [30, 0]].forEach(([x, z]) => box(x, .55, z, 1.2, 1.1, 5.5, steel));
  box(-29, 3.4, -15, 1, 6.8, 1, steel); box(-29, 3.4, 15, 1, 6.8, 1, steel); box(-29, 6.35, 0, 1, .7, 31, steel); beacon(-29, 0, "#70d0dd", 6.2); beacon(30, 14, "#e5a550", 4);
  return { ...arenaMaps["freight-terminal"], coverPoints: [[-27, -8], [-23, 5], [-15, 10], [-7, 6], [-3, -9], [6, 8], [11, -9], [20, 6], [26, 11], [28, -5]].map(([x, z]) => new THREE.Vector3(x, 0, z)), playerSpawn: new THREE.Vector3(-28, 1.7, 12), botSpawns: [new THREE.Vector3(29, 0, -13), new THREE.Vector3(18, 0, 12), new THREE.Vector3(5, 0, -13)], buyRadius: 6.5, atmosphere: { background: "#7795a0", fog: "#7795a0", fogNear: 30, fogFar: 78, sky: "#d5e4e2", ground: "#243239", light: "#e1f2ff", lightPosition: [-18, 18, 5], lightIntensity: 2.8 } };
};

const buildFoundry: Builder = (group, colliders) => {
  const { box, floor, walls, beacon, brick, rust, steel, amber, black } = createBuilder(group, colliders);
  floor(44, 44, black); walls(44, 44, brick, 6);
  // Furnace blocks split the interior into quick, readable fights instead of a single open room.
  box(0, 2.2, -15, 15, 4.4, 4, rust); box(0, 4.7, -12.7, 9, .8, .8, amber, false); beacon(0, -12, "#ff713c", 5.3);
  [[-12, -4], [12, -4], [-12, 8], [12, 8]].forEach(([x, z]) => { box(x, 2.5, z, 2.1, 5, 2.1, steel); beacon(x, z, "#e8a35c", 4.8); });
  box(-6, 1.2, 5, 7, 2.4, 2.8, rust); box(7, 1.2, 5, 7, 2.4, 2.8, rust); box(-16, 1.2, 13, 4, 2.4, 4, amber); box(16, 1.2, 13, 4, 2.4, 4, amber);
  box(-18, 3.2, -13, .7, 6.4, .7, steel); box(18, 3.2, -13, .7, 6.4, .7, steel); box(0, 6, -13, 36, .65, .65, steel);
  return { ...arenaMaps.foundry, coverPoints: [[-16, -7], [-8, -5], [8, -5], [16, -7], [-8, 8], [8, 8], [-16, 13], [16, 13], [0, 8], [0, -7]].map(([x, z]) => new THREE.Vector3(x, 0, z)), playerSpawn: new THREE.Vector3(-10, 1.7, 16), botSpawns: [new THREE.Vector3(15, 0, -8), new THREE.Vector3(11, 0, 13), new THREE.Vector3(-3, 0, -8)], buyRadius: 6, atmosphere: { background: "#4d3b38", fog: "#4d3b38", fogNear: 17, fogFar: 48, sky: "#d68c68", ground: "#211c1c", light: "#ffb06d", lightPosition: [-6, 15, 4], lightIntensity: 2.4 } };
};

const builders: Record<ArenaMapId, Builder> = { "iron-yard": buildIronYard, "freight-terminal": buildFreightTerminal, foundry: buildFoundry };

export function buildArenaMap(scene: THREE.Scene, id: ArenaMapId): ArenaMap {
  const group = new THREE.Group(); group.name = `arena-map-${id}`;
  const colliders: THREE.Box3[] = [];
  const map = builders[id](group, colliders);
  scene.add(group);
  return { ...map, group, colliders };
}
