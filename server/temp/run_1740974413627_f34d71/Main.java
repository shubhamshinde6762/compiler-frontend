import java.util.Scanner;

class Solution {
    public boolean isArmstrong(int N) {
        int k = (int) (Math.log10(N) + 1);
        int temp = N;
        while (temp > 0) {
            N -= Math.pow(temp % 10, k);
            temp /= 10;
        }
        return N == 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        for (int t = 0; t < T; t++) {
            String s = sc.next();
            System.out.println(s);
            int n = sc.nextInt();

            Solution sol = new Solution();
            boolean result = sol.isArmstrong(n);
            System.out.println(result ? "true" : "false");
        }

        sc.close();
    }
}