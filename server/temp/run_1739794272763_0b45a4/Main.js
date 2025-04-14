class TwoSum {
    constructor() {
        this.freq = new Map();
    }

    add(number) {
        this.freq.set(number, (this.freq.get(number) || 0) + 1);
    }

    find(value) {
        for (let [num, count] of this.freq.entries()) {
            let complement = value - num;
            if ((complement !== num && this.freq.has(complement)) || (complement === num && count > 1)) {
                return true;
            }
        }
        return false;
    }
}

const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });
let input = [], index = 0;

readline.on("line", line => input.push(line)).on("close", () => {
    let T = parseInt(input[index++]);
    for (let t = 0; t < T; t++) {
        console.log(input[index++]); // Test case name
        let n = parseInt(input[index++]);
        let ts = new TwoSum();
        let operations = input[index++].split(" ");
        let output = [];

        for (let op of operations) {
            if (op.startsWith("add(")) {
                let x = parseInt(op.slice(4, -1));
                ts.add(x);
                output.push("null");
            } else if (op.startsWith("find(")) {
                let x = parseInt(op.slice(5, -1));
                output.push(ts.find(x) ? "true" : "false");
            }
        }
        console.log(output.join(" "));
    }
});