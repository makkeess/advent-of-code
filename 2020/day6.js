const fs = require("fs");

let processOne = (inp) => {
  var groups = inp.split("\r\n\r\n").reduce((acc, gr) => {
    var s = new Set(gr.replace(/\r\n/g, "").split(""));
    return (acc += s.size);
  }, 0);
  
  return groups;
};

let intersect = (s1, s2) => {
  var intersect = new Set();
  for (var x of s1) {
    if (s2.has(x)) {
      intersect.add(x);
    }
  }
  return intersect;
};

let processTwo = (inp) => {
  var groups = inp.split("\r\n\r\n").reduce((acc, gr) => {
    var all = new Set(gr.replace(/\r\n/g, "").split(""));
    var common = gr.split("\r\n").reduce((acc,p) => {
      return intersect(acc, new Set(p.split("")));
    }, all);

    return (acc += common.size);
  }, 0);

  return groups;
};

var t = fs.readFileSync("./resources/day6.txt", "utf-8");
// console.log("Total sum: " + processOne(t));
console.log("Total sum: " + processTwo(t));
