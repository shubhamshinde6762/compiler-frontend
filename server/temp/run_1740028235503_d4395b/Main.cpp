#include <bits/stdc++.h>
using namespace std;

class MovingAverage {
    deque<int> pre;
    int sum = 0;
    int size;
public:
    MovingAverage(int size) {
        this->size = size;
    }
    
    double next(int val) {
        sum += val;
        pre.push_back(val);
        if (pre.size() > size)
            sum -= pre.front(), pre.pop_front();
        return (double) sum / pre.size();
    }
};

int main() {
    int T;
    cin >> T;
    for (int t = 0; t < T; ++t) {
        string test_case_id;
        cin >> test_case_id;
        cout << test_case_id << "\n";
        
        int n;
        cin >> n;
        
        string operations;
        cin.ignore();
        getline(cin, operations);
        
        int m;
        cin >> m;
        vector<int> values(m);
        
        for (int i = 0; i < m; ++i) 
            cin >> values[i];
        
        cout << "null ";
        MovingAverage obj(n);
        for (int val : values) {
            cout << fixed << setprecision(7) << obj.next(val) << " ";
        }
        cout << endl;
    }
    return 0;
}