export function printTree(tree) {
  for (let i = 0; i < tree.length; i++) {
    const current = tree[i];
    for (let j = 0; j < current.length; j++) {
      process.stdout.write(current[j]);
    }
    console.log();
  }
}

export function countSplitting(tree) {
  let sum = 0;
  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree[i].length; j++) {
      if (tree[i][j] === "^" && tree[i - 1][j] === "|") {
        sum += 1;
      }
    }
  }
  return sum;
}

export function getImage(tree) {
  return tree.map((i) => i.join("")).join("@");
}

export function reachedEnd(tree) {
  let sum = 0;
  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree[i].length; j++) {
      if (tree[i][j] === "|") {
        sum += 1;
      }
    }
  }
  return sum === tree.length - 1 && tree[tree.length - 1].indexOf("|") >= 0;
}

export function generateChoices(n) {
  const sides = ["left", "right"];
  const result = [];

  function build(current) {
    if (current.length === n) {
      result.push(current);
      return;
    }
    for (const side of sides) {
      build([...current, side]);
    }
  }

  build([]);
  return result;
}

// const choices = generateChoices(7);
// let index = 0;
// for (let choice of choices) {
//   process.stdout.write(`${index++} `);
//   for (let i = 0; i < 7; i++) {
//     process.stdout.write(`${choice[i]} `);
//   }
//   console.log();
// }
