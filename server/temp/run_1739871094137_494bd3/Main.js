class Solution {
    isStrobogrammatic(num) {
        const lut = { '0': '0', '1': '1', '6': '9', '8': '8', '9': '6' };
        let l = 0, r = num.length - 1;
        while (l <= r) {
            if (!(num[l] in lut) || lut[num[l]] !== num[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("", (T) => {
    let count = 0;
    let lines = [];
    
    rl.on("line", (line) => {
        lines.push(line);
        count++;
        if (count === 2 * T) {
            for (let i = 0; i < T; i++) {
                console.log(lines[i * 2]);
                let ts = new Solution();
                console.log(ts.isStrobogrammatic(lines[i * 2 + 1]) ? "true" : "false");
            }
            rl.close();
        }
    });
});