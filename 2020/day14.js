const fs = require("fs");
const _ = require("lodash");

function solveOne(input) {
  return input.reduce((acc, it) => {
    if (it.startsWith("mask")) {
      acc.mask = it.split(" = ")[1].replace(/X/g, "0").split("").map(i => parseInt(i));
      return acc;
    }

    var parts = it.split(" = ");
    var memAdd = parseInt(parts[0].split("[")[1].split("]")[0]);
    var dec = parseInt(parts[1])

    var res = [...dec.toString(2).padStart(36, '0')].map((v,i) => {
      return v | acc.mask[i];
    }).join("");

    acc.mem[memAdd] = parseInt(res, 2);
    return acc;
  }, {
    mem: [],
    mask: ""
  }).mem.reduce((acc, me) => {
    return acc += me !== undefined ? me : 0;
  }, 0);
}

var inp = fs.readFileSync("./resources/day14.txt", "utf-8");
var input = inp.split("\r\n");
console.log("Part one: ", solveOne(input));
