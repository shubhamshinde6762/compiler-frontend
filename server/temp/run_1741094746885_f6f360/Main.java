import java.util.*;

class Solution {
    public List<Integer> arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<Integer> ans = new ArrayList<>();
        int p1 = 0, p2 = 0, p3 = 0;

        while (p1 < arr1.length && p2 < arr2.length && p3 < arr3.length) {
            if (arr1[p1] == arr2[p2] && arr2[p2] == arr3[p3]) {
                ans.add(arr1[p1]);
                p1++;
                p2++;
                p3++;
            } else {
                if (arr1[p1] < arr2[p2]) {
                    p1++;
                } else if (arr2[p2] < arr3[p3]) {
                    p2++;
                } else {
                    p3++;
                }
            }
        }

        return ans;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        sc.nextLine(); // Consume newline

        for (int i = 1; i <= T; i++) {
            String identifier = sc.nextLine();
            System.out.println(identifier);

            Solution solution = new Solution();
            
            int n = sc.nextInt();
            int[] arr1 = new int[n];
            for (int j = 0; j < n; j++) {
                arr1[j] = sc.nextInt();
            }
             if (sc.hasNext())
                sc.nextLine();

            n = sc.nextInt();
            int[] arr2 = new int[n];
            for (int j = 0; j < n; j++) {
                arr2[j] = sc.nextInt();
            }
             if (sc.hasNext())
                sc.nextLine();

            n = sc.nextInt();
            int[] arr3 = new int[n];
            for (int j = 0; j < n; j++) {
                arr3[j] = sc.nextInt();
            }
             if (sc.hasNext())
                sc.nextLine();
            List<Integer> result = solution.arraysIntersection(arr1, arr2, arr3);
            for (int num : result) {
                System.out.print(num + " ");
            }
            
            
            System.out.println();
        }
        
        sc.close();
    }
}