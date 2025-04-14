#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());

        int n = intervals.size();

        for (int i = 1; i < n; i++)
        {
            if (intervals[i][0] < intervals[i - 1][1]) 
                return 0;
        }

        return 1;
    }
};

int main() {
    int T;
    cin >> T;
    
    for (int t = 0; t < T; ++t) {
        string case_name;
        cin >> case_name;
        string n, m;
        cin >> n >> m;
        cout << case_name << "\n";
        
        Solution ts;
        vector<vector<int>> v(n, vector<int> (m));
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
                cin >> v[i][j];
        }
        
        cout << (ts.canAttendMeetings(v) ? "true" : "false");
        cout << "\n";
    }
    return 0;
}