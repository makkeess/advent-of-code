const fs = require("fs");

var beginsWithNumber = (str) => {
  return /^\d+$/.test(str);
};

var constructKey = (str) => {
  var ret = str.split(" ");
  return beginsWithNumber(ret[0])
    ? ret[1] + " " + ret[2]
    : ret[0] + " " + ret[1];
};

var buildContainedIn = (groups) => {
  return groups.reduce((acc, gr) => {
    var line = gr.split(" contain ")
    var bagContaining = constructKey(line[0])

    line[1].split(", ").forEach(cb => {
      var key = constructKey(cb);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        bagContaining,
        nrOf: cb.split(" ")[0]
      });
    });

    return acc;
  }, {});
};

function countTotal(containedIn, bag, contained) {
  for (let b of containedIn[bag]) {
    var t = b["bagContaining"]
    console.log(b["nrOf"]);
    contained.push(parseInt(b["nrOf"]));
    if (containedIn[t] !== undefined && !containedIn[t][0]["bagContaining"].startsWith("no other bag")) {
      countTotal(containedIn, b["bagContaining"], contained)
    }
  }
  return contained;
}

let processOne = (inp) => {
  var containedIn = buildContainedIn(inp.split("\r\n"));
  return countTotal(containedIn, "shiny gold", []);
};

var t = fs.readFileSync("./resources/day7.txt", "utf-8");
console.log("Total sum: " + processOne(t).reduce((acc,it) => {acc += it; return acc;}, 0));
// console.log("Total sum: " + processTwo(t));
