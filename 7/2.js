const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    let arr = input.toString().split("\n");
    let hands = [];
    for(let i = 0; i < arr.length; i++){
        let hand = arr[i].split(" ")[0];
        let bet = parseInt(arr[i].split(" ")[1]);
        hands.push([hand, bet, 0, 0, 0]);
        let js = 0;
        for(let j = 0; j < hand.length; j++){
            let max = 0;
            if(hand[j] == 'J'){
                js++;
            }
            for(let q = 0; q < hand.length; q++){
                if(hand[j] != 'J' && (hand[q] == hand[j] || hand[q] == 'J')){
                    max++;
                }
            }
            if(max > hands[i][2]){
                hands[i][2] = max;
                hands[i][3] = charconv(hand[j]);
            }
        }
        if(js > hands[i][2]){
            hands[i][2] = js;
            hands[i][3] = 1;
        }
        if(hands[i][2] == 2){
            hands[i][4] = 0;
            let max = 1;
            for(let j = 0; j < hands[i].length; j++){
                if(hand[j] != 'J' && charconv(hand[j]) != 1){
                    for(let q = 0; q < j; q++){
                        if(hand[q] == hand[j] && charconv(hand[q]) != hands[i][3]){
                            max++;
                        }
                    }
                    if(max > hands[i][4]){
                        hands[i][4] = max;
                    }
                }
            }
        }
        if(hands[i][2] == 3){
            hands[i][4] = 0;
            let max = 1;
            for(let j = 0; j < hands[i].length; j++){
                if(hand[j] != 'J' && charconv(hand[j]) != 1){
                    for(let q = 0; q < j; q++){
                        if(hand[q] == hand[j] && charconv(hand[q]) != hands[i][3]){
                            max++;
                        }
                    }
                    if(max > hands[i][4]){
                        hands[i][4] = max;
                    }
                }
            }
        }
    }

    var sortedHands = hands.sort(function(a, b) {
        if(a[2] == 2 && b[2] == 2 && a[4] != b[4]){
            return a[4] - b[4];
        }
        if(a[2] == 3 && b[2] == 3 && a[4] != b[4]){
            return a[4] - b[4];
        }
        if(a[2] == b[2]){
            for(let i = 0; i < a[0].length; i++){
                if(charconv(a[0][i]) != charconv(b[0][i])){
                    return charconv(a[0][i]) - charconv(b[0][i]);
                }
            }
        }
        return a[2] - b[2];
    });

    let sum = 0;
    for(let i = 0; i < sortedHands.length; i++){
        console.log(sortedHands[i]+" giver plus "+(i+1)*sortedHands[i][1]);
        sum += (i+1) * sortedHands[i][1];
    }
    console.log(sum);
})

function charconv(inp){
    switch(inp){
        case 'T':
            return 10;
        case 'J':
            return 1;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
        default:
            return parseInt(inp);
    }
}