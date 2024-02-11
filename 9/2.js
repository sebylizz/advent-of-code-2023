const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n").map(element => element.split(" ").map(element => parseInt(element)));
    let sum = 0;

    for(let i = 0; i < arr.length; i++){
        let temparr = [];
        temparr.push(arr[i]);
        let j = 0;
        while(1){
            let tmp = 0;
            for(let q = 0; q < temparr[j].length; q++){
                if(temparr[j][q] == 0){
                    tmp++;
                }
                else{
                    break;
                }
            }
            if(tmp == temparr[j].length){
                break;
            }
            let newline = [];
            for(let x = 0; x < temparr[j].length-1; x++){
                newline.push(temparr[j][x+1]-temparr[j][x]);
            }
            temparr.push(newline);
            j++;
        }
        sum += finalize(temparr);
    }

    console.log(sum);
});

function finalize(arr){
    arr[arr.length-1].unshift(0);
    for(let i = arr.length-2; i >= 0; i--){
        arr[i].unshift(arr[i][0]-arr[i+1][0]);
    }
    return arr[0][0];
}