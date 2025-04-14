class StringIterator {
    constructor(compressedString) {
        this.str = compressedString;
        this.index = 0;
        this.count = 0;
        this.currentChar = ' ';
    }

    next() {
        if (!this.hasNext()) {
            return ' ';
        }

        if (this.count === 0) {
            this.currentChar = this.str[this.index++];
            this.count = 0;

            while (this.index < this.str.length && /\d/.test(this.str[this.index])) {
                this.count = this.count * 10 + parseInt(this.str[this.index], 10);
                this.index++;
            }
        }

        this.count--;
        return this.currentChar;
    }

    hasNext() {
        return this.count > 0 || this.index < this.str.length;
    }
}

// Driver Code
function main() {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputLines = [];
    rl.on("line", function (line) {
        inputLines.push(line);
    });

    rl.on("close", function () {
        let T = parseInt(inputLines[0]); // Number of test cases
        let index = 1;

        for (let t = 0; t < T; t++) {
            let testCaseName = inputLines[index++].trim(); // Read "TestCase-x"
            let n = parseInt(inputLines[index++].trim()); // Read number of operations
            let operations = inputLines[index++].trim().split(/\s+/); // Read operations
            let compressedString = inputLines[index++].trim(); // Read compressed string

            let obj = new StringIterator(compressedString);
            let output = [];

            console.log(testCaseName);
            process.stdout.write("null ");

            for (let op of operations) {
                if (op === "next") {
                    process.stdout.write(obj.next() + " ");
                } else if (op === "hasNext") {
                    process.stdout.write((obj.hasNext() ? "true" : "false") + " ");
                }
            }

            console.log();
        }
    });
}

main();