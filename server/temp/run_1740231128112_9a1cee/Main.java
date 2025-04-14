import java.util.Scanner;

class Solution {
    public boolean validWordAbbreviation(String word, String abbr) {
        if (word.length() < abbr.length()) return false;
        int n = word.length();
        int abbrSize = 0;
        for (int i = 0; i < abbr.length(); ) {
            if (abbr.charAt(i) == '0') return false;
            if (Character.isDigit(abbr.charAt(i))) {
                int startIdx = i;
                while (i < abbr.length() && Character.isDigit(abbr.charAt(i))) {
                    i++;
                }
                abbrSize += Integer.parseInt(abbr.substring(startIdx, i));
            } else {
                if (abbrSize >= n || word.charAt(abbrSize) != abbr.charAt(i)) return false;
                abbrSize++;
                i++;
            }
        }
        return n == abbrSize;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        sc.nextLine(); // Consume newline

        for (int i = 0; i < T; i++) {
            String testCaseLabel = sc.nextLine().trim();
            String word = sc.nextLine().trim();
            String abbr = sc.nextLine().trim();
            System.out.println(testCaseLabel);
            Solution sol = new Solution();
            System.out.println(sol.validWordAbbreviation(word, abbr) ? "true" : "false");
        }
        sc.close();
    }
}