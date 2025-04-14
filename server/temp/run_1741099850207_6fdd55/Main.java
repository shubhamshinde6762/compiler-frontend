import java.util.*;

class Solution {
    public List<Integer> transformArray(List<Integer> arr) {
        if (arr.size() <= 2) return arr;
        boolean changed = true;

        while (changed) {
            changed = false;
            int prev = arr.get(0), curr = arr.get(1), next = arr.get(2);

            for (int i = 1; i < arr.size() - 1; i++) {
                if (curr < prev && curr < next) {
                    arr.set(i, arr.get(i) + 1);
                    changed = true;
                } else if (curr > prev && curr > next) {
                    arr.set(i, arr.get(i) - 1);
                    changed = true;
                }
                if (i == arr.size() - 2) break;
                prev = curr;
                curr = next;
                next = arr.get(i + 2);
            }
        }
        return arr;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        for (int i = 1; i <= T; i++) {
            String x = sc.next();
            System.out.println(x);
            Solution solution = new Solution();
            int n = sc.nextInt();
            List<Integer> a = new ArrayList<>();
            
            for (int j = 0; j < n; j++) {
                a.add(sc.nextInt());
            }
            
            List<Integer> p = solution.transformArray(a);
            for (int num : p) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}