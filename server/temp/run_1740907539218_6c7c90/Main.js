class Solution {
    twoSumLessThanK(nums, k) {
        nums.sort((a, b) => a - b);
        let i = 0, j = nums.length - 1;
        let ans = -1;

        while (i < j) {
            if (nums[i] + nums[j] < k) {
                ans = Math.max(ans, nums[i] + nums[j]);
                i++;
            } else {
                j--;
            }
        }

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
        let s = inputLines[currentLine++].trim();
        console.log(s);  // Keeping s as requested
        let k = parseInt(inputLines[currentLine++]);
        let n = parseInt(inputLines[currentLine++]);
        let v = inputLines[currentLine++].split(" ").map(Number);

        let sol = new Solution();
        let result = sol.twoSumLessThanK(v, k);

        console.log(result);
    }
});