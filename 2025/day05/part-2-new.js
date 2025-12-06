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

// console.log(fresh);

let last = undefined;
let sum = 0;
for (let range of fresh) {
  const [lo, hi] = range;
  console.log({ lo, hi });
  if (last === undefined) {
    last = [lo, hi];
  } else if (last[1] < lo) {
    sum += last[1] - last[0] + 1;
    last = [lo, hi];
  } else {
    last = [last[0], Math.max(last[1], hi)];
  }
}
sum += last[1] - last[0] + 1;

console.log({ sum });
