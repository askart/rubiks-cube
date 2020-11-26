import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);
let rubiksCube;
let particles = [];
let faceParticles;

export function init(id, width, height) {
  const element = document.getElementById(id);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  rubiksCube = createRubiksCube();
  rubiksCube.rotation.x = Math.PI / 5;
  rubiksCube.rotation.y = Math.PI / 4;
  scene.add(rubiksCube);

  faceParticles = getFaceParticles();
  faceParticles.rotation.x = Math.PI / 5;
  faceParticles.rotation.y = Math.PI / 4;
  scene.add(faceParticles);

  camera.position.z = 5;
  controls.update();
}

function createRubiksCube() {
  const cube = new THREE.Object3D();
  const offset = 0.05;
  for (let i = 0; i < 3; i++) {
    particles[i] = [];
    for (let j = 0; j < 3; j++) {
      particles[i][j] = [];
      for (let k = 0; k < 3; k++) {
        const x = i * (offset + 1);
        const y = j * (offset + 1);
        const z = k * (offset + 1);
        const particle = createRubiksCubeParticle(x, y, z, offset);
        particles[i][j][k] = particle;
        cube.add(particle);
      }
    }
  }
  return cube;
}

function getParticleColor(val, color, offset) {
  if (["red", "yellow", "blue"].includes(color)) {
    return val === 2 * (offset + 1) ? color : "black";
  }
  if (["orange", "white", "green"].includes(color)) {
    return val === 0 ? color : "black";
  }
}

function createRubiksCubeParticle(x, y, z, offset) {
  const geometry = new THREE.BoxGeometry();
  let material = [
    new THREE.MeshBasicMaterial({ color: getParticleColor(x, "red", offset) }), // R
    new THREE.MeshBasicMaterial({
      color: getParticleColor(x, "orange", offset)
    }), // L
    new THREE.MeshBasicMaterial({
      color: getParticleColor(y, "yellow", offset)
    }), // U
    new THREE.MeshBasicMaterial({
      color: getParticleColor(y, "white", offset)
    }), // D
    new THREE.MeshBasicMaterial({ color: getParticleColor(z, "blue", offset) }), // F
    new THREE.MeshBasicMaterial({ color: getParticleColor(z, "green", offset) }) // B
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

export function getFaceParticles() {
  faceParticles = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (j === 0) {
          faceParticles.add(particles[i][j][k]);
        }
      }
    }
  }
  return faceParticles;
}

export function animate() {
  requestAnimationFrame(animate);

  faceParticles.rotation.y -= Math.PI / 2 / 200;

  rubiksCube.rotation.y -= Math.PI / 2 / 200;

  controls.update();

  renderer.render(scene, camera);
}
