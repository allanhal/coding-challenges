const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const directions = input.split("\n");

let currentPosition = 50;
let zeroCount = 0;

for (let i = 0; i < directions.length; i++) {
  const direction = directions[i];
  const move = direction[0] === "L" ? -1 : 1;
  const value = move * parseInt(direction.slice(1), 10);

  currentPosition = (currentPosition + value) % 100; // make move and ignore full loops
  if (currentPosition === 0) {
    zeroCount++;
  }
}

console.log(`Zero Count: ${zeroCount}`);
