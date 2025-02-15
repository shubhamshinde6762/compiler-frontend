function solve(arr) {
  return 0;
}

function main() {
  const T = parseInt(prompt("Enter T:"));
  for (let tc = 0; tc < T; tc++) {
    const testCaseName = prompt("Enter test case name:");
    console.log(testCaseName);
    console.log(solve([]));
  }
}

main();