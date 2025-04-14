#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxNumberOfApples(vector<int>& arr) {
        sort(arr.begin(), arr.end());        
        int sum = 5000;
        int count = 0;
        
        for (int i = 0; i < arr.size(); i++) {
            if (sum - arr[i] >= 0) {
                count++;
                sum -= arr[i];
            }
        }
        return count;
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
        vector<int> v(n);
        
        for (auto &it : v)
            cin >> it;
        
        cout << solution.maxNumberOfApples(v) << endl;
    }
    
    return 0;
}