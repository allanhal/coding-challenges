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

export function rectanglesArea({ inputs }) {
  let rects = {};
  for (let p1 of inputs) {
    for (let p2 of inputs) {
      if (p1 === p2) {
        continue;
      }
      const altura = Math.abs(p2[1] - p1[1]) + 1;
      const largura = Math.abs(p1[0] - p2[0]) + 1;
      const area = altura * largura;
      // if (rects[`${p2[0]},${p2[1]}-${p1[0]},${p1[1]}`] === undefined) {
      rects[`${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`] = area;
      // }
    }
  }
  return Object.entries(rects).sort((a, b) => b[1] - a[1]);
}

export function getStartEnd(str) {
  const [pStart, pEnd] = str.split("-");
  return [pStart.split(",").map(Number), pEnd.split(",").map(Number)];
}
