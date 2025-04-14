const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var findContestMatch = function(n) {
  let pairs = [];
  for (let i = 1; i <= n; i++) {
    pairs.push(i.toString());
  }
  
  while (pairs.length !== 1) {
    let newPairs = [];
    let i = 0;
    let j = pairs.length - 1;
    while (i < j) {
      newPairs.push(`(${pairs[i++]},${pairs[j--]})`);
    }
    pairs = newPairs;
  }

  return pairs[0];
};

let lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  const t = parseInt(lines[0]);
  let ptr = 1;
  for (let i = 0; i < t; i++) {
    const testCase = lines[ptr++];
    console.log(testCase);
    const n = parseInt(lines[ptr++]);
    const ans = findContestMatch(n);
    console.log(ans);
  }
});