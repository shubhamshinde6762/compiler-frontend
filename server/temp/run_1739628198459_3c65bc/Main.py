# Python Solution
import sys
class Solution:
    def subsequencesWithMiddleMode(self, nums):
        mod = 1000000007
        inv2 = (mod+1)//2
        mp = {}
        idx = 0
        for i in range(len(nums)):
            if nums[i] not in mp:
                mp[nums[i]] = idx
                idx += 1
            nums[i] = mp[nums[i]]
        freq = [0]*idx
        for x in nums:
            freq[x] += 1
        def compute(v, freq, flag):
            n, m = len(v), len(freq)
            cnt = [0]*m
            res = 0
            sumR2 = 0
            sumRT = 0
            sumR2T = 0
            for j in range(m):
                sumR2 = (sumR2 + freq[j]*freq[j]) % mod
            for i in range(n):
                x = v[i]
                rx = freq[x] - cnt[x]
                curR2 = (sumR2 - (rx*rx)%mod + mod) % mod
                curRT = (sumRT - (rx*cnt[x])%mod + mod) % mod
                curR2T = (sumR2T - ((rx*rx)%mod * cnt[x])%mod + mod) % mod
                p = n - i - rx
                sumt = i - cnt[x]
                tmp = (((p*p)%mod - curR2 + mod)%mod * sumt) % mod
                tmp = (tmp - (2*p)%mod * curRT % mod + mod) % mod
                tmp = (tmp + 2*curR2T) % mod
                tmp = (tmp * (cnt[x]*inv2 % mod)) % mod
                res = (res + tmp) % mod
                c2cnt = (cnt[x]*(cnt[x]-1)) % mod
                c2cnt = (c2cnt * inv2) % mod
                c2p = (p*(p-1)) % mod
                c2p = (c2p * inv2) % mod
                res = (res + c2cnt*c2p) % mod
                rx = rx - 1
                res = (res + c2cnt * (rx*p % mod)) % mod
                if flag:
                    res = (res + (cnt[x]*sumt)%mod * (rx*p % mod)) % mod
                    c2rx = (rx*(rx-1)) % mod
                    c2rx = (c2rx * inv2) % mod
                    res = (res + c2cnt*c2rx) % mod
                cnt[x] += 1
                sumR2 = (curR2 + (rx*rx)%mod) % mod
                sumRT = (curRT + rx*cnt[x] % mod) % mod
                sumR2T = (curR2T + (rx*rx)%mod * cnt[x] % mod) % mod
            return res
        ans = compute(nums, freq, True)
        nums.reverse()
        ans = (ans + compute(nums, freq, False)) % mod
        return ans

def main():
    data = sys.stdin.read().strip().split()
    t = int(data[0])
    idx = 1
    sol = Solution()
    out = []
    for _ in range(t):
        name = data[idx]
        idx += 1
        out.append(name)
        n = int(data[idx])
        idx += 1
        arr = list(map(int, data[idx:idx+n]))
        idx += n
        out.append(str(sol.subsequencesWithMiddleMode(arr)))
    sys.stdout.write("\n".join(out))
if __name__=="__main__":
    main()