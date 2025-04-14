class Solution {
    answerString(word, numFriends) {
        if (numFriends === 1) return word;
        let idx = 0;
        let n = word.length;
        for (let i = 1, l = 1; i < n; i++) {
            if (word[i] === word[idx + l - 1]) {
                l++;
            } else if (word[i] < word[idx + l - 1]) {
                l = 1;
            } else {
                if (word[i - l + 1] >= word[i])
                    idx = i - l + 1;
                else
                    idx = i;
                l = 1;
            }
        }
        let extra = Math.max((numFriends - 1) - idx, 0);
        return word.substring(idx, n - extra);
    }
}

// Driver code
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let inputLines = [];
rl.on('line', line => inputLines.push(line));
rl.on('close', () => {
    let T = parseInt(inputLines[0].trim());
    let lineIndex = 1;
    for (let tc = 0; tc < T; tc++) {
        let name = inputLines[lineIndex++].trim();
        console.log(name);
        let word = inputLines[lineIndex++].trim();
        let x = parseInt(inputLines[lineIndex++].trim());
        let sol = new Solution();
        console.log(sol.answerString(word, x));
    }
});