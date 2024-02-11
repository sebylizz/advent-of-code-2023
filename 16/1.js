const fs = require('fs');
let arr;
let marked = [];

fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\r\n").map(element => element.split(""));
    for(let i = 0; i < arr.length; i++){
        arr[i].unshift('0');
        arr[i].push('0');
    }
    arr.unshift([]);
    arr.push([]);
    for(let i = 0; i < arr[1].length; i++){
        arr[0].push('0');
        arr[arr.length-1].push('0');
    }

    track(1, 1, 'e');
    
    let newarr = [];

    for(let i = 0; i < arr.length-2; i++){
        newarr.push([]);
        for(let j = 0; j < arr[i].length-2; j++){
            if(marked.some(element => element.slice(0, 2).toString() == [i+1, j+1].toString())){
                newarr[i].push('#');
            }
            else{
                newarr[i].push('.');
            }
        }
    }

    let count = new Set;
    for(let i = 0; i < marked.length; i++){
        count.add(marked[i].slice(0, 2).toString());
    }
    console.log(count.size);
})

function track(i, j, dir, prev){
    if(arr[i][j] == '0' || marked.some(e => e.toString() == [i, j, dir].toString())){
        return;
    }
    switch(dir){
        case 'n':
            marked.push([i, j, 'n']);
            switch(arr[i][j]){
                case '\\':
                    track(i, j-1, 'w', 'n');
                    break;
                case '/':
                    track(i, j+1, 'e', 'n');
                    break;
                case '-':
                    track(i, j+1, 'e', 'n');
                    track(i, j-1, 'w', 'n');
                    break;
                default:
                    track(i-1, j, 'n', 'n');
                    break;
            }
            break;
        case 'e':
            marked.push([i, j, 'e']);
            switch(arr[i][j]){
                case '\\':
                    track(i+1, j, 's', 'e');
                    break;
                case '/':
                    track(i-1, j, 'n', 'e');
                    break;
                case '|':
                    track(i-1, j, 'n', 'e');
                    track(i+1, j, 's', 'e');
                    break;
                default:
                    track(i, j+1, 'e', 'e');
                    break;
            }
            break;
        case 's':
            marked.push([i, j, 's']);
            switch(arr[i][j]){
                case '\\':
                    track(i, j+1, 'e', 's');
                    break;
                case '/':
                    track(i, j-1, 'w', 's');
                    break;
                case '-':
                    track(i, j+1, 'e', 's');
                    track(i, j-1, 'w', 's');
                    break;
                default:
                    track(i+1, j, 's', 's');
                    break;
            }
            break;
        case 'w':
            marked.push([i, j, 'w']);
            switch(arr[i][j]){
                case '\\':
                    console
                    track(i-1, j, 'n', 'w');
                    break;
                case '/':
                    track(i+1, j, 's', 'w');
                    break;
                case '|':
                    track(i-1, j, 'n', 'w');
                    track(i+1, j, 's', 'w');
                    break;
                default:
                    track(i, j-1, 'w', 'w');
                    break;
            }
            break;
    }
}