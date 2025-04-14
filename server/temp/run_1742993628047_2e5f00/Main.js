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

rl.question("", function(methodName) {
    const obj = createInfiniteObject();
    console.log(obj[methodName]());
    rl.close();
});