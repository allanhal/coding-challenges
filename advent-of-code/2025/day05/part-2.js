const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-05.txt"), "utf8");
let [fresh] = input
  .trim()
  .split("--")
  .filter((line) => line[0] !== "-");

fresh = fresh.split("\n");
fresh = fresh
  .slice(0, fresh.length - 1)
  .filter((line) => line[0] !== "-")
  .map((i) => {
    const [first, last] = i.split("-").map(Number);
    if (first - last > 0) {
      return last + "-" + first;
    }
    return i;
  })
  .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]))
  .map((i) => i.split("-").map(Number));

let total = 0;
let latestBiggestValue = 0;

for (let i = 0; i < fresh.length; i = i + 2) {
  let el1 = fresh[i];
  let el2 = fresh[i + 1];

  console.log(i, ": ", el1, " and ", el2);

  if (latestBiggestValue >= el1[0] && latestBiggestValue >= el1[1] && latestBiggestValue >= el2[0] && latestBiggestValue >= el2[0]) {
    console.log(" = ", 0, " = ");
    console.log({ latestBiggestValue }, el1[0], el1[1], el2[0], el2[0]);
    console.log([latestBiggestValue, el1[0], el1[1], el2[0], el2[0]].sort((a, b) => a - b));
    console.log(`--- no need to count: ${el1} and ${el2} ---`);
    continue;
  }

  if (el1[0] > el2[1]) {
    console.log(`--- no need to count: ${el1} and ${el2} ---`);
    // console.log();
    continue;
  }

  let sum = 0;
  if (el2[0] <= el1[1]) {
    sum = el2[1] - el1[0] + 1;
    console.log("Sum: ", el2[1], " - ", el1[0], " + 1 = ", sum, " / OVERLAP");
  } else {
    sum = el1[1] - el1[0] + 1 + (el2[1] - el2[0]) + 1;
    console.log("Sum: (", el1[1], " - ", el1[0], " + 1) + (", el2[1], " - ", el2[0], " + 1) = ", sum, " / NO");
  }
  total += sum;
  latestBiggestValue = el2[1];

  console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
}

console.log({ total });

const tooHigh = 385675298499654;
const tooLow = 384084917780502;

console.log();
if (total > tooLow && total < tooHigh) {
  console.log("Submit");
} else {
  if (total >= tooHigh) {
    console.log("Too high");
  }
  if (total <= tooLow) {
    console.log("Too low");
  }
  console.log("Do not submit");
}

// console.log([385675298499654, 324092551403541, 324092551403585, 384084917780502, 357485433193284].sort((a, b) => a - b));

// 357485433193284
