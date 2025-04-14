class Solution {
    static M = 1e9 + 7;

    add(a, b) {
        let s = (a + b) % Solution.M;
        return s < 0 ? s + Solution.M : s;
    }

    mul(a, b) {
        return (BigInt(a) * BigInt(b) % BigInt(Solution.M)).toString();
    }

    f(a, d) {
        let n = a.length;
        let mx = Math.max(...a);
        let dp = Array(mx + 1).fill(0);
        let used = Array(mx + 1).fill(0);
        let cnt = Array(mx + 1).fill(0);

        for (let x of a) {
            used[x] = 1;
            let cur = 1;
            if (x - d >= 1 && x - d <= mx && used[x - d]) {
                cur = this.add(cur, cnt[x - d]);
                dp[x] = this.add(dp[x], dp[x - d]);
            }
            let m = this.mul(cur, x);
            cnt[x] = this.add(cnt[x], cur);
            dp[x] = this.add(dp[x], parseInt(m));
        }

        let ans = 0;
        for (let i = 1; i <= mx; i++) {
            if (used[i]) {
                ans = this.add(ans, dp[i]);
            }
        }
        return ans;
    }

    getSum(nums) {
        let ans = this.add(this.f(nums, 1), this.f(nums, -1));
        for (let x of nums) {
            ans = this.add(ans, -x);
        }
        return ans;
    }
}

function main() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const inputLines = [];
  rl.on('line', line => {
    inputLines.push(line);
  });

  rl.on('close', () => {
    let index = 0;
    const T = parseInt(inputLines[index++]);
    for (let tc = 1; tc <= T; tc++) {
      const testName = inputLines[index++];
      console.log(testName);
      const n = parseInt(inputLines[index++]);
      const nums = inputLines[index++].split(' ').map(Number);
      const sol = new Solution();
      const ans = sol.getSum(nums);
      console.log(ans);
    }
  });
}

main();