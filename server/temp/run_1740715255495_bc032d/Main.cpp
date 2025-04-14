#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int sumOfDigits(vector<int>& nums) {
        int x = *min_element(nums.begin(), nums.end());

        bool p = 0;

        while(x)
        {
            p = p ^ (x & 1);
            x /= 10;
        }

        return !p;
    }
};

int main() {
    int T;
    cin >> T;
    
    for (int t = 0; t < T; t++) {
        string s;
        cin >> s;
        cout << s << "\n";
        
        int n;
        cin >> n;
        
        vector<int> nums(n);
        
        for (auto &it : nums)
            cin >> it;
            
        cout << sumOfDigits(nums) << endl;
    }
    
    return 0;
}