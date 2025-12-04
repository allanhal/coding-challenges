const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const ranges = input.trim().split(",");

let invalidIds = [];

function debug(msg) {
  // console.log(msg);
}

for (let current of ranges) {
  const [start, end] = current.split("-");

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    debug(i);
    const currentId = i.toString();
    let windowSize = 1;
    const windowSizeMax = Math.trunc(currentId.length / 2);
    debug(`length: ${currentId.length}`);
    debug(`windowSizeMax: ${windowSizeMax}`);

    for (windowSize = windowSizeMax; windowSize > 0; windowSize--) {
      debug(`-1- Checking windowSize`);
      debug(`windowSize: ${windowSize}`);
      let previousSubstring = null;
      let foundDuplicate = 0;

      for (let windowStartIndex = 0; windowStartIndex <= currentId.length - windowSize; windowStartIndex = windowStartIndex + windowSize) {
        debug(`-2- Navigating window into substrings`);
        const currentSubstring = currentId.substring(windowStartIndex, windowStartIndex + windowSize);
        debug(`windowStartIndex: ${windowStartIndex} - windowSize: ${windowSize} - substring: ${parseInt(currentSubstring)}`);
        debug(parseInt(currentSubstring));

        if (previousSubstring === null) {
          // First substring in this window size
          previousSubstring = currentSubstring;
          foundDuplicate++;
          continue;
        }
        if (currentSubstring !== previousSubstring) {
          // Different substring found
          debug(`Different substring found: ${currentSubstring} !== ${previousSubstring}`);
          foundDuplicate = 0;
          break;
        }

        foundDuplicate++;

        debug(`windowSizeMax: ${windowSizeMax} - foundDuplicate: ${foundDuplicate} - windowSizeMax: ${windowSizeMax} - windowStartIndex: ${windowStartIndex}`);
        debug(`\n------foundDuplicate: ${foundDuplicate} - windowSize: ${windowSize} - foundDuplicate * windowSize: ${foundDuplicate * windowSize} -----\n`);

        if (foundDuplicate * windowSize === currentId.length) {
          debug(`All substrings are identical for window size ${windowSize}`);
          invalidIds.push(i);
          break;
        }
      }

      if (foundDuplicate * windowSize === currentId.length) break;
    }

    debug(`----------------\n\n`);
  }
}

debug(`Total invalid IDs: ${invalidIds} - sum ${invalidIds.reduce((a, b) => a + b, 0)}`);
console.log(invalidIds.reduce((a, b) => a + b, 0));
