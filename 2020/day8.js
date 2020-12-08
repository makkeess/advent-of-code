const _ = require("lodash");
const fs = require("fs");

function jump(instructions, idx, acc) {
  var instr = instructions[idx];
  if (idx >= instructions.length - 1) {
    acc.valid = true;
    return acc;
  } else if (instr.visited) {
    acc.valid = false;
    return acc;
  }
  instructions[idx].visited = true;

  var newAcc = acc,
    newInstr = idx;
  if ("acc" === instr.op) {
    newAcc.value += instr.value;
    newInstr += 1;
  } else if ("jmp" === instr.op) {
    if (!acc.diverged) {
      var tAcc = {
          value: newAcc.value,
          valid: newAcc.valid,
          diverged: true,
        },
        tInstr = newInstr + 1,
        tInstructions = _.cloneDeep(instructions);
      var potentialNop = jump(tInstructions, tInstr, tAcc);
      if (potentialNop.valid === true) {
        return potentialNop;
      }
    }
    newInstr += instr.value;
  } else if ("nop" == instr.op) {
    if (!acc.diverged) {
      var tAcc = {
          value: newAcc.value,
          valid: newAcc.valid,
          diverged: true,
        },
        tInstr = newInstr + instr.value,
        tInstructions = _.cloneDeep(instructions);
      var potentialJmp = jump(tInstructions, tInstr, tAcc);
      if (potentialJmp.valid) {
        return potentialJmp;
      }
    }
    newInstr += 1;
  }

  return jump(instructions, newInstr, newAcc);
}

let processOne = (inp) => {
  var instructions = inp.split("\r\n").map((row) => {
    var instr = row.split(" ");
    return {
      op: instr[0],
      value: parseInt(instr[1]),
      visited: false,
    };
  });
  return jump(instructions, 0, { value: 0, valid: false, diverged: false });
};

var t = fs.readFileSync("./resources/day8.txt", "utf-8");
var result = processOne(t);
console.log("DONE")
console.log(result);
// console.log("Total sum: " + processTwo(t));
