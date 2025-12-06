const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-05.txt"), "utf8");
let [fresh] = input
  .trim()
  .split("--")
  .filter((line) => line[0] !== "-");

fresh = fresh.split("\n");
fresh = fresh
  .slice(0, fresh.length - 1)
  .filter((line) => line[0] !== "-")
  .map((i) => {
    const [first, last] = i.split("-").map(Number);
    if (first - last > 0) {
      return last + "-" + first;
    }
    return i;
  })
  .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]))
  .map((i) => i.split("-").map(Number));

console.log(fresh);

let sum = 0;

let newFresh = [];

for (let range of fresh) {
  if (newFresh.length === 0) {
    newFresh.push(range);
  } else if (newFresh[newFresh.length - 1][1] >= range[0]) {
    newFresh[newFresh.length - 1] = [newFresh[newFresh.length - 1][0], Math.max(newFresh[newFresh.length - 1][1], range[1])];
  } else {
    newFresh.push(range);
  }
}

for (let range of newFresh) {
  sum += range[1] - range[0] + 1;
}

console.log({ newFresh, freshLen: fresh.length, newFreshLen: newFresh.length, sum });
