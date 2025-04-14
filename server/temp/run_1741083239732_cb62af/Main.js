class Solution {
    dietPlanPerformance(calories, k, lower, upper) {
        let n = calories.length;
        let points = 0, current = 0;

        for (let i = 0; i < n; i++) {
            current += calories[i];
            if (i - k >= 0) current -= calories[i - k];
            if (i - k + 1 >= 0) {
                if (current < lower) points -= 1;
                if (current > upper) points += 1;
            }
        }
        return points;
    }
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    let index = 0;
    let T = parseInt(input[index++]);

    while (T-- > 0) {
        let testCaseID = input[index++].trim();
        console.log(testCaseID);  // Print test case ID

        let n = parseInt(input[index++]);
        let calories = input[index++].split(" ").map(Number);
        let k = parseInt(input[index++]);
        let lower = parseInt(input[index++]);
        let upper = parseInt(input[index++]);

        let sol = new Solution();
        console.log(sol.dietPlanPerformance(calories, k, lower, upper));
    }
});