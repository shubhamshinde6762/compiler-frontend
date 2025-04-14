class Solution {
    indexPairs(text, words) {
        let ans = [];
        for (let i = 0; i < words.length; i++) {
            let start = 0;
            let index = text.indexOf(words[i], start);
            while (index !== -1) {
                let indices = [];
                start = index + 1;
                indices.push(index);
                indices.push(index + words[i].length - 1);
                ans.push(indices);
                index = text.indexOf(words[i], start);
            }
        }
        ans.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return ans;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let currentLine = 0;

rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let T = parseInt(inputLines[currentLine++]);

    for (let t = 0; t < T; t++) {
        let s = inputLines[currentLine++];
        console.log(s);

        let text = inputLines[currentLine++];
        let words_count = parseInt(inputLines[currentLine++]);

        let words = [];
        for (let i = 0; i < words_count; i++) {
            words.push(inputLines[currentLine++]);
        }
        
        console.log(words)

        let sol = new Solution();
        let result = sol.indexPairs(text, words);

        for (let pair of result) {
            console.log(pair[0] + " " + pair[1]);
        }
    }
});