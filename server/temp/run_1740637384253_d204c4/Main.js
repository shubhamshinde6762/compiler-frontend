class Solution {
    fixedPoint(arr) {
        let start = 0, end = arr.length - 1;
        let ans = -1;

        while (start <= end) {
            let mid = Math.floor(start + (end - start) / 2);

            if (mid > arr[mid]) {
                start = mid + 1;
            } else {
                if (mid === arr[mid]) {
                    ans = mid;
                }
                end = mid - 1;
            }
        }
        return ans;
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
    let T = parseInt(input[0]);
    let index = 1;

    for (let i = 0; i < T; i++) {
        console.log(input[index]); // TestCase-X
        index++;
        let n = parseInt(input[index]); // Read n
        index++;
        let arr = input[index].split(" ").map(Number); // Read array
        index++;

        let sol = new Solution();
        console.log(sol.fixedPoint(arr));
    }
});