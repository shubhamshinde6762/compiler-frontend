class Solution:
    def similarRGB(self, color: str) -> str:
        def closestShorthand(value):
            index = round(int(value, 16) / 17)
            shorthand = f"{index:01x}" * 2
            return shorthand

        return "#" + "".join(closestShorthand(color[i:i+2]) for i in range(1, 7, 2))

def chk(original: str, result: str) -> bool:
    if len(result) != 7 or result[0] != '#':
        return False

    for i in range(1, 7, 2):
        orig_value = int(original[i:i+2], 16)
        if result[i] != result[i + 1]:
            return False
        short_value = int(result[i] * 2, 16)
        lower = (orig_value // 17) * 17
        higher = min(255, lower + 17)
        if short_value not in {lower, higher}:
            return False
    return True

if __name__ == "__main__":
    t = int(input())
    for _ in range(t):
        s = input()
        print(s)
        x = input()
        
        sol = Solution()
        y = sol.similarRGB(x)
        
        print("true" if chk(x, y) else "false")