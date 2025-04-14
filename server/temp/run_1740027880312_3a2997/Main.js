class MovingAverage {
    constructor(size) {
        this.size = size;
        this.queue = [];
        this.sum = 0;
    }
    
    next(val) {
        this.queue.push(val);
        this.sum += val;
        if (this.queue.length > this.size) {
            this.sum -= this.queue.shift();
        }
        return this.sum / this.queue.length;
    }
}

function runTestCases() {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    
    let input = [];
    rl.on('line', (line) => { input.push(line); }).on('close', () => {
        let index = 0;
        let T = parseInt(input[index++]);
        for (let t = 0; t < T; t++) {
            let testCaseId = input[index++];
            console.log(testCaseId);
            let n = parseInt(input[index++]);
            let operations = input[index++];
            let m = parseInt(input[index++]);
            let values = input[index++].split(' ').map(Number);

            let obj = new MovingAverage(n);
            let result = values.map(val => obj.next(val).toFixed(5)).join(' ');
            console.log("null", result);
        }
    });
}

runTestCases();