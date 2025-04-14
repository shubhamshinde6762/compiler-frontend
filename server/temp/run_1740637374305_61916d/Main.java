import java.util.*;

class Solution {
    public int fixedPoint(int[] arr) {
        int start = 0, end = arr.length - 1;
        int ans = -1;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (mid > arr[mid]) {
                start = mid + 1;
            } else {
                if (mid == arr[mid]) {
                    ans = mid;
                }
                end = mid - 1;
            }
        }
        return ans;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int T = sc.nextInt(); // Read number of test cases
        sc.nextLine(); // Consume newline

        for (int t = 0; t < T; t++) {
            String testCaseName = sc.nextLine().trim();
            System.out.println(testCaseName);

            int n = sc.nextInt(); // Read n
            int[] arr = new int[n];

            for (int i = 0; i < n; i++) {
                arr[i] = sc.nextInt();
            }

            Solution sol = new Solution();
            System.out.println(sol.fixedPoint(arr));

            if (sc.hasNextLine()) sc.nextLine(); // Consume newline
        }
        sc.close();
    }
}