class Solution {
    highFive(items) {
        let scores = new Map();

        for (let [id, score] of items) {
            if (!scores.has(id)) scores.set(id, []);
            scores.get(id).push(score);
        }

        let result = [];
        for (let [id, scoreList] of [...scores.entries()].sort((a, b) => a[0] - b[0])) {
            scoreList.sort((a, b) => b - a);
            let avg = Math.floor(scoreList.slice(0, 5).reduce((sum, val) => sum + val, 0) / 5);
            result.push([id, avg]);
        }

        return result;
    }
}

// Input handling
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T, testCases = [], currentTest = [];

rl.on("line", function(line) {
    if (!T) {
        T = parseInt(line);
    } else if (line.startsWith("TestCase")) {
        if (currentTest.length) testCases.push([...currentTest]);
        currentTest = [];
        console.log(line);
    } else if (line.includes(" ")) {
        currentTest.push(line.split(" ").map(Number));
    }
});

rl.on("close", function() {
    testCases.push(currentTest);

    for (let items of testCases) {
        let sol = new Solution();
        let result = sol.highFive(items);
        for (let [id, avg] of result) {
            console.log(id, avg);
        }
    }
});