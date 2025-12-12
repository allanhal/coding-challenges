let nums = [1, 2, 4, 6];

let toReturn = [];
for (let i = 0; i < nums.length; i++) {
  toReturn.push([...nums.slice(0, i), ...nums.slice(i + 1)].reduce((a, b) => a * b));
}
const output = [48, 24, 12, 8];

console.log(
  toReturn,
  output,
  toReturn.every((el, i) => output[i] === el)
);
