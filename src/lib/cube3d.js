import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
let rubiksCube;

export function init(id, width, height) {
  const element = document.getElementById(id);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  rubiksCube = createRubiksCube();
  rubiksCube.rotation.x = 0.75;
  rubiksCube.rotation.y = 0.75;

  scene.add(rubiksCube);

  camera.position.z = 4.5;
}

function createRubiksCube() {
  const cube = new THREE.Object3D();
  const offset = 0.05;
  for (let x = 0; x < 3 * (offset + 1); x += offset + 1) {
    for (let y = 0; y < 3 * (offset + 1); y += offset + 1) {
      for (let z = 0; z < 3 * (offset + 1); z += offset + 1) {
        cube.add(createRubiksCubeParticle(x, y, z, offset));
      }
    }
  }
  return cube;
}

function createRubiksCubeParticle(x, y, z, offset) {
  const geometry = new THREE.BoxGeometry();
  let material = [
    new THREE.MeshBasicMaterial({
      color: x === 2 * (offset + 1) ? "red" : "black"
    }), // R
    new THREE.MeshBasicMaterial({
      color: x === 0 ? "orange" : "black"
    }), // L
    new THREE.MeshBasicMaterial({
      color: y === 2 * (offset + 1) ? "yellow" : "black"
    }), // U
    new THREE.MeshBasicMaterial({
      color: y === 0 ? "white" : "black"
    }), // D
    new THREE.MeshBasicMaterial({
      color: z === 2 * (offset + 1) ? "blue" : "black"
    }), // F
    new THREE.MeshBasicMaterial({
      color: z === 0 ? "green" : "black"
    }) // B
  ];
  const cube = new THREE.Mesh(geometry, material);
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  cube.add(line);
  cube.position.x = x - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  cube.position.y = y - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  cube.position.z = z - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  return cube;
}

export function animate() {
  requestAnimationFrame(animate);

  rubiksCube.rotation.x += 0.005;
  rubiksCube.rotation.y += 0.005;
  rubiksCube.rotation.z += 0.005;

  renderer.render(scene, camera);
}
