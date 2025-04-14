import random

def generate_testcases():
    testcases = []
    T = 100  # Number of random test cases

    # Generate 100 random test cases with alternating True and False cases
    for i in range(T):
        n = random.randint(1, 80)  # Random size of array (1 to 80)
        arr = sorted(random.randint(1, 10**9) for _ in range(n))  # Sorted array
        
        if i % 2 == 0:  # Ensure True cases
            target = arr[n // 2]  # Choose a middle element
            majority_count = (n // 2) + 1  # Ensure it's a majority element
            arr = sorted(arr[:majority_count] + [target] * (majority_count) + arr[majority_count:])
            arr = arr.sort()
        else:
            target = random.choice(arr)  # Ensure target is in arr but not necessarily majority
            while arr.count(target) > n // 2:
                target = random.choice(arr)  # Pick a target that isn't majority
        
        testcases.append((n, arr, target))
    
    # Add edge cases and tricky cases
    edge_cases = [
        (1, [1], 1),  # Single element, target present
        (1, [1], 2),  # Single element, target absent
        (1000, [1] * 1000, 1),  # All elements are the same, target present
        (1000, [1] * 999 + [2], 1),  # Almost all same, one different
        (1000, [1] * 999 + [2], 2),  # Edge case where target is the odd one
        (1000, [random.randint(1, 10**9)] * 500 + [random.randint(1, 10**9)] * 500, random.randint(1, 10**9)),  # Split in half
    ]
    testcases.extend(edge_cases)

    # Add example test cases
    example_cases = [
        (9, [1,2,3,3,3,3,3,4,5], 3),
        (9, [7,8,8,8,9,9,9,10,11], 8),
        (10, [3,3,3,3,3,5,5,5,5,5], 3),
        (10, [6,6,6,6,6,6,7,8,9,10], 6)
    ]
    testcases.extend(example_cases)
    
    # Print output in required format
    print(len(testcases))
    i = 1
    for n, arr, target in testcases:
        print(f"TestCase-{i}")
        i += 1
        print(n)
        print(" ".join(map(str, arr)))
        print(target)

# Run the function to generate test cases
generate_testcases()