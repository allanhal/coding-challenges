const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-01.txt"), "utf8");
const lists = input.trim().split("\n");
// console.log({ lists });

let listOne = [];
let listTwo = [];

for (let line of lists) {
  const [first, second] = line.split("   ");
  listOne.push(parseInt(first));
  listTwo.push(parseInt(second));
}
listOne = listOne.sort((a, b) => a - b);
listTwo = listTwo.sort((a, b) => a - b);
console.log({ listOne, listTwo });

let sum = 0;
for (let i = 0; i < listOne.length; i++) {
  console.log(Math.abs(listOne[i] - listTwo[i]));
  sum += Math.abs(listOne[i] - listTwo[i]);
}

console.log({ sum });
