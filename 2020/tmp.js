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

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let countAdjacent = (row, col) => getAdjacent(row, col).reduce((acc, it) => {
    let added = false;
  if ( it.row >= 0 && it.row <= matrix.length - 1 &&
    it.col >= 0 && it.col <= matrix[0].length - 1
  ) {
    acc += 1;
    added = true;
  }
  console.log(added, it);
  return acc;
}, 0);

console.log(countAdjacent(0,0));
// console.log(countAdjacent(0,1));
// console.log(countAdjacent(0,2));
// console.log(countAdjacent(1,0));
// console.log(countAdjacent(1,1));
// console.log(countAdjacent(1,2));
console.log(countAdjacent(2,2));