const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input-09.txt"), "utf8");
inputs = inputs.split("\n").map((i) => i.split(",").map(Number));
inputs = inputs.map(([j, i]) => [i, j]); //.sort((a, b) => a[0] - b[0]);

for (let input of inputs) {
  // console.log(input);
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

const rects = rectanglesArea({ inputs }).slice(16, 17);

let i = 0;
for (let rect of rects) {
  const key = rect[0];
  const [pStart, pEnd] = getStartEnd(key);
  const edges = rectEdges(pStart, pEnd);

  const isInside = isRectangleInsidePolygon(edges, inputs);
  console.log(i++, rect, isInside ? "TRUE" : "");
  if (isInside) {
    break;
  }
}

function getStartEnd(str) {
  const [pStart, pEnd] = str.split("-");
  return [pStart.split(",").map(Number), pEnd.split(",").map(Number)];
}

function rectEdges(pStart, pEnd) {
  let lowX = Math.min(pStart[0], pEnd[0]);
  let lowY = Math.min(pStart[1], pEnd[1]);

  let highX = Math.max(pStart[0], pEnd[0]);
  let highY = Math.max(pStart[1], pEnd[1]);

  return [
    [lowX, lowY],
    [lowX, highY],
    [highX, highY],
    [highX, lowY],
  ];
}

/* ---------------- Example ----------------
const polygon = [
  [50,50], [300,50], [300,200], [200,200], [200,150], [150,150], [150,200], [50,200]
]; // concave polygon

// rectangle corners in any order (rotated or not)
const rect = [
  [120, 70],
  [180, 70],
  [180, 130],
  [120, 130]
];

console.log(isRectangleInsidePolygon(rect, polygon)); // true or false
------------------------------------------ */

// Returns true if point p = [x,y] is on segment ab.
function pointOnSegment(p, a, b, eps = 1e-9) {
  const [x, y] = p,
    [x1, y1] = a,
    [x2, y2] = b;
  const cross = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
  if (Math.abs(cross) > eps) return false;
  const dot = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
  if (dot < -eps) return false;
  const sqLen = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  return dot <= sqLen + eps;
}

// Ray-casting point-in-polygon. Returns:
//  1 -> inside
//  0 -> outside
// -1 -> on boundary
function pointInPolygon(point, poly) {
  const [px, py] = point;
  let inside = false;

  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i],
      b = poly[j];

    // check boundary first
    if (pointOnSegment(point, a, b)) return true;

    const [x1, y1] = a;
    const [x2, y2] = b;

    const intersect = y1 > py !== y2 > py && px < ((x2 - x1) * (py - y1)) / (y2 - y1) + x1;

    if (intersect) inside = !inside;
  }

  return inside;
}

// orientation test for segment intersection
function orient(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

// checks if segments ab and cd intersect (including collinear overlaps)
function segmentsIntersect(a, b, c, d) {
  const o1 = orient(a, b, c);
  const o2 = orient(a, b, d);
  const o3 = orient(c, d, a);
  const o4 = orient(c, d, b);

  // general case
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) {
    return true;
  }

  // special (collinear) cases
  if (Math.abs(o1) < 1e-9 && pointOnSegment(c, a, b)) return true;
  if (Math.abs(o2) < 1e-9 && pointOnSegment(d, a, b)) return true;
  if (Math.abs(o3) < 1e-9 && pointOnSegment(a, c, d)) return true;
  if (Math.abs(o4) < 1e-9 && pointOnSegment(b, c, d)) return true;

  return false;
}

// Main function:
// rectPoints: array of 4 points [[x,y],...], any order
// polygon: array of N polygon points [[x,y],...]
// options: { includeBoundary: true|false } -> whether a rectangle touching polygon boundary counts as "inside"
function isRectangleInsidePolygon(rectPoints, polygon, options = { includeBoundary: true }) {
  const includeBoundary = options.includeBoundary !== undefined ? options.includeBoundary : true;

  if (polygon.length < 3) return false;
  if (rectPoints.length !== 4) throw new Error("rectPoints must be 4 points.");

  // 1) Ensure every rectangle corner is inside (or on boundary if allowed)
  for (const p of rectPoints) {
    const status = pointInPolygon(p, polygon);
    if (status === 0) return false; // outside
    if (status === -1 && !includeBoundary) return false; // on boundary but boundary not allowed
  }

  // 2) Ensure none of the rectangle edges intersects polygon edges
  // build rect edges (use each pair of points that form the rectangle's polygon)
  // We don't know ordering of rectPoints; build convex hull of rectPoints to get the correct loop
  // but since it's a rectangle, sorting by angle around centroid is simpler:
  const cx = rectPoints.reduce((s, p) => s + p[0], 0) / 4;
  const cy = rectPoints.reduce((s, p) => s + p[1], 0) / 4;
  const ordered = rectPoints.slice().sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx));

  for (let i = 0; i < 4; i++) {
    const a = ordered[i];
    const b = ordered[(i + 1) % 4];
    for (let j = 0; j < polygon.length; j++) {
      const c = polygon[j];
      const d = polygon[(j + 1) % polygon.length];

      if (segmentsIntersect(a, b, c, d)) {
        // If intersection happens exactly at a rectangle corner meeting polygon vertex and boundary allowed,
        // that's still considered touching. Return false only if it's a "proper" intersection or boundary not allowed.
        // For simplicity: if intersection point is not just a shared endpoint we treat as intersecting.
        // Check shared endpoints:
        const sharedEndpoint = (a[0] === c[0] && a[1] === c[1]) || (a[0] === d[0] && a[1] === d[1]) || (b[0] === c[0] && b[1] === c[1]) || (b[0] === d[0] && b[1] === d[1]);
        if (!sharedEndpoint) return false;
        if (!includeBoundary && sharedEndpoint) return false;
        // else it's just touching at vertex and we allow boundary touches, continue checking
      }
    }
  }

  return true;
}

// ----------------------------------
// ----------------------------------

const sum = rects[0][1];
const tooHigh = 4652231070;
const tooLow = 555770439;

console.log("toTry", sum);

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
