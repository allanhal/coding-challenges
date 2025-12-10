const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input-09.txt"), "utf8");
inputs = inputs.split("\n").map((i) => i.split(",").map(Number));
inputs = inputs.map(([j, i]) => [i, j]);

for (let input of inputs) {
  // console.log(input);
}
console.log();

const rects = rectanglesArea({ inputs }); //.slice(600, 1000);

// console.log(`Check Rectangles: `);
let i = 0;
for (let rect of rects) {
  // console.log(i++, rect);
}
console.log();

function rectanglesArea({ inputs }) {
  let rects = {};
  for (let p1 of inputs) {
    for (let p2 of inputs) {
      if (p1 === p2) {
        continue;
      }
      const altura = Math.abs(p2[1] - p1[1]) + 1;
      const largura = Math.abs(p1[0] - p2[0]) + 1;
      const area = altura * largura;
      // if (rects[`${p2[0]},${p2[1]}-${p1[0]},${p1[1]}`] === undefined) {
      rects[`${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`] = area;
      // }
    }
  }
  return Object.entries(rects).sort((a, b) => b[1] - a[1]);
}

i = 0;
let biggest = -1;
for (let rect of rects) {
  const key = rect[0];

  const [pStart, pEnd] = getStartEnd(key);

  const toDebug = pointsAreInsideInputsNew(pStart, pEnd);
  const result = toDebug.every((i) => i);
  console.log(i++, rect[0], rect[1], toDebug, result ? "TRUE" : "");
  if (result && biggest < rect[1]) {
    biggest = rect[1];
    break;
  }
  console.log();
}

function pointsAreInsideInputsNew(pStart, pEnd) {
  let lowX = Math.min(pStart[0], pEnd[0]);
  let lowY = Math.min(pStart[1], pEnd[1]);

  let highX = Math.max(pStart[0], pEnd[0]);
  let highY = Math.max(pStart[1], pEnd[1]);

  const points = [
    [lowX, lowY],
    [lowX, highY],
    [highX, highY],
    [highX, lowY],
  ];

  return points.map((i) =>
    checkcheck(
      i[0],
      i[1],
      inputs.map((i) => i[0]),
      inputs.map((i) => i[1])
    )
  );
}

function getStartEnd(str) {
  const [pStart, pEnd] = str.split("-");
  return [pStart.split(",").map(Number), pEnd.split(",").map(Number)];
}

function checkcheck(x, y, cornersX, cornersY) {
  function pointOnSegment(px, py, x1, y1, x2, y2) {
    const cross = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1);
    if (Math.abs(cross) > 1e-9) return false; // not collinear

    const dot = (px - x1) * (px - x2) + (py - y1) * (py - y2);
    return dot <= 0; // within segment bounds
  }
  function pointOnExtendedLine(px, py, x1, y1, x2, y2) {
    // Cross product = 0 → collinear
    const cross = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1);
    return Math.abs(cross) < 1e-9;
  }

  let odd = false;
  let j = cornersX.length - 1;

  for (let i = 0; i < cornersX.length; i++) {
    const x1 = cornersX[i],
      y1 = cornersY[i];
    const x2 = cornersX[j],
      y2 = cornersY[j];

    // 1. NEW: inclusive check — is point exactly on the edge?
    if (pointOnSegment(x, y, x1, y1, x2, y2)) {
      return true;
    }

    // 2. Original ray-casting logic
    if (((y1 < y && y2 >= y) || (y2 < y && y1 >= y)) && (x1 <= x || x2 <= x)) {
      odd ^= x1 + ((y - y1) * (x2 - x1)) / (y2 - y1) < x;
    }

    j = i;
  }

  return odd;
}

const sum = biggest;
const tooHigh = 4652231070;
const tooLow = 0;

console.log("toTry", biggest);

if (sum > tooLow && sum < tooHigh) {
  console.log("Can submit, check sample");
} else {
  if (sum >= tooHigh) {
    console.log("Too high");
  }
  if (sum <= tooLow) {
    console.log("Too low");
  }
  console.log("Do not submit");
}
