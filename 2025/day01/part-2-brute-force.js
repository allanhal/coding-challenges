  const fs = require("fs");
  const path = require("path");

  const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
  const directions = input.split("\n");

let currentPosition = 50;

let zeroCount = 0;

for (let i = 0; i < directions.length; i++) {
  const direction = directions[i];
  const move = direction[0];
  if (!["R", "L"].includes(move)) {
    continue;
  }
  const value = parseInt(direction.slice(1), 10);

  console.log(`CurrentPosition: ${currentPosition}`);
  console.log(`Move: ${direction}`);

  for (let step = 0; step < value; step++) {
    if (move === "L") {
      currentPosition = (currentPosition - 1 + 100) % 100;
    } else if (move === "R") {
      currentPosition = (currentPosition + 1) % 100;
    }
    if (currentPosition === 0) {
      zeroCount += 1;
    }
  }
  console.log(`New Position: ${currentPosition}`);
  console.log(`-----------------------`);
}