const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-05.txt"), "utf8");
let [fresh] = input
  .trim()
  .split("--")
  .filter((line) => line[0] !== "-");

fresh = fresh.split("\n");
fresh = fresh.slice(0, fresh.length - 1).filter((line) => line[0] !== "-");

console.log(fresh);

fresh = fresh
  .map((i) => {
    const [first, last] = i.split("-").map(Number);
    if (first - last > 0) {
      return last + "-" + first;
    }
    return i;
  })
  .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));

console.log(fresh);
console.log();
