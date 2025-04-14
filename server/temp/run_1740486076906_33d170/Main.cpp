#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string similarRGB(string color) {
        for (int i = 1; i < 7; i += 2) {
            int value = stoi(color.substr(i,2), nullptr, 16);
            int index = value / 17 < 15 && value % 17 > 8 ? value / 17 + 1 : value / 17;
            color[i] = color[i + 1] = (index > 9 ? index - 10 + 'a' : index + '0');
        }        
        return color;
    }
};


bool chk(string original, string result) {
    if (result.length() != 7 || result[0] != '#') return false;

    for (int i = 1; i < 7; i += 2) {
        // Extract original two-digit hex value
        int origValue = stoi(original.substr(i, 2), nullptr, 16);

        // Extract the shorthand digit and expand it
        if (result[i] != result[i + 1]) return false; // Must be a shorthand (e.g., "aa" for "aabbcc")
        int shortValue = stoi(string(2, result[i]), nullptr, 16); // Expands "a" to "aa" -> 0xaa

        // Check if shortValue is the closest possible shorthand
        int lower = (origValue / 17) * 17;
        int higher = min(255, lower + 17);

        if (shortValue != lower && shortValue != higher) {
            return false; // The result is not the closest shorthand value
        }
    }

    return true;
}


int main() {
    int t;
    cin >> t;
    
    while(t--)
    {
        string s;
        cin >> s;
        cout << s << "\n";
        
        string x;
        cin >> x;
        
        Solution sol;
        string y = sol.similarRGB(x);
        
        cout << chk(x, y) ? "true" : "false" << " ";
        
    }
    
    cout << endl;

    return 0;
}