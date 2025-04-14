#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<string> generatePossibleNextMoves(string s) {
        vector<string> moves;
        int n = s.length();
        for (int i = 0; i < n - 1; i++) {
            if (s[i] == '+' && s[i + 1] == '+') { 
                s[i] = s[i + 1] = '-';
                moves.push_back(s);
                s[i] = s[i + 1] = '+';
            }
        }
        return moves;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    // cin.ignore(); // Ignore newline after t

    for (int tc = 1; tc <= t; tc++) {
        string s;
        // getline(cin, s);  // Read test case identifier (ignored)
        cout << s;
        
        string s;
        cin >> s;
        
        Solution solution;
        auto result = solution.generatePossibleNextMoves(s);

        for (auto &it : result)
            cout << it << " ";
        cout << endl;

    }

    return 0;
}