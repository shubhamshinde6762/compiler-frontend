#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
        map<int, vector<int>> m;
        vector<vector<int>> res;
        
        for (auto& v : items) 
            m[v[0]].push_back(v[1]);

        for (auto& it : m) {
            int id = it.first, scores = it.second;
            partial_sort(scores.begin(), scores.begin() + 5, scores.end(), greater<int>());
            int avg = (scores[0] + scores[1] + scores[2] + scores[3] + scores[4]) / 5;
            res.push_back({id, avg});
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
        int n;
        cin >> n;
        int m;
        cin >> m;

        vector<vector<int>> items(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            cin >> items[i][0] >> items[i][1];
        }

        Solution sol;
        auto result = sol.highFive(items);

        for (auto& entry : result) {
            cout << entry[0] << " " << entry[1] << endl;
        }
    }

    return 0;
}