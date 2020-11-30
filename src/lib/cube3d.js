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

export function init(id, width, height) {
  const element = document.getElementById(id);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  rubiksCube = createRubiksCube();
  scene.add(rubiksCube);
  scene.rotateX(THREE.MathUtils.degToRad(25));
  scene.rotateY(THREE.MathUtils.degToRad(45));

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

function setCubeParticles() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        rubiksCube.add(particles[i][j][k]);
      }
    }
  }
  return faceParticles;
}

let faceParticles;
function setFaceParticles(iStart, iEnd, jStart, jEnd, kStart, kEnd) {
  faceParticles = new THREE.Object3D();
  for (let i = iStart; i < iEnd; i++) {
    for (let j = jStart; j < jEnd; j++) {
      for (let k = kStart; k < kEnd; k++) {
        faceParticles.add(particles[i][j][k]);
      }
    }
  }
  return faceParticles;
}

export function rotate(move) {
  console.log(move);
  setCubeParticles();
  if (move[0] === "U") {
    setFaceParticles(0, 3, 2, 3, 0, 3);
    scene.add(faceParticles);
    if (move === "U") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(-90));
    }
    if (move === "U'") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(90));
    }
    if (move === "U2") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(180));
    }
  }
  if (move[0] === "D") {
    setFaceParticles(0, 3, 0, 1, 0, 3);
    scene.add(faceParticles);
    if (move === "D") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(90));
    }
    if (move === "D'") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(-90));
    }
    if (move === "D2") {
      faceParticles.rotateY(THREE.MathUtils.degToRad(180));
    }
  }
  if (move[0] === "F") {
    setFaceParticles(0, 3, 0, 3, 2, 3);
    scene.add(faceParticles);
    if (move === "F") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(-90));
    }
    if (move === "F'") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(90));
    }
    if (move === "F2") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(180));
    }
  }
  if (move[0] === "B") {
    setFaceParticles(0, 3, 0, 3, 0, 1);
    scene.add(faceParticles);
    if (move === "B") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(90));
    }
    if (move === "B'") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(-90));
    }
    if (move === "B2") {
      faceParticles.rotateZ(THREE.MathUtils.degToRad(180));
    }
  }
  if (move[0] === "L") {
    setFaceParticles(0, 1, 0, 3, 0, 3);
    scene.add(faceParticles);
    if (move === "L") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(90));
    }
    if (move === "L'") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(-90));
    }
    if (move === "L2") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(180));
    }
  }
  if (move[0] === "R") {
    setFaceParticles(2, 3, 0, 3, 0, 3);
    scene.add(faceParticles);
    if (move === "R") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(-90));
    }
    if (move === "R'") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(90));
    }
    if (move === "R2") {
      faceParticles.rotateX(THREE.MathUtils.degToRad(180));
    }
  }
  renderer.render(scene, camera);
}
