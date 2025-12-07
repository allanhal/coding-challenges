const fs = require("fs");
const path = require("path");
const { printTree, countSplitting } = require("./utils");
const input = fs.readFileSync(path.join(__dirname, "input-07.txt"), "utf8");
let tree = input.split("\n").map((i) => i.split(""));

function doLogicPipe(tree) {
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
        tree[i][j - 1] = "|"; // adjacents to splitter changed to pipe
        tree[i][j + 1] = "|"; // adjacents to splitter changed to pipe
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

tree = doLogicPipe(tree);
printTree(tree);

console.log(countSplitting(tree));
