import java.util.*;

class Solution {
    public int shortestDistance(List<String> wordsDict, String word1, String word2) {
        int p1 = -1, p2 = -1;
        int n = wordsDict.size(), ans = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            if (wordsDict.get(i).equals(word1)) 
                p1 = i;
            else if (wordsDict.get(i).equals(word2)) 
                p2 = i;

            if (p1 != -1 && p2 != -1) 
                ans = Math.min(ans, Math.abs(p1 - p2));
        }
        return ans;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        
        for (int t = 0; t < T; t++) {
            String caseName = sc.next();
            System.out.println(caseName);
            
            int n = sc.nextInt();
            List<String> wordsDict = new ArrayList<>();
            
            for (int i = 0; i < n; i++) {
                wordsDict.add(sc.next());
            }

            String word1 = sc.next();
            String word2 = sc.next();

            Solution solution = new Solution();
            System.out.println(solution.shortestDistance(wordsDict, word1, word2));
        }
        sc.close();
    }
}