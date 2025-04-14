class Solution {
    similarRGB(color) {
        const closestShorthand = (value) => {
            let index = Math.round(parseInt(value, 16) / 17);
            return (index.toString(16)).repeat(2);
        };

        return "#" + [1, 3, 5].map(i => closestShorthand(color.substr(i, 2))).join("");
    }
}

function chk(original, result) {
    if (result.length !== 7 || result[0] !== '#') return false;

    for (let i = 1; i < 7; i += 2) {
        let origValue = parseInt(original.substr(i, 2), 16);
        if (result[i] !== result[i + 1]) return false;
        let shortValue = parseInt(result[i] + result[i], 16);
        let lower = Math.floor(origValue / 17) * 17;
        let higher = Math.min(255, lower + 17);
        if (shortValue !== lower && shortValue !== higher) return false;
    }
    return true;
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("", (t) => {
    t = parseInt(t);
    let cases = [];

    const processCase = () => {
        if (cases.length === 0) {
            readline.close();
            return;
        }
        let s = cases.shift();
        console.log(s);

        let x = cases.shift();
        let sol = new Solution();
        let y = sol.similarRGB(x);

        console.log(chk(x, y) ? "true" : "false");
        processCase();
    };

    const readLines = (line) => {
        cases.push(line);
        if (cases.length === t * 2) processCase();
    };

    readline.on("line", readLines);
});