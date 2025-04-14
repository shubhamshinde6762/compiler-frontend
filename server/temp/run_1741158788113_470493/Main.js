class Solution {
    countElements(arr) {
        let exist = new Set(arr);
        return arr.filter(a => exist.has(a + 1)).length;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    let T = parseInt(input[0]);
    let index = 1;
    
    for (let tc = 1; tc <= T; tc++) {
        console.log(input[index]);  // Print TestCase name
        index++;
        let n = parseInt(input[index]);
        index++;
        let nums = input[index].split(" ").map(Number);
        index++;
        
        let sol = new Solution();
        let ans = sol.countElements(nums);
        console.log(ans);
    }
});