import java.util.*;

class Solution {
    public int missingNumber(int[] arr) {
        int n = arr.length;
        int difference = (arr[n - 1] - arr[0]) / n;
        int lo = 0, hi = n - 1;

        while (lo < hi) {
            int mid = (lo + hi) / 2;

            if (arr[mid] == arr[0] + mid * difference) 
                lo = mid + 1;
            else 
                hi = mid;
        }

        return arr[0] + difference * lo;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        for (int i = 0; i < T; i++) {
            String x = sc.next();
            System.out.println(x);

            Solution solution = new Solution();
            int n = sc.nextInt();
            int[] arr = new int[n];

            for (int j = 0; j < n; j++) {
                arr[j] = sc.nextInt();
            }

            int missing = solution.missingNumber(arr);
            System.out.println(missing);
        }

        sc.close();
    }
}