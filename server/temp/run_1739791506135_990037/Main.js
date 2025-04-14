const readline = require("readline");

class Solution {
    findMissingRanges(nums, lower, upper) {
        if (nums.length === 0) return [[lower, upper]];
        let ans = [];
        if (nums[0] !== lower) ans.push([lower, nums[0] - 1]);

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1] + 1) 
                ans.push([nums[i - 1] + 1, nums[i] - 1]);
        }

        if (nums[nums.length - 1] !== upper) 
            ans.push([nums[nums.length - 1] + 1, upper]);

        return ans;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    let index = 0;
    let T = parseInt(input[index++]);

    for (let tc = 0; tc < T; tc++) {
        console.log(input[index++]);
        let lower = parseInt(input[index++]);
        let upper = parseInt(input[index++]);
        let n = parseInt(input[index++]);
        let nums = n > 0 ? input[index++].split(" ").map(Number) : [];

        let sol = new Solution();
        let res = sol.findMissingRanges(nums, lower, upper);
        res.forEach(r => console.log(r[0], r[1]));
    }
    
    console.log()
});