class Solution {
    isMajorityElement(nums, target) {
        let firstIndex = this.lowerBound(nums, target);
        return firstIndex + Math.floor(nums.length / 2) < nums.length && nums[firstIndex + Math.floor(nums.length / 2)] === target;
    }

    lowerBound(arr, target) {
        let left = 0, right = arr.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] < target) left = mid + 1;
            else right = mid;
        }
        return left;
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
readline.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    let T = parseInt(input[0]);
    let index = 1;
    for (let t = 1; t <= T; t++) {
        console.log(input[index]); // Read TestCase-x
        index++;
        let n = parseInt(input[index]);
        index++;
        let nums = input[index].split(" ").map(Number);
        index++;
        let target = parseInt(input[index]);
        index++;

        let sol = new Solution();
        console.log(sol.isMajorityElement(nums, target) ? "true" : "false");
    }
});