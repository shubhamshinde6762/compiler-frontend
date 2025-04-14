class Solution:
    def maxNumberOfApples(self, arr):
        arr.sort()
        sum_weight = 5000
        count = 0

        for weight in arr:
            if sum_weight - weight >= 0:
                count += 1
                sum_weight -= weight
            else:
                break
        return count

import sys

def main():
    T = int(sys.stdin.readline().strip())

    for _ in range(T):
        test_case_name = sys.stdin.readline().strip()
        print(test_case_name)

        n = int(sys.stdin.readline().strip())
        weights = list(map(int, sys.stdin.readline().strip().split()))

        solution = Solution()
        print(solution.maxNumberOfApples(weights))

if __name__ == "__main__":
    main()