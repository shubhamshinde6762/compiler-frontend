class Solution {
    missingNumber(arr) {
        let n = arr.length;
        let difference = (arr[n - 1] - arr[0]) / n;
        let lo = 0, hi = n - 1;

        while (lo < hi) {
            let mid = Math.floor((lo + hi) / 2);
            if (arr[mid] === arr[0] + mid * difference) 
                lo = mid + 1;
            else 
                hi = mid;
        }

        return arr[0] + difference * lo;
    }
}

// Read input (node.js environment)
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
readline.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    let T = parseInt(input[0]);
    let index = 1;

    for (let i = 0; i < T; i++) {
        console.log(input[index]); // Read "x"
        index++;

        let n = parseInt(input[index]);
        index++;

        let arr = input[index].split(" ").map(Number);
        index++;

        let solution = new Solution();
        console.log(solution.missingNumber(arr));
    }
});