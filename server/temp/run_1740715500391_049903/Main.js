class Solution {
    sumOfDigits(nums) {
        let x = Math.min(...nums);
        let p = 0;

        while (x > 0) {
            p ^= x % 10 % 2;
            x = Math.floor(x / 10);
        }

        return Number(!p);
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
        let _ = inputLines[currentLine++];  // Read and discard string input
        console.log(_)
        let n = parseInt(inputLines[currentLine++]);
        let nums = inputLines[currentLine++].split(" ").map(Number);

        let sol = new Solution();
        console.log(sol.sumOfDigits(nums));
    }
});