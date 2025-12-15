const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
inputs = inputs.split("\n").filter((i) => i !== "");
const [names, moves] = inputs.map((i) => i.split(","));

let position = 0;

for (let move of moves) {
  position = 0;
  const direction = move[0];
  const quantity = move.substring(1);
  console.log({ direction, quantity });
  // console.log();

  if (direction === "R") {
    position = (position + Number(quantity)) % names.length;
  } else {
    const moviment = Number(quantity) % names.length;
    position = (position + (names.length - moviment)) % names.length;
  }
  if (position !== 0) {
    console.log("swapping:", 0, position);
    swapPositions(0, position);
  }
  console.log("names:", names);
  console.log();
}

console.log(names[0]);

function swapPositions(indexA, indexB) {
  const tempA = JSON.parse(JSON.stringify(names[indexA]));

  names[indexA] = JSON.parse(JSON.stringify(names[indexB]));
  names[indexB] = tempA;
}
