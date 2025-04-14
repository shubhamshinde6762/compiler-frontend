/**
 * @param {number[]} nums - Sorted array of numbers
 * @param {number} target - Target number to check
 * @return {boolean} - Whether target is a majority element
 */
function isMajorityElement(nums, target) {
    // Find the first occurrence of target using binary search
    let left = 0;
    let right = nums.length - 1;
    let firstIndex = nums.length;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            firstIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    // Check if target is the majority element
    return firstIndex + Math.floor(nums.length / 2) < nums.length && 
           nums[firstIndex + Math.floor(nums.length / 2)] === target;
}

// Main function
function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let testCases = 0;
    let currentCase = 0;
    let testString = '';
    let arrLength = 0;
    let nums = [];
    let target = 0;
    
    rl.on('line', (line) => {
        if (testCases === 0) {
            testCases = parseInt(line);
            currentCase = 1;
        } else if (testString === '') {
            testString = line;
            console.log(testString);
        } else if (arrLength === 0) {
            arrLength = parseInt(line);
        } else if (nums.length === 0) {
            nums = line.split(' ').map(Number);
        } else {
            target = parseInt(line);
            const solution = isMajorityElement(nums, target);
            console.log(solution ? "true" : "false");
            
            // Reset for next test case
            testString = '';
            arrLength = 0;
            nums = [];
            currentCase++;
            
            if (currentCase > testCases) {
                rl.close();
            }
        }
    });
}

main();