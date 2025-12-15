const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input-09.txt"), "utf8");
inputs = inputs.split("\n").map((i) => i.split(",").map(Number));
inputs = inputs.map(([j, i]) => [i, j]);

function printGrid(grid) {
  return grid.map((i) => i.join("")).join("\n");
}

// let grid = [];
// for (let i = 0; i < rowSize; i++) {
// grid.push(".".repeat(colSize).split(""));
// }
// console.log(printGrid(grid));
// console.log();

// for (let el of inputs) {
//   let [col, row] = el;
//   // console.log([row, col]);
//   grid[row][col] = "#";
// }

// console.log(printGrid(grid));
// console.log();

// Biggest rectangle
// Original
// [2,5] [11,1]
// p1    p2

// Converted
// [5,2] [1,11]

// [1,2] A                   [1,11] B
// [5,2] C                   [5,11] D

// const altura = Math.abs(1 - 5) + 1;
// const largura = Math.abs(2 - 11) + 1;

let biggestArea = -1;
// console.log(inputs);
for (let p1 of inputs) {
  // let p2 = [11, 1];
  for (let p2 of inputs) {
    const altura = Math.abs(p2[1] - p1[1]) + 1;
    const largura = Math.abs(p1[0] - p2[0]) + 1;
    const area = altura * largura;
    // console.log(altura, largura, area);
    if (area > biggestArea) {
      biggestArea = area;
    }
  }
}

// console.log({ biggestArea });
