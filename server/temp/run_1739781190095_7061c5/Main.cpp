#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> findMissingRanges(vector<int>& nums, int lower, int upper) {
        if (nums.size() == 0)
            return {{lower, upper}};
        vector<vector<int>> ans;
        int n = nums.size();
        if (nums[0] != lower)
            ans.push_back({lower, nums[0] - 1});

        for (int i = 1; i < n; i++)
        {
            if (nums[i] == nums[i - 1] + 1)
                continue;

            ans.push_back({nums[i - 1] + 1, nums[i] - 1});
        }

        if (nums.back() != upper)
            ans.push_back({nums.back() + 1, upper});

        return ans;
    }
};

int main() {
    int T;
    cin >> T;
    for (int tc = 0; tc < T; tc++) {
        int lower, upper;
        cin >> lower >> upper;
        int n;
        cin >> n;
        vector<int> nums(n);
        
        for (auto &it : nums)
            cin >> it;
        
        Solution sol;
        auto v = sol.findMissingRanges(nums, lower, upper);
        
        for (auto &it : v)
        {
            for (auto num : it)
                cout << num << " ";
            cout << endl;
        }
    }
    return 0;
}