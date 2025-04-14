#include <bits/stdc++.h>
using namespace std;

class Solution {
    static constexpr int MOD = 1000000007;
    static constexpr int INV2 = (MOD + 1) / 2;
    
    int mul(long long a, long long b) {
        return (a * b) % MOD;
    }
    
    int sqr(int a) {
        return mul(a, a);
    }
    
    int add(int a, int b) {
        a += b;
        if(a >= MOD) a -= MOD;
        return a;
    }
    
    int sub(int a, int b) {
        a -= b;
        if(a < 0) a += MOD;
        return a;
    }
    
    int C2(int n) {
        return mul(mul(n, n - 1), INV2);
    }
    
    int compute(const vector<int>& v, const vector<int>& freq, bool flag) {
        int n = v.size(), m = freq.size();
        vector<int> cnt(m, 0);
        int res = 0, sumR2 = 0, sumRT = 0, sumR2T = 0;
        for (int j = 0; j < m; ++j)
            sumR2 = add(sumR2, sqr(freq[j]));
        
        for (int i = 0; i < n; ++i) {
            int x = v[i];
            int rx = freq[x] - cnt[x];
            int curR2 = sub(sumR2, sqr(rx));
            int curRT = sub(sumRT, mul(rx, cnt[x]));
            int curR2T = sub(sumR2T, mul(sqr(rx), cnt[x]));
            int p = n - i - rx, sumt = i - cnt[x];
            
            int tmp = mul(sub(sqr(p), curR2), sumt);
            tmp = sub(tmp, mul(mul(2, p), curRT));
            tmp = add(tmp, mul(2, curR2T));
            tmp = mul(tmp, mul(cnt[x], INV2));
            res = add(res, tmp);
            
            res = add(res, mul(C2(cnt[x]), C2(p)));
            rx--;
            res = add(res, mul(C2(cnt[x]), mul(rx, p)));
            if (flag) {
                res = add(res, mul(mul(cnt[x], sumt), mul(rx, p)));
                res = add(res, mul(C2(cnt[x]), C2(rx)));
            }
            
            cnt[x]++;
            sumR2 = add(curR2, sqr(rx));
            sumRT = add(curRT, mul(rx, cnt[x]));
            sumR2T = add(curR2T, mul(sqr(rx), cnt[x]));
        }
        return res;
    }
    
public:
    int subsequencesWithMiddleMode(vector<int>& nums) {
        unordered_map<int, int> mp;
        int idx = 0;
        for (int &x : nums) {
            if (!mp.count(x))
                mp[x] = idx++;
            x = mp[x];
        }
        vector<int> freq(idx, 0);
        for (int x : nums)
            freq[x]++;
        int ans = compute(nums, freq, true);
        reverse(nums.begin(), nums.end());
        ans = add(ans, compute(nums, freq, false));
        return ans;
    }
};


int main() {
    int T;
    cin >> T;
    for (int tc = 0; tc < T; tc++) {
        string name;
        cin >> name;
        cout << name << "\n";
        int n;
        cin >> n;
        vector<int> v(n);
        
        for (auto &it : v)
            cin >> it;
            
        Solution sol;
            
        cout << sol.subsequencesWithMiddleMode(v) << "\n";
    }
    return 0;
}