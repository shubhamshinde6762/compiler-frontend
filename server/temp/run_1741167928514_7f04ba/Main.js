class Solution {
    stringShift(s, shift) {
        let leftShifts = 0;
        for (let move of shift) {
            if (move[0] === 1) move[1] = -move[1];
            leftShifts += move[1];
        }

        let n = s.length;
        leftShifts = ((leftShifts % n) + n) % n;
        return s.slice(leftShifts) + s.slice(0, leftShifts);
    }
}

// Read input and process test cases
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let index = 0;
    const T = parseInt(inputLines[index++]); // Number of test cases

    for (let tc = 1; tc <= T; tc++) {
        console.log(inputLines[index++]); // Print test case label

        let s = inputLines[index++]; // Read string
        let [n, m] = inputLines[index++].split(" ").map(Number); // Read n (number of shifts), m (always 2)

        let shifts = [];
        for (let i = 0; i < n; i++) {
            let [dir, amt] = inputLines[index++].split(" ").map(Number);
            shifts.push([dir, amt]);
        }

        let solution = new Solution();
        console.log(solution.stringShift(s, shifts));
    }
});