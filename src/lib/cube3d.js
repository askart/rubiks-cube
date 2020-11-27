import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const textures = {
  yellow: require("@/assets/yellow.png"),
  orange: require("@/assets/orange.png"),
  blue: require("@/assets/blue.png"),
  red: require("@/assets/red.png"),
  green: require("@/assets/green.png"),
  white: require("@/assets/white.png")
};

const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

loadManager.onLoad = function() {
  requestRender();
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let rubiksCube;
let particles = [];
let faceParticles;

export function init(id, width, height) {
  const element = document.getElementById(id);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  rubiksCube = createRubiksCube();
  rubiksCube.rotation.x = THREE.MathUtils.degToRad(25);
  rubiksCube.rotation.y = THREE.MathUtils.degToRad(45);
  scene.add(rubiksCube);

  faceParticles = getFaceParticles();
  faceParticles.rotation.x = THREE.MathUtils.degToRad(25);
  faceParticles.rotation.y = THREE.MathUtils.degToRad(45);
  scene.add(faceParticles);

  camera.position.z = 20;
  controls.update();
  requestRender();
}

function createRubiksCube() {
  const cube = new THREE.Object3D();
  const offset = 0.0;
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

function getParticleMaterial(color, cond) {
  const options = {};
  if (cond) {
    options.map = loader.load(textures[color]);
  } else {
    options.color = "black";
  }
  return new THREE.MeshBasicMaterial(options);
}

function createRubiksCubeParticle(x, y, z, offset) {
  const geometry = new THREE.BoxGeometry();
  let materials = [
    getParticleMaterial("red", x === 2 * (offset + 1)), // R
    getParticleMaterial("orange", x === 0), // L
    getParticleMaterial("yellow", y === 2 * (offset + 1)), // U
    getParticleMaterial("white", y === 0), // D
    getParticleMaterial("blue", z === 2 * (offset + 1)), // F
    getParticleMaterial("green", z === 0) // B
  ];
  const cube = new THREE.Mesh(geometry, materials);
  cube.position.x = x - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  cube.position.y = y - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  cube.position.z = z - (3 * 1 + 2 * offset) / 2 + 1 / 2;
  return cube;
}

function getFaceParticles() {
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

let renderRequested = false;
function render() {
  renderRequested = false;
  controls.update();
  renderer.render(scene, camera);
}

function requestRender() {
  if (!renderRequested) {
    renderRequested = true;
    requestAnimationFrame(render);
  }
}
controls.addEventListener("change", requestRender);

export function rotate(move) {
  if (move) {
    console.log(move);
  }
}
