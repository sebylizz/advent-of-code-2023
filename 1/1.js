const fs = require('fs');
fs.readFile('input.txt', (err, inputD) => {
    if (err) throw err;
    let arr = inputD.toString().split("\n");
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