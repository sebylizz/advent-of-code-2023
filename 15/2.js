const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split(",").map(element => element.split(""));
    let boxs = [];
    for(let q = 0; q < 256; q++){
        boxs.push([]);
    }
    for(let i = 0; i < arr.length; i++){
        let label = "";
        let cur = 0;
        while(arr[i][0] != '-' && arr[i][0] != '='){
            label = [label, arr[i][0]].join("");
            cur += arr[i].shift().charCodeAt(0);
            cur *= 17;
            cur %= 256;
        }
        let op = arr[i].shift();
        let id = boxs[cur].findIndex(element => element.split(" ")[0] == label);
        switch(op){
            case '-':
                if(id != -1){
                    boxs[cur].splice(id, 1);
                }
                break;
            case '=':
                if(id != -1){
                    boxs[cur].splice(id, 1, [label, arr[i].toString()].join(" "));
                }
                else{
                    boxs[cur].push([label, arr[i].toString()].join(" "));
                }
                break;

        }
    }
    let sum = 0;
    for(let i = 0; i < boxs.length; i++){
        for(let j = 0; j < boxs[i].length; j++){
            let temp = (i+1) * (j+1) * boxs[i][j].split(" ")[1];
            sum += temp;
        }
    }
    console.log(sum);
})