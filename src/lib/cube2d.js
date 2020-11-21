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
const faceColorMap = {
  U: "white",
  L: "orange",
  F: "green",
  R: "red",
  B: "blue",
  D: "yellow"
};
const faceColorFontColorMap = {
  white: "black",
  orange: "white",
  green: "white",
  red: "white",
  blue: "white",
  yellow: "black"
}
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
    [2, 5, 8]
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
    [8, 7, 6],
    [8, 5, 2]
  ],
  D: Array(4).fill([6, 7, 8])
}

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

export function getNewFaces(faces, move) {
  let faceKey = move.split("")[0];
  let facesKeys = faceRotationMap[faceKey];
  let particlesKeys = faceRotationParticlesMap[faceKey];
  let colors = facesKeys.map((key, index) => {
    let particles = faces[faceIndexMap[key]].particles;
    return particlesKeys[index].map(pKey => particles[pKey].color);
  });
  if (move.split("")[1]) {
    colors = [...colors.slice(1), ...colors.slice(0, 1)];
  } else {
    colors = [...colors.slice(-1), ...colors.slice(0, -1)];
    // let particles = faces[faceIndexMap[faceKey]].particles;
    // [[0, 1, 2], [2, 5, 8], [8, 7, 6], [6, 3, 0]];
    // particlesKeys[index].forEach((pKey, pIndex) => {
    //   particles[pKey].color = colors[index][pIndex];
    //   particles[pKey].fontColor = faceColorFontColorMap[particles[pKey].color];
    // });
  }
  facesKeys.forEach((key, index) => {
    let particles = faces[faceIndexMap[key]].particles;
    particlesKeys[index].forEach((pKey, pIndex) => {
      particles[pKey].color = colors[index][pIndex];
      particles[pKey].fontColor = faceColorFontColorMap[particles[pKey].color];
    });
  });
  return faces;
}