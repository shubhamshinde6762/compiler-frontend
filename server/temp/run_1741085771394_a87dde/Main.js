class Solution {
    countLetters(S) {
        let total = 1, count = 1;
        for (let i = 1; i < S.length; i++) {
            if (S[i] === S[i - 1]) {
                count++;
            } else {
                count = 1;
            }
            total += count;
        }
        return total;
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    let T = parseInt(input[0], 10);
    let solution = new Solution();
    let index = 1;
    for (let i = 1; i <= T; i++) {
        console.log(input[index]); // Print "TestCase-X"
        console.log(solution.countLetters(input[index + 1]));
        index += 2;
    }
});