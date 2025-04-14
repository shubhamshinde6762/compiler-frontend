class Solution {
    calculateTime(keyboard, word) {
        let keyIndices = new Array(26).fill(-1);

        for (let i = 0; i < keyboard.length; i++) {
            keyIndices[keyboard.charCodeAt(i) - 97] = i;
        }

        let prev = 0, result = 0;

        for (let c of word) {
            result += Math.abs(prev - keyIndices[c.charCodeAt(0) - 97]);
            prev = keyIndices[c.charCodeAt(0) - 97];
        }
        return result;
    }
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let T = parseInt(inputLines[0], 10);
    let index = 1;
    
    for (let t = 1; t <= T; t++) {
        console.log(inputLines[index]);  // Ensures proper formatting
        let keyboard = inputLines[index + 1];
        let word = inputLines[index + 2];
        let solution = new Solution();
        console.log(solution.calculateTime(keyboard, word));
        index += 3;
    }
});