let board = [
  ["1", "2", ".", ".", "3", ".", ".", ".", "."],
  ["4", ".", ".", "5", ".", ".", ".", ".", "."],
  [".", "9", "1", ".", ".", ".", ".", ".", "3"],
  ["5", ".", ".", ".", "6", ".", ".", ".", "4"],
  [".", ".", ".", "8", ".", "3", ".", ".", "5"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", ".", ".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "8"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

// console.log(board);\

/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
  let setRow = new Set();
  let setCol = new Set();
  let setSquare = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const element = board[i][j];
      if (element === ".") {
        continue;
      }
      if (
        (setRow[i] !== undefined && setRow[i].includes(element)) ||
        (setCol[j] !== undefined && setCol[j].includes(element)) ||
        (setSquare[`${Math.trunc(i / 3)}${Math.trunc(j / 3)}`] !== undefined && setSquare[`${Math.trunc(i / 3)}${Math.trunc(j / 3)}`].includes(element))
      ) {
        return false;
      }
      setRow[i] = [...(setRow[i] || []), element];
      setCol[j] = [...(setCol[j] || []), element];
      setSquare[`${Math.trunc(i / 3)}${Math.trunc(j / 3)}`] = [...(setSquare[`${Math.trunc(i / 3)}${Math.trunc(j / 3)}`] || []), element];
    }
  }
  return true;
}

console.log("isValidSudoku(board)", isValidSudoku(board));
