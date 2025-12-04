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
// console.log(listOne);
// console.log(listTwo);

let sum = 0;
for (let i = 0; i < listOne.length; i++) {
  let ocurrences = 0;
  for (let j = 0; j < listTwo.length; j++) {
    if (listOne[i] === listTwo[j]) {
      ocurrences++;
      // console.log(`${listOne[i]} ocurrence`);
    }
  }
  sum += listOne[i] * ocurrences;
  ocurrences = 0;
}

console.log(sum);
