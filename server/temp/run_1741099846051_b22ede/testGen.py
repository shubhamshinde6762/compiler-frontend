import random

def array_transformation(arr):
    """
    Simulates the array transformation process until stabilization.
    """
    while True:
        new_arr = arr[:]
        changed = False
        for i in range(1, len(arr) - 1):
            if arr[i] < arr[i - 1] and arr[i] < arr[i + 1]:
                new_arr[i] += 1
                changed = True
            elif arr[i] > arr[i - 1] and arr[i] > arr[i + 1]:
                new_arr[i] -= 1
                changed = True
        if not changed:
            break
        arr = new_arr
    return arr


def generate_random_case(n_min=3, n_max=100, val_min=1, val_max=100):
    """Generate a random test case within given constraints."""
    n = random.randint(n_min, n_max)
    arr = [random.randint(val_min, val_max) for _ in range(n)]
    return n, arr


def generate_edge_cases():
    """Generate a set of tricky and edge cases."""
    cases = []

    # Edge Case 1: Already Stable
    cases.append((5, [2, 3, 3, 3, 4]))

    # Edge Case 2: All elements the same
    cases.append((10, [5] * 10))

    # Edge Case 3: Strictly increasing sequence
    cases.append((7, [1, 2, 3, 4, 5, 6, 7]))

    # Edge Case 4: Strictly decreasing sequence
    cases.append((7, [7, 6, 5, 4, 3, 2, 1]))

    # Edge Case 5: Alternating high-low pattern
    cases.append((10, [1, 100, 1, 100, 1, 100, 1, 100, 1, 100]))

    # Edge Case 6: Longest convergence
    cases.append((10, [10, 1, 10, 1, 10, 1, 10, 1, 10, 1]))

    return cases


def generate_tle_cases():
    """Generate test cases that cause TLE in a brute-force solution."""
    cases = []

    # Case 1: Longest time to stabilize
    n = 100
    arr = [random.randint(1, 100) for _ in range(n)]
    for i in range(1, n - 1):
        if i % 2 == 0:
            arr[i] = 1  # Force a long stabilization process
    cases.append((n, arr))

    # Case 2: Alternating values forcing long transformation
    arr = [1 if i % 2 == 0 else 100 for i in range(n)]
    cases.append((n, arr))

    return cases


def generate_examples():
    """Return the 4 example test cases from the prompt."""
    return [
        (4, [5, 1, 4, 3]),
        (5, [2, 7, 1, 8, 4]),
        (6, [9, 3, 5, 7, 2, 8]),
        (6, [3, 10, 6, 5, 9, 2])
    ]


def validate_test_cases(cases):
    """Validate generated test cases using the transformation function."""
    for i, (n, arr) in enumerate(cases):
        transformed = array_transformation(arr[:])
        print(f"Test {i+1}: n = {n}, Original = {arr}, Transformed = {transformed}")
        assert 3 <= n <= 100, "Invalid array length"
        assert all(1 <= x <= 100 for x in arr), "Invalid element range"
    print("All test cases validated!")


def main():
    test_cases = []

    # Generate 100 random cases
    for _ in range(100):
        test_cases.append(generate_random_case())

    # Add edge cases & tricky cases
    test_cases.extend(generate_edge_cases())

    # Add TLE cases
    # test_cases.extend(generate_tle_cases())

    # Add example cases from the problem statement
    test_cases.extend(generate_examples())

    # Validate test cases for correctness
    # validate_test_cases(test_cases)

    # Print test cases in the required format
    i = 1
    print(len(test_cases))
    for n, arr in test_cases:
        print(f"TestCase-{i}")
        i = i + 1
        print(n)
        print(" ".join(map(str, arr)))


if __name__ == "__main__":
    main()