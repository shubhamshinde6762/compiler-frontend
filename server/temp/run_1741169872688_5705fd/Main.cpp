#include <bits/stdc++.h>

using namespace std;

// Simulating the read4 API
int read4(char *buf4);

string fileContent;
int filePointer = 0;

int read4(char *buf4) {
    int i;
    for (i = 0; i < 4 && filePointer < fileContent.size(); i++) {
        buf4[i] = fileContent[filePointer++];
    }
    return i;
}

class Solution {
public:
    /**
     * @param buf Destination buffer
     * @param n   Number of characters to read
     * @return    The number of actual characters read
     */
    int read(char *buf, int n) {
        int copiedChars = 0;
        int readChars = 4;
        int remainingChars = n;

        // While there are at least 4 characters remaining to be read and the
        // last call to readChars returned 4 characters, write directly to buf.
        while (remainingChars >= 4 && readChars == 4) {
            readChars = read4(buf + copiedChars);
            copiedChars += readChars;
        }

        // If there are between 1 and 3 characters that we still want to read
        // and readChars was not 0 last time we called read4, then create a
        // buffer for just this one call so we can ensure buf does not overflow.
        if (remainingChars && readChars) {
            char buf4[4];
            readChars = read4(buf4);
            for (int i = 0; i < min(remainingChars, readChars); i++) {
                buf[copiedChars++] = buf4[i];
            }
        }

        return min(n, copiedChars);
    }
};

int main() {
    int T;
    cin >> T;
    vector<string> results;

    for (int t = 1; t <= T; t++) {
        string x;
        cin >> x;
        cout << x << endl;;
        filePointer = 0;
        cin >> fileContent;
        int n;
        cin >> n;

        Solution solution;
        char buf[1000] = {0}; // Sufficient buffer size
        int charsRead = solution.read(buf, n);

        string output(buf, charsRead);
        cout << charsRead << "\n" << output << endl;
    }

    return 0;
}