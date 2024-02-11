const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let start = new Date();

    arr = input.toString().split("\n").map(element => element.split(" "));
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        console.log("Run nr "+i+" ud af "+arr.length);
        let conf = arr[i][0];
        let nums = arr[i][1].split(",");

        sum += count(conf, nums);
    }

    let end = new Date();

    console.log("Sum: "+sum);
    console.log("Tid brugt: "+((end-start)/1000)+" sekunder");
})

function count(conf, nums){
    if(conf.length == 0){
        if(nums.length == 0){
            return 1;
        }
        else{
            return 0;
        }
    }

    if(nums.length == 0){
        if(conf.includes("#")){
            return 0;
        }
        else{
            return 1;
        }
    }

    let result = 0;

    if(conf[0] == "." || conf[0] == "?"){
        result += count(conf.slice(1), nums);
    }

    if(conf[0] == "#" || conf[0] == "?"){
        if(nums[0] <= conf.length && !(conf.slice(0, nums[0]).includes(".")) && (nums[0] == conf.length || conf[nums[0]] != "#")){
            result += count(conf.slice(parseInt(nums[0])+1), nums.slice(1));
        }
    }

    return result;
}