let board = [
  ["1", "2", ".", ".", "3", ".", ".", ".", "."],
  ["4", ".", ".", "5", ".", ".", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", ".", "3"],
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
  let numbersRow = [];
  let setCol = new Set();
  let numbersCol = [];

  let subsets = Array(9);
  console.log({ subsets });
  for (let i = 0; i < board.length; i++) {
    setRow = new Set();
    numbersRow = [];
    setCol = new Set();
    numbersCol = [];
    for (let j = 0; j < board.length; j++) {
      // if (i < 3 && j < 3) {
      // const iTrunc = Math.trunc(i / 3);
      // const jTrunc = Math.trunc(j / 3);
      // console.log("i", i, "trunc:", { iTrunc, jTrunc });
      console.log("formula", (i / 3) * 3 + j / 3);
      // console.log(board[i][0]);
      // console.log(board[i + 3][0]);
      // console.log(board[i + 6][0]);
      // if (board[i][0] !== ".") {
      //   elementRow = Number(elementRow);
      //   // console.log("i", i, "j", j, "element:", elementRow);
      //   setRow.add(elementRow);
      //   numbersRow.push(elementRow);
      // }
      // }

      let elementRow = board[i][j];
      let elementCol = board[j][i];
      if (elementRow !== ".") {
        elementRow = Number(elementRow);
        // console.log("i", i, "j", j, "element:", elementRow);
        setRow.add(elementRow);
        numbersRow.push(elementRow);
      }
      if (elementCol !== ".") {
        elementCol = Number(elementCol);
        // console.log("j", j, "i", i, "element:", elementCol);
        setCol.add(elementCol);
        numbersCol.push(elementCol);
      }
    }

    // console.log({ row: Array.from(setRow), numbersRow, equal: JSON.stringify(Array.from(setRow)) === JSON.stringify(numbersRow) });
    // console.log({ col: Array.from(setCol), numbersCol, equal: JSON.stringify(Array.from(setCol)) === JSON.stringify(numbersCol) });
    console.log();

    if ((JSON.stringify(Array.from(setRow)) === JSON.stringify(numbersRow)) === false || (JSON.stringify(Array.from(setCol)) === JSON.stringify(numbersCol)) === false) {
      return false;
    }
  }
  return true;
}

console.log(isValidSudoku(board));
