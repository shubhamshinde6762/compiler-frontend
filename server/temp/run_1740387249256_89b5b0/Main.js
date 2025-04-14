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
        let neighbors = [];
        if (j > 1) neighbors.push([i, j - 1]);
        if (j < 2 * i - 1) neighbors.push([i, j + 1]);
        if (i < n) neighbors.push([i + 1, j]);
        if (i > 1) neighbors.push([i - 1, j]);
        return neighbors.filter(([ni, nj]) => ni >= 1 && ni <= n && nj >= 1 && nj <= 2 * ni - 1);
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

// Handling input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('', testCnt => {
    let sol = new Solution();
    let count = parseInt(testCnt);

    function processTestCase() {
        if (count-- > 0) {
            readline.question('', tname => {
                console.log(tname);
                readline.question('', n => {
                    let result = sol.colorRed(parseInt(n));
                    console.log(validate(parseInt(n), result) ? 1 : 0);
                    processTestCase();
                });
            });
        } else {
            readline.close();
        }
    }
    processTestCase();
});