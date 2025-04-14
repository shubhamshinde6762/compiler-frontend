class Solution {
    isArmstrong(N) {
        let k = Math.floor(Math.log10(N)) + 1;
        let temp = N;
        while (temp) {
            N -= Math.pow(temp % 10, k);
            temp = Math.floor(temp / 10);
        }
        return N === 0;
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (T) => {
    let count = 0;
    const processInput = () => {
        if (count < T) {
            rl.question('', (s) => {
                console.log(s);
                rl.question('', (n) => {
                    let sol = new Solution();
                    console.log(sol.isArmstrong(parseInt(n)));
                    count++;
                    processInput();
                });
            });
        } else {
            rl.close();
        }
    };
    processInput();
});