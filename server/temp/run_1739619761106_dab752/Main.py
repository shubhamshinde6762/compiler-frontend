class Solution:
    def answerString(self, word: str, numFriends: int) -> str:
        if numFriends == 1:
            return word
        idx = 0
        n = len(word)
        l = 1
        i = 1
        while i < n:
            if word[i] == word[idx + l - 1]:
                l += 1
            elif word[i] < word[idx + l - 1]:
                l = 1
            else:
                if word[i - l + 1] >= word[i]:
                    idx = i - l + 1
                else:
                    idx = i
                l = 1
            i += 1
        extra = max((numFriends - 1) - idx, 0)
        return word[idx:n - extra]

if __name__ == '__main__':
    import sys
    data = sys.stdin.read().split()
    T = int(data[0])
    pos = 1
    for _ in range(T):
        name = data[pos]
        pos += 1
        print(name)
        word = data[pos]
        pos += 1
        x = int(data[pos])
        pos += 1
        sol = Solution()
        print(sol.answerString(word, x))