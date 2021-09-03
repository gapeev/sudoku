module.exports = function solveSudoku(matrix) {
  if (isSolved(matrix)) {
    return matrix;
  }

  const zeroIndex = matrix
    .reduce((acc, row) => [...acc, ...row], [])
    .findIndex((value) => value === 0);

  if (zeroIndex === -1) {
    return null;
  }

  const rowIndex = Math.floor(zeroIndex / 9);
  const colIndex = zeroIndex % 9;

  const rowValues = getRowValues(matrix, rowIndex);
  const colValues = getColValues(matrix, colIndex);
  const squareValues = getSquareValues(matrix, rowIndex, colIndex);
  const exceptions = [...rowValues, ...colValues, ...squareValues];
  const possibleValues = DIGITS.filter((value) => !exceptions.includes(value));

  for (const possibleValue of possibleValues) {
    matrix[rowIndex][colIndex] = possibleValue;
    const result = solveSudoku(matrix);
    if (result) {
      return result;
    }
  }
  matrix[rowIndex][colIndex] = 0;
  return null;
};

const getRowValues = (matrix, rowIndex) => matrix[rowIndex];

const getColValues = (matrix, colIndex) =>
  matrix
    .map((row) => row[colIndex])
    .reduce((acc, value) => [...acc, value], []);

const getSquareValues = (matrix, rowIndex, colIndex) => {
  const squareRowIndex = Math.floor(rowIndex / 3) * 3;
  const squareColIndex = Math.floor(colIndex / 3) * 3;
  return matrix
    .slice(squareRowIndex, squareRowIndex + 3)
    .map((row) => row.slice(squareColIndex, squareColIndex + 3))
    .reduce((acc, part) => [...acc, ...part], []);
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
