import random

def generate_test_case(size_range=(1, 100), value_range=(1, 2000), ensure_common=False):
    """Generates a single test case with three sorted arrays."""
    size1 = random.randint(*size_range)
    size2 = random.randint(*size_range)
    size3 = random.randint(*size_range)
    
    arr1 = sorted(random.sample(range(*value_range), size1))
    arr2 = sorted(random.sample(range(*value_range), size2))
    arr3 = sorted(random.sample(range(*value_range), size3))
    x = random.randint(1, min(size1, min(size2, size3)))
    i = 1
    while ensure_common and i < x:
        i = i + 1
        common_element = random.choice(arr1)  # Pick a random element from arr1
        arr2.append(common_element)
        arr3.append(common_element)
        arr2 = sorted(set(arr2))
        arr3 = sorted(set(arr3))
    
    return arr1, arr2, arr3

def generate_edge_cases():
    """Generates edge and tricky cases."""
    cases = []
    
    # Smallest case
    cases.append(([1], [1], [1]))
    
    # Largest case
    cases.append((list(range(1, 1001)), list(range(1, 1001)), list(range(1, 1001))))
    
    # No intersection
    cases.append(([1, 2, 3], [4, 5, 6], [7, 8, 9]))
    
    # All same numbers
    cases.append(([100] * 1000, [100] * 1000, [100] * 1000))
    
    return cases

def generate_example_cases():
    """Returns predefined example cases."""
    return [
        ([2, 4, 6, 8, 10], [4, 6, 8, 12, 14], [1, 4, 6, 8, 16]),
        ([3, 7, 15, 20, 25], [1, 2, 3, 7, 10, 15], [3, 5, 7, 15, 18]),
        ([10, 30, 50, 70], [20, 40, 60, 80], [5, 15, 25, 35]),
        ([5, 10, 15, 20, 25, 30], [10, 20, 30, 40, 50], [10, 20, 30, 60, 70]),
    ]

def generate_test_cases():
    """Generates multiple test cases in the required format."""
    test_cases = []
    
    # 90% of 100 random test cases should have at least one common element
    for _ in range(90):
        test_cases.append(generate_test_case(ensure_common=True))
    
    # 10% without any common elements
    for _ in range(10):
        test_cases.append(generate_test_case())
    
    # Append edge and tricky cases
    test_cases.extend(generate_edge_cases())
    
    # Append example cases
    test_cases.extend(generate_example_cases())
    
    # Small T cases to ensure TLE in brute force approach
    # for _ in range(5):
    #     test_cases.append(generate_test_case(size_range=(900, 1000), ensure_common=True))
    
    return test_cases

def format_test_cases(test_cases):
    """Formats test cases for output."""
    output = []
    output.append(str(len(test_cases)))
    i = 1
    for arr1, arr2, arr3 in test_cases:
        output.append(f"TestCase-{i}")
        i = i + 1
        output.append(str(len(arr1)))
        output.append(" ".join(map(str, arr1)))
        output.append(str(len(arr2)))
        output.append(" ".join(map(str, arr2)))
        output.append(str(len(arr3)))
        output.append(" ".join(map(str, arr3)))
    
    return "\n".join(output)

# Generate and print the test cases
test_cases = generate_test_cases()
print(format_test_cases(test_cases))