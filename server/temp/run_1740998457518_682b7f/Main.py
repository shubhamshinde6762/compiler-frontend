class Solution:
    def isMajorityElement(self, nums, target):
        """
        Check if target is a majority element in a sorted array.
        
        Args:
            nums: A sorted list of integers
            target: The target number to check
            
        Returns:
            bool: True if target is a majority element, False otherwise
        """
        # Find the first occurrence of target using binary search
        left, right = 0, len(nums) - 1
        first_index = len(nums)
        
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] >= target:
                first_index = mid
                right = mid - 1
            else:
                left = mid + 1
        
        # Check if target is the majority element
        return first_index + len(nums) // 2 < len(nums) and nums[first_index + len(nums) // 2] == target

def main():
    t = int(input())
    for _ in range(1, t + 1):
        s = input()
        print(s)  # Ensures proper formatting
        
        n = int(input())
        nums = list(map(int, input().split()))
        target = int(input())
        sol = Solution()
        solution = sol.isMajorityElement(nums, target)
        print("true" if solution else "false")

if __name__ == "__main__":
    main()