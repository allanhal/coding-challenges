const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
inputs = inputs.split("\n").filter((i) => i !== "");
const [names, moves] = inputs.map((i) => i.split(","));
//.map((i) => i.split(",").map(Number));
// inputs = inputs.map(([j, i]) => [i, j]);

console.log({ names, moves });

let position = 0;

for (let move of moves) {
  const [direction, quantity] = move;

  if (direction === "R") {
    position = Math.min(position + Number(quantity), names.length - 1);
  } else {
    position = Math.max(position - Number(quantity), 0);
  }
}

console.log(names[position]);
