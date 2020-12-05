const fs = require("fs");
let required = {
  "byr": str => str.length === 4 && /^\d+$/.test(str) && 1920 <= parseInt(str) && parseInt(str) <= 2002,
  "iyr": str => str.length === 4 && /^\d+$/.test(str) && 2010 <= parseInt(str) && parseInt(str) <= 2020, 
  "eyr": str => str.length === 4 && /^\d+$/.test(str) && 2020 <= parseInt(str) && parseInt(str) <= 2030, 
  "hgt": str => {
    var metric = str.substring(str.length-2, str.length);
    var length = parseInt(str.substring(0, str.length - 2));
    if (!/^\d+$/.test(length)) {
      return false;
    }

    if ("cm" === metric) {
      return 150 <= length && length <= 193; 
    } else if ("in" === metric) {
      return 59 <= length && length <= 76; 
    }
  }, 
  "hcl": str => /^#[0-9a-f]{6}$/i.test(str), 
  "ecl": str => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str), 
  "pid": str => /^\d+$/.test(str) && str.length === 9
};
let containsAll = (arr, target) => target.every(v => arr.includes(v));
let matchesRules = data => Object.keys(data).every(k => {
  var func = required[k];
  if (func) {
    var res = func(data[k]);
    if (!res) {
      console.log(k + " evaluated to false");
    }
    // console.log("Evaluating: " + k + " result= " + res)
    return res;
  }
  return true;
});

var processOne = (inp) => {
  var spl = inp.split("\r\n\r\n");

  return spl.reduce((acc, group) => {
      var data = group.split("\r\n").join(" ")
        .split(" ")
        .reduce((acc, it) => {
          var spl = it.split(":");
          acc[spl[0]] = spl[1];
          return acc;
        }, {});

        if (containsAll(Object.keys(data), Object.keys(required)) && matchesRules(data)) {
          acc += 1;
        }
        return acc;
    }, 0);
};

var t = fs.readFileSync("./resources/day4.txt", 'utf-8');
console.log(processOne(t));