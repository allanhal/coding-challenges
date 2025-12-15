const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-05.txt"), "utf8");
let [fresh, ids] = input
  .trim()
  .split("--")
  .filter((line) => line[0] !== "-");

fresh = fresh.split("\n");
ids = ids.split("\n").map(Number);

// create new set
const freshSet = new Set();

for (let element of fresh) {
  const [start, end] = element.split("-").map(Number);
  for (let i = start; i <= end; i++) {
    console.log(i);
    freshSet.add(i);
  }
}

let sum = 0;
for (let id of ids) {
  if (freshSet.has(id)) {
    console.log(id);
    sum++;
  }
}

console.log({ freshSet, ids, sum });
