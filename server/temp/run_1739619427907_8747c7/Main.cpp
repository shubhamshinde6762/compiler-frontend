#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string answerString(string word, int numFriends) {
        if (numFriends == 1) {
            return word;
        }
        int idx = 0;
        for (int i = 1, l = 1; i < size(word); ++i) {
            if (word[i] == word[idx + (l - 1)]) {
                ++l;
            } else if (word[i] < word[idx + (l - 1)]) {
                l = 1;
            } else if (word[i] > word[idx + (l - 1)]) {
                if (word[i - (l - 1)] >= word[i]) {
                    idx = i - (l - 1);
                } else {
                    idx = i;
                }
                l = 1;
            }
        }
        return word.substr(idx, size(word) - idx - max((numFriends - 1) - idx, 0));
    }
};


int main() {
    int T;
    cin >> T;
    for (int tc = 0; tc < T; tc++) {
        string name;
        cin >> name;
        cout << name << "\n";
        string word;
        cin >> word;
        int x;
        cin >> x;
        Solution sol;
        cout << sol(word, x) << "\n";
    }
    return 0;
}