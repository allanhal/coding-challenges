const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const ranges = input.trim().split(",");

let invalidIds = [];

for (let current of ranges) {
  // console.log(current);
  const [start, end] = current.split("-");

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    const currentId = i.toString();
    const expo = currentId.length / 2;
    if(expo % 1 !== 0) {
      // console.log(`Skipping id: ${currentId} - length is odd`);
      continue;
    }
    const numberToDivMod = Math.pow(10, expo);

    const firstHalf = Math.trunc(i / numberToDivMod);
    const secondHalf = i % numberToDivMod;

    // console.log(
    //   `id: ${currentId} - expo: ${expo}, numberToDivMod: ${numberToDivMod}`
    // );
    // console.log(`firstHalf: ${firstHalf}, secondHalf: ${secondHalf}`);
    // console.log(`------------------------`);

    if (firstHalf === secondHalf) {
      invalidIds.push(i);
    }
  }
}

console.log(
  `Total invalid IDs: ${invalidIds.length} - sum ${invalidIds.reduce(
    (a, b) => a + b,
    0
  )}`
);
