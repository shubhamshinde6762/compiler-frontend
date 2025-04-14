class Solution {
    isMajorityElement(nums, target) {
        let firstIndex = nums.indexOf(target);
        if (firstIndex === -1) return false;
        return firstIndex + Math.floor(nums.length / 2) < nums.length && nums[firstIndex + Math.floor(nums.length / 2)] === target;
    }
}

// Handling input
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T, index = 0, testCases = [];

rl.on("line", function(line) {
    if (index === 0) {
        T = parseInt(line);
    } else {
        testCases.push(line);
    }
    index++;

    if (index > T * 3) {
        rl.close();
    }
});

rl.on("close", function() {
    let i = 0;
    for (let t = 1; t <= T; t++) {
        console.log(`TestCase-${t}`);
        let n = parseInt(testCases[i++]);
        let nums = testCases[i++].split(" ").map(Number);
        let target = parseInt(testCases[i++]);

        let sol = new Solution();
        console.log(sol.isMajorityElement(nums, target) ? "true" : "false");
    }
});