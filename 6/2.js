const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let time = parseInt(arr[0].split(" ").splice(1).filter(element => element != '').join(""));
    let dist = parseInt(arr[1].split(" ").splice(1).filter(element => element != '').join(""));

    let result = 1;

    let times = 0;
    for(let j = 0; j < time; j++){
        let remain = time-j;
        let travelled = j*remain;
        if(travelled > dist){
            times++;
        }
    }
    result *= times;

    console.log(result);
})