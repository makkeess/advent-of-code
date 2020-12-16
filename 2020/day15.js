const _ = require("lodash");

function solveOne(input, turn, lastSpoken) {
  // var input = _.cloneDeep(inp);

  var lastSpokenTurns = input[lastSpoken];
  var newNum = 0;
  if (lastSpokenTurns && lastSpokenTurns.length > 1) {
    newNum = lastSpokenTurns[lastSpokenTurns.length - 1] - lastSpokenTurns[lastSpokenTurns.length - 2];
  }

  if (turn === 7000) {
    return newNum;
  }

  var turns = input[newNum] ? input[newNum].splice(input[newNum].length - 2) : [];
  turns.push(turn);
  input[newNum] = turns;
  return solveOne(input, turn + 1, newNum);
}

var map = [0,14,1,3,7,9].reduce((acc, v, i) => {acc[v] = [i + 1]; return acc;}, {})
console.log("Part one: ", solveOne(map, Object.keys(map).length + 1, 9));
