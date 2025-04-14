#include <bits/stdc++.h>
using namespace std;

struct Fenw
{
    int n;
    vector<int> fenw;
    Fenw(int n) : n(n), fenw(n + 1, -1) {}
    void update(int i, int val)
    {
        for (; i <= n; i += i & -i)
            fenw[i] = max(fenw[i], val);
    }
    int query(int i)
    {
        int res = -1;
        for (; i; i -= i & -i)
            res = max(res, fenw[i]);
        return res;
    }
};

class Solution
{
public:
    int maxProfit(vector<int> &x, vector<int> &y)
    {
        int n = x.size(), maxP = 5000;
        vector<int> left(n, -1), right(n, -1);
        Fenw fenwL(maxP);
        for (int i = 0; i < n; i++)
        {
            int p = x[i];
            if (p - 1 >= 1)
                left[i] = fenwL.query(p - 1);
            fenwL.update(p, y[i]);
        }
        Fenw fenwR(maxP);
        for (int i = n - 1; i >= 0; i--)
        {
            int p = x[i], pos = maxP - p + 1;
            if (pos - 1 >= 1)
                right[i] = fenwR.query(pos - 1);
            fenwR.update(pos, y[i]);
        }
        int ans = -1;
        for (int i = 0; i < n; i++)
        {
            if (left[i] != -1 && right[i] != -1)
                ans = max(ans, left[i] + y[i] + right[i]);
        }
        return ans;
    }
};

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int T;
    cin >> T;
    for (int tc = 1; tc <= T; tc++){
        int n;
        cin >> n;
        vector<int> x(n);
        for (int i = 0; i < n; i++){
            cin >> prices[i];
        }
        int m;
        cin >> m;
        vector<int> y(m);
        for (int i = 0; i < m; i++){
            cin >> profits[i];
        }
        Solution sol;
        cout << sol.maxProfit(x, y) << "\n";
    }
    return 0;
}