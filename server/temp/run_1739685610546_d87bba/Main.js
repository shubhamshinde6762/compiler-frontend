"use strict";

function main(input) {
  const lines = input.trim().split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
  let idx = 0;
  // If first line is not a test case label but the next is, skip it.
  if (!lines[0].startsWith("TestCase") && lines.length > 1 && lines[1].startsWith("TestCase")) {
    idx = 1;
  }
  const outLines = [];
  
  // Process test cases until end-of-file.
  while (idx < lines.length) {
    // Test case label
    const tcLabel = lines[idx++];
    outLines.push(tcLabel);
    // Next line: "n m" (n: number of edges; nodes = n+1)
    const [n_input_str, m_str] = lines[idx++].split(/\s+/);
    const n_input = parseInt(n_input_str, 10);
    // m is always 2
    const nodes = n_input + 1;
    // Build tree and edge list.
    const tree = Array.from({ length: nodes }, () => []);
    const edges = [];
    for (let i = 0; i < n_input; i++) {
      const [u_str, v_str] = lines[idx++].split(/\s+/);
      const u = parseInt(u_str, 10);
      const v = parseInt(v_str, 10);
      edges.push([u, v]);
      tree[u].push(v);
      tree[v].push(u);
    }
    
    const sol = new Solution();
    const ans = sol.lastMarkedNodes(edges);
    
    // --- Validation code ---
    function bfsAll(s) {
      const d = Array(nodes).fill(-1);
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
      const d = Array(nodes).fill(-1);
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
    
    // Compute parent and depth (iterative BFS)
    const depth = Array(nodes).fill(0);
    const parent = Array(nodes).fill(-1);
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
    
    const LOG = Math.floor(Math.log2(nodes)) + 1;
    const up = Array.from({ length: nodes }, () => Array(LOG).fill(-1));
    for (let i = 0; i < nodes; i++) {
      up[i][0] = parent[i];
    }
    for (let j = 1; j < LOG; j++) {
      for (let i = 0; i < nodes; i++) {
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
    for (let i = 0; i < nodes; i++) {
      const dCandidate = dist(i, ans[i]);
      const dMax = Math.max(dA_val[i], dB_val[i]);
      if (dCandidate !== dMax) { valid = false; break; }
    }
    
    if (valid) outLines.push("true");
    else outLines.push(ans.join(" "));
  }
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

if (process.stdin.isTTY) {
  // For interactive testing.
  main(`TestCase-1
5 2
5 4
3 2
2 0
1 0
4 0`);
} else {
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", chunk => { input += chunk; });
  process.stdin.on("end", () => { main(input); });
}