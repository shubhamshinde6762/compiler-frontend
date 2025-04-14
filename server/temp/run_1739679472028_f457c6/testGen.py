import random
import string
import json

def random_key(min_len=1, max_len=10):
    # Generate a random string key with length between min_len and max_len.
    length = random.randint(min_len, max_len)
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def random_function_definition():
    # A list of possible function definitions (as strings) for queryMultiple.
    functions = [
        "async function(keys) { return keys.map(key => key + '!'); }",
        "async function(keys) { await new Promise(res => setTimeout(res, 100)); return keys.map(key => key + '!'); }",
        "async function(keys) { await new Promise(res => setTimeout(res, keys.length * 100)); return keys.map(key => key + '!'); }",
        "async function(keys) { return keys.map(key => String(key.length)); }",
        "async function(keys) { return keys.map(key => key.toUpperCase()); }",
        "async function(keys) { await new Promise(res => setTimeout(res, 50)); return keys.map(key => key + key); }",
        "async function(keys) { return keys.map(key => key.split('').reverse().join('')); }",
        "async function(keys) { return keys.map(key => key + '?'); }",
        "async function(keys) { return keys.map(key => key.toLowerCase()); }",
        "async function(keys) { return keys.map(key => `(${key})`); }",
        "async function(keys) { return keys.map(key => key + '-' + key); }",
        "async function(keys) { return keys.map(key => key.repeat(3)); }",
        "async function(keys) { return keys.map(key => key.substring(0, 3)); }",
        "async function(keys) { return keys.map(key => key.slice(-3)); }",
        "async function(keys) { return keys.map(key => key.replace(/a/g, '@')); }",
        "async function(keys) { await new Promise(res => setTimeout(res, 200)); return keys.map(key => key + '.'); }",
        "async function(keys) { return keys.map(key => key.split('').join(' ')); }",
        "async function(keys) { return keys.map(key => key + key.length); }",
        "async function(keys) { return keys.map(key => key.padStart(key.length + 2, '*')); }",
        "async function(keys) { return keys.map(key => key.padEnd(key.length + 2, '*')); }",
        "async function(keys) { return keys.map(key => key.replace(/[aeiou]/g, '')); }",
        "async function(keys) { await new Promise(res => setTimeout(res, 150)); return keys.map(key => key.split('').sort().join('')); }",
        "async function(keys) { return keys.map(key => key + '123'); }",
        "async function(keys) { return keys.map(key => key.slice(1)); }",
        "async function(keys) { return keys.map(key => key.slice(0, -1)); }"
    ]
    return random.choice(functions)

def generate_random_test_case(index):
    # Random throttle time between 0 and 1000.
    throttle_time = random.randint(0, 100)
    
    # Number of calls: can be 0 (edge) up to 10.
    num_calls = random.randint(0, 10)
    
    calls = []
    used_keys = set()
    for _ in range(num_calls):
        # Ensure key uniqueness.
        key = random_key(1, 10)
        while key in used_keys:
            key = random_key(1, 10)
        used_keys.add(key)
        # Time between 0 and 1000.
        call_time = random.randint(0, 1000)
        calls.append({"key": key, "time": call_time})
    
    # Sort calls by time (simulate the real time order).
    calls.sort(key=lambda c: c["time"])
    
    func_def = random_function_definition()
    
    test_case = {
        "name": f"TestCase-{index}",
        "throttle_time": throttle_time,
        "calls": calls,
        "function": func_def
    }
    return test_case

def get_example_test_cases():
    # Four example test cases as given.
    examples = []
    
    # Example 1
    examples.append({
        "name": "TestCase-1",
        "throttle_time": 100,
        "calls": [
            { "key": "a", "time": 10 },
            { "key": "b", "time": 20 },
            { "key": "c", "time": 30 }
        ],
        "function": "async function(keys) { return keys.map(key => key + '!'); }"
    })
    
    # Example 2
    examples.append({
        "name": "TestCase-2",
        "throttle_time": 100,
        "calls": [
            { "key": "a", "time": 10 },
            { "key": "b", "time": 20 },
            { "key": "c", "time": 30 }
        ],
        "function": ("async function(keys) { "
                     "await new Promise(res => setTimeout(res, 100)); "
                     "return keys.map(key => key + '!'); }")
    })
    
    # Example 3
    examples.append({
        "name": "TestCase-3",
        "throttle_time": 100,
        "calls": [
            { "key": "a", "time": 10 },
            { "key": "b", "time": 20 },
            { "key": "c", "time": 30 },
            { "key": "d", "time": 40 },
            { "key": "e", "time": 250 },
            { "key": "f", "time": 300 }
        ],
        "function": ("async function(keys) { "
                     "await new Promise(res => setTimeout(res, keys.length * 100)); "
                     "return keys.map(key => key + '!'); }")
    })
    
    # Example 4
    examples.append({
        "name": "TestCase-4",
        "throttle_time": 200,
        "calls": [
            { "key": "alpha", "time": 0 },
            { "key": "beta", "time": 150 },
            { "key": "gamma", "time": 250 },
            { "key": "delta", "time": 450 }
        ],
        "function": "async function(keys) { return keys.map(key => String(key.length)); }"
    })
    
    return examples

def print_test_case(tc, i):
    print(f"TestCase-{i}")
    print(tc["throttle_time"])
    # Print number of calls.
    print(len(tc["calls"]))
    # Build the array of call objects in a single line.
    calls_str = "[ " + ", ".join(
        [f'{{ "key": "{call["key"]}", "time": {call["time"]} }}' for call in tc["calls"]]
    ) + " ]"
    print(calls_str)
    # Print the function definition.
    print(tc["function"])

def generate_all_test_cases():
    random.seed(42)  # For reproducibility.
    test_cases = []
    
    # Generate 100 random test cases.
    for i in range(1, 101):
        test_cases.append(generate_random_test_case(i))
    
    # Append edge/tricky cases manually.
    # Edge: 0 calls.
    test_cases.append({
        "name": "EdgeCase-0Calls",
        "throttle_time": random.randint(0, 1000),
        "calls": [],
        "function": random_function_definition()
    })
    # Edge: throttle time = 0.
    test_cases.append({
        "name": "EdgeCase-t0",
        "throttle_time": 0,
        "calls": [
            { "key": "edge", "time": 100 }
        ],
        "function": random_function_definition()
    })
    # Edge: throttle time = 1000.
    test_cases.append({
        "name": "EdgeCase-t1000",
        "throttle_time": 1000,
        "calls": [
            { "key": "max", "time": 500 }
        ],
        "function": random_function_definition()
    })
    # Tricky: calls with the same time.
    test_cases.append({
        "name": "TrickyCase-SameTime",
        "throttle_time": random.randint(0, 1000),
        "calls": [
            { "key": "first", "time": 300 },
            { "key": "second", "time": 300 },
            { "key": "third", "time": 300 }
        ],
        "function": random_function_definition()
    })
    # Tricky: keys with min and max lengths.
    test_cases.append({
        "name": "TrickyCase-KeyLengths",
        "throttle_time": random.randint(0, 1000),
        "calls": [
            { "key": "a", "time": 100 },  # length 1
            { "key": "".join(random.choices(string.ascii_lowercase, k=100)), "time": 200 }  # length 100
        ],
        "function": random_function_definition()
    })
    
    # Append the 4 example cases.
    test_cases.extend(get_example_test_cases())
    
    return test_cases

def main():
    all_test_cases = generate_all_test_cases()
    total = len(all_test_cases)
    
    # Print total number of test cases.
    print(total)
    
    i = 1
    # Print each test case in the required format.
    for tc in all_test_cases:
        print_test_case(tc, i)
        i = i + 1

if __name__ == "__main__":
    main()