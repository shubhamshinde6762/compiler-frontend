import java.io.*;
import java.util.*;

class Solution {
    // Returns last marked node for each node
    public int[] lastMarkedNodes(int[][] edges) {
        int n = edges.length + 1;
        ArrayList<ArrayList<Integer>> tr = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            tr.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            tr.get(e[0]).add(e[1]);
            tr.get(e[1]).add(e[0]);
        }
        Pair p = bfs(0, n, tr);
        int nodeA = p.far;
        Pair q1 = bfs(nodeA, n, tr);
        int nodeB = q1.far;
        Pair q2 = bfs(nodeB, n, tr);
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            ans[i] = (q1.dist[i] >= q2.dist[i] ? nodeA : nodeB);
        }
        return ans;
    }
    
    // Helper method: BFS from source s
    private static Pair bfs(int s, int n, ArrayList<ArrayList<Integer>> tree) {
        int[] d = new int[n];
        Arrays.fill(d, -1);
        Queue<Integer> q = new LinkedList<>();
        d[s] = 0;
        q.add(s);
        int far = s;
        while (!q.isEmpty()) {
            int cur = q.poll();
            for (int nb : tree.get(cur)) {
                if (d[nb] == -1) {
                    d[nb] = d[cur] + 1;
                    q.add(nb);
                    if (d[nb] > d[far])
                        far = nb;
                }
            }
        }
        return new Pair(far, d);
    }
    
    static class Pair {
        int far;
        int[] dist;
        Pair(int far, int[] dist) {
            this.far = far;
            this.dist = dist;
        }
    }
}

public class Main {
    static BufferedReader br;
    static PrintWriter out;
    
    public static void main(String[] args) throws Exception {
        br = new BufferedReader(new InputStreamReader(System.in));
        out = new PrintWriter(System.out);
        int T = Integer.parseInt(br.readLine().trim());
        for (int t = 0; t < T; t++) {
            String tc = br.readLine().trim();
            out.println(tc);
            int n_input = Integer.parseInt(br.readLine().trim());
            int n = n_input + 1; // nodes = edges+1.
            int m = Integer.parseInt(br.readLine().trim()); // m is always 2
            ArrayList<ArrayList<Integer>> tree = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                tree.add(new ArrayList<>());
            }
            int[][] edgesArr = new int[n - 1][2];
            for (int i = 0; i < n - 1; i++) {
                String[] parts = br.readLine().trim().split("\\s+");
                int u = Integer.parseInt(parts[0]);
                int v = Integer.parseInt(parts[1]);
                edgesArr[i][0] = u;
                edgesArr[i][1] = v;
                tree.get(u).add(v);
                tree.get(v).add(u);
            }
            
            Solution sol = new Solution();
            int[] ans = sol.lastMarkedNodes(edgesArr);
            
            // --- Validation code ---
            int[] dA_val;
            int[] dB_val;
            {
                Solution.Pair p1 = bfsStatic(0, n, tree);
                int vA = p1.far;
                Solution.Pair p2 = bfsStatic(vA, n, tree);
                int vB = p2.far;
                dA_val = p2.dist;
                dB_val = bfsAllStatic(vB, n, tree);
            }
            
            // Compute parent and depth (BFS)
            int[] depth = new int[n];
            int[] parent = new int[n];
            Arrays.fill(parent, -1);
            Queue<Integer> q = new LinkedList<>();
            q.add(0);
            while (!q.isEmpty()) {
                int cur = q.poll();
                for (int nb : tree.get(cur)) {
                    if (nb == parent[cur])
                        continue;
                    parent[nb] = cur;
                    depth[nb] = depth[cur] + 1;
                    q.add(nb);
                }
            }
            
            int LOG = (int)Math.floor(Math.log(n) / Math.log(2)) + 1;
            int[][] up = new int[n][LOG];
            for (int i = 0; i < n; i++) {
                up[i][0] = parent[i];
            }
            for (int j = 1; j < LOG; j++) {
                for (int i = 0; i < n; i++) {
                    if (up[i][j - 1] != -1)
                        up[i][j] = up[up[i][j - 1]][j - 1];
                    else
                        up[i][j] = -1;
                }
            }
            
            boolean valid = true;
            for (int i = 0; i < n; i++) {
                int dCandidate = distStatic(i, ans[i], depth, up, LOG);
                int dMax = Math.max(dA_val[i], dB_val[i]);
                if (dCandidate != dMax) {
                    valid = false;
                    break;
                }
            }
            
            if (valid)
                out.println("true");
            else {
                StringBuilder sb = new StringBuilder();
                for (int x : ans)
                    sb.append(x).append(" ");
                out.println(sb.toString().trim());
            }
        }
        out.flush();
    }
    
    static int[] bfsAllStatic(int s, int n, ArrayList<ArrayList<Integer>> tree) {
        int[] d = new int[n];
        Arrays.fill(d, -1);
        Queue<Integer> q = new LinkedList<>();
        d[s] = 0;
        q.add(s);
        while (!q.isEmpty()) {
            int cur = q.poll();
            for (int nb : tree.get(cur)) {
                if (d[nb] == -1) {
                    d[nb] = d[cur] + 1;
                    q.add(nb);
                }
            }
        }
        return d;
    }
    
    static Solution.Pair bfsStatic(int s, int n, ArrayList<ArrayList<Integer>> tree) {
        int[] d = new int[n];
        Arrays.fill(d, -1);
        Queue<Integer> q = new LinkedList<>();
        d[s] = 0;
        q.add(s);
        int far = s;
        while (!q.isEmpty()) {
            int cur = q.poll();
            for (int nb : tree.get(cur)) {
                if (d[nb] == -1) {
                    d[nb] = d[cur] + 1;
                    q.add(nb);
                    if (d[nb] > d[far])
                        far = nb;
                }
            }
        }
        return new Solution.Pair(far, d);
    }
    
    static int lcaStatic(int a, int b, int[] depth, int[][] up, int LOG) {
        if (depth[a] < depth[b]) {
            int temp = a; a = b; b = temp;
        }
        int d = depth[a] - depth[b];
        for (int i = 0; i < LOG; i++) {
            if ((d & (1 << i)) != 0)
                a = up[a][i];
        }
        if (a == b)
            return a;
        for (int i = LOG - 1; i >= 0; i--) {
            if (up[a][i] != up[b][i]) {
                a = up[a][i];
                b = up[b][i];
            }
        }
        return up[a][0];
    }
    
    static int distStatic(int a, int b, int[] depth, int[][] up, int LOG) {
        int c = lcaStatic(a, b, depth, up, LOG);
        return depth[a] + depth[b] - 2 * depth[c];
    }
}