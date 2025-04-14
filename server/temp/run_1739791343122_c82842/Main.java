import java.util.*;

class Solution {
    public List<List<Integer>> findMissingRanges(int[] nums, int lower, int upper) {
        List<List<Integer>> ans = new ArrayList<>();
        if (nums.length == 0) {
            ans.add(Arrays.asList(lower, upper));
            return ans;
        }
        if (nums[0] != lower) 
            ans.add(Arrays.asList(lower, nums[0] - 1));

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1] + 1) 
                ans.add(Arrays.asList(nums[i - 1] + 1, nums[i] - 1));
        }

        if (nums[nums.length - 1] != upper) 
            ans.add(Arrays.asList(nums[nums.length - 1] + 1, upper));

        return ans;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = Integer.parseInt(sc.nextLine());

        for (int tc = 0; tc < T; tc++) {
            System.out.println(sc.nextLine());
            int lower = Integer.parseInt(sc.nextLine());
            int upper = Integer.parseInt(sc.nextLine());
            int n = Integer.parseInt(sc.nextLine());
            int[] nums = new int[n];
            
            if (n > 0) {
                String[] parts = sc.nextLine().split(" ");
                for (int i = 0; i < n; i++) {
                    nums[i] = Integer.parseInt(parts[i]);
                }
            }

            Solution sol = new Solution();
            List<List<Integer>> res = sol.findMissingRanges(nums, lower, upper);
            
            for (List<Integer> r : res) {
                System.out.println(r.get(0) + " " + r.get(1));
            }
        }
        sc.close();
    }
}