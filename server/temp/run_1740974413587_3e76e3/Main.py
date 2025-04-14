import math

class Solution:
    def isArmstrong(self, N: int) -> bool:
        k = int(math.log10(N)) + 1
        temp = N
        while temp:
            N -= (temp % 10) ** k
            temp //= 10
        return N == 0

def main():
    T = int(input().strip())

    for _ in range(T):
        s = input().strip()
        print(s)  # Keeping s as requested
        n = int(input().strip())

        sol = Solution()
        result = sol.isArmstrong(n)

        print("true" if result else "false")

if __name__ == "__main__":
    main()