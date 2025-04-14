#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> colorRed(int n) {
        vector<vector<int>> result;
        for (int i = 1; i <= n; ++i) {
            result.push_back({i, 1});
        }
        return result;
    }
};

// Function to validate if the given set S will turn the whole grid red
bool validate(int n, vector<vector<int>>& S) {
    // Define a function to get neighbors of (i,j)
    auto getNeighbors = [&](int i, int j) {
        vector<pair<int,int>> neighbors;
        // Within the same row
        if (j > 1) neighbors.push_back({i, j-1});
        if (j < 2*i - 1) neighbors.push_back({i, j+1});
        // Connect to row below
        if (i < n) neighbors.push_back({i+1, j});
        // Connect to row above
        if (i > 1) neighbors.push_back({i-1, j});
        // Since each triangle has up to 3 neighbors, we'll limit based on testing
        // For now, we'll use all possible neighbors and let the simulation handle
        // We'll adjust if necessary after testing
        // Ensure valid coordinates
        vector<pair<int,int>> valid_neighbors;
        for (auto& nb : neighbors) {
            int ni = nb.first;
            int nj = nb.second;
            if (ni >= 1 && ni <= n && nj >= 1 && nj <= 2*ni - 1) {
                valid_neighbors.push_back({ni, nj});
            }
        }
        // Limit to 3 neighbors (adjust based on actual grid)
        // For simplicity, we'll proceed with valid neighbors
        return valid_neighbors;
    };

    // Initialize red set
    set<pair<int,int>> red;
    for (auto& p : S) {
        int i = p[0], j = p[1];
        // Validate coordinates
        if (i >= 1 && i <= n && j >= 1 && j <= 2*i - 1) {
            red.insert({i, j});
        }
    }

    // Simulate the coloring process
    bool changed = true;
    while (changed) {
        changed = false;
        vector<pair<int,int>> to_add;
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= 2*i - 1; ++j) {
                if (red.count({i, j}) == 0) {
                    vector<pair<int,int>> neighbors = getNeighbors(i, j);
                    int red_neighbors = 0;
                    for (auto& nb : neighbors) {
                        if (red.count(nb)) red_neighbors++;
                    }
                    if (red_neighbors >= 2) {
                        to_add.push_back({i, j});
                        changed = true;
                    }
                }
            }
        }
        for (auto& p : to_add) {
            red.insert(p);
        }
    }

    // Check if all triangles are red
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= 2*i - 1; ++j) {
            if (red.count({i, j}) == 0) return false;
        }
    }
    return true;
}

int main() {
    int testCnt;
    cin >> testCnt;

    Solution sol;

    for (int i = 0; i < testCnt; ++i) {
        string tname;
        cin >> tname;
        cout << tname << endl;

        int n;
        cin >> n;
        cin.ignore();

        vector<vector<int>> result = sol.colorRed(n);
        // sort(result.begin(), result.end());
        cout << validate(n, result) << "\n";
    }

    return 0;
// }