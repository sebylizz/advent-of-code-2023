const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let nums = [];
    let svar = [];
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        nums.push(arr[i].split(":")[1].split("|")[1].split(" ").filter(element => element != '').map(element => parseInt(element)));
        svar.push(arr[i].split(":")[1].split("|")[0].split(" ").filter(element => element != '').map(element => parseInt(element)));
        let temp = 0;
        for(let j = 0; j < nums[i].length; j++){
            if(svar[i].includes(nums[i][j])){
                temp = (temp == 0) ? 1: (temp*2);
            }
        }
        sum += temp;
    }
    console.log(sum);
})