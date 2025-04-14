import java.util.Scanner;

class Solution {
    public boolean isMajorityElement(int[] nums, int target) {
        // Find the first occurrence of target using binary search
        int left = 0;
        int right = nums.length - 1;
        int firstIndex = nums.length;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= target) {
                firstIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // Check if target is the majority element
        return firstIndex + nums.length / 2 < nums.length && 
               nums[firstIndex + nums.length / 2] == target;
    }
}
    

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        for (int i = 1; i <= t; i++) {
            String s = scanner.nextLine();
            System.out.println(s);
            
            int n = scanner.nextInt();
            int[] nums = new int[n];
            
            for (int j = 0; j < n; j++) {
                nums[j] = scanner.nextInt();
            }
            
            int target = scanner.nextInt();
            scanner.nextLine(); // Consume newline if any
            
            Solution solution = new Solution();
            boolean result = solution.isMajorityElement(nums, target);
            System.out.println(result ? "true" : "false");
        }
        
        scanner.close();
    }
}