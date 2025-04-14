class Solution {
    largestUniqueNumber(nums) {
        let frequencyMap = new Map();

        for (let num of nums) {
            frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        }

        let largestUnique = -1;

        for (let [num, count] of frequencyMap) {
            if (count === 1 && num > largestUnique) {
                largestUnique = num;
            }
        }

        return largestUnique;
    }
}

// Handling input from stdin
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

    for (let t = 0; t < T; t++) {
        console.log(input[index]); // Keeping the string as requested
        index++;
        let n = parseInt(input[index]);
        index++;
        let nums = input[index].split(" ").map(Number);
        index++;

        let sol = new Solution();
        console.log(sol.largestUniqueNumber(nums));
    }
});