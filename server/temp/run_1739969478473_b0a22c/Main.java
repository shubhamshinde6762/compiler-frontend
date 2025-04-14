import java.util.*;

class Solution {
    public List<String> generatePossibleNextMoves(String s) {
        List<String> moves = new ArrayList<>();
        for (int i = 0; i < s.length() - 1; i++) {
            if (s.charAt(i) == '+' && s.charAt(i + 1) == '+') {
                String newStr = s.substring(0, i) + "--" + s.substring(i + 2);
                moves.add(newStr);
            }
        }
        return moves;
    }
    
    
}


class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        Solution solution = new Solution();
        
        for (int tc = 1; tc <= t; tc++) {
            String testCaseId = scanner.nextLine();  // Read test case identifier (ignored)
            System.out.println(testCaseId);

            String s = scanner.nextLine();
            List<String> result = solution.generatePossibleNextMoves(s);
            
            for (String move : result) {
                System.out.print(move + " ");
            }
            System.out.println();
        }

        scanner.close();
    }
}