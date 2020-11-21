const faces = [
  { key: "U" },
  { key: "L" },
  { key: "F" },
  { key: "R" },
  { key: "B" },
  { key: "D" }
];
const faceIndexMap = {
  U: 0,
  L: 1,
  F: 2,
  R: 3,
  B: 4,
  D: 5
};
// const faceColorMap = {
//   U: "white",
//   L: "orange",
//   F: "green",
//   R: "red",
//   B: "blue",
//   D: "yellow"
// };
const faceColorMap = {
  U: "yellow",
  L: "orange",
  F: "blue",
  R: "red",
  B: "green",
  D: "white"
};
const faceColorFontColorMap = {
  white: "black",
  orange: "white",
  green: "white",
  red: "white",
  blue: "white",
  yellow: "black"
};
const faceRotationMap = {
  U: ["B", "R", "F", "L"],
  L: ["U", "F", "D", "B"],
  F: ["U", "R", "D", "L"],
  R: ["U", "B", "D", "F"],
  B: ["U", "L", "D", "R"],
  D: ["F", "R", "B", "L"]
};
const faceRotationParticlesMap = {
  U: Array(4).fill([2, 1, 0]),
  L: [
    [0, 3, 6],
    [0, 3, 6],
    [0, 3, 6],
    [8, 5, 2]
  ],
  F: [
    [6, 7, 8],
    [0, 3, 6],
    [2, 1, 0],
    [8, 5, 2]
  ],
  R: [
    [8, 5, 2],
    [0, 3, 6],
    [8, 5, 2],
    [8, 5, 2]
  ],
  B: [
    [2, 1, 0],
    [0, 3, 6],
    [6, 7, 8],
    [8, 5, 2]
  ],
  D: Array(4).fill([6, 7, 8])
};

export function generateFaces() {
  return faces.map(face => {
    face.particles = Array(9)
      .fill({})
      .map((val, index) => {
        let particle = {
          key: index,
          color: faceColorMap[face.key],
          fontColor: faceColorFontColorMap[faceColorMap[face.key]],
          content: `${face.key}${index}`
        };
        return particle;
      });
    return face;
  });
}

function rotate(arr, rotationType) {
  if (rotationType) {
    // counterclockwise
    if (rotationType === "'") {
      return [...arr.slice(1), ...arr.slice(0, 1)];
    }
    // 180deg
    if (rotationType === "2") {
      return [...arr.slice(2), ...arr.slice(0, 2)];
    }
  }
  // clockwise
  return [...arr.slice(-1), ...arr.slice(0, -1)];
}

function getOuterFaces(faces, faceKey, rotationType) {
  let facesKeys = faceRotationMap[faceKey];
  let particlesKeys = faceRotationParticlesMap[faceKey];
  let colors = facesKeys.map((key, index) => {
    let particles = faces[faceIndexMap[key]].particles;
    return particlesKeys[index].map(pKey => particles[pKey].color);
  });
  colors = rotate(colors, rotationType);
  facesKeys.forEach((key, index) => {
    let particles = faces[faceIndexMap[key]].particles;
    particlesKeys[index].forEach((pKey, pIndex) => {
      particles[pKey].color = colors[index][pIndex];
      particles[pKey].fontColor = faceColorFontColorMap[particles[pKey].color];
    });
  });
  return faces;
}

function getInnerFaces(faces, faceKey, rotationType) {
  let particles = faces[faceIndexMap[faceKey]].particles;
  let particlesKeys = [
    [0, 1],
    [2, 5],
    [8, 7],
    [6, 3]
  ];
  let colors = [0, 1, 2, 3].map(index => {
    return particlesKeys[index].map(pKey => particles[pKey].color);
  });
  colors = rotate(colors, rotationType);
  [0, 1, 2, 3].forEach(index => {
    particlesKeys[index].forEach((pKey, pIndex) => {
      particles[pKey].color = colors[index][pIndex];
      particles[pKey].fontColor = faceColorFontColorMap[particles[pKey].color];
    });
  });
  return faces;
}

export function getNewFaces(faces, move) {
  let [faceKey, rotationType] = move.split("");
  faces = getOuterFaces(faces, faceKey, rotationType);
  faces = getInnerFaces(faces, faceKey, rotationType);
  return faces;
}
