class Solution {
    indexPairs(text, words) {
        let ans = [];
        for (let word of words) {
            let start = 0;
            let index = text.indexOf(word, start);
            while (index !== -1) {
                ans.push([index, index + word.length - 1]);
                start = index + 1;
                index = text.indexOf(word, start);
            }
        }
        ans.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return ans;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("", (T) => {
    let count = parseInt(T);
    let cases = [];
    let index = 0;

    rl.on("line", (line) => {
        cases.push(line);
        if (cases.length === count * 3) {
            rl.close();
        }
    });

    rl.on("close", () => {
        for (let t = 0; t < count; t++) {
            console.log(cases[index]); // Print TestCase-x
            let text = cases[index + 1];
            let n = cases[index + 1];
            let words = cases[index + 2].split(" ");
            let sol = new Solution();
            let result = sol.indexPairs(text, words);
            
            result.forEach(pair => console.log(pair[0] + " " + pair[1]));
            index += 3;
        }
    });
});