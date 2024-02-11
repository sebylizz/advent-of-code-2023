const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    if (err) throw err;

    let trans = [null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    let arr = input.toString().split("\n");

    for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
        for (let k = 0; k < trans.length; k++){
            while (arr[i].includes(trans[k])) {
                arr[i] = arr[i].replace(trans[k], trans[k][0]+k+trans[k][trans[k].length-1]);
            }
        }
    }

    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        let l = 0, r = arr[i].length-1;
        while(isNaN(parseInt(arr[i][l]))){
            l++;
        }
        while(isNaN(parseInt(arr[i][r]))){
            r--;
        }
        let temp = parseInt([arr[i][l], arr[i][r]].join(""));
        sum += temp;
    }
    console.log(sum);
})