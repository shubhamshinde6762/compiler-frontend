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

let T, testCases = [], currentIndex = 0;

rl.on("line", (line) => {
    if (T === undefined) {
        T = parseInt(line);
    } else {
        testCases.push(line);
        if (testCases.length === T * 3) {
            rl.close();
        }
    }
});

rl.on("close", () => {
    let index = 0;
    for (let tc = 1; tc <= T; tc++) {
        console.log(testCases[index]); // Test case name
        index++;
        let s = testCases[index++];
        let n = parseInt(testCases[index++]);
        let shifts = [];

        for (let i = 0; i < n; i++) {
            let [dir, amt] = testCases[index++].split(" ").map(Number);
            shifts.push([dir, amt]);
        }

        let solution = new Solution();
        console.log(solution.stringShift(s, shifts));
    }
});