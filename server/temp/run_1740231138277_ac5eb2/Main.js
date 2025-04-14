class Solution {
    validWordAbbreviation(word, abbr) {
        if (word.length < abbr.length) return false;
        let n = word.length, abbrSize = 0, i = 0;

        while (i < abbr.length) {
            if (abbr[i] === '0') return false;
            if (!isNaN(abbr[i])) {
                let startIdx = i;
                while (i < abbr.length && !isNaN(abbr[i])) i++;
                abbrSize += parseInt(abbr.substring(startIdx, i), 10);
            } else {
                if (abbrSize >= n || word[abbrSize] !== abbr[i]) return false;
                abbrSize++;
                i++;
            }
        }
        return n === abbrSize;
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T;
const testCases = [];
rl.on('line', (line) => {
    if (T === undefined) {
        T = parseInt(line.trim());
    } else {
        testCases.push(line.trim());
        if (testCases.length === T * 3) {
            rl.close();
        }
    }
});

rl.on('close', () => {
    const sol = new Solution();
    for (let i = 0; i < T; i++) {
        console.log(testCases[i * 3]);
        console.log(sol.validWordAbbreviation(testCases[i * 3 + 1], testCases[i * 3 + 2]) ? "true" : "false");
    }
});