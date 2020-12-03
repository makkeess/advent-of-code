const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./resources/day3.txt"),
  console: false,
});

var lines = [];
readInterface.on("line", (l) => {
  lines.push(l);
});


var counterAlg = (stepsR, stepsD) => {
    var red = lines.reduce((acc, line) => {
        if (1 === acc.currStepD % stepsD) {
            acc.currStepD += 1;
            return acc;
        }
        
        if ('#' === line.charAt(acc.currStepR)) {
            acc.cnt += 1;
        }

        var next = acc.currStepR + stepsR;
        if (next > acc.lineLength) {
            next = Math.abs(acc.lineLength - next) - 1;
        }

        acc.currStepR = next;
        acc.currStepD += 1;
        return acc;
      }, {
        currStepR: 0,
        currStepD: 0,
        lineLength: lines[0].length - 1,
        cnt: 0,
      });
      return red.cnt;
}

var alg = () => {
    var total = [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2]
    ]
    .reduce((acc,inp) => {
        var c = counterAlg(inp[0], inp[1]);
        console.log("input=" + inp + " cnt= " + c);
        return acc * c;
    }, 1)

    console.log(total);
};

readInterface.on("close", alg);
