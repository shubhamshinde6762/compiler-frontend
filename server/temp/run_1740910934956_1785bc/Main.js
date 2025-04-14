class Solution {
    numberOfDays(year, month) {
        if (month === 2) return 28 + (year % 400 === 0 ? 1 : (year % 100 !== 0 && year % 4 === 0 ? 1 : 0));
        return 31 - ((month <= 7) ^ (month & 1));
    }
}

// Reading input and running test cases
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let T, current = 0, testCases = [];

rl.on('line', (line) => {
    if (T === undefined) {
        T = parseInt(line);
    } else {
        testCases.push(line);
        if (testCases.length === T * 3) {
            rl.close();
        }
    }
}).on('close', () => {
    let sol = new Solution();
    for (let i = 0; i < T; i++) {
        console.log(testCases[i * 3]); // Print string input
        let year = parseInt(testCases[i * 3 + 1]);
        let month = parseInt(testCases[i * 3 + 2]);
        console.log(sol.numberOfDays(year, month));
    }
});