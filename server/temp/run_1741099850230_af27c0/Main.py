class Solution:
    def transformArray(self, arr):
        if len(arr) <= 2:
            return arr
        changed = True
        while changed:
            changed = False
            prev, curr, next_val = arr[0], arr[1], arr[2]

            for i in range(1, len(arr) - 1):
                if curr < prev and curr < next_val:
                    arr[i] += 1
                    changed = True
                elif curr > prev and curr > next_val:
                    arr[i] -= 1
                    changed = True
                
                if i == len(arr) - 2:
                    break
                prev, curr, next_val = curr, next_val, arr[i + 2]

        return arr


if __name__ == "__main__":
    T = int(input())

    for _ in range(T):
        x = input().strip()
        print(x)
        solution = Solution()
        n = int(input())
        a = list(map(int, input().split()))
        p = solution.transformArray(a)
        b = " "
        print(" ".join(map(str, p)), end = b + "\n")