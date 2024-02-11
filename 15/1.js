const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split(",");
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        let cur = 0;
        for(let j = 0; j < arr[i].length; j++){
            cur += arr[i][j].charCodeAt(0);
            cur *= 17;
            cur %= 256;
        }
        sum += cur;
    }
    console.log(sum);
})