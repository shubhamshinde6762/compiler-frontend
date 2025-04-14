import java.io.*;
import java.util.*;

class Solution {
    public String answerString(String word, int numFriends) {
        if (numFriends == 1)
            return word;
        int idx = 0;
        int n = word.length();
        for (int i = 1, l = 1; i < n; i++) {
            if (word.charAt(i) == word.charAt(idx + l - 1)) {
                l++;
            } else if (word.charAt(i) < word.charAt(idx + l - 1)) {
                l = 1;
            } else {
                if (word.charAt(i - l + 1) >= word.charAt(i))
                    idx = i - l + 1;
                else
                    idx = i;
                l = 1;
            }
        }
        int extra = Math.max((numFriends - 1) - idx, 0);
        return word.substring(idx, n - extra);
    }
}



public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine().trim());
        for (int tc = 0; tc < T; tc++) {
            String name = br.readLine().trim();
            System.out.println(name);
            String word = br.readLine().trim();
            int x = Integer.parseInt(br.readLine().trim());
            Solution sol = new Solution();
            System.out.println(sol.answerString(word, x));
        }
    }
}