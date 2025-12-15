const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input-02.txt"), "utf8");
const lists = input
  .trim()
  .split("\n")
  .map((list) => list.split(" ").map(Number));

let count = 0;
for (let i = 0; i < lists.length; i++) {
  let correct = true;
  for (let j = 0; j < lists[i].length - 1; j++) {
    process.stdout.write(lists[i][j] + " ");

    const first = lists[i][0];
    const last = lists[i][lists[i].length - 1];

    const current = lists[i][j];
    const next = lists[i][j + 1];

    console.log({ current, next });
    console.log(`------------------`);
    if (first < last) {
      if (next - current <= 3 && next - current > 0) {
        continue;
      } else {
        correct = false;
        break;
      }
    } else if (current - next <= 3 && current - next > 0) {
      continue;
    } else {
      correct = false;
      break;
    }
  }
  if (correct) {
    count++;
  }
  console.log(` || correct: ${correct} || count: ${count}`);
  console.log(``);
}
