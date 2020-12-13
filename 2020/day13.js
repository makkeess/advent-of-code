const fs = require("fs");

let calculateEarliestBefore = (estimate, bussId) => {
  var schedule;
  for (schedule = 0; schedule <= estimate; schedule += bussId) {
  }
  console.log(schedule);
  return schedule;
}

function solveOne(estimate, bussIds) {
  var closest = bussIds.map(id => {
    return {
      id,
      closest: calculateEarliestBefore(estimate, id)
    }
  }).sort((o1, o2) => {
    return o1.closest - o2.closest;
  });

  return (closest[0].closest - estimate) * closest[0].id;
}

var inp = fs.readFileSync("./resources/day13-test.txt", "utf-8");
var input = inp.split("\r\n");
var esimateEarliest = parseInt(input[0]);
var bussIds = input[1].split(",").filter(id => "x" !== id).map(i => parseInt(i));
console.log("Part one: ", solveOne(esimateEarliest, bussIds));
