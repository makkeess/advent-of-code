const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./resources/day2.txt'),
    console: false
});

var valid = 0;
readInterface.on('line', l => {
    var split = l.split(" ");
    var pos1 = parseInt(split[0].split("-")[0]),
        pos2 = parseInt(split[0].split("-")[1]),
        letter = split[1].charAt(0),
        pass = split[2];

    console.log(letter + " " + pass.charAt(pos1 - 1) + " " + pass.charAt(pos2 - 1) + " " + pass)
    if ((letter === pass.charAt(pos1 - 1) && letter !== pass.charAt(pos2 - 1)) || 
        (letter !== pass.charAt(pos1 - 1) && letter === pass.charAt(pos2 - 1))) {
        valid += 1;
    } 

});

readInterface.on('close', () => {
    console.log("A total of: " + valid);
})