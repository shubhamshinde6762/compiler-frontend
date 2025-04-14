class Solution {
    maxNumberOfApples(arr) {
        arr.sort((a, b) => a - b);
        let sum = 5000, count = 0;

        for (let i = 0; i < arr.length; i++) {
            if (sum - arr[i] >= 0) {
                count++;
                sum -= arr[i];
            } else {
                break;
            }
        }
        return count;
    }
}

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let input = [], T, index = 0;

rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    T = parseInt(input[index++]);

    for (let i = 0; i < T; i++) {
        console.log(input[index++]);  // Read and print testcase identifier
        let n = parseInt(input[index++]);
        let weights = input[index++].split(" ").map(Number);

        let solution = new Solution();
        console.log(solution.maxNumberOfApples(weights));
    }
});