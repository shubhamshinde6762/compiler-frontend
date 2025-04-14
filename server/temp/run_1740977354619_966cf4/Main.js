class Solution {
    isArmstrong(N) {
        let k = Math.floor(Math.log10(N)) + 1;
        let temp = N;
        let sum = 0;

        while (temp) {
            sum += Math.pow(temp % 10, k);
            temp = Math.floor(temp / 10);
        }

        return sum === N;
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];
rl.on('line', (line) => {
    inputs.push(line.trim());
}).on('close', () => {
    let T = parseInt(inputs[0]);  // Convert T to an integer
    let index = 1;
    
    for (let i = 0; i < T; i++) {
        let s = inputs[index++];
        console.log(s);  // Print TestCase name
        
        let n = parseInt(inputs[index++]);
        let sol = new Solution();
        console.log(sol.isArmstrong(n) ? "true" : "false");
    }
});