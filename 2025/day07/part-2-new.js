const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-07.txt"), "utf8");
let tree = input.split("\n").map((i) => i.split(""));

let cache = {};

function addToCache(i, j, value) {
  const stringI = i > 9 ? i.toString() : `0${i}`;
  const stringJ = j > 9 ? j.toString() : `0${j}`;
  cache[`${stringI}-${stringJ}`] = value;
  return cache[`${stringI}-${stringJ}`];
}

function logic(i, j) {
  if (cache[`${i}-${j}`]) {
    return cache[`${i}-${j}`];
  }
  if (i >= tree.length) {
    return addToCache(i, j, 1);
  }
  if (["S", "."].includes(tree[i][j])) {
    return addToCache(i, j, logic(i + 1, j));
  } else if (["^"].includes(tree[i][j])) {
    return addToCache(i, j, logic(i, j - 1) + logic(i, j + 1));
  }
}

// calculate the performance up to line 35
console.time("logic");
const res = logic(0, tree[0].indexOf("S"));
console.log({ cache });
console.log({ res });
console.timeEnd("logic");

// 53ms execution
// 1~2yr without cache
