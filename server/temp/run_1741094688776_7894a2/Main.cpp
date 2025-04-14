#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        vector<int> ans;

        int p1 = 0, p2 = 0, p3 = 0;

        while (p1 < arr1.size() && p2 < arr2.size() && p3 < arr3.size()) 
        {
            if (arr1[p1] == arr2[p2] && arr2[p2] == arr3[p3]) 
            {
                ans.push_back(arr1[p1]);
                p1++;
                p2++;
                p3++;
            } 
            else 
            {
                if (arr1[p1] < arr2[p2]) 
                    p1++;
                else if (arr2[p2] < arr3[p3]) 
                    p2++;
                else 
                    p3++;
            }
        }

        return ans;
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
        
        for (auto &it : p)
            cout << it << " ";
        cout << endl;
    }
    
    return 0;
}