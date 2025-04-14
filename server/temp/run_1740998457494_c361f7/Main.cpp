#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isMajorityElement(vector<int>& nums, int target) {
        int firstIndex = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
        return firstIndex + nums.size() / 2 < nums.size() && nums[firstIndex + nums.size() / 2] == target;
    }
};

int main() {
    int T;
    cin >> T;

    for (int t = 1; t <= T; t++) {
        string s;
        cin >> s;
        cout << s << endl;  // Ensures proper formatting
        int n;
        cin >> n;
        vector<int> v(n);
        
        for (auto &it : v)
            cin >> it;
        
        int target;
        cin >> target;
        
        Solution sol;
        bool result = sol.isMajorityElement(v, target);

        cout << (result ? "true" : "false") << endl;  // Newline after result
    }

    return 0;
}