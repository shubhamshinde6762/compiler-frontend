class Solution {
    areSentencesSimilar(sentence1, sentence2, similarPairs) {
        if (sentence1.length !== sentence2.length) return false;

        let s = new Set();
        for (let p of similarPairs) {
            s.add(p[0] + "," + p[1]);
        }

        for (let i = 0; i < sentence1.length; i++) {
            if (sentence1[i] === sentence2[i] || 
                s.has(sentence1[i] + "," + sentence2[i]) || 
                s.has(sentence2[i] + "," + sentence1[i])) {
                continue;
            }
            return false;
        }
        return true;
    }
}

function main() {
    let input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
    let index = 0;
    let T = parseInt(input[index++]);

    for (let t = 0; t < T; t++) {
        let testName = input[index++].trim();
        console.log(testName);

        let n = parseInt(input[index++]);
        let sentence1 = input[index++].trim().split(" ");

        let m = parseInt(input[index++]);
        let sentence2 = input[index++].trim().split(" ");

        let [p, pairSize] = input[index++].trim().split(" ").map(Number);
        let similarPairs = [];
        for (let i = 0; i < p; i++) {
            similarPairs.push(input[index++].trim().split(" "));
        }

        let sol = new Solution();
        let result = sol.areSentencesSimilar(sentence1, sentence2, similarPairs);
        console.log(result ? "true" : "false");
    }
}

main();