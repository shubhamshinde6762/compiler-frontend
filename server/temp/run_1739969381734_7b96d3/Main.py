class Solution:
    def generatePossibleNextMoves(self, s: str):
        moves = []
        n = len(s)
        for i in range(n - 1):
            if s[i] == '+' and s[i + 1] == '+':
                moves.append(s[:i] + "--" + s[i + 2:])
        return moves

if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().splitlines()

    t = int(data[0])
    solution = Solution()
    index = 1

    for _ in range(t):
        print(data[index])  # Test case identifier
        index += 1

        s = data[index]
        index += 1

        result = solution.generatePossibleNextMoves(s)
        print(" ".join(result))