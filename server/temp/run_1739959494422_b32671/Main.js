class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    closestValue(root, target) {
        let closest = root.val;
        while (root) {
            if (Math.abs(root.val - target) < Math.abs(closest - target) ||
                (Math.abs(root.val - target) === Math.abs(closest - target) && root.val < closest)) {
                closest = root.val;
            }
            root = target < root.val ? root.left : root.right;
        }
        return closest;
    }
}

function constructBST(levelOrder) {
    if (levelOrder.length === 0 || levelOrder[0] === "null") return null;

    let root = new TreeNode(parseInt(levelOrder[0]));
    let queue = [root];

    let i = 1;
    while (queue.length > 0 && i < levelOrder.length) {
        let current = queue.shift();

        // Left child
        if (i < levelOrder.length && levelOrder[i] !== "null") {
            current.left = new TreeNode(parseInt(levelOrder[i]));
            queue.push(current.left);
        }
        i++;

        // Right child
        if (i < levelOrder.length && levelOrder[i] !== "null") {
            current.right = new TreeNode(parseInt(levelOrder[i]));
            queue.push(current.right);
        }
        i++;
    }

    return root;
}

// Driver function
function main() {
    let input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
    let t = parseInt(input[0]);
    let index = 1;

    for (let tc = 1; tc <= t; tc++) {
        console.log(input[index]); // Test case identifier
        index++;

        let n = parseInt(input[index]);
        index++;

        let values = input[index].split(" ");
        index++;

        let target = parseFloat(input[index]);
        index++;

        let root = constructBST(values);
        let solution = new Solution();
        let result = solution.closestValue(root, target);

        console.log(result);
    }
}

main();