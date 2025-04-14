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

function main() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf-8').split('\n');
    
    let index = 0;
    let T = parseInt(input[index++]);

    for (let t = 1; t <= T; t++) {
        let s = input[index++].trim();
        console.log(s);  // Ensures proper formatting

        let n = parseInt(input[index++]);
        let nums = input[index++].trim().split(" ").map(Number);
        let target = parseInt(input[index++]);

        let sol = new Solution();
        let result = sol.isMajorityElement(nums, target);

        console.log(result ? "true" : "false");  // Newline after result
    }
}

main();