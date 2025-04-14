class ConfusingNumberChecker {
    isConfusingNumber(N) {
        const map = { 0: 0, 1: 1, 6: 9, 8: 8, 9: 6 };
        const invalidDigits = new Set([2, 3, 4, 5, 7]);

        let n = N;
        let newNumber = 0;

        while (n > 0) {
            let digit = n % 10;
            if (invalidDigits.has(digit)) return false;
            newNumber = newNumber * 10 + map[digit];
            n = Math.floor(n / 10);
        }
        return newNumber !== N;
    }
}

// Reading input (Node.js environment)
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on("line", function (line) {
    inputLines.push(line);
}).on("close", function () {
    let t = parseInt(inputLines[0]);
    let index = 1;
    let checker = new ConfusingNumberChecker();

    while (t-- > 0) {
        console.log(inputLines[index++]); // Print case label
        let n = parseInt(inputLines[index++]);
        console.log(checker.isConfusingNumber(n) ? "true" : "false");
    }
});