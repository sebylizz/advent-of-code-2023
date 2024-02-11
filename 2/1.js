const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let results = [];

    for(let i = 0; i < arr.length; i++){
        let nr = arr[i].substring(5).split(":")[0];
        let maxred = 0, maxgreen = 0, maxblue = 0;
        let temparr = arr[i].split(":")[1].split(";");

        for(let j = 0; j < temparr.length; j++){
            let col = temparr[j].split(",").join("").split("\r").join("").split(" ");
            if(col.includes("red")){
                maxred = Math.max(maxred, (col[col.indexOf("red")-1]));
            }
            if(col.includes("green")){
                maxgreen = Math.max(maxgreen, (col[col.indexOf("green")-1]));
            }
            if(col.includes("blue")){
                maxblue = Math.max(maxblue, (col[col.indexOf("blue")-1]));
            }
        }
        if(maxred <= 12 && maxgreen <= 13 && maxblue <= 14){
            results.push(nr);
        }
    }
    let sum = 0;
    for(let i = 0; i < results.length; i++){
        sum += parseInt(results[i]);
    }
    console.log(sum)
})


//Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?