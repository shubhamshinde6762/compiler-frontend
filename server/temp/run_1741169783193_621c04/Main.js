const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let currentLine = 0;
let fileContent = "";
let filePointer = 0;

function read4(buf4) {
    let i = 0;
    while (i < 4 && filePointer < fileContent.length) {
        buf4[i++] = fileContent[filePointer++];
    }
    return i;
}

class Solution {
    /**
     * @param {string[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    read(buf, n) {
        let copiedChars = 0;
        let readChars = 4;
        let remainingChars = n;

        while (remainingChars >= 4 && readChars === 4) {
            let buf4 = new Array(4);
            readChars = read4(buf4);
            buf.push(...buf4.slice(0, readChars));
            copiedChars += readChars;
        }

        if (remainingChars > 0 && readChars > 0) {
            let buf4 = new Array(4);
            readChars = read4(buf4);
            for (let i = 0; i < Math.min(remainingChars, readChars); i++) {
                buf.push(buf4[i]);
            }
        }

        return Math.min(n, copiedChars);
    }
}

rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let T = parseInt(inputLines[currentLine++]);

    for (let t = 1; t <= T; t++) {
        console.log(inputLines[currentLine++]);  // TestCase label
        fileContent = inputLines[currentLine++];
        let n = parseInt(inputLines[currentLine++]);

        filePointer = 0;
        let solution = new Solution();
        let buf = [];
        let charsRead = solution.read(buf, n);

        console.log(charsRead);
        console.log(buf.join(""));
    }
});