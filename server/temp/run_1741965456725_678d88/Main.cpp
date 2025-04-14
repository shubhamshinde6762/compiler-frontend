#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool checkContradictions(vector<vector<string>>& equations, vector<double>& values) {
        unordered_map<string, string> parent;
        unordered_map<string, double> weight;

        // Define the find function explicitly
        function<pair<string, double>(string)> find = [&](string node) -> pair<string, double> {
            if (parent.find(node) == parent.end()) {
                parent[node] = node;
                weight[node] = 1.0;
                return {node, 1.0};
            }
            if (parent[node] == node) {
                return {node, weight[node]};
            }
            auto [root, w] = find(parent[node]); // Recursive call
            parent[node] = root;
            weight[node] *= w;
            return {root, weight[node]};
        };

        for (int i = 0; i < equations.size(); ++i) {
            const string& a = equations[i][0];
            const string& b = equations[i][1];
            double r = values[i];

            auto [rootA, wA] = find(a);
            auto [rootB, wB] = find(b);

            if (rootA != rootB) {
                parent[rootA] = rootB;
                weight[rootA] = (r * wB) / wA;
            } else {
                if (abs((wA / wB) - r) > 1e-5) {
                    return true;
                }
            }
        }

        return false;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;

    while (T--) {
        int N;
        cin >> N;

        vector<vector<string>> equations(N, vector<string>(2));
        vector<double> values(N);

        for (int i = 0; i < N; ++i) {
            cin >> equations[i][0] >> equations[i][1] >> values[i];
        }

        Solution solution;
        bool hasContradiction = solution.checkContradictions(equations, values);

        if (hasContradiction) {
            cout << "Ye Toh Bura Hua! 😱\n";
        } else {
            cout << "Rang Barse! 🌈\n";
        }
    }

    return 0;
}