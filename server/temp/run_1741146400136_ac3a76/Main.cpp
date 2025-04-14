#include <bits/stdc++.h>
using namespace std;

class Solution {
    int MOD = 1e9 + 7;
public:
    vector<vector<int>> findRLEArray(vector<vector<int>>& encoded1, vector<vector<int>>& encoded2) {
        auto sz1 = encoded1.size(); auto sz2 = encoded2.size();
        int i = 0, j = 0;
        auto output = vector<vector<int>>{};
        while (i < sz1 && j < sz2) {
            auto freq = min(encoded1[i][1], encoded2[j][1]);
            auto val = (encoded1[i][0] * encoded2[j][0]) % MOD;
            encoded1[i][1] -= freq; encoded2[j][1] -= freq;
            if (!output.empty() && val == output.back()[0]) {
                freq += output.back()[1];
                output.pop_back();
            }
            output.push_back({val, freq});
            if (encoded1[i][1] == 0) i++;
            if (encoded2[j][1] == 0) j++;
        }
        output.insert(output.end(), encoded1.begin() + i, encoded1.end());
        output.insert(output.end(), encoded2.begin() + j, encoded2.end());
        return output;
    }
};

int main() {
    int t; cin >> t;
    while (t--) {
        string tc; cin >> tc;
        cout << tc << endl;

        int n, sz; cin >> n >> sz;
        vector<vector<int>> encoded1(n, vector<int>(2));
        for (int i = 0; i < n; i++) cin >> encoded1[i][0] >> encoded1[i][1];

        int m; cin >> m >> sz;
        vector<vector<int>> encoded2(m, vector<int>(2));
        for (int i = 0; i < m; i++) cin >> encoded2[i][0] >> encoded2[i][1];

        Solution obj;
        vector<vector<int>> res = obj.findRLEArray(encoded1, encoded2);
        
        for (auto &row : res) cout << row[0] << " " << row[1] << " ";
        cout << "\n";
    }
}