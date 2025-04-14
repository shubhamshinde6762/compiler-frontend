"use strict";

/**
 * QueryBatcher class that batches calls to queryMultiple so that consecutive calls are at least t milliseconds apart.
 */
class QueryBatcher {
  /**
   * @param {Function} queryMultiple - an async function that takes an array of keys.
   * @param {number} t - throttle time in milliseconds.
   */
  constructor(queryMultiple, t) {
    this.queryMultiple = queryMultiple;
    this.t = t;
    this.queue = []; // queue of pending calls: { key, resolve }
    this.lastCallTime = null;
    this.timer = null;
  }

  /**
   * @param {string} key - The key to query.
   * @return {Promise<string>} - Resolves with the result for that key.
   */
  getValue(key) {
    return new Promise((resolve) => {
      const now = Date.now();
      // If no recent call or the throttle period has passed, call immediately.
      if (this.lastCallTime === null || now - this.lastCallTime >= this.t) {
        this.lastCallTime = now;
        // If there's an existing timer, cancel it.
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        // Immediately process this key.
        this.queryMultiple([key]).then((results) => {
          resolve(results[0]);
        });
        // Set a timer to process any queued calls after t ms.
        this.timer = setTimeout(() => {
          if (this.queue.length > 0) {
            const keys = this.queue.map((item) => item.key);
            const resolvers = this.queue.map((item) => item.resolve);
            this.queue = [];
            this.lastCallTime = Date.now();
            this.queryMultiple(keys).then((results) => {
              results.forEach((res, idx) => {
                resolvers[idx](res);
              });
            });
          }
          this.timer = null;
        }, this.t);
      } else {
        // Within throttle period: queue this call.
        this.queue.push({ key, resolve });
      }
    });
  }
}

// --- Driver Code ---

// This driver code reads input from standard input in the following format:
// Line 1: total number of test cases (T)
// For each test case (5 lines):
//   1. Test case name (e.g., "TestCase-1")
//   2. Throttle time (number)
//   3. Number of calls (n)
//   4. Array of call objects in one line (e.g., [ { "key": "t", "time": 250 } ])
//   5. Function definition string (e.g., async function(keys) { ... })

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let lines = [];
rl.on("line", (line) => {
  if (line.trim().length > 0) {
    lines.push(line);
  }
});

rl.on("close", async () => {
  // The first line is the total number of test cases.
  const total = parseInt(lines[0].trim(), 10);
  let idx = 1;

  // Process each test case sequentially.
  for (let i = 0; i < total; i++) {
    // Read test case details.
    const testCaseName = lines[idx++].trim();
    const throttleTime = parseInt(lines[idx++].trim(), 10);
    const numCalls = parseInt(lines[idx++].trim(), 10);
    const callsLine = lines[idx++].trim();

    // Parse the calls array. (It is expected to be valid JSON.)
    let calls;
    try {
      // Replace single quotes with double quotes if needed
      calls = JSON.parse(callsLine);
    } catch (e) {
      console.error(`Error parsing calls array for ${testCaseName}:`, e);
      calls = [];
    }

    // Read the function definition string.
    const funcDefStr = lines[idx++].trim();

    // Convert the function definition string into an actual function.
    // We wrap it in parentheses to allow eval to return the function.
    let queryMultiple;
    try {
      queryMultiple = eval("(" + funcDefStr + ")");
    } catch (e) {
      console.error(`Error evaluating function for ${testCaseName}:`, e);
      continue;
    }

    // Create a new QueryBatcher instance.
    const batcher = new QueryBatcher(queryMultiple, throttleTime);

    console.log(`Executing ${testCaseName} with throttle time ${throttleTime}ms`);

    // Record the start time of this test case.
    const testCaseStart = Date.now();

    // For each call, schedule the call at its specified "time".
    let promises = [];
    for (let call of calls) {
      const p = new Promise((resolve) => {
        setTimeout(() => {
          batcher.getValue(call.key).then((result) => {
            const resolvedTime = Date.now() - testCaseStart;
            console.log(
              `${testCaseName}: key "${call.key}", resolved: "${result}", scheduled at ${call.time}ms, resolved at ${resolvedTime}ms`
            );
            resolve();
          });
        }, call.time);
      });
      promises.push(p);
    }

    // Wait for all calls in the test case to complete before proceeding.
    await Promise.all(promises);
    console.log(`Finished ${testCaseName}\n`);
  }
});