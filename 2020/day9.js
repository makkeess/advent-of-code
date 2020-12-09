const fs = require("fs");

let gtThan = (num, gtThan) => num > gtThan;
let ltThan = (num, ltThan) => num < ltThan;

var getThoseThat = (numbers, compare, func) => {
  var tempArr = [];
  for (var n of numbers) {
    if (func(n, compare)) {
      tempArr.push(n);
    }
  }
  return tempArr;
};

let isValid = (numbers, num) => {
  var half = num / 2;

  var smallHalf = getThoseThat(numbers, half, ltThan);
  var largeHalf = getThoseThat(numbers, half, gtThan);

  if (0 === smallHalf.length || 0 === largeHalf.length) {
    return false;
  }

  return smallHalf.some((i) => largeHalf.some((l) => i + l === num));
};

function findInvalid(numbers, preamble, current) {
  var currNum = numbers[current];
  var currNums = numbers.slice(current - preamble, current + 1);

  if (!isValid(currNums, currNum)) {
    return currNum;
  }

  return findInvalid(numbers, preamble, current + 1);
}

let processOne = (numbers, preamble) => {
  return findInvalid(numbers, preamble, preamble);
};

let solveTwo = (numbers, num) => {
  let series = find(numbers, num);
  let numbersIncluded = numbers.slice(series.startIdx, series.currIdx + 1).sort((i1,i2) => i1-i2);
  return numbersIncluded[0] + numbersIncluded[numbersIncluded.length - 1];
}

let find = (numbers, num) => {
  var numbersSummary = numbers.reduce((acc, v, i) => {
    acc[i] = {
      startIdx: i,
      currIdx: i,
      sum: v,
    };

    return acc;
  }, {});

  var i, j;
  for (i = 1; i < numbers.length; i++) {
    for (j = i - 1; j >= 0; j--) {
      numbersSummary[j].currIdx = i;
      numbersSummary[j].sum = numbersSummary[j].sum + numbers[i]
      if (numbersSummary[j].sum === num) {
        return numbersSummary[j];
      }
    }
  }
  console.log("Found nothing :(");
  return undefined;
};

var inp = fs.readFileSync("./resources/day9.txt", "utf-8");
var numbers = inp.split("\r\n").map((num) => parseInt(num));
var num = processOne(numbers, 25);
// console.log("Part one: " + num);
console.log(solveTwo(numbers, num));
