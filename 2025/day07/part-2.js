const fs = require("fs");
const path = require("path");
const { printTree, getImage, reachedEnd, generateChoices } = require("./utils");
const input = fs.readFileSync(path.join(__dirname, "input-07.txt"), "utf8");
let tree = input.split("\n").map((i) => i.split(""));

function doLogicPipe(oldTree, choices) {
  const tree = JSON.parse(JSON.stringify(oldTree));

  let choiceIndex = 0;
  for (let i = 0; i < tree.length; i++) {
    const current = tree[i];
    for (let j = 0; j < current.length; j++) {
      if (
        tree[i][j] === "S" // current is a start
      ) {
        tree[i + 1][j] = "|";
      } else if (
        tree[i][j] === "^" && // current is a splitter
        tree[i - 1][j] === "|" // top is a pipe
      ) {
        if (choices[choiceIndex] === "left") {
          tree[i][j - 1] = "|"; // adjacents to splitter changed to pipe
          choiceIndex++;
        } else if (choices[choiceIndex] === "right") {
          tree[i][j + 1] = "|"; // adjacents to splitter changed to pipe
          choiceIndex++;
        }
      }
      if (
        i !== 0 && // is not first line
        tree[i][j] === "." && // current is a point
        tree[i - 1][j] === "|" // top is a pipe
      ) {
        tree[i][j] = "|";
      }
    }
  }

  return tree;
}

const numberOfSplitters = tree.length / 2 - 1;

console.log({ numberOfSplitters });

console.log();

// const choices = Array(7).fill("right");
// console.log(`possibilities`, Math.pow(2, choices.length));
// const choices = ["left", "right", "left", "right", "left", "right", "left"];

// tree = doLogicPipe(tree, choices);

// printTree(tree);

// console.log(`reachedEnd`, reachedEnd(tree));

// const image = getImage(tree);
// console.log();
// console.log(`getImage`, image);

// console.log(`generateChoives`, generateChoices(3));

const allChoices = generateChoices(7);

const a = {};

for (let choice of allChoices) {
  const tempTree = doLogicPipe(tree, choice);
  const image = getImage(tempTree);
  if (a[image]) {
    a[image].push(choice);
  } else {
    a[image] = [choice];
  }
}

// for (let current in a) {
//   console.log(current);
//   console.log();
// }

for (let key in a) {
  if (Object.prototype.hasOwnProperty.call(a, key)) {
    // Avoid inherited props

    const value = a[key];
    if (value.length > 1) {
      console.log({ key: key.split("@").join("\n"), value });
      console.log();
    }
  }
}
