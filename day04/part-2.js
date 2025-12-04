const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-04.txt"), "utf8");
let rolls = input
  .trim()
  .split("\n")
  .filter((line) => line[0] !== "-")
  .map((line) => line.split(""));

let result = { removed: 1, rolls, tempRolls: [...rolls].map((line) => line.join("")) };

// console.log(result);

let totalRemoved = 0;
let index = 0;

while (result.removed > 0) {
  result = extractRolls({ removed: result.removed, rolls: result.rolls, tempRolls: result.tempRolls });
  console.log(`Index: ${index++} - Removed: ${result.removed}`);
  totalRemoved += result.removed;
  result = { removed: result.removed, rolls: result.tempRolls.map((line) => line.split("")), tempRolls: result.tempRolls };
}

console.log(`totalRemoved: ${totalRemoved} - Finished result:`);
for (let i = 0; i < result.rolls.length; i++) {
  console.log(result.rolls[i].join(""));
}
function extractRolls({ removed, rolls, tempRolls }) {
  let countOfAts = 0;
  removed = 0;
  tempRolls = tempRolls.map((line) => line.split(""));
  for (let i = 0; i < rolls.length; i++) {
    const line = rolls[i];
    const _linedebug = line.join("");
    for (let j = 0; j < line.length; j++) {
      const leftOk = j > 0;
      const topOk = i > 0;
      const rightOk = j < line.length - 1;
      const bottomOk = i < rolls.length - 1;

      if (rolls[i][j] !== "@") {
        continue;
      }

      // ↖
      if (leftOk && topOk && rolls[i - 1][j - 1] === "@") {
        countOfAts++;
      }
      // ↑
      if (topOk && rolls[i - 1][j] === "@") {
        countOfAts++;
      }
      // ↗
      if (rightOk && topOk && rolls[i - 1][j + 1] === "@") {
        countOfAts++;
      }
      // ←
      if (leftOk && rolls[i][j - 1] === "@") {
        countOfAts++;
      }
      // →
      if (rightOk && rolls[i][j + 1] === "@") {
        countOfAts++;
      }
      // ↙
      if (leftOk && bottomOk && rolls[i + 1][j - 1] === "@") {
        countOfAts++;
      }
      // ↓
      if (bottomOk && rolls[i + 1][j] === "@") {
        countOfAts++;
      }
      // ↘
      if (rightOk && bottomOk && rolls[i + 1][j + 1] === "@") {
        countOfAts++;
      }
      if (countOfAts < 4) {
        tempRolls[i][j] = "x";
        removed++;
      }
      if (countOfAts === 0) {
        console.log(`Nothing found`);
      }

      countOfAts = 0;
    }
  }
  return { removed, rolls, tempRolls: tempRolls.map((line) => line.join("")) };
}
