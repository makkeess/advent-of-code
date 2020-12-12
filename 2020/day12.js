const fs = require("fs");

let transitions = {
  N: (act, deg) => {
    let newDirection = "N";
    switch (deg) {
      case "90":
        if ("L" == act) {
          newDirection = "W";
        } else {
          newDirection = "E";
        }
        break;
      case "180":
        newDirection = "S";
        break;
      case "270":
        if ("L" == act) {
          newDirection = "E";
        } else {
          newDirection = "W";
        }
        break;
    }
    return newDirection;
  },
  S: (act, deg) => {
    let newDirection = "S";
    switch (deg) {
      case "90":
        if ("L" == act) {
          newDirection = "E";
        } else {
          newDirection = "W";
        }
        break;
      case "180":
        newDirection = "N";
        break;
      case "270":
        if ("L" == act) {
          newDirection = "W";
        } else {
          newDirection = "E";
        }
        break;
    }
    return newDirection;
  },
  W: (act, deg) => {
    let newDirection = "W";
    switch (deg) {
      case "90":
        if ("L" == act) {
          newDirection = "S";
        } else {
          newDirection = "N";
        }
        break;
      case "180":
        newDirection = "E";
        break;
      case "270":
        if ("L" == act) {
          newDirection = "N";
        } else {
          newDirection = "S";
        }
        break;
    }
    return newDirection;
  },
  E: (act, deg) => {
    let newDirection = "E";
    switch (deg) {
      case "90":
        if ("L" == act) {
          newDirection = "N";
        } else {
          newDirection = "S";
        }
        break;
      case "180":
        newDirection = "W";
        break;
      case "270":
        if ("L" == act) {
          newDirection = "S";
        } else {
          newDirection = "N";
        }
        break;
    }
    return newDirection;
  },
};

let changeDirection = (facing, action, degrees) => {
  return transitions[facing](action, degrees);
};

function solveOne(instructions) {
  var finalPos = instructions.reduce((acc, instr) => {
      let action = instr.substring(0, 1),
        val = instr.substring(1, instr.length);

      if (["L", "R"].includes(action)) {
        acc.facing = changeDirection(acc.facing, action, val);
      } else if ("F" === action) {
        acc[acc.facing] += parseInt(val);
      } else {
        acc[action] += parseInt(val);
      }
      return acc;
    },
    {facing: "E", N: 0, S: 0, E: 0, W: 0}
  );

  console.log(finalPos);
  return Math.abs(finalPos["E"] - finalPos["W"]) + Math.abs(finalPos["N"] - finalPos["S"]);
}

var inp = fs.readFileSync("./resources/day12.txt", "utf-8");
var instructions = inp.split("\r\n");
console.log("Part one: " + solveOne(instructions));
