#include <bits/stdc++.h>
using namespace std;

 class Solution{
public:
    vector<int> lastMarkedNodes(vector<vector<int>>& edges){
        int n = edges.size() + 1;
        vector<vector<int>> tr(n);
        for(auto &e: edges){
            tr[e[0]].push_back(e[1]);
            tr[e[1]].push_back(e[0]);
        }
        auto bfs = [&](int s)->pair<int,vector<int>>{
            vector<int> d(n,-1);
            queue<int> q;
            d[s]=0; q.push(s);
            int far = s;
            while(!q.empty()){
                int cur = q.front(); q.pop();
                for(int nb: tr[cur]){
                    if(d[nb]==-1){
                        d[nb] = d[cur]+1;
                        q.push(nb);
                        if(d[nb]>d[far]) far=nb;
                    }
                }
            }
            return make_pair(far,d);
        };
        auto p = bfs(0);
        int nodeA = p.first;
        auto q1 = bfs(nodeA);
        int nodeB = q1.first;
        auto q2 = bfs(nodeB);
        vector<int> ans(n);
        for(int i=0;i<n;i++)
            ans[i] = (q1.second[i]>=q2.second[i] ? nodeA : nodeB);
        return ans;
    }
};
 
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int T; cin >> T;
    while(T--){
        string tc;
        cin >> tc;
        int n; 
        cin >> n;
        vector<vector<int>> tree(n);
        vector<pair<int,int>> edges;
        for(int i=0;i<n-1;i++){
            int u,v; cin >> u >> v;
            edges.push_back({u,v});
            tree[u].push_back(v);
            tree[v].push_back(u);
        }
       
        Solution sol;
        vector<int> ans = sol.lastMarkedNodes(edges);
 
        auto bfsAll = [&](int s) -> vector<int> {
            vector<int> d(n, -1);
            queue<int> qu;
            d[s]=0; qu.push(s);
            while(!qu.empty()){
                int cur = qu.front(); qu.pop();
                for(auto nb: tree[cur])
                    if(d[nb]==-1){
                        d[nb]= d[cur]+1;
                        qu.push(nb);
                    }
            }
            return d;
        };
 
        auto bfsFarthest = [&](int s) -> pair<int, vector<int>> {
            vector<int> d(n,-1);
            queue<int> qu;
            d[s]=0; qu.push(s);
            int far = s;
            while(!qu.empty()){
                int cur = qu.front(); qu.pop();
                for(auto nb: tree[cur])
                    if(d[nb]==-1){
                        d[nb] = d[cur]+1;
                        qu.push(nb);
                        if(d[nb]>d[far]) far = nb;
                    }
            }
            return make_pair(far,d);
        };
 
        auto p = bfsFarthest(0);
        int nodeA = p.first;
        auto q1 = bfsFarthest(nodeA);
        int nodeB = q1.first;
        vector<int> dA = q1.second;
        auto q2 = bfsAll(nodeB);
        vector<int> dB = q2;
 
        int LOG = floor(log2(n)) + 1;
        vector<int> depth(n,0);
        vector<vector<int>> up(n, vector<int>(LOG, -1));
        function<void(int,int)> dfs = [&](int v, int p){
            up[v][0] = p;
            for(auto nb: tree[v]){
                if(nb==p) continue;
                depth[nb] = depth[v]+1;
                dfs(nb, v);
            }
        };
        dfs(0,-1);
        for(int j=1;j<LOG;j++){
            for(int i=0;i<n;i++){
                if(up[i][j-1]!=-1)
                    up[i][j] = up[ up[i][j-1] ][j-1];
            }
        }
 
        auto lca = [&](int a, int b)->int{
            if(depth[a] < depth[b]) swap(a,b);
            int d = depth[a]-depth[b];
            for(int i=0;i<LOG;i++){
                if(d&(1<<i))
                    a = up[a][i];
            }
            if(a==b) return a;
            for(int i=LOG-1;i>=0;i--){
                if(up[a][i]!=up[b][i]){
                    a = up[a][i];
                    b = up[b][i];
                }
            }
            return up[a][0];
        };
 
        auto dist = [&](int a, int b)->int{
            int c = lca(a,b);
            return depth[a] + depth[b] - 2*depth[c];
        };
 
        bool valid = true;
        for(int i=0;i<n;i++){
            int dCandidate = dist(i, ans[i]);
            int dMax = max(dA[i], dB[i]);
            if(dCandidate != dMax) { valid = false; break; }
        }
 
        if(valid){
            cout << "true" << "\n";
        } else {
            for(auto &x: ans) cout << x << " ";
            cout << "\n";
        }
    }
    return 0;
}