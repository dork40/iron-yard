import * as THREE from "three";

// Positions just behind the yard's crates and central divider, used by local AI.
export const ironYardCoverPoints = [
  [-12, -6], [-6, -9], [5, 4], [11, 4], [0, -5], [0, 5], [-9, 10], [-5, 10], [10, -15], [10, -7],
].map(([x, z]) => new THREE.Vector3(x, 0, z));

export function buildIronYard(scene: THREE.Scene) {
  const colliders: THREE.Box3[] = []; const concrete = new THREE.MeshStandardMaterial({ color: "#69716d", roughness: .82, metalness: .08 }); const rust = new THREE.MeshStandardMaterial({ color: "#6b4130", roughness: .68, metalness: .35 });
  const box = (x:number,y:number,z:number,w:number,h:number,d:number, material=concrete) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material); mesh.position.set(x,y,z); mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh); colliders.push(new THREE.Box3().setFromObject(mesh)); };
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(46, 46), new THREE.MeshStandardMaterial({ color: "#454a47", roughness: .95 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  box(0,2,-22,46,4,1); box(0,2,22,46,4,1); box(-22,2,0,1,4,46); box(22,2,0,1,4,46); box(-9,1,-6,5,2,3,rust); box(8,1,4,5,2,3,rust); box(0,1,0,3,2,7); box(-7,1,10,3,2,3); box(10,1,-11,3,2,3);
  return colliders;
}
