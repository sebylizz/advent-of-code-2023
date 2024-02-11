const fs = require('fs');
let arr;
let marked = [];
let answers = [];

fs.readFile('input.txt', (err, input) => {
    arr = input.toString().split("\r\n").map(element => element.split(""));
    let start = new Date();
    for (let i = 0; i < arr.length; i++) {
        arr[i].unshift('0');
        arr[i].push('0');
    }
    arr.unshift([]);
    arr.push([]);
    for (let i = 0; i < arr[1].length; i++) {
        arr[0].push('0');
        arr[arr.length - 1].push('0');
    }

    console.log(arr.length - 1);
    for (let q = 1; q < arr.length - 1; q++) {
        console.log("Run #" + q);
        tracking(1, q, 's');
        tracking(arr.length - 1, q, 'n');
        tracking(q, 1, 'e');
        tracking(q, arr[q].length - 1, 'w');
    }

    let end = new Date();
    console.log("Tid:", (end-start)/1000);
    console.log(Math.max(...answers));
});

function tracking(starti, startj, startdir) {
    marked = [];
    track(starti, startj, startdir);
    let newarr = Array.from({ length: arr.length - 2 }, () => Array(arr[0].length - 2).fill('.'));

    for (let i = 0; i < marked.length; i++) {
        const [x, y] = marked[i].slice(0, 2);
        newarr[x - 1][y - 1] = '#';
    }

    answers.push(new Set(marked.map(point => point.slice(0, 2).toString())).size);
}

function track(i, j, dir, prev) {
    const currentElement = arr[i][j];

    if (currentElement === '0' || marked.some(e => arraysEqual(e, [i, j, dir]))) {
        return;
    }

    switch (dir) {
        case 'n':
            marked.push([i, j, 'n']);
            switch (currentElement) {
                case '\\':
                    track(i, j - 1, 'w', 'n');
                    break;
                case '/':
                    track(i, j + 1, 'e', 'n');
                    break;
                case '-':
                    track(i, j + 1, 'e', 'n');
                    track(i, j - 1, 'w', 'n');
                    break;
                default:
                    track(i - 1, j, 'n', 'n');
                    break;
            }
            break;
        case 'e':
            marked.push([i, j, 'e']);
            switch (currentElement) {
                case '\\':
                    track(i + 1, j, 's', 'e');
                    break;
                case '/':
                    track(i - 1, j, 'n', 'e');
                    break;
                case '|':
                    track(i - 1, j, 'n', 'e');
                    track(i + 1, j, 's', 'e');
                    break;
                default:
                    track(i, j + 1, 'e', 'e');
                    break;
            }
            break;
        case 's':
            marked.push([i, j, 's']);
            switch (currentElement) {
                case '\\':
                    track(i, j + 1, 'e', 's');
                    break;
                case '/':
                    track(i, j - 1, 'w', 's');
                    break;
                case '-':
                    track(i, j + 1, 'e', 's');
                    track(i, j - 1, 'w', 's');
                    break;
                default:
                    track(i + 1, j, 's', 's');
                    break;
            }
            break;
        case 'w':
            marked.push([i, j, 'w']);
            switch (currentElement) {
                case '\\':
                    track(i - 1, j, 'n', 'w');
                    break;
                case '/':
                    track(i + 1, j, 's', 'w');
                    break;
                case '|':
                    track(i - 1, j, 'n', 'w');
                    track(i + 1, j, 's', 'w');
                    break;
                default:
                    track(i, j - 1, 'w', 'w');
                    break;
            }
            break;
    }
}

function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
