import java.util.*;

class Solution {
    public int maxNumberOfApples(int[] arr) {
        Arrays.sort(arr);
        int sum = 5000, count = 0;

        for (int weight : arr) {
            if (sum - weight >= 0) {
                count++;
                sum -= weight;
            } else {
                break;
            }
        }
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        for (int i = 0; i < T; i++) {
            String testCaseName = scanner.nextLine();
            System.out.println(testCaseName);

            int n = scanner.nextInt();
            int[] weights = new int[n];
            
            for (int j = 0; j < n; j++) {
                weights[j] = scanner.nextInt();
            }

            if (scanner.hasNext())
                scanner.nextLine();
            Solution solution = new Solution();
            System.out.println(solution.maxNumberOfApples(weights));
        }
        scanner.close();
    }
}