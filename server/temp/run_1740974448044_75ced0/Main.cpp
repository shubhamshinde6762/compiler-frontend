#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isArmstrong(int N) {
        int k = log10(N) + 1;
        for (int n = N; n; n /= 10)
            N -= pow(n % 10, k);
        return N == 0;
    }
};

int main() {
    int T;
    cin >> T;

    for (int t = 0; t < T; t++) {
        string s;
        cin >> s;
        cout << s << endl;  // Keeping s as requested
        int n;
        cin >> n;

        Solution sol;
        auto result = sol.isArmstrong(n);

        cout << (result ? "true" : "false") << endl;
    }

    return 0;
}