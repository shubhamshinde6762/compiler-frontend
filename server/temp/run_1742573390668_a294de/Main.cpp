#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        unordered_map<int, int> freq;
        
        for (int num : arr1) freq[num]++;
        for (int num : arr2) freq[num]++;
        for (int num : arr3) freq[num]++;
        
        vector<int> result;
        for (auto& [num, count] : freq) {
            if (count == 3) result.push_back(num);
        }

        sort(result.begin(), result.end());  // Ensure result is sorted
        return result;
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
        
        cin >> n;
        vector<int> b(n);
        
        for (auto &it : b)
            cin >> it;
        
        cin >> n;
        vector<int> c(n);
        
        for (auto &it : c)
            cin >> it;
        
        auto p = solution.arraysIntersection(a, b, c);
        
        for (int i = 0; i < p.size(); i++)
            cout << p[i] << ((i == p.size() - 1) ? "" : " ");
cout<<endl;
    }
    
    return 0;
}