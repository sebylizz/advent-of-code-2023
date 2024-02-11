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

    for(let i = 1; i < newarr.length; i++){
        for(let j = 1; j < newarr[i].length; j++){
            if(newarr[i][j] == "*"){
                let num1 = [], num2 = [];
                et: for(let a = -1; a <= 1; a++){
                    for(let b = -1; b <= 1; b++){
                        if(!isNaN(newarr[i+a][j+b])){
                            num1.push(newarr[i+a][j+b])
                            newarr[i+a][j+b] = ".";
                            let l = 1, r = 1;
                            while(!isNaN(newarr[i+a][j+b-l])){
                                num1.unshift(newarr[i+a][j+b-l]);
                                newarr[i+a][j+b-l] = ".";
                                l++;
                            }
                            while(!isNaN(newarr[i+a][j+b+r])){
                                num1.push(newarr[i+a][j+b+r]);
                                newarr[i+a][j+b+r] = ".";
                                r++;
                            }
                            num1 = parseInt(num1.join(""));                            
                            break et;
                        }                       
                    }
                }
                to: for(let a = 1; a >= -1; a--){
                    for(let b = 1; b >= -1; b--){
                        if(!isNaN(newarr[i+a][j+b])){
                            num2.push(newarr[i+a][j+b])
                            newarr[i+a][j+b] = ".";
                            let l = 1, r = 1;
                            while(!isNaN(newarr[i+a][j+b-l])){
                                num2.unshift(newarr[i+a][j+b-l]);
                                newarr[i+a][j+b-l] = ".";
                                l++;
                            }
                            while(!isNaN(newarr[i+a][j+b+r])){
                                num2.push(newarr[i+a][j+b+r]);
                                newarr[i+a][j+b+r] = ".";
                                r++;
                            }
                            num2 = parseInt(num2.join(""));
                            break to;
                        }                        
                    }
                }
                console.log(num1, num2);
                if(!isNaN(num1) && !isNaN(num2)){
                    nums.push(num1*num2);
                }
            }
        }
    }

    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        if(!isNaN(nums[i])){
            //console.log(nums[i]);
            sum += nums[i];
        }

    }
    console.log(sum)
})