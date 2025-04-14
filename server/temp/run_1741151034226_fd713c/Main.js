const readline = require("readline");

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

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputLines = [];

    rl.on("line", (line) => {
        inputLines.push(line);
    }).on("close", () => {
        processInput(inputLines);
    });
}

function processInput(inputLines) {
    let index = 0;
    
    // Read number of test cases
    let T = parseInt(inputLines[index++]);
    
    // Process each test case
    for (let test = 0; test < T; test++) {
        // Read test case label
        console.log(inputLines[index++]);
        
        // Read number of cars
        let n = parseInt(inputLines[index++]);
        
        // Read cars, directions, and arrival times
        let cars = inputLines[index++].split(" ").map(Number);
        let n = parseInt(inputLines[index++]);
        let directions = inputLines[index++].split(" ").map(Number);
        let n = parseInt(inputLines[index++]);
        let arrivalTimes = inputLines[index++].split(" ").map(Number);
        
        // Validate input
        if (cars.length !== n || directions.length !== n || arrivalTimes.length !== n) {
            console.error("Error: Inconsistent input sizes");
            continue;
        }
        
        // Process cars
        let trafficLight = new TrafficLight();
        
        for (let i = 0; i < n; i++) {
            let carId = cars[i];
            let direction = directions[i];
            let roadId = direction === 1 || direction === 2 ? 1 : 2;
            
            trafficLight.carArrived(
                carId, 
                roadId, 
                direction, 
                () => console.log(`Traffic Light On Road ${roadId} Is Green`),
                () => console.log(`Car ${carId} Has Passed Road ${roadId === 1 ? "A" : "B"} In Direction ${direction}`)
            );
        }
    }
}

// Start the program
main();