class Solution {
    shortestDistance(wordsDict, word1, word2) {
        let p1 = -1, p2 = -1;
        let n = wordsDict.length, ans = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < n; i++) {
            if (wordsDict[i] === word1) 
                p1 = i;
            else if (wordsDict[i] === word2) 
                p2 = i;

            if (p1 !== -1 && p2 !== -1) 
                ans = Math.min(ans, Math.abs(p1 - p2));
        }
        return ans;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = 0, currentTest = 0, lines = [];
rl.on("line", (line) => {
    lines.push(line.trim());
});

rl.on("close", () => {
    T = parseInt(lines[0]);
    let index = 1;
    
    for (let t = 0; t < T; t++) {
        let caseName = lines[index++];
        console.log(caseName);

        let n = parseInt(lines[index++]);
        let wordsDict = lines[index++].split(" ");
        let word1 = lines[index++];
        let word2 = lines[index++];

        let solution = new Solution();
        console.log(solution.shortestDistance(wordsDict, word1, word2));
    }
});