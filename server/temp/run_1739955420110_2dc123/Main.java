import java.io.*;
import java.util.*;


class Solution {
    public long numberOfSubstrings(String s, int k) {
        int n = s.length();
        long ans = 0;
        
        for(int i = 0; i < n; i++) {
            int[] temp = new int[26];
            for(int j = i; j < n; j++) {
                temp[s.charAt(j) - 'a']++;
                boolean valid = false;
                for(int f = 0; f < 26; f++) {
                    if(temp[f] == k) {
                        valid = true;
                        break;
                    }
                }
                if(valid) ans++;
            }
        }
        return ans;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine().trim());
        Solution sol = new Solution();
        for (int tc = 0; tc < T; tc++) {
            String testName = br.readLine().trim();
            System.out.println(testName);
            String s = br.readLine().trim();
            int k = Integer.parseInt(br.readLine().trim());
            long ans = sol.numberOfSubstrings(s, k);
            System.out.println(ans);
        }
    }
}