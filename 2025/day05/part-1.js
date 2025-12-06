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

for (let id of ids) {
  for (let range of fresh) {
    const [first, last] = range.split("-").map(Number);
    if (id >= first && id <= last) {
      console.log(id);
      freshSet.add(id);
    }
  }
}

console.log({ fresh, ids, freshSet, len: freshSet.size });
