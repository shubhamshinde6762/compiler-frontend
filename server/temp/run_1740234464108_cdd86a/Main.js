const readline = require("readline");

class Solution {
    validWordSquare(words) {
        for (let wordNum = 0; wordNum < words.length; wordNum++) {
            for (let charPos = 0; charPos < words[wordNum].length; charPos++) {
                if (charPos >= words.length || 
                    wordNum >= words[charPos].length || 
                    words[wordNum][charPos] !== words[charPos][wordNum]) {
                    return false;
                }
            }
        }
        return true;
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let inputLines = [];
rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let index = 0;
    let T = parseInt(inputLines[index++].trim());

    const sol = new Solution();

    while (T-- > 0) {
        let testCaseLabel = inputLines[index++].trim(); // Read "TestCase-x"
        let n = parseInt(inputLines[index++].trim()); // Read n
        let words = inputLines[index++].trim().split(" "); // Read words

        console.log(testCaseLabel);
        console.log(sol.validWordSquare(words) ? "true" : "false");
    }
});