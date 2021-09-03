module.exports = function solveSudoku(matrix) {
  if (isSolved(matrix)) {
    return matrix;
  }

  let rowIndex = -1;
  let colIndex = -1;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        rowIndex = i;
        colIndex = j;
        break;
      }
    }
    if (rowIndex !== -1) {
      break;
    }
  }

  if (rowIndex === -1) {
    return null;
  }

  const rowValues = matrix[rowIndex];
  const colValues = matrix
    .map((row) => row[colIndex])
    .reduce((acc, value) => [...acc, value], []);
  const squareRowIndex = Math.floor(rowIndex / 3) * 3;
  const squareColIndex = Math.floor(colIndex / 3) * 3;
  const squareValues = matrix
    .slice(squareRowIndex, squareRowIndex + 3)
    .map((row) => row.slice(squareColIndex, squareColIndex + 3))
    .reduce((acc, part) => [...acc, ...part], []);

  const exceptions = [
    ...new Set(
      [...rowValues, ...colValues, ...squareValues].filter(
        (value) => value !== 0
      )
    ),
  ];
  const possibleValues = DIGITS.filter((value) => !exceptions.includes(value));

  for (let i = 0; i < possibleValues.length; i++) {
    matrix[rowIndex][colIndex] = possibleValues[i];
    const result = solveSudoku(matrix);
    if (result) {
      return result;
    }
  }
  matrix[rowIndex][colIndex] = 0;
  return null;
};

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function isSolved(sudoku) {
  for (let i = 0; i < 9; i++) {
    let [r, c] = [Math.floor(i / 3) * 3, (i % 3) * 3];
    if (
      sudoku[i].reduce((s, v) => (s.delete(v), s), new Set(DIGITS)).size != 0 ||
      sudoku.reduce((s, v) => (s.delete(v[i]), s), new Set(DIGITS)).size != 0 ||
      sudoku
        .slice(r, r + 3)
        .reduce(
          (s, v) => v.slice(c, c + 3).reduce((s, v) => (s.delete(v), s), s),
          new Set(DIGITS)
        ).size != 0
    )
      return false;
  }
  return true;
}
