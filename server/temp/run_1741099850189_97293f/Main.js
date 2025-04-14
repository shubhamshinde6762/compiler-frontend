class Solution {
    transformArray(arr) {
        if (arr.length <= 2) return arr;
        let changed = true;

        while (changed) {
            changed = false;
            let prev = arr[0], curr = arr[1], next = arr[2];

            for (let i = 1; i < arr.length - 1; i++) {
                if (curr < prev && curr < next) {
                    arr[i] += 1;
                    changed = true;
                } else if (curr > prev && curr > next) {
                    arr[i] -= 1;
                    changed = true;
                }
                if (i === arr.length - 2) break;
                prev = curr;
                curr = next;
                next = arr[i + 2];
            }
        }
        return arr;
    }
}

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
    let T = parseInt(inputLines[index++]);

    for (let i = 1; i <= T; i++) {
        let x = inputLines[index++].trim();
        console.log(x);
        let solution = new Solution();
        let n = parseInt(inputLines[index++]);
        let a = inputLines[index++].split(" ").map(Number);

        let p = solution.transformArray(a);
        console.log(p.join(" "));
    }
});