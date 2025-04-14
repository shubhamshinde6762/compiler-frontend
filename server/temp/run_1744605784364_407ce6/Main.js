class TreeNode {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {TreeNode}
   */
  correctBinaryTree(root) {
    const visited = new Set();
    const queue = [[root, null]];

    while (queue.length) {
      const [node, parent] = queue.shift();

      if (node.right && visited.has(node.right.val)) {
        if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        return root;
      }

      visited.add(node.val);

      if (node.right) queue.push([node.right, node]);
      if (node.left) queue.push([node.left, node]);
    }

    return root;
  }
}

// Helper function to print the tree in level order
function printTree(root) {
  if (!root) return;

  const queue = [root];
  const lst = [];

  while (queue.length) {
    const node = queue.shift();
    lst.push(node ? node.data : null);
    if (node) {
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  // Trim trailing nulls
  while (lst.length && lst[lst.length - 1] === null) {
    lst.pop();
  }

  console.log(lst.join(' '));
}

// Build tree from level order string
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

// Find node with a specific value
function findNode(root, val) {
  if (!root) return null;
  if (root.data === val) return root;
  let left = findNode(root.left, val);
  if (left) return left;
  return findNode(root.right, val);
}

// Read input and execute
const readline = require("readline");

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
    const testCase = input[i++]; // unused but can be used for debugging
    const s = input[i++];
    const p = parseInt(input[i++]);
    const q = parseInt(input[i++]);

    const root = buildTree(s);
    let nodeP = findNode(root, p);
    let nodeQ = findNode(root, q);
    nodeP.right = nodeQ; // Make the invalid link

    const sol = new Solution();
    let ans = sol.correctBinaryTree(root);
    printTree(ans);
  }
});