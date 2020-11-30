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
const camera = new THREE.PerspectiveCamera(15, 2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let rubiksCube;

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
  const cube = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const particle = createRubiksCubeParticle(i, j, k);
        particle.userData.position = { x: i, y: j, z: k };
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

function createRubiksCubeParticle(x, y, z) {
  const geometry = new THREE.BoxGeometry();
  let materials = [
    getParticleMaterial("red", x === 2), // R
    getParticleMaterial("orange", x === 0), // L
    getParticleMaterial("yellow", y === 2), // U
    getParticleMaterial("white", y === 0), // D
    getParticleMaterial("blue", z === 2), // F
    getParticleMaterial("green", z === 0) // B
  ];
  const cube = new THREE.Mesh(geometry, materials);
  cube.position.x = x - 1;
  cube.position.y = y - 1;
  cube.position.z = z - 1;
  return cube;
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

let renderRequested = false;
function render() {
  renderRequested = false;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

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
window.addEventListener("resize", requestRender);

let faceParticles;
function setFaceParticles(axis, val) {
  faceParticles = new THREE.Group();
  rubiksCube.children
    .filter(particle => particle.userData.position[axis] === val)
    .forEach(particle => {
      faceParticles.add(particle);
    });
  return faceParticles;
}

function unsetFaceParticles() {
  const particles = [];
  faceParticles.children.forEach(particle => {
    particles.push(particle);
  });
  particles.forEach(particle => {
    rubiksCube.attach(particle);
    particle.userData.position.x = Math.round(particle.position.x) + 1;
    particle.userData.position.y = Math.round(particle.position.y) + 1;
    particle.userData.position.z = Math.round(particle.position.z) + 1;
  });
}

export function rotate(move) {
  if (move[0] === "U") {
    setFaceParticles("y", 2);
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
    setFaceParticles("y", 0);
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
    setFaceParticles("z", 2);
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
    setFaceParticles("z", 0);
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
    setFaceParticles("x", 0);
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
    setFaceParticles("x", 2);
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
  unsetFaceParticles();
  renderer.render(scene, camera);
}
