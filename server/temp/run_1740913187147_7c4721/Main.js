class Solution {
    removeVowels(S) {
        let arr = S.split('');
        for (let i = 0; i < arr.length; i++) {
            if ("aeiou".includes(arr[i])) {
                arr.splice(i--, 1);
            }
        }
        return arr.join('');
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
    let T = parseInt(input[0]);
    let index = 1;
    for (let t = 0; t < T; t++) {
        console.log(input[index]);  // Keeping s as requested
        let x = input[index + 1];
        index += 2;

        let sol = new Solution();
        console.log(sol.removeVowels(x));
    }
});