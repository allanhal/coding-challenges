const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-04.txt"), "utf8");
const rolls = input
  .trim()
  .split("\n")
  .filter((line) => line[0] !== "-");

// const rollsClone = [...rolls];
// const rollsClone = Object.assign({}, rolls);
let rollsClone = rolls.map((line) => line.split(""));

let sum = 0;

for (let i = 0; i < rolls.length; i++) {
  const element = rolls[i];
  // console.log(`${i} ${rolls[i]} `.padStart(2, " "));
  // console.log(i);
  for (let j = 0; j < element.length; j++) {
    process.stdout.write(`${i}${j} `);
  }
  console.log(``);
  for (let j = 0; j < element.length; j++) {
    process.stdout.write(` ${rolls[i][j]} `);
  }
  console.log(``);
}

let countOfAts = 0;
for (let i = 0; i < rolls.length; i++) {
  const line = rolls[i];
  for (let j = 0; j < line.length; j++) {
    const leftOk = j > 0;
    const topOk = i > 0;
    const rightOk = j < line.length - 1;
    const bottomOk = i < rolls.length - 1;

    if (rolls[i][j] !== "@") {
      continue;
    }

    if (leftOk && topOk && rolls[i - 1][j - 1] === "@") {
      countOfAts++;
    }
    if (topOk && rolls[i - 1][j] === "@") {
      countOfAts++;
    }
    if (rightOk && topOk && rolls[i - 1][j + 1] === "@") {
      countOfAts++;
    }
    if (leftOk && rolls[i][j - 1] === "@") {
      countOfAts++;
    }
    if (rightOk && rolls[i][j + 1] === "@") {
      countOfAts++;
    }
    if (leftOk && bottomOk && rolls[i + 1][j - 1] === "@") {
      countOfAts++;
    }
    if (bottomOk && rolls[i + 1][j] === "@") {
      countOfAts++;
    }
    if (rightOk && bottomOk && rolls[i + 1][j + 1] === "@") {
      countOfAts++;
    }
    if (countOfAts < 4) {
      rollsClone[i][j] = "x";
      sum++;
    }

    countOfAts = 0;
  }
}

for(let i = 0; i < rollsClone.length; i++) {
  console.log(rollsClone[i].join(""));
}
console.log(sum);