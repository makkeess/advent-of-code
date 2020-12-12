const fs = require("fs");
const { find } = require("lodash");
const _ = require("lodash");
let OCCUPIED = "#";
let EMPTY = "L";

let getAdjacent = (row, col) => {
  return [
    { row: row - 1, col },
    { row: row - 1, col: col - 1 },
    { row: row - 1, col: col + 1 },
    { row: row + 1, col },
    { row: row + 1, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
  ];
};

let isValidPos = (matrix, row, col) => {
  var maxRow = matrix.length - 1,
    maxCol = matrix[0].length - 1;
  return row >= 0 && row <= maxRow && col >= 0 && col <= maxCol;
};

let countAdjacentOccupiedSeats = (matrix, row, col) => {
  return getAdjacent(row, col).reduce((acc, it) => {
    if (
      isValidPos(matrix, it.row, it.col) &&
      matrix[it.row][it.col] === OCCUPIED
    ) {
      acc += 1;
    }
    return acc;
  }, 0);
};

function hasVisible(matrix, row, col, rowFunc, colFunc) {
  var nextRow = rowFunc(row),
      nextCol = colFunc(col);

  var isValidNext = isValidPos(matrix, nextRow, nextCol);

  if (isValidNext && matrix[nextRow][nextCol] === OCCUPIED) {
    return true;
  } else if (isValidNext && matrix[nextRow][nextCol] === EMPTY) {
    return false;
  } else if(isValidNext) {
    return hasVisible(matrix, nextRow, nextCol, rowFunc, colFunc);
  }
  return false;
}

let countVisibleOccupiedSeats = (matrix, row, col) => {
  let add = (num) => num + 1;
  let sub = (num) => num - 1;
  let neutral = (num) => num;

  return [
    hasVisible(matrix, row, col, sub, neutral),
    hasVisible(matrix, row, col, sub, sub),
    hasVisible(matrix, row, col, sub, add),
    hasVisible(matrix, row, col, add, neutral),
    hasVisible(matrix, row, col, add, add),
    hasVisible(matrix, row, col, add, sub),
    hasVisible(matrix, row, col, neutral, sub),
    hasVisible(matrix, row, col, neutral, add),
  ].reduce((acc, visible) => {
    acc += visible ? 1 : 0;
    return acc;
  }, 0);
};

let determineNewSeatType = (matrix, row, col) => {
  var seatType = matrix[row][col];

  var visibleOccupiedSeats = countVisibleOccupiedSeats(matrix, row, col);
  if (EMPTY === seatType && visibleOccupiedSeats === 0) {
    seatType = OCCUPIED;
  } else if (OCCUPIED === seatType && visibleOccupiedSeats >= 5) {
    seatType = EMPTY;
  }
  return seatType;
};

function solve(matrix) {
  var tMatrix = _.cloneDeep(matrix);
  var i, j;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      var newSeatType = determineNewSeatType(matrix, i, j);
      if (newSeatType !== matrix[i][j]) {
        tMatrix[i][j] = newSeatType;
      }
    }
  }
  if (_.isEqual(tMatrix, matrix)) {
    return matrix;
  }
  return solve(tMatrix);
}

let countOccupied = (matrix) => {
  return matrix.reduce((acc, row) => {
    acc += row.reduce((rowAcc, seat) => {
      if (seat === OCCUPIED) {
        rowAcc += 1;
      }
      return rowAcc;
    }, 0);
    return acc;
  }, 0);
};

function solveOne(matrix) {
  return countOccupied(solve(matrix));
}

var inp = fs.readFileSync("./resources/day11.txt", "utf-8");
var matrix = inp.split("\r\n").map((r) => r.split(""));
console.log("Part one: " + solveOne(matrix));
// console.log(solveTwo(numbers, 0));
