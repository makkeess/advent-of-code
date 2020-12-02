const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./resources/day1-1.txt'),
    console: false
});

var n1 = [];
readInterface.on('line', l => {
    n1.push(parseInt(l));
});

readInterface.on('close', () => {
    var i,j,k;
    var done = false;
    for (i = 0; i < n1.length; i++) {
        for (j = 0; j < n1.length; j++) {
            for (k = 0; k < n1.length; k++) {
                if (n1[i] + n1[j] + n1[k] == 2020) {
                    console.log("Numbers are: " + n1[i] + ", " + n1[j] + " and " + n1[k] + " answer: " + n1[i] * n1[j] * n1[k]);
                    done = true;
                    break;
                }
            }
            if (done)
                break;
        }
        if (done)
            break;
    }
})