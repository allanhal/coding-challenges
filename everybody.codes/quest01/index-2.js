const fs = require("fs");
const path = require("path");
let inputs = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
inputs = inputs.split("\n").filter((i) => i !== "");
const [names, moves] = inputs.map((i) => i.split(","));

console.log({ names, moves });

let position = 0;

console.log("names.length", names.length);
for (let move of moves) {
  // const [direction, quantity] = move;
  const direction = move[0];
  const quantity = move.substring(1);
  console.log({ direction, quantity });

  if (direction === "R") {
    // console.log(position + Number(quantity));
    // console.log(names.length - 1);
    if (quantity === "12") {
      console.log("old", position);
      console.log("new", (position + Number(quantity)) % names.length);
    }
    position = (position + Number(quantity)) % names.length;
    // console.log(position);
  } else {
    const moviment = Number(quantity) % names.length;
    position = (position + (names.length - moviment)) % names.length;
  }
}

console.log({ position });
console.log(names[position]);
