#include <bits/stdc++.h>
using namespace std;
 
void fastIO(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
}
 
class Solution {
public:
    // Returns last marked node for each node
    vector<int> lastMarkedNodes(const vector<vector<int>>& edges) {
        int n = edges.size() + 1;
        vector<vector<int>> tr(n);
        for (const auto &e : edges) {
            tr[e[0]].push_back(e[1]);
            tr[e[1]].push_back(e[0]);
        }
        auto bfs = [&](int s) -> pair<int, vector<int>> {
            vector<int> d(n, -1);
            queue<int> qu;
            d[s] = 0; qu.push(s);
            int far = s;
            while (!qu.empty()) {
                int cur = qu.front();
                qu.pop();
                for (int nb : tr[cur]) {
                    if (d[nb] == -1) {
                        d[nb] = d[cur] + 1;
                        qu.push(nb);
                        if (d[nb] > d[far])
                            far = nb;
                    }
                }
            }
            return make_pair(far, d);
        };
        auto p = bfs(0);
        int nodeA = p.first;
        auto q1 = bfs(nodeA);
        int nodeB = q1.first;
        auto q2 = bfs(nodeB);
        vector<int> ans(n);
        for (int i = 0; i < n; ++i)
            ans[i] = (q1.second[i] >= q2.second[i] ? nodeA : nodeB);
        return ans;
    }
};
 
int main(){
    fastIO();
    int T;
    cin >> T;
    while(T--){
        string tc;
        cin >> tc;
        cout << tc << "\n";
        int n;
        cin >> n;
        n++; // n was given as number of edges + 1 becomes number of nodes
        int m;
        cin >> m;
        vector<vector<int>> tree(n);
        vector<pair<int,int>> eds;
        eds.reserve(n-1);
        for (int i = 0; i < n - 1; i++){
            int u, v;
            cin >> u >> v;
            eds.push_back({u, v});
            tree[u].push_back(v);
            tree[v].push_back(u);
        }
 
        vector<vector<int>> edges;
        edges.reserve(eds.size());
        for(const auto &p : eds){
            edges.push_back({p.first, p.second});
        }
 
        Solution sol;
        vector<int> ans = sol.lastMarkedNodes(edges);
 
        auto bfsAll = [&](int s) -> vector<int> {
            vector<int> d(n, -1);
            queue<int> qu;
            d[s] = 0; qu.push(s);
            while(!qu.empty()){
                int cur = qu.front();
                qu.pop();
                for (int nb : tree[cur])
                    if(d[nb] == -1){
                        d[nb] = d[cur] + 1;
                        qu.push(nb);
                    }
            }
            return d;
        };
 
        auto bfsFarthest = [&](int s) -> pair<int, vector<int>> {
            vector<int> d(n, -1);
            queue<int> qu;
            d[s] = 0; qu.push(s);
            int far = s;
            while(!qu.empty()){
                int cur = qu.front();
                qu.pop();
                for (int nb : tree[cur])
                    if(d[nb] == -1){
                        d[nb] = d[cur] + 1;
                        qu.push(nb);
                        if(d[nb] > d[far])
                            far = nb;
                    }
            }
            return make_pair(far, d);
        };
 
        auto p1 = bfsFarthest(0);
        int nodeA = p1.first;
        auto p2 = bfsFarthest(nodeA);
        int nodeB = p2.first;
        vector<int> dA = p2.second;
        vector<int> dB = bfsAll(nodeB);
 
        // Use BFS to compute parent and depth to avoid recursion (stack overflow)
        vector<int> depth(n, 0), parent(n, -1);
        {
            queue<int> qu;
            qu.push(0);
            parent[0] = -1;
            while(!qu.empty()){
                int cur = qu.front();
                qu.pop();
                for (int nb : tree[cur]){
                    if(nb == parent[cur]) continue;
                    parent[nb] = cur;
                    depth[nb] = depth[cur] + 1;
                    qu.push(nb);
                }
            }
        }
 
        int LOG = floor(log2(n)) + 1;
        vector<vector<int>> up(n, vector<int>(LOG, -1));
        for (int i = 0; i < n; i++){
            up[i][0] = parent[i];
        }
        for (int j = 1; j < LOG; j++){
            for (int i = 0; i < n; i++){
                if (up[i][j - 1] != -1)
                    up[i][j] = up[ up[i][j - 1] ][j - 1];
            }
        }
 
        auto lca = [&](int a, int b) -> int {
            if(depth[a] < depth[b])
                swap(a, b);
            int d = depth[a] - depth[b];
            for (int i = 0; i < LOG; i++){
                if(d & (1 << i))
                    a = up[a][i];
            }
            if(a == b) return a;
            for (int i = LOG - 1; i >= 0; i--){
                if(up[a][i] != up[b][i]){
                    a = up[a][i];
                    b = up[b][i];
                }
            }
            return up[a][0];
        };
 
        auto dist = [&](int a, int b) -> int {
            int c = lca(a, b);
            return depth[a] + depth[b] - 2 * depth[c];
        };
 
        bool valid = true;
        for (int i = 0; i < n; i++){
            int dCandidate = dist(i, ans[i]);
            int dMax = max(dA[i], dB[i]);
            if(dCandidate != dMax){
                valid = false;
                break;
            }
        }
 
        if(valid)
            cout << "true" << "\n";
        else{
            for (auto x : ans)
                cout << x << " ";
            cout << "\n";
        }
    }
    return 0;
}