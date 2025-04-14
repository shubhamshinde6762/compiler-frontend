class Solution {
    constructor() {
        this.bitsToShift = 7;
        this.numToGetLastBits = (1 << this.bitsToShift) - 1;
    }

    anagramMappings(nums1, nums2) {
        for (let i = 0; i < nums1.length; i++) {
            nums1[i] = (nums1[i] << this.bitsToShift) + i;
            nums2[i] = (nums2[i] << this.bitsToShift) + i;
        }

        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        let mappings = new Array(nums1.length);
        for (let i = 0; i < nums1.length; i++) {
            mappings[nums1[i] & this.numToGetLastBits] = (nums2[i] & this.numToGetLastBits);
        }

        return mappings;
    }
}

// Driver Code
const readline = require("readline");

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

    const sol = new Solution();

    while (T--) {
        console.log(input[index++]);  // Read and print test case name
        let n = parseInt(input[index++]);
        let nums1 = input[index++].split(" ").map(Number);
        n = parseInt(input[index++]);
        let nums2 = input[index++].split(" ").map(Number);

        let result = sol.anagramMappings(nums1, nums2);
        console.log(result.join(" "));
    }
});