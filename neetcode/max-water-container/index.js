let input = [1, 7, 2, 5, 4, 7, 3, 6];

function maxArea(heights) {
  let volume;
  let indexVolumes;
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights.length; j++) {
      const currentI = heights[i];
      const currentJ = heights[j];
      const indexDifference = Math.abs(i - j);
      const minHeight = Math.min(currentI, currentJ);
      const currentVolume = indexDifference * minHeight;
      console.log("indexDifference", indexDifference, "minHeight", minHeight, "currentVolume", currentVolume);
      if (volume === undefined || volume < currentVolume) {
        volume = currentVolume;
        indexVolumes = [i, j];
      }
    }
  }

  return volume;
}
console.log("volume", maxArea(input));

const output = 36;
// console.log({ output });
