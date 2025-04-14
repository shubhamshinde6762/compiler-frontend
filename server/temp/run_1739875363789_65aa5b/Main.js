class Solution {
    canPermutePalindrome(s) {
        const freq = new Array(26).fill(0);
        for (const ch of s) {
            freq[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        let count = 0;
        for (const f of freq) {
            count += (f & 1);
        }
        return count <= (s.length % 2);
    }
}

// For Node.js input handling
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];
rl.on('line', (line) => {
    input.push(line);
});

rl.on('close', () => {
    let idx = 0;
    const T = parseInt(input[idx++]);
    
    for (let t = 0; t < T; t++) {
        const case_name = input[idx++];
        const [n, m] = input[idx++].split(' ').map(Number);
        console.log(case_name);
        
        const v = input[idx++];
        const sol = new Solution();
        console.log(sol.canPermutePalindrome(v) ? "true" : "false");
    }
});