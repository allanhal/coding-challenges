const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const batteries = input
  .trim()
  .split("\n")
  .filter((line) => line[0] !== "-");

let sum = 0;

for (let line of batteries) {
  //   console.log(line);
  let firstBiggest = line[line.length - 1];
  let firstBiggestIndex = line.length - 1;
  for (let i = line.length - 1; i >= 0; i--) {
    const element = line[i];
    if (element >= firstBiggest) {
      firstBiggest = element;
      firstBiggestIndex = i;
    }
  }

  let secondBiggest = line[line.length - 1];
  let secondBiggestIndex = line.length - 1;

  //   console.log(`firstBiggest: ${firstBiggest} - firstBiggestIndex: ${firstBiggestIndex} - line.length - 1: ${line.length - 1}`);
  if (firstBiggestIndex === line.length - 1) {
    // console.log("entrou no if");
    secondBiggest = line[0];
    secondBiggestIndex = 0;

    // console.log(`secondBiggest starts as: ${secondBiggest} - secondBiggestIndex: ${secondBiggestIndex}`);
    for (let j = 0; j <= line.length - 2; j++) {
      const element = line[j];
      // console.log(`checking element: ${element} at index ${j}`);
      if (element > secondBiggest) {
        // console.log(`updating secondBiggest from ${secondBiggest} to ${element}`);
        secondBiggest = element;
        secondBiggestIndex = j;
      }
      //   console.log(`secondBiggest: ${secondBiggest} - secondBiggestIndex: ${secondBiggestIndex}`);
    }

    const oldFirstBiggest = firstBiggest;
    const oldSecondBiggest = secondBiggest;

    firstBiggest = oldSecondBiggest;
    secondBiggest = oldFirstBiggest;
  } else {
    // console.log("entrou no else");
    for (let j = line.length - 1; j > firstBiggestIndex; j--) {
      const element = line[j];
      if (element >= secondBiggest) {
        secondBiggest = element;
        secondBiggestIndex = j;
      }
    }
  }
  console.log(`firstBiggest: ${firstBiggest} - firstBiggestIndex: ${firstBiggestIndex}`);
  console.log(`secondBiggest: ${secondBiggest} - secondBiggestIndex: ${secondBiggestIndex}`);
  console.log(Number(firstBiggest + secondBiggest));
  console.log(`-------------------`);
  sum += Number(firstBiggest + secondBiggest);
}

console.log(`Sum: ${sum}`);
