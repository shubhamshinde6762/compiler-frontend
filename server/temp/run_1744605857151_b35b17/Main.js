class TreeNode {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

class Solution {
  correctBinaryTree(root) {
    const visited = new Set();
    const queue = [[root, null]];

    while (queue.length) {
      const [node, parent] = queue.shift();

      if (node.right && visited.has(node.right.data)) {
        if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        return root;
      }

      visited.add(node.data);

      if (node.right) queue.push([node.right, node]);
      if (node.left) queue.push([node.left, node]);
    }

    return root;
  }
}

function printTree(root) {
  if (!root) {
    console.log("null");
    return;
  }

  const queue = [root];
  const lst = [];

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      lst.push(node.data);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      lst.push("null");
    }
  }

  // Trim trailing "null"s
  while (lst.length && lst[lst.length - 1] === "null") {
    lst.pop();
  }

  console.log(lst.join(" "));
}

function buildTree(s) {
  if (!s || s.toLowerCase().startsWith("n")) return null;
  const nodes = s.trim().split(/\s+/);
  const root = new TreeNode(parseInt(nodes[0]));
  const q = [root];
  let i = 1;

  while (q.length && i < nodes.length) {
    const curr = q.shift();
    if (nodes[i].toLowerCase() !== "null") {
      curr.left = new TreeNode(parseInt(nodes[i]));
      q.push(curr.left);
    }
    i++;
    if (i >= nodes.length) break;
    if (nodes[i].toLowerCase() !== "null") {
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
    const testCaseLabel = input[i++];
    const s = input[i++];
    const p = parseInt(input[i++]);
    const q = parseInt(input[i++]);

    console.log(testCaseLabel);

    const root = buildTree(s);
    const nodeP = findNode(root, p);
    const nodeQ = findNode(root, q);
    if (nodeP && nodeQ) nodeP.right = nodeQ;

    const sol = new Solution();
    const correctedTree = sol.correctBinaryTree(root);
    printTree(correctedTree);
  }
});