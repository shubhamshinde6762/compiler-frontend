class Solution {
    canAttendMeetings(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);

        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;
            }
        }
        return true;
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
        let case_name = input[index++];
        let [n, m] = input[index++].split(" ").map(Number);
        console.log(case_name);

        let intervals = [];
        for (let i = 0; i < n; i++) {
            intervals.push(input[index++].split(" ").map(Number));
        }

        let sol = new Solution();
        console.log(sol.canAttendMeetings(intervals) ? "true" : "false");
    }
});