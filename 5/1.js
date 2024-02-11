const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let seeds = arr.shift().split(" ").slice(1).map(element => parseInt(element));
    let nums = [];
    let p = -1;

    arr = arr.filter(element => element.length > 0);
    for(let i = 0; i < arr.length; i++){
        if(!Number.isInteger(parseInt(arr[i][0]))){
            nums.push([]);
            p++;
        }
        else if(i < arr.length && Number.isInteger(parseInt(arr[i][0]))){
            let tempnums = arr[i].split(" ").map(element => parseInt(element));
            nums[p].push(tempnums);
        }
    }
    let results = [];
    for(let i = 0; i < seeds.length; i++){
        let numm = seeds[i];
        console.log("Seed: "+seeds[i]);
        for(let j = 0; j < nums.length; j++){
            loop: for(let k = 0; k < nums[j].length; k++){
                if(numm >= nums[j][k][1] && numm <= nums[j][k][1]+nums[j][k][2]){
                    let tt = nums[j][k][1] - numm;
                    let temp = nums[j][k][0] - tt;
                    console.log(tt+": ændrer "+numm+" til "+temp);
                    numm = temp;
                    break loop;
                }
            }
        }
        results.push(numm);
        console.log("\n");
    }
    console.log(Math.min(...results));
})