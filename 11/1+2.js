const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\n").map(element => element.split(""));

    let coords = [];

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == '#'){
                coords.push([i, j]);
            }
        }
    }

    let sum1 = 0;
    for(let i = 0; i < coords.length; i++){
        for(let j = i; j < coords.length; j++){
            sum1 += gallen(coords[i], coords[j]);
        }
    }

    console.log(sum1);

    for(let i = 0; i < arr[0].length; i++){
        for(let j = 0; j < arr.length; j++){
            if(arr[j][i] == "#"){
                break;
            }
            if(j == arr.length-1){
                for(let a = 0; a < arr.length; a++){
                    arr[a].splice(i, 0, ".");
                }
                i++;
            }
        }
    }
    for(let i = 0; i < arr.length; i++){
        if(arr[i].some(element => element == "#")){
            continue;
        }
        else{
            arr.splice(i, 0, arr[i]);
            i++;
        }
    }

    coords = [];

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == '#'){
                coords.push([i, j]);
            }
        }
    }

    let sum2 = 0;
    for(let i = 0; i < coords.length; i++){
        for(let j = i; j < coords.length; j++){
            sum2 += gallen(coords[i], coords[j]);
        }
    }

    console.log(sum2);

    console.log((sum2-sum1)*999999+sum1)
})

function gallen(a, b){
    return Math.abs(b[0]-a[0]) + Math.abs(b[1]-a[1]);
}