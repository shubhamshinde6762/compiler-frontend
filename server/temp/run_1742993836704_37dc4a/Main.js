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
    let count = 0;
    const obj = createInfiniteObject();
    
    function askForMethodName() {
        if (count < n) {
            rl.question("Enter method name: ", function(methodName) {
                console.log(obj[methodName]());
                count++;
                askForMethodName();
            });
        } else {
            rl.close();
        }
    }
    
    askForMethodName();
});