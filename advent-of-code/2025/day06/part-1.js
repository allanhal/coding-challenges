const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-06.txt"), "utf8");

const mathwork = input
  .trim()
  .replaceAll(/ /g, " ")
  .split("\n")
  .map((i) => i.split(" ").filter((a) => a !== ""));

let numbers = mathwork.slice(0, mathwork.length - 1).map((i) => i.map(Number));
let operations = mathwork[mathwork.length - 1];

// console.log({ mathwork, numbers, operations });

let toCalculate = [];

for (let j = 0; j < numbers[0].length; j++) {
  const tempCalculate = [];
  for (let i = 0; i < numbers.length; i++) {
    console.log(`numbers[`, i, `][`, j, `]`, numbers[i][j]);
    tempCalculate.push(numbers[i][j]);
  }
  toCalculate.push(tempCalculate);
  console.log();
}

console.log(toCalculate);

let sum = 0;
for (let i = 0; i < toCalculate.length; i++) {
  let currentOperation = operations[i];
  if (currentOperation === `*`) {
    sum += toCalculate[i].reduce((a, b) => a * b);
  } else {
    sum += toCalculate[i].reduce((a, b) => a + b);
  }
}

console.log(sum);
