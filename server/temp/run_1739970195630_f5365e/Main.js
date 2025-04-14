class Solution {
    generatePossibleNextMoves(s) {
        let moves = [];
        for (let i = 0; i < s.length - 1; i++) {
            if (s[i] === '+' && s[i + 1] === '+') {
                let newStr = s.substring(0, i) + "--" + s.substring(i + 2);
                moves.push(newStr);
            }
        }
        return moves;
    }
}

// Input Handling
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let t;
let testCases = [];

rl.on('line', (line) => {
    if (t === undefined) {
        t = parseInt(line);
    } else {
        testCases.push(line);
        if (testCases.length === t * 2) {
            rl.close();
        }
    }
}).on('close', () => {
    let solution = new Solution();
    for (let i = 0; i < t; i++) {
        console.log(testCases[i * 2]);  // Test case identifier
        let results = solution.generatePossibleNextMoves(testCases[i * 2 + 1]);
        console.log(results.join(" "));
    }
});