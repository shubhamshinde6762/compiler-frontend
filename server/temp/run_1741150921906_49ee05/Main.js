const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class TrafficLight {
    constructor() {
        this.light = 1; // Which light is currently on
    }

    carArrived(carId, roadId, direction, turnGreen, crossCar) {
        if (this.light !== roadId) { // If the light is not green on the current road, switch it
            turnGreen();
            this.light = roadId;
        }
        crossCar();
    }
}

function turnGreen(roadId) {
    console.log(`Traffic Light On Road ${roadId} Is Green`);
}

function crossCar(carId, roadId, direction) {
    console.log(`Car ${carId} Has Passed Road ${roadId === 1 ? "A" : "B"} In Direction ${direction}`);
}

let inputLines = [];
rl.on("line", (line) => {
    inputLines.push(line);
}).on("close", () => {
    let index = 0;
    let T = parseInt(inputLines[index++]);

    while (T--) {
        console.log(inputLines[index++]); // Read and print testcase label
        let n = parseInt(inputLines[index++]); // Number of cars
        let cars = inputLines[index++].split(" ").map(Number);
        let directions = inputLines[index++].split(" ").map(Number);
        let arrivalTimes = inputLines[index++].split(" ").map(Number);

        let trafficLight = new TrafficLight();

        for (let i = 0; i < n; i++) {
            let carId = cars[i];
            let direction = directions[i];
            let roadId = direction === 1 || direction === 2 ? 1 : 2;

            trafficLight.carArrived(carId, roadId, direction, 
                () => turnGreen(roadId),
                () => crossCar(carId, roadId, direction)
            );
        }
    }
});