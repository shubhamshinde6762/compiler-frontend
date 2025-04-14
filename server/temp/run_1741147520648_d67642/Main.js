class Solution {
    toHexspeak(num) {
        let n = BigInt(num).toString(16).toUpperCase(); // Convert to hex
        n = n.replace(/0/g, 'O').replace(/1/g, 'I'); // Replace 0->O, 1->I
        
        return /^[A-FIO]+$/.test(n) ? n : "ERROR"; // Check valid Hexspeak
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
    let T = parseInt(input[0]); // Number of test cases
    let solution = new Solution();

    for (let i = 1; i <= T; i++) {
        console.log(`TestCase-${i}`);
        console.log(input[i]); // Print input number
        console.log(solution.toHexspeak(input[i])); // Print result
    }
});