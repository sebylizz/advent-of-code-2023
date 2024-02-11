const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\n");
    let fig = [[]];
    let i = 0, j = 0;
    while(i < arr.length){
        if(arr[i].toString() != ""){
            fig[j].push(arr[i]);
        }
        else{
            fig.push([]);
            j++;
        }
        i++;
    }

    let sum = 0;

    for(let i = 0; i < fig.length; i++){
        for(let j = 0; j < fig[i].length-1; j++){
            if(findh(fig[i], j, j+1)){
                sum += 100 * (j+1);
                break;
            }
        }
        for(let j = 0; j < fig[i][0].length-1; j++){
            if(findv(fig[i], j, j+1)){
                sum += (j+1);
                break;
            }
        }
    }
    
    console.log(sum);
})

function findh(fig, up, down){
    while(up >= 0 && down < fig.length){
        if(fig[up].toString() == fig[down].toString()){
            return findh(fig, up-1, down+1);
        }
        else{
            return false;
        }
    }
    return true;
}

function findv(fig, left, right){
    while(left >= 0 && right < fig[0].length){
        let leftl = [], rightl = [];
        for(let i = 0; i < fig.length; i++){
            leftl.push(fig[i][left]);
            rightl.push(fig[i][right]);
        }
        if(leftl.join("") == rightl.join("")){
            return findv(fig, left-1, right+1);
        }
        else{
            return false;
        }
    }
    return true;
}