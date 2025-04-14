const readline = require("readline");

class Solution {
    arraysIntersection(arr1, arr2, arr3) {
        let ans = [];
        let p1 = 0, p2 = 0, p3 = 0;

        while (p1 < arr1.length && p2 < arr2.length && p3 < arr3.length) {
            if (arr1[p1] === arr2[p2] && arr2[p2] === arr3[p3]) {
                ans.push(arr1[p1]);
                p1++;
                p2++;
                p3++;
            } else {
                if (arr1[p1] < arr2[p2]) {
                    p1++;
                } else if (arr2[p2] < arr3[p3]) {
                    p2++;
                } else {
                    p3++;
                }
            }
        }
        return ans;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    let index = 0;
    let T = parseInt(input[index++]);

    for (let i = 1; i <= T; i++) {
        console.log(input[index++]);  // String identifier
        let solution = new Solution();

        let n = parseInt(input[index++]);
        let arr1 = input[index++].split(" ").map(Number);
        n = parseInt(input[index++]);
        let arr2 = input[index++].split(" ").map(Number);
        n = parseInt(input[index++]);
        let arr3 = input[index++].split(" ").map(Number);

        let result = solution.arraysIntersection(arr1, arr2, arr3);
        console.log(result.join(" "));
    }
});