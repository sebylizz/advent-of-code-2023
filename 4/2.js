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
                temp++;
            }
        }
        nums[i].unshift(temp);
        nums[i].unshift(1);
    }
    for(let i = 0; i < nums.length; i++){
        for(y = 0; y < nums[i][0]; y++){
            for(let j = 0; j < nums[i][1]; j++){
                nums[i+j+1][0] = nums[i+j+1][0] + 1;
            }
        }
        sum += nums[i][0];
    }
    console.log(sum);
})