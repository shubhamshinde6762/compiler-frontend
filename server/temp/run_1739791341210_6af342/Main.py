import sys

class Solution:
    def findMissingRanges(self, nums, lower, upper):
        ans = []
        prev = lower - 1  # Initialize 'prev' to be one less than the lower bound

        for i in range(len(nums) + 1):
            if i == len(nums):
                curr = upper + 1  # If we're at the end, set 'curr' to one greater than the upper bound
            else:
                curr = nums[i]

            if curr - prev > 1:
                ans.append(self.format_range(prev + 1, curr - 1))  # Add the missing range to the result

            prev = curr  # Update 'prev' to the current number

        return ans

    def format_range(self, lower, upper):
        if lower == upper:
            return [lower, lower]  # If lower and upper are the same, return a single number
        else:
            return [lower, upper]  # Otherwise, return the range [lower, upper]


T = int(input())

for _ in range(T):
    print(input())  # Read and discard the line (e.g., "Test Case 1")
    lower = int(input())
    upper = int(input())
    n = int(input())
    nums = list(map(int, input().split())) if n > 0 else []
    
    sol = Solution()
    res = sol.findMissingRanges(nums, lower, upper)
    
    for r in res:
        print(r[0], r[1])