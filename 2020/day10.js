const fs = require("fs");

let solveOne = (numbers) => {
  var sums = numbers.reduce((acc,n) => {
    var newPrev = n,
        diff = n - acc.prev;
    acc[diff] += 1;
    acc.prev = newPrev;
    return acc;
  }, {
    1: 0,
    2: 0,
    3: 1,
    prev: 0
  })
  console.log(sums);
  return sums["1"] * sums["3"];
};

function solveTwo(numbers, i) {
  //Solve it...
}

var inp = fs.readFileSync("./resources/day10.txt", "utf-8");
var numbers = inp.split("\r\n").map((num) => parseInt(num)).sort((a,b) => a - b);
numbers.push(0);
// console.log("Part one: " + solveOne(numbers));
// console.log(solveTwo(numbers, 0));
