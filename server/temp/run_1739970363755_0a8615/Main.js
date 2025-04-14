class Solution {
    static M = 1000000007;

    add(a, b) {
        return ((a % Solution.M) + (b % Solution.M) + Solution.M) % Solution.M;
    }

    mul(a, b) {
        return Number((BigInt(a) * BigInt(b)) % BigInt(Solution.M));
    }

    f(a, d) {
        let mx = Math.max(...a);
        let dp = Array(mx + 1).fill(0);
        let used = Array(mx + 1).fill(false);
        let cnt = Array(mx + 1).fill(0);

        for (let x of a) {
            used[x] = true;
            let cur = 1;
            if (x - d >= 1 && x - d <= mx && used[x - d]) {
                cur = this.add(cur, cnt[x - d]);
                dp[x] = this.add(dp[x], dp[x - d]);
            }
            let m = this.mul(cur, x);
            cnt[x] = this.add(cnt[x], cur);
            dp[x] = this.add(dp[x], m);
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
            ans = this.add(ans, Solution.M - (x % Solution.M));
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
            const testName = inputLines[index++].trim();
            console.log(testName);
            const n = parseInt(inputLines[index++]);
            const nums = inputLines[index++].split(' ').map(Number);
            console.log(nums)
            // const sol = new Solution();
        //     const ans = sol.getSum(nums);
        //     console.log(ans);
        // }
    });
}

main();