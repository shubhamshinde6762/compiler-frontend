import java.io.*;
import java.util.*;
class Solution {
    final int MOD = 1000000007, INV2 = (MOD + 1) / 2;
    int compute(int[] v, int[] freq, boolean flag) {
        int n = v.length, m = freq.length;
        int[] cnt = new int[m];
        int res = 0, sumR2 = 0, sumRT = 0, sumR2T = 0;
        for (int j = 0; j < m; j++)
            sumR2 = (int)((sumR2 + 1L * freq[j] * freq[j]) % MOD);
        for (int i = 0; i < n; i++) {
            int x = v[i];
            int rx = freq[x] - cnt[x];
            int curR2 = (sumR2 - (int)((1L * rx * rx) % MOD)) % MOD; if(curR2 < 0) curR2 += MOD;
            int curRT = (sumRT - (int)((1L * rx * cnt[x]) % MOD)) % MOD; if(curRT < 0) curRT += MOD;
            int curR2T = (sumR2T - (int)(((1L * rx * rx) % MOD * cnt[x]) % MOD)) % MOD; if(curR2T < 0) curR2T += MOD;
            int p = n - i - rx, st = i - cnt[x];
            int tmp = (int)((((1L * p * p) % MOD - curR2 + MOD) % MOD * st) % MOD);
            tmp = (tmp - (int)((1L * 2 * p % MOD * curRT) % MOD)) % MOD; if(tmp < 0) tmp += MOD;
            tmp = (tmp + (int)((1L * 2 * curR2T) % MOD)) % MOD;
            tmp = (int)((1L * tmp * ((1L * cnt[x] * INV2) % MOD)) % MOD);
            res = (res + tmp) % MOD;
            int c2cnt = (int)((1L * cnt[x] * (cnt[x] - 1)) % MOD);
            c2cnt = (int)((1L * c2cnt * INV2) % MOD);
            int c2p = (int)((1L * p * (p - 1)) % MOD);
            c2p = (int)((1L * c2p * INV2) % MOD);
            res = (res + (int)((1L * c2cnt * c2p) % MOD)) % MOD;
            rx--;
            res = (res + (int)((1L * c2cnt * rx % MOD * p) % MOD)) % MOD;
            if (flag) {
                res = (res + (int)((1L * cnt[x] * st % MOD * rx % MOD * p) % MOD)) % MOD;
                int c2rx = (int)((1L * rx * (rx - 1)) % MOD);
                c2rx = (int)((1L * c2rx * INV2) % MOD);
                res = (res + (int)((1L * c2cnt * c2rx) % MOD)) % MOD;
            }
            cnt[x]++;
            sumR2 = (curR2 + (int)((1L * rx * rx) % MOD)) % MOD;
            sumRT = (curRT + (int)((1L * rx * cnt[x]) % MOD)) % MOD;
            sumR2T = (curR2T + (int)(((1L * rx * rx) % MOD * cnt[x]) % MOD)) % MOD;
        }
        return res;
    }
    public int subsequencesWithMiddleMode(int[] nums) {
        int n = nums.length, idx = 0;
        HashMap<Integer, Integer> mp = new HashMap<>();
        for (int i = 0; i < n; i++) {
            if (!mp.containsKey(nums[i])) {
                mp.put(nums[i], idx++);
            }
            nums[i] = mp.get(nums[i]);
        }
        int[] freq = new int[idx];
        for (int x : nums)
            freq[x]++;
        int ans = compute(nums, freq, true);
        reverse(nums);
        ans = (ans + compute(nums, freq, false)) % MOD;
        return ans;
    }
    void reverse(int[] a) {
        int i = 0, j = a.length - 1;
        while (i < j) {
            int tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
            i++; j--;
        }
    }
}
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine().trim());
        Solution sol = new Solution();
        for (int tc = 0; tc < T; tc++) {
            String name = br.readLine().trim();
            System.out.println(name);
            int n = Integer.parseInt(br.readLine().trim());
            int[] v = new int[n];
            String[] parts = br.readLine().trim().split("\\s+");
            for (int i = 0; i < n; i++)
                v[i] = Integer.parseInt(parts[i]);
            System.out.println(sol.subsequencesWithMiddleMode(v));
        }
    }
}