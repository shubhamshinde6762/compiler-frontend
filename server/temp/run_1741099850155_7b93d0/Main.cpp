#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> transformArray(vector<int>& arr) {
        if (arr.size() <= 2) return arr;
        bool changed = true;
        int cnt = 0;
        while (changed ) {
            changed = false;
            int prev = arr[0], curr = arr[1], next = arr[2];

            for (int i = 1; i < arr.size() - 1; i++) {
                if (curr < prev && curr < next) {
                    arr[i] = arr[i] + 1;
                    changed = true;
                }
                else if (curr > prev && curr > next) {
                    arr[i] = arr[i] - 1;
                    changed = true;
                }
                if (i == arr.size() - 2) break;
                prev = curr;
                curr = next;
                next = arr[i + 2];
            }

        }
        return arr;
    }
};
int main() {
    int T;
    cin >> T;
    
    for (int i = 1; i <= T; i++) {
        string x;
        cin >> x;
        cout << x << endl;
        Solution solution;
        int n;
        cin >> n;
        vector<int> a(n);
        
        for (auto &it : a)
            cin >> it;
    
        auto p = solution.transformArray(a);
        
        for (auto &it : p)
            cout << it << " ";
        cout << endl;
    }
    
    return 0;
}