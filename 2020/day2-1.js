const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./resources/day2.txt'),
    console: false
});

String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}

var valid = 0;
readInterface.on('line', l => {
    var split = l.split(" ");
    var min = parseInt(split[0].split("-")[0]),
        max = parseInt(split[0].split("-")[1]),
        letter = split[1].charAt(0),
        pass = split[2];

    var cnt = pass.count(letter);
    if (min <= cnt && max >= cnt) {
        valid += 1;
    }
});

readInterface.on('close', () => {
    console.log("A total of: " + valid);
})