const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-06.txt"), "utf8");
const mathwork = input.split("\n");

let operations = mathwork[mathwork.length - 1];

let spaces = 0;
let spaceSizes = [];
for (let operation of operations) {
  if (operation === " ") {
    spaces++;
  } else {
    spaceSizes.push(spaces);
    spaces = 0;
  }
}
spaceSizes.push(spaces);

const operationsDigits = spaceSizes.slice(1, spaceSizes.length + 1);

let j = 0;
let numbersWithDigits = [];
for (let line of mathwork) {
  let tempLine = [];
  for (let i = 0; i < line.length; ) {
    const digitsToGet = operationsDigits[j] + 1;
    const start = i;
    const end = i + digitsToGet;
    const numberToCalculate = line.substring(start, end - 1).replaceAll(" ", "0");
    // tempLine.push(Number(numberToCalculate));
    tempLine.push(numberToCalculate);
    i = end;
    j++;
  }
  numbersWithDigits.push(tempLine);
  tempLine = [];
  j = 0;
}

numbersWithDigits = numbersWithDigits.slice(0, numbersWithDigits.length - 1);
// console.log(numbersWithDigits);

let temp = [];

let sum = 0;

for (let j = 0; j < numbersWithDigits[0].length; j++) {
  const len = numbersWithDigits[0][j].length;
  const operation = operations.replaceAll(" ", "").split("")[j];
  console.log({ len, operation });
  temp = Array(len).fill("");

  const valuesToCalculate = [];
  let toCalculate = "";
  for (let i = 0; i < numbersWithDigits.length; i++) {
    toCalculate = numbersWithDigits[i][j];
    console.log(`n[`, i, `][`, j, `]`, { toCalculate });
    valuesToCalculate.push(toCalculate);
  }

  let vals = [];
  for (let i = 0; i < len; i++) {
    let tempOO = "";
    for (let k = 0; k < numbersWithDigits.length; k++) {
      console.log({ i, k });
      const value = valuesToCalculate[k][i];
      tempOO += value;
    }

    tempOO = tempOO.replaceAll("0", "");
    console.log({ tempOO, j });
    if (tempOO !== "") {
      vals.push(Number(tempOO));
    }
    tempOO = "";
  }
  console.log({
    vals,
  });

  let calculatedOperation;
  if (operation === "+") {
    calculatedOperation = vals.reduce((a, b) => a + b, 0);
  } else {
    calculatedOperation = vals.reduce((a, b) => a * b);
  }
  sum += calculatedOperation;
  console.log({
    vals,
    calculatedOperation,
  });

  console.log();
}

console.log(eval(3336 * 5));
console.log();

console.log({ sum });

const tooHigh = 999999999999999999999999999;
const tooLow = 16623498575;

if (sum > tooLow && sum < tooHigh) {
  console.log("Can submit, check sample");
} else {
  if (sum >= tooHigh) {
    console.log("Too high");
  }
  if (sum <= tooLow) {
    console.log("Too low");
  }
  console.log("Do not submit");
}
