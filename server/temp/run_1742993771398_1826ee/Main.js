/**
 * @return {Object}
 */
var createInfiniteObject = function() {
    return new Proxy({}, {
        get: function(target, prop) {
            return function() {
                return prop;
            };
        }
    });
};

// Driver code
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the number of method names: ", function(n) {
    n = parseInt(n);
    
    if (isNaN(n) || n <= 0) {
        console.log("Invalid number. Please enter a positive integer.");
        rl.close();
        return;
    }

    let count = 0;
    let methodNames = [];

    function askForMethodName() {
        if (count < n) {
            rl.question(`Enter method name ${count + 1}/${n}: `, function(methodName) {
                methodNames.push(methodName);
                count++;
                askForMethodName();
            });
        } else {
            const obj = createInfiniteObject();
            console.log("\nOutput:");
            methodNames.forEach(name => console.log(`obj.${name}() -> "${obj[name]()}"`));
            rl.close();
        }
    }

    askForMethodName();
});