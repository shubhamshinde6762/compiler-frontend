import java.util.*;

class Solution {
    public boolean isStrobogrammatic(String num) {
        Map<Character, Character> lut = Map.of('0', '0', '1', '1', '6', '9', '8', '8', '9', '6');
        int l = 0, r = num.length() - 1;
        while (l <= r) {
            if (!lut.containsKey(num.charAt(l)) || lut.get(num.charAt(l)) != num.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        
        for (int t = 0; t < T; ++t) {
            String caseName = sc.next();
            String n = sc.next();
            System.out.println(caseName);
            
            Solution ts = new Solution();
            System.out.println(ts.isStrobogrammatic(n) ? "true" : "false");
        }
        sc.close();
    }
}