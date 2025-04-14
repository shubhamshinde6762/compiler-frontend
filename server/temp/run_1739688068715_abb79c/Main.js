"use strict";

"use strict";

function main(input) {
  const tokens = input.trim().split(/\s+/);
  let index = 0;
  const T = parseInt(tokens[index++], 10);
  const outLines = [];
  for (let t = 0; t < T; t++) {
    const tc = tokens[index++];
    outLines.push(tc);
    let n_input = parseInt(tokens[index++], 10);
    const n = n_input + 1; // nodes = edges+1
    const m = parseInt(tokens[index++], 10); // m is always 2
    const tree = Array.from({ length: n }, () => []);
    const eds = [];
    for (let i = 0; i < n - 1; i++) {
      const u = parseInt(tokens[index++], 10);
      const v = parseInt(tokens[index++], 10);
      eds.push([u, v]);
      tree[u].push(v);
      tree[v].push(u);
    }
    const edges = eds;
    const sol = new Solution();
    const ans = sol.lastMarkedNodes(edges);
    
    // --- Validation code ---
    function bfsAll(s) {
      const d = Array(n).fill(-1);
      d[s] = 0;
      const q = [s];
      for (let qi = 0; qi < q.length; qi++) {
        const cur = q[qi];
        for (const nb of tree[cur]) {
          if (d[nb] === -1) {
            d[nb] = d[cur] + 1;
            q.push(nb);
          }
        }
      }
      return d;
    }
    
    function bfsFarthest(s) {
      const d = Array(n).fill(-1);
      d[s] = 0;
      const q = [s];
      let far = s;
      for (let qi = 0; qi < q.length; qi++) {
        const cur = q[qi];
        for (const nb of tree[cur]) {
          if (d[nb] === -1) {
            d[nb] = d[cur] + 1;
            q.push(nb);
            if (d[nb] > d[far]) far = nb;
          }
        }
      }
      return { far: far, dist: d };
    }
    
    const p1 = bfsFarthest(0);
    const vA = p1.far;
    const p2 = bfsFarthest(vA);
    const vB = p2.far;
    const dA_val = p2.dist;
    const dB_val = bfsAll(vB);
    
    // Compute parent and depth using BFS (iterative)
    const depth = Array(n).fill(0);
    const parent = Array(n).fill(-1);
    const queue = [0];
    for (let qi = 0; qi < queue.length; qi++) {
      const cur = queue[qi];
      for (const nb of tree[cur]) {
        if (nb === parent[cur]) continue;
        parent[nb] = cur;
        depth[nb] = depth[cur] + 1;
        queue.push(nb);
      }
    }
    
    const LOG = Math.floor(Math.log2(n)) + 1;
    const up = Array.from({ length: n }, () => Array(LOG).fill(-1));
    for (let i = 0; i < n; i++) {
      up[i][0] = parent[i];
    }
    for (let j = 1; j < LOG; j++) {
      for (let i = 0; i < n; i++) {
        if (up[i][j - 1] !== -1)
          up[i][j] = up[up[i][j - 1]][j - 1];
      }
    }
    
    function lca(a, b) {
      if (depth[a] < depth[b]) [a, b] = [b, a];
      let d = depth[a] - depth[b];
      for (let i = 0; i < LOG; i++) {
        if (d & (1 << i)) a = up[a][i];
      }
      if (a === b) return a;
      for (let i = LOG - 1; i >= 0; i--) {
        if (up[a][i] !== up[b][i]) {
          a = up[a][i];
          b = up[b][i];
        }
      }
      return up[a][0];
    }
    
    function dist(a, b) {
      const c = lca(a, b);
      return depth[a] + depth[b] - 2 * depth[c];
    }
    
    let valid = true;
    for (let i = 0; i < n; i++) {
      const dCandidate = dist(i, ans[i]);
      const dMax = Math.max(dA_val[i], dB_val[i]);
      if (dCandidate !== dMax) { valid = false; break; }
    }
    
    if (valid) outLines.push("true");
    else outLines.push(ans.join(" "));
  }
    if (outLines.length == 1)
        process.stdout.write(outLines.length);
     else
        process.stdout.write(outLines.join("\n"));
}

class Solution {
  // Returns last marked node for each node
  lastMarkedNodes(edges) {
    const n = edges.length + 1;
    const tr = Array.from({ length: n }, () => []);
    for (const e of edges) {
      tr[e[0]].push(e[1]);
      tr[e[1]].push(e[0]);
    }
    function bfs(s) {
      const d = Array(n).fill(-1);
      d[s] = 0;
      const queue = [s];
      let far = s;
      for (let qi = 0; qi < queue.length; qi++) {
        const cur = queue[qi];
        for (const nb of tr[cur]) {
          if (d[nb] === -1) {
            d[nb] = d[cur] + 1;
            queue.push(nb);
            if (d[nb] > d[far]) far = nb;
          }
        }
      }
      return { far: far, dist: d };
    }
    const p = bfs(0);
    const nodeA = p.far;
    const q1 = bfs(nodeA);
    const nodeB = q1.far;
    const q2 = bfs(nodeB);
    const ans = [];
    for (let i = 0; i < n; i++) {
      ans.push(q1.dist[i] >= q2.dist[i] ? nodeA : nodeB);
    }
    return ans;
  }
}

class Solution {
  // Returns last marked node for each node
  lastMarkedNodes(edges) {
    const n = edges.length + 1;
    const tr = Array.from({ length: n }, () => []);
    for (const e of edges) {
      tr[e[0]].push(e[1]);
      tr[e[1]].push(e[0]);
    }
    function bfs(s) {
      const d = Array(n).fill(-1);
      d[s] = 0;
      const queue = [s];
      let far = s;
      for (let qi = 0; qi < queue.length; qi++) {
        const cur = queue[qi];
        for (const nb of tr[cur]) {
          if (d[nb] === -1) {
            d[nb] = d[cur] + 1;
            queue.push(nb);
            if (d[nb] > d[far]) far = nb;
          }
        }
      }
      return { far: far, dist: d };
    }
    const p = bfs(0);
    const nodeA = p.far;
    const q1 = bfs(nodeA);
    const nodeB = q1.far;
    const q2 = bfs(nodeB);
    const ans = [];
    for (let i = 0; i < n; i++) {
      ans.push(q1.dist[i] >= q2.dist[i] ? nodeA : nodeB);
    }
    return ans;
  }
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", chunk => { input += chunk; });
process.stdin.on("end", () => { main(input); });