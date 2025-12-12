let input = [""];
input = ["The quick brown fox", "jumps over the", "lazy dog", "1234567890", "abcdefghijklmnopqrstuvwxyz"];

const separator = "(999((99(((99((((";
function encode(strs) {
  if (strs.length === 0) return "";
  return strs.map((i) => (i === "" ? "*88***888*88*8*888*" : i)).join(separator);
}

function decode(str) {
  if (str.length === 0) return [];
  return str.split(separator).map((i) => (i === "*88***888*88*8*888*" ? "" : i));
}

const encoded = encode(input);
const decoded = decode(encoded);
// console.log({ encoded, decoded, input });

console.log("Can submit", { input, decoded });
