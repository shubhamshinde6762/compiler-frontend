import random

def generate_test_cases():
    T = 100  # Number of random test cases
    test_cases = []
    
    # Generate 100 random test cases
    for _ in range(T):
        n = random.randint(1, 1000)
        weights = [random.randint(1, 1000) for _ in range(n)]
        test_cases.append((n, weights))
    
    # Edge and tricky cases
    edge_cases = [
        (1, [1]),  # Smallest case
        (1000, [1] * 1000),  # All minimum weights
        (1000, [1000] * 1000),  # All maximum weights
        (500, [10] * 500 + [500] * 500),  # Mix of small and large weights
        (1000, [random.choice([1, 1000]) for _ in range(1000)]),  # Alternating extremes
        (1000, [5] * 999 + [4996]),  # One large number with many small
        (999, [random.randint(1, 5000) for _ in range(999)])  # Near upper limit
    ]
    
    # Append edge cases
    test_cases.extend(edge_cases)
    
    # Example cases from above
    example_cases = [
        (5, [200, 300, 400, 500, 600]),
        (5, [1000, 1200, 1500, 2000, 800]),
        (5, [3000, 1500, 1000, 500, 200]),
        (5, [4500, 300, 200, 100, 50])
    ]
    
    test_cases.extend(example_cases)
    
    # Small T cases for TLE when brute force is used
    # small_T_cases = [
    #     (1000, [random.randint(1, 1000) for _ in range(1000)]) for _ in range(10)
    # ]
    # test_cases.extend(small_T_cases)
    
    # Print in required format
    print(len(test_cases))
    i = 1
    for n, weights in test_cases:
        print(f"TestCase-{i}")
        i = i + 1
        print(len(weights))
        print(" ".join(map(str, weights)))

# Generate and print test cases
generate_test_cases()