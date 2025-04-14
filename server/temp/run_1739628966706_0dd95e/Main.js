// JavaScript Solution
class Solution {
  constructor() {
    this.mod = 1000000007;
    this.inv2 = 500000004;
  }
  compute(v, freq, flag) {
    let n = v.length, m = freq.length;
    let cnt = new Array(m).fill(0);
    let res = 0, sumR2 = 0, sumRT = 0, sumR2T = 0;
    for (let j = 0; j < m; j++)
      sumR2 = (sumR2 + (freq[j] * freq[j]) % this.mod) % this.mod;
    for (let i = 0; i < n; i++) {
      let x = v[i];
      let rx = freq[x] - cnt[x];
      let curR2 = (sumR2 - ((rx * rx) % this.mod) + this.mod) % this.mod;
      let curRT = (sumRT - ((rx * cnt[x]) % this.mod) + this.mod) % this.mod;
      let curR2T = (sumR2T - (((rx * rx) % this.mod * cnt[x]) % this.mod) + this.mod) % this.mod;
      let p = n - i - rx, sumt = i - cnt[x];
      let tmp = (((((p * p) % this.mod - curR2) + this.mod) % this.mod) * sumt) % this.mod;
      tmp = (tmp - ((2 * p) % this.mod * curRT) % this.mod + this.mod) % this.mod;
      tmp = (tmp + (2 * curR2T) % this.mod) % this.mod;
      tmp = (tmp * ((cnt[x] * this.inv2) % this.mod)) % this.mod;
      res = (res + tmp) % this.mod;
      let c2cnt = (cnt[x] * (cnt[x] - 1)) % this.mod;
      c2cnt = (c2cnt * this.inv2) % this.mod;
      let c2p = (p * (p - 1)) % this.mod;
      c2p = (c2p * this.inv2) % this.mod;
      res = (res + (c2cnt * c2p) % this.mod) % this.mod;
      rx = rx - 1;
      res = (res + (c2cnt * ((rx * p) % this.mod)) % this.mod) % this.mod;
      if (flag) {
        res = (res + (((cnt[x] * sumt) % this.mod * ((rx * p) % this.mod)) % this.mod)) % this.mod;
        let c2rx = (rx * (rx - 1)) % this.mod;
        c2rx = (c2rx * this.inv2) % this.mod;
        res = (res + (c2cnt * c2rx) % this.mod) % this.mod;
      }
      cnt[x]++;
      sumR2 = (curR2 + ((rx * rx) % this.mod)) % this.mod;
      sumRT = (curRT + (rx * cnt[x]) % this.mod) % this.mod;
      sumR2T = (curR2T + (((rx * rx) % this.mod * cnt[x]) % this.mod)) % this.mod;
    }
    return res;
  }
  subsequencesWithMiddleMode(nums) {
    let mp = new Map(), idx = 0;
    for (let i = 0; i < nums.length; i++) {
      if (!mp.has(nums[i])) {
        mp.set(nums[i], idx++);
      }
      nums[i] = mp.get(nums[i]);
    }
    let freq = new Array(idx).fill(0);
    for (let x of nums)
      freq[x]++;
    let ans = this.compute(nums, freq, true);
    nums.reverse();
    ans = (ans + this.compute(nums, freq, false)) % this.mod;
    return ans;
  }
}
function main() {
  const fs = require('fs');
  let data = fs.readFileSync(0, 'utf8').split(/\s+/);
  let t = parseInt(data[0]);
  let sol = new Solution();
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    let name = data[idx++];
    console.log(name);
    let n = parseInt(data[idx++]);
    let arr = [];
    for (let i = 0; i < n; i++)
      arr.push(parseInt(data[idx++]));
    console.log(sol.subsequencesWithMiddleMode(arr));
  }
}
main();