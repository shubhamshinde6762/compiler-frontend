class TreeNode {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *      constructor(val = 0, left = null, right = null){
 *          this.data = val;
 *          this.left = null;
 *          this.right = null;
 *      }
 * }
 **/

class Solution {
    /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} from
 * @param {number} to
 * @return {TreeNode}
 */

// the key here is we know that the wrong link is from left to right
// which means if you explore right to left you will experience the right one first and add it to your visited node
// another important trick is .  instead of tracking visited node , track visited left or right child its easier to remove the node that has the invalid right link 
// so when you see the already visited again you can remove its parent. 
// you will also have to track the parent so that when you again expereicne the same node you can remove its parent 

correctBinaryTree = function (root) {
    const visited = new Set();
    const queue = [[root, null]];

    while(queue.length){
        const [node, parent] = queue.shift();

        if(node.right && visited.has(node.right.val)){
           
            if(parent.left === node){
                parent.left = null
            } else {
                parent.right = null
            }
            return root
        }

        visited.add(node.val)

        if(node.right) queue.push([node.right, node])
        if(node.left) queue.push([node.left, node])
    }

    return root

  
};
}




const readline = require("readline");

function printTree(root) {
    if (!root) return;

    const queue = [root];
    const lst = [];

    while (queue.length) {
        const node = queue.shift();
        lst.push(node);
        if (node) {
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    // Trim trailing nulls
    while (lst.length && lst[lst.length - 1] === null) {
        lst.pop();
    }

    for (const node of lst) {
        process.stdout.write((node ? node.data : 'null') + ' ');
    }
    console.log();
}


function buildTree(s) {
  if (!s || s.toLowerCase().startsWith('n')) return null;
  const nodes = s.trim().split(/\s+/);
  const root = new TreeNode(parseInt(nodes[0]));
  const q = [root];
  let i = 1;

  while (q.length && i < nodes.length) {
    const curr = q.shift();
    if (nodes[i].toLowerCase() !== 'null') {
      curr.left = new TreeNode(parseInt(nodes[i]));
      q.push(curr.left);
    }
    i++;
    if (i >= nodes.length) break;
    if (nodes[i].toLowerCase() !== 'null') {
      curr.right = new TreeNode(parseInt(nodes[i]));
      q.push(curr.right);
    }
    i++;
  }
  return root;
}

function findNode(root, val) {
  if (!root) return null;
  if (root.data === val) return root;
  let left = findNode(root.left, val);
  if (left) return left;
  return findNode(root.right, val);
}



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  let t = parseInt(input[0]);
  let i = 1;
  while (t--) {
    const testCase = input[i++];
    console.log(testCase);
    const s = input[i++];
    const p = parseInt(input[i++]);
    const q = parseInt(input[i++]);

    const root = buildTree(s);
    let nodeP = findNode(root, p);
    let nodeQ = findNode(root, q);
    nodeP.right=nodeQ;
   
    const sol = new Solution();
    let ans = sol.correctBinaryTree(root);
    printTree(ans);
  }
});