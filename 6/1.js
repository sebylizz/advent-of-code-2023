const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let time = arr[0].split(" ").map(element => (parseInt(element))).filter(element => !isNaN(element));
    let dist = arr[1].split(" ").map(element => (parseInt(element))).filter(element => !isNaN(element));

    let result = 1;

    for(let i = 0; i < time.length; i++){
        let times = 0;
        for(let j = 0; j < time[i]; j++){
            let remain = time[i]-j;
            let travelled = j*remain;
            if(travelled > dist[i]){
                times++;
            }
        }
        result *= times;
    }

    console.log(result);
})