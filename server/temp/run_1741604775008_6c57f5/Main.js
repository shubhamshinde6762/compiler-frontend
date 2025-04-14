class Street {
  constructor(doors) {
    this.houses = [...doors];
    this.currentPosition = 0;
  }

  closeDoor() {
    this.houses[this.currentPosition] = 0;
  }

  isDoorOpen() {
    return this.houses[this.currentPosition] === 1;
  }

  moveRight() {
    this.currentPosition = (this.currentPosition + 1) % this.houses.length;
  }
}

class Solution {
  houseCount(street, k) {
    while (!street.isDoorOpen()) {
      street.moveRight();
    }

    let idx = 1;
    street.moveRight();
    let ans = 0;

    while (idx <= k) {
      if (street.isDoorOpen()) {
        ans = idx;
        street.closeDoor();
      }
      idx++;
      street.moveRight();
    }

    return ans;
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  let t = parseInt(input[0]);
  let index = 1;
  let sol = new Solution();

  while (t-- > 0) {
    let name = input[index++];
    process.stdout.write(name + "\n");
    let k = parseInt(input[index++]);
    let n = parseInt(input[index++]);
    let doors = input[index++].split(" ").map(Number);

    let street = new Street(doors);
    console.log(sol.houseCount(street, k));
  }
});