const fs = require('fs');
let arr;
fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\n");
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        arr[i] = "."+arr[i]+".";
        max = (max > arr[i].length) ? max : arr[i].length;
    }
    for(let i = 0; i < arr.length; i++){
        arr[i] = arr[i].padEnd(max, ".");
    }
    let pad = ".".padStart(max, ".");
    arr.push(pad);
    arr.unshift(pad);

    let coords = [];
    outer: for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 'S'){
                coords.push([i, j]);
                break outer;
            }
        }
    }
    
    coords.push(findnext(coords[0]));

    for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }

    while(coords[coords.length-1][0] != coords[0][0] || coords[coords.length-1][1] != coords[0][1]){
        let cur = coords[coords.length-1];
        let prev = coords[coords.length-2];
        let char = arr[cur[0]][cur[1]];
        switch(char){
            case '|':
                if(prev[0] < cur[0]){
                    coords.push([cur[0]+1, cur[1]]);
                    break;
                }
                else{
                    coords.push([cur[0]-1, cur[1]]);
                    break;
                }
            case '-':
                if(prev[1] < cur[1]){
                    coords.push([cur[0], cur[1]+1]);
                    break;
                }
                else{
                    coords.push([cur[0], cur[1]-1]);
                    break;
                }
            case 'F':
                if(prev[0] > cur[0]){
                    coords.push([cur[0], cur[1]+1]);
                    break;
                }
                else{
                    coords.push([cur[0]+1, cur[1]]);
                    break;
                }
            case 'J':
                if(prev[0] < cur[0]){
                    coords.push([cur[0], cur[1]-1]);
                    break;
                }
                else{
                    coords.push([cur[0]-1, cur[1]]);
                    break;
                }
            case '7':
                if(prev[0] > cur[0]){
                    coords.push([cur[0], cur[1]-1]);
                    break;
                }
                else{
                    coords.push([cur[0]+1, cur[1]]);
                    break;
                }
            case 'L':
                if(prev[0] < cur[0]){
                    coords.push([cur[0], cur[1]+1]);
                    break;
                }
                else{
                    coords.push([cur[0]-1, cur[1]]);
                    break;
                }
        }
    }
    console.log(coords);
    console.log((coords.length-1)/2);
});

function findnext(pos){
    if((arr[north(pos)[0]][north(pos)[1]] == '|' || arr[north(pos)[0]][north(pos)[1]] == "F" || arr[north(pos)[0]][north(pos)[1]] == "7")){
        return north(pos);
    }
    else if((arr[east(pos)[0]][east(pos)[1]] == '-' || arr[east(pos)[0]][east(pos)[1]] == "J" || arr[east(pos)[0]][east(pos)[1]] == "7")){
        return east(pos);
    }
    else if((arr[south(pos)[0]][south(pos)[1]] == '|' || arr[south(pos)[0]][south(pos)[1]] == "L" || arr[south(pos)[0]][south(pos)[1]] == "J")){
        return south(pos);
    }
    else if((arr[west(pos)[0]][west(pos)[1]] == '-' || arr[west(pos)[0]][west(pos)[1]] == "F" || arr[west(pos)[0]][west(pos)[1]] == "L")){
        return west(pos);
    }
    else{
        console.log("FEJL");
        return false;
    }
}

function north(pos){
    return [pos[0]-1, pos[1]];
}

function east(pos){
    return [pos[0], pos[1]+1];
}

function south(pos){
    return [pos[0]+1, pos[1]];
}

function west(pos){
    return [pos[0], pos[1]-1];
}