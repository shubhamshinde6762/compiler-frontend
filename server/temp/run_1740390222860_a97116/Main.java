import java.util.*;

class Solution {
    public List<int[]> colorRed(int n) {
        List<int[]> ans = new ArrayList<>();
        ans.add(new int[]{1, 1});
        for (int i = 2; i <= n; i++) {
            int start = (((n - i) % 4) % 3) + 1;
            if ((n - i) % 2 == 1) {
                ans.add(new int[]{i, start});
            } else {
                for (int j = start; j < i * 2; j += 2) {
                    ans.add(new int[]{i, j});
                }
            }
        }
        return ans;
    }
}

public class Main {
    private static boolean validate(int n, List<int[]> S) {
        Set<String> red = new HashSet<>();
        for (int[] p : S) {
            red.add(p[0] + "," + p[1]);
        }

        boolean changed = true;
        while (changed) {
            changed = false;
            List<String> toAdd = new ArrayList<>();

            for (int i = 1; i <= n; i++) {
                for (int j = 1; j < 2 * i; j++) {
                    String key = i + "," + j;
                    if (!red.contains(key)) {
                        int redNeighbors = 0;
                        int[][] neighbors = {
                                {i, j - 1}, {i, j + 1},
                                {i + 1, j}, {i - 1, j}
                        };
                        for (int[] nb : neighbors) {
                            int ni = nb[0], nj = nb[1];
                            if (ni >= 1 && ni <= n && nj >= 1 && nj <= 2 * ni - 1) {
                                if (red.contains(ni + "," + nj)) redNeighbors++;
                            }
                        }
                        if (redNeighbors >= 2) {
                            toAdd.add(key);
                            changed = true;
                        }
                    }
                }
            }
            red.addAll(toAdd);
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j < 2 * i; j++) {
                if (!red.contains(i + "," + j)) return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int testCnt = Integer.parseInt(sc.nextLine().trim());

        Solution sol = new Solution();

        for (int i = 0; i < testCnt; i++) {
            String tname = sc.nextLine().trim();
            System.out.println(tname);

            int n = Integer.parseInt(sc.nextLine().trim());
            List<int[]> result = sol.colorRed(n);
            System.out.println(validate(n, result) ? "true" : "false");
        }

        sc.close();
    }
}