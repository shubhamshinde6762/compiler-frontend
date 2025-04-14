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
            let avg = Math.floor((scoreList[0] + scoreList[1] + scoreList[2] + scoreList[3] + scoreList[4]) / 5);
            result.push([id, avg]);
        }

        return result;
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
    let index = 0;
    let T = parseInt(input[index++]);

    for (let t = 0; t < T; t++) {
        let s = input[index++];
        console.log(s);

        let [n, m] = input[index++].split(" ").map(Number);
        let items = [];

        for (let i = 0; i < n; i++) {
            let [id, score] = input[index++].split(" ").map(Number);
            items.push([id, score]);
        }

        let sol = new Solution();
        let result = sol.highFive(items);

        for (let entry of result) {
            console.log(entry[0] + " " + entry[1]);
        }
    }
});