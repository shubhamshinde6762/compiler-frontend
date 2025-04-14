#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
       vector<vector<int>> res;
       map<int, vector<int>> m;
       for (auto& v : items) m[v[0]].push_back(v[1]);
       for (auto& [i, v] : m) {
          partial_sort(v.begin(), v.begin() + 5, v.end(), greater<int>());
          res.push_back({ i, (v[0] + v[1] + v[2] + v[3] + v[4]) / 5 });
       }
       return res;
    }
};

int main() {
    int T;
    cin >> T;
    
    for (int t = 0; t < T; t++) {
        string s;
        cin >> s;
        cout << s << "\n";
        
        int n;
        cin >> n;
        int m;
        cin >> m;
        
        vector<vector<int>> nums(n, vector<int>(m));
        
        for (auto &it : nums)
        {
            for (auto &e : it)
                cin >> e;
        }
            
        Solution sol;
            
        auto x = sol.highFive(nums);
        
        for (auto &ele : x)
        {
            for (auto &it : ele)
                cout << it << " ";
            cout << endl;
        }
    }
    
    return 0;
}