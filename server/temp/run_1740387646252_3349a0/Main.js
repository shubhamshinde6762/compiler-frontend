class Solution {
    colorRed(n) {
        let ans = [[1, 1]];
        for (let i = 2; i <= n; i++) {
            let start = (((n - i) % 4) % 3) + 1;
            if ((n - i) % 2 === 1) {
                ans.push([i, start]);
            } else {
                for (let j = start; j < i * 2; j += 2) {
                    ans.push([i, j]);
                }
            }
        }
        return ans;
    }
}

function validate(n, S) {
    function getNeighbors(i, j) {
        return [
            [i, j - 1], [i, j + 1], // Left & Right
            [i + 1, j], [i - 1, j]  // Down & Up
        ].filter(([ni, nj]) => ni >= 1 && ni <= n && nj >= 1 && nj <= 2 * ni - 1);
    }

    let red = new Set(S.map(p => `${p[0]},${p[1]}`));

    let changed = true;
    while (changed) {
        changed = false;
        let toAdd = [];

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j < 2 * i; j++) {
                let key = `${i},${j}`;
                if (!red.has(key)) {
                    let redNeighbors = getNeighbors(i, j).filter(nb => red.has(`${nb[0]},${nb[1]}`)).length;
                    if (redNeighbors >= 2) {
                        toAdd.push(key);
                        changed = true;
                    }
                }
            }
        }

        toAdd.forEach(key => red.add(key));
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j < 2 * i; j++) {
            if (!red.has(`${i},${j}`)) return false;
        }
    }
    return true;
}

// Optimized input handling
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => inputLines.push(line));
rl.on('close', () => {
    let index = 0;
    let testCnt = parseInt(inputLines[index++].trim());
    let sol = new Solution();

    for (let i = 0; i < testCnt; i++) {
        let tname = inputLines[index++].trim();
        console.log(tname);

        let n = parseInt(inputLines[index++].trim());
        let result = sol.colorRed(n);
        console.log(validate(n, result) ? 1 : 0);
    }
});