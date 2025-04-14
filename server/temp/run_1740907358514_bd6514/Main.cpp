#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int twoSumLessThanK(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int i = 0, j = nums.size() - 1;
        int ans = -1;

        while(i < j)
        {
            if (nums[i] + nums[j] < k)
            {
                ans = max(ans, nums[i] + nums[j]);
                i++;
            }
            else
                j--;
        }

        return ans;
    }
};

int main() {
    int T;
    cin >> T;

    for (int t = 0; t < T; t++) {
        string s;
        cin >> s;
        cout << s << endl;  // Keeping s as requested
        int k;
        cin >> k;
        int n;
        cin >> n;

        vector<int> v(n);
        for (int i = 0; i < n; i++) {
            cin >> v[i];

        Solution sol;
        auto result = sol.twoSumLessThanK(v, k);

        cout << result << endl;
    }

    return 0;
}