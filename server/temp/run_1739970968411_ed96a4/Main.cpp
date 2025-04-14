#include <bits/stdc++.h>
using namespace std;

class Solution
{
    static const int M = 1e9 + 7;

    int add(int a, int b)
    {
        int s = a + b;  
        s %= M;
        return s < 0 ? s + M : s;
    }

    int mul(int a, int b) { return (int)((long long)a * b % M); }

    int f(const vector<int> &a, int d)
    {
        int n = a.size(), mx = *max_element(a.begin(), a.end());
        vector<int> dp(mx + 1), used(mx + 1), cnt(mx + 1);
        for (auto x : a)
        {
            used[x] = 1;
            int cur = 1;
            if (x - d >= 1 && x - d <= mx && used[x - d])
            {
                cur = add(cur, cnt[x - d]);
                dp[x] = add(dp[x], dp[x - d]);
            }
            int m = mul(cur, x);
            cnt[x] = add(cnt[x], cur);
            dp[x] = add(dp[x], m);
        }
        int ans = 0;
        for (int i = 1; i <= mx; i++)
            if (used[i])
                ans = add(ans, dp[i]);
        return ans;
    }

public:
    int getSum(vector<int> &nums)
    {
        int ans = add(f(nums, 1), f(nums, -1));
        for (auto x : nums)
            ans = add(ans, -x);
        return ans;
    }
};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // #ifndef ONLINE_JUDGE
    //     freopen("ip.txt", "r", stdin);
    //     freopen("op.txt", "w", stdout);
    // #endif

    int T;
    cin >> T;

    for (int tc = 1; tc <= T; tc++)
    {
        string testName;
        cin >> testName;
        cout << testName << "\n";
        int n;
        cin >> n;
        vector<int> nums(n);
        for (auto &it : nums)
            cin >> it;
        Solution sol;
        int ans = sol.getSum(nums);
        cout << ans << "\n";
    }

    return 0;
}