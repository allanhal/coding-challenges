const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-03.txt"), "utf8");
const batteries = input
  .trim()
  .split("\n")
  .filter((line) => line[0] !== "-");

let joltages = [];
const numberOfBatteries = 12;

for (let line of batteries) {
  let joltage = "";
  let current = line;
  for (let i = 1; i <= numberOfBatteries; i++) {
    const len = current.length - (numberOfBatteries - i);
    const arrayOfNumbers = current.substring(0, len).split("").map(Number);
    const biggestNumber = Math.max(...current.substring(0, len).split("").map(Number));
    const indexBiggestNumber = arrayOfNumbers.indexOf(biggestNumber);
    joltage += biggestNumber;
    current = current.substring(indexBiggestNumber + 1);
  }
  joltages.push(joltage);
}

console.log(joltages.map(Number).reduce((a, b) => a + b, 0));
