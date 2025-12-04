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

  console.log(`CurrentPosition: ${currentPosition}`);
  console.log(`Move: ${direction}`);

  const fullTurn = Math.trunc(Math.abs(value) / 100);
  zeroCount += fullTurn;
  const remainder = value % (100 * move);

  if (
    move === -1 &&
    currentPosition !== 0 &&
    currentPosition + remainder <= 0
  ) {
    zeroCount++;
  } else if (currentPosition + remainder >= 100) {
    zeroCount++;
  }

  currentPosition = (((currentPosition + value) % 100) + 100) % 100;

  console.log(`New Position: ${currentPosition}`);
  console.log(`zeroCount: ${zeroCount}`);
  console.log(`-----------------------`);
}
