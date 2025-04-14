class Logger {
    constructor() {
        this.mp = new Map();
    }

    shouldPrintMessage(timestamp, message) {
        if (!this.mp.has(message)) {
            this.mp.set(message, timestamp);
            return true;
        }

        let oldTimestamp = this.mp.get(message);

        if (timestamp - oldTimestamp >= 10) {
            this.mp.set(message, timestamp);
            return true;
        }
        return false;
    }
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    let index = 0;
    let T = parseInt(input[index++]); // Number of test cases

    for (let t = 0; t < T; t++) {
        let testCaseLabel = input[index++].trim();
        let numOperations = parseInt(input[index++]);

        let operations = input[index++].trim().split(" ");

        console.log(testCaseLabel);

        let logger = new Logger();
        numOperations = parseInt(input[index++]);

        let output = [];
        for (let i = 0; i < numOperations; i++) {
            let paramSize = parseInt(input[index++]);
            if (paramSize === 0) {
                output.push("null");
            } else if (paramSize === 2) {
                let [timestamp, message] = input[index++].split(" ");
                timestamp = parseInt(timestamp);
                let result = logger.shouldPrintMessage(timestamp, message);
                output.push(result ? "true" : "false");
            }
        }
        console.log(output.join(" ")); // Separate test case outputs
    }
});