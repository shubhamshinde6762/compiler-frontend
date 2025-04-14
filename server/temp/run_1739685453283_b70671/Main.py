import sys
from collections import deque
import math

# Fast I/O (if needed)
def fastIO():
    sys.stdin = sys.__stdin__
    sys.stdout = sys.__stdout__

class Solution:
    # Returns last marked node for each node
    def lastMarkedNodes(self, edges):
        n = len(edges) + 1
        tree = [[] for _ in range(n)]
        for u, v in edges:
            tree[u].append(v)
            tree[v].append(u)
        def bfs(s):
            d = [-1]*n
            d[s] = 0
            q = deque([s])
            far = s
            while q:
                cur = q.popleft()
                for nb in tree[cur]:
                    if d[nb] == -1:
                        d[nb] = d[cur] + 1
                        q.append(nb)
                        if d[nb] > d[far]:
                            far = nb
            return far, d
        # Compute farthest from 0 then use two BFS’s
        nodeA, _ = bfs(0)
        nodeB, dA = bfs(nodeA)
        _, dB = bfs(nodeB)
        ans = [nodeA if dA[i] >= dB[i] else nodeB for i in range(n)]
        return ans

def main():
    fastIO()
    data = sys.stdin.read().split()
    if not data:
        return
    t = int(data[0])
    index = 1
    out_lines = []
    for _ in range(t):
        tc = data[index]
        index += 1
        out_lines.append(tc)
        # Read input n (number of edges) and adjust: nodes = n+1.
        n_input = int(data[index])
        index += 1
        n = n_input + 1
        m = int(data[index])
        index += 1
        # Build tree and edge list
        tree = [[] for _ in range(n)]
        eds = []
        for i in range(n - 1):
            u = int(data[index]); v = int(data[index+1])
            index += 2
            eds.append((u, v))
            tree[u].append(v)
            tree[v].append(u)
        edges = [[u, v] for (u, v) in eds]
        sol = Solution()
        ans = sol.lastMarkedNodes(edges)
 
        # --- Validation code ---
        def bfsAll(s):
            d = [-1]*n
            d[s] = 0
            q = deque([s])
            while q:
                cur = q.popleft()
                for nb in tree[cur]:
                    if d[nb] == -1:
                        d[nb] = d[cur] + 1
                        q.append(nb)
            return d
 
        def bfsFarthest(s):
            d = [-1]*n
            d[s] = 0
            q = deque([s])
            far = s
            while q:
                cur = q.popleft()
                for nb in tree[cur]:
                    if d[nb] == -1:
                        d[nb] = d[cur] + 1
                        q.append(nb)
                        if d[nb] > d[far]:
                            far = nb
            return far, d
 
        vA = bfsFarthest(0)[0]
        vB, dA_val = bfsFarthest(vA)
        dB_val = bfsAll(vB)
 
        # Compute parent and depth (iteratively)
        depth = [0]*n
        parent = [-1]*n
        q = deque([0])
        while q:
            cur = q.popleft()
            for nb in tree[cur]:
                if nb == parent[cur]:
                    continue
                parent[nb] = cur
                depth[nb] = depth[cur] + 1
                q.append(nb)
 
        LOG = math.floor(math.log2(n)) + 1
        up = [[-1]*LOG for _ in range(n)]
        for i in range(n):
            up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if up[i][j-1] != -1:
                    up[i][j] = up[up[i][j-1]][j-1]
 
        def lca(a, b):
            if depth[a] < depth[b]:
                a, b = b, a
            d = depth[a] - depth[b]
            bit = 0
            while d:
                if d & 1:
                    a = up[a][bit]
                d //= 2
                bit += 1
            if a == b:
                return a
            for i in range(LOG-1, -1, -1):
                if up[a][i] != up[b][i]:
                    a = up[a][i]
                    b = up[b][i]
            return up[a][0]
 
        def dist(a, b):
            c = lca(a, b)
            return depth[a] + depth[b] - 2 * depth[c]
 
        valid = True
        for i in range(n):
            dCandidate = dist(i, ans[i])
            dMax = max(dA_val[i], dB_val[i])
            if dCandidate != dMax:
                valid = False
                break
        if valid:
            out_lines.append("true")
        else:
            out_lines.append(" ".join(map(str, ans)))
    sys.stdout.write("\n".join(out_lines))
 
if __name__ == '__main__':
    main()