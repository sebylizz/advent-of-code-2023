const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let newarr = [];
    let nums = [];

    for(let i = 0; i < arr.length; i++){
        newarr.push([]);
        let chars = arr[i].split("");
        newarr[i].push(".");
        for(let j = 0; j < chars.length; j++){
            newarr[i].push(chars[j]);
        }
        newarr[i].push(".");
    }

    newarr.unshift([]);
    newarr.push([]);
    for(let i = 0; i < newarr[1].length; i++){
        newarr[0].push(".");
        newarr[newarr.length-1].push(".");
    }

    for(let i = 0; i < newarr.length; i++){
        for(let j = 0; j < newarr[i].length; j++){
            if(!isNaN(newarr[i][j])){
                let l = 1, r = 1;
                if((newarr[i - 1][j - 1] != "." && isNaN(newarr[i - 1][j - 1])) ||
                (newarr[i - 1][j] != "." && isNaN(newarr[i - 1][j])) ||
                (newarr[i - 1][j + 1] != "." && isNaN(newarr[i - 1][j + 1])) ||
                (newarr[i][j - 1] != "." && isNaN(newarr[i][j - 1])) ||
                (newarr[i][j + 1] != "." && isNaN(newarr[i][j + 1]))||
                (newarr[i + 1][j - 1] != "." && isNaN(newarr[i + 1][j - 1]))||
                (newarr[i + 1][j] != "." && isNaN(newarr[i + 1][j]))||
                (newarr[i + 1][j + 1] != "." && isNaN(newarr[i + 1][j + 1]))){
                    let temp = [newarr[i][j]];
                    while(j-l > 0 &&!isNaN(newarr[i][j-l])){
                        temp.unshift(newarr[i][j-l]);
                        l++;
                    }
                    while(j+r < newarr[i].length && !isNaN(newarr[i][j+r])){
                        temp.push(newarr[i][j+r]);
                        r++;
                    }
                    nums.push(parseInt(temp.join("")));
                    j += r-1;
                }
            }
        }
    }

    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        if(!isNaN(nums[i])){
            sum += nums[i];
        }

    }
    console.log(sum)
})