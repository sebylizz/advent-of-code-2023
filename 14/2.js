const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\n").map(element => element.split(""));

    sums = [];
    sums.push(0);
    for(let q = 0; q < 1000; q++){
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i].length; j++){
                if(arr[i][j] == 'O'){
                    north(arr, i, j);
                }
            }
        }
    
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i].length; j++){
                if(arr[i][j] == 'O'){
                    west(arr, i, j);
                }
            }
        }
    
        for(let i = arr.length-1; i >= 0; i--){
            for(let j = 0; j < arr[i].length; j++){
                if(arr[i][j] == 'O'){
                    south(arr, i, j);
                }
            }
        }
    
        for(let i = 0; i < arr.length; i++){
            for(let j = arr[i].length-1; j >= 0; j--){
                if(arr[i][j] == 'O'){
                    east(arr, i, j);
                }
            }
        }
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 'O'){
                sum += arr.length-i;
            }
        }
    }
    sums.push(sum);
    console.log(q, sums[q+1], sums[q+1]-sums[q]);
    }
})

function north(arr, i, j){
    if(i > 0 && arr[i-1][j] == '.'){
        arr[i][j] = '.';
        arr[i-1][j] = 'O';
        north(arr, i-1, j);
    }
}

function east(arr, i, j){
    if(j < arr[i].length-1 && arr[i][j+1] == '.'){
        arr[i][j] = '.';
        arr[i][j+1] = 'O';
        east(arr, i, j+1);
    }
}

function south(arr, i, j){
    if(i < arr.length-1 && arr[i+1][j] == '.'){
        arr[i][j] = '.';
        arr[i+1][j] = 'O';
        south(arr, i+1, j);
    }
}

function west(arr, i, j){
    if(j > 0 && arr[i][j-1] == '.'){
        arr[i][j] = '.';
        arr[i][j-1] = 'O';
        west(arr, i, j-1);
    }
}