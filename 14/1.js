const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\n").map(element => element.split(""));
    
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 'O'){
                up(arr, i, j);
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
    console.log(sum)
})

function up(arr, i, j){
    if(i > 0 && arr[i-1][j] == '.'){
        arr[i][j] = '.';
        arr[i-1][j] = 'O';
        up(arr, i-1, j)}
    }