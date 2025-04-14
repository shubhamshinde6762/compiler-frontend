#include <iostream>
#include <deque>
#include <vector>
#include <sstream>
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
        
        cin >> n;
        vector<int> values(n);
        for (int i = 0; i < n; ++i) {
            cin >> values[i];
        }
        
        MovingAverage obj(values[0]);
       for (int i = 1; i < n; i++)
        cout << setprecision(5) << obj.next(values[i]) << " ";
        cout << endl;
    }
    return 0;
}