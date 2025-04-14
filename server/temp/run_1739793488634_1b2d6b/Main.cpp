#include <bits/stdc++.h>
using namespace std;

class TwoSum {
    unordered_map<int, int> freq;
public:
    void add(int number) {
        freq[number]++;
    }
    
    bool find(int value) {
        for (auto &it : freq) {
            int num = it.first;
            int count = it.second;
            long long complement = (long long)value - num;
            if ((complement != num && freq.count(complement)) || (complement == num && count > 1))
                return true;
        }
        return false;
    }
};

int main() {
    int T;
    cin >> T;
    cin.ignore();
    
    for (int t = 0; t < T; ++t) {
        string case_name;
        getline(cin, case_name);
        int n;
        cin >> n;
        cin.ignore();
        cout << case_name << "\n";
        cout << n << "\n";
        
        TwoSum ts;
        string line;
        getline(cin, line);
        istringstream iss(line);
        string op;
        
        while (iss >> op) {
            if (op.find("add(") == 0) {
                int x = stoi(op.substr(4, op.size() - 5));
                ts.add(x);
                cout << "null ";
            } else if (op.find("find(") == 0) {
                int x = stoi(op.substr(5, op.size() - 6));
                cout << (ts.find(x) ? "true " : "false ");
            }
        }
        cout << "\n";
    }
    return 0;
}