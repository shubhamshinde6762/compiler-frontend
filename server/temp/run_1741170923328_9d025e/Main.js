const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let currentLine = 0;

class Reader4 {
    static fileContent = "";
    static filePointer = 0;

    static setFile(content) {
        this.fileContent = content;
        this.filePointer = 0;
    }

    static read4(buf4) {
        let i = 0;
        while (i < 4 && this.filePointer < this.fileContent.length) {
            buf4[i] = this.fileContent[this.filePointer++];
            i++;
        }
        return i;
    }
}

class Solution {
    /**
     * Reads 'n' characters from the file using the read4 method.
     * @param {Array} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    read(buf, n) {
        let copiedChars = 0;
        let readChars = 4;
        let remainingChars = n;

        while (remainingChars >= 4 && readChars === 4) {
            let buf4 = new Array(4);
            readChars = Reader4.read4(buf4);
            for (let i = 0; i < readChars; i++) {
                buf[copiedChars++] = buf4[i];
            }
            remainingChars -= readChars;
        }

        if (remainingChars > 0 && readChars > 0) {
            let buf4 = new Array(4);
            readChars = Reader4.read4(buf4);
            for (let i = 0; i < Math.min(remainingChars, readChars); i++) {
                buf[copiedChars++] = buf4[i];
            }
        }

        return Math.min(n, copiedChars);
    }
}

// Read input using readline and process test cases
rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let T = parseInt(inputLines[currentLine++]);

    for (let t = 1; t <= T; t++) {
        console.log(inputLines[currentLine++]); // TestCase label
        let fileContent = inputLines[currentLine++];
        let n = parseInt(inputLines[currentLine++]);

        Reader4.setFile(fileContent);
        let solution = new Solution();
        let buf = [];
        let charsRead = solution.read(buf, n);

        console.log(charsRead);
        console.log(buf.join("")); // Convert array to string properly
    }
});