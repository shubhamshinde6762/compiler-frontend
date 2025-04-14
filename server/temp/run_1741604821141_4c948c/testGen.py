import random

def generate_random_testcase():
    # Choose random lengths for nums and queries (each between 1 and 1000)
    n = random.randint(1, 80)
    m = random.randint(1, 80)
    # Generate random values in the range [1, 10^9]
    nums = [random.randint(1, 500) for _ in range(n)]
    queries = [random.randint(1, 500) for _ in range(m)]
    return n, nums, m, queries

# List to store all test cases; each test case is a tuple: (n, nums, m, queries)
testcases = []

# 1. Append 100 random test cases.
for _ in range(100):
    testcases.append(generate_random_testcase())

# 2. Append edge cases.
# Edge Case 1: Minimal input.
testcases.append((1, [1], 1, [1]))
# Edge Case 2: Single-element nums with more than one query.
testcases.append((1, [10**9], 3, [1, 10**9, 500]))
# Edge Case 3: Two identical elements in nums.
testcases.append((2, [1, 1], 2, [1, 1]))
# Edge Case 4: Ascending nums with all queries larger than any element.
testcases.append((5, [1, 2, 3, 4, 5], 5, [6, 6, 6, 6, 6]))
# Edge Case 5: All elements in nums are the same.
testcases.append((10, [7] * 10, 10, [7] * 10))

# 3. Append tricky cases.
# Tricky Case 1: Mixed order that may force non-greedy removals.
testcases.append((6, [5, 3, 8, 6, 10, 4], 6, [4, 6, 7, 5, 11, 3]))
# Tricky Case 2: Non-monotonic sequence with alternating low/high values.
testcases.append((7, [9, 1, 7, 3, 8, 2, 6], 7, [5, 2, 8, 1, 9, 3, 7]))
# Tricky Case 3: Many duplicate values in nums.
testcases.append((8, [4, 5, 5, 5, 5, 6, 7, 8], 8, [5, 5, 6, 7, 5, 8, 4, 5]))
# Tricky Case 4: A mix of increasing and decreasing parts.
testcases.append((9, [1, 3, 2, 4, 6, 5, 7, 8, 2], 9, [2, 3, 4, 5, 6, 7, 1, 8, 2]))

# 4. Append provided cases (3 cases as given in the original problem statement).
# Provided Case 1:
testcases.append((5, [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 6]))
# Provided Case 2:
testcases.append((3, [2, 3, 2], 3, [2, 2, 3]))
# Provided Case 3:
testcases.append((3, [3, 4, 3], 3, [4, 3, 2]))

# 5. Append 4 custom cases.
# Custom Case 1:
testcases.append((4, [10, 5, 15, 20], 4, [5, 10, 15, 25]))
# Custom Case 2:
testcases.append((6, [100, 50, 75, 25, 125, 60], 6, [50, 75, 100, 60, 125, 25]))
# Custom Case 3:
testcases.append((5, [1, 1000000000, 500, 500, 1000000000], 5, [1, 500, 1000000000, 500, 1]))
# Custom Case 4:
testcases.append((7, [2, 2, 2, 3, 3, 3, 4], 7, [2, 3, 2, 4, 3, 2, 4]))

# 6. Append the 4 examples provided below at last.
# Example 1:
# Input: nums = [5,6,7,8,9], queries = [5,7,8,10,6]
# Output: 3
testcases.append((5, [5, 6, 7, 8, 9], 5, [5, 7, 8, 10, 6]))
# Example 2:
# Input: nums = [10,5,11], queries = [6,5,10]
# Outpu
testcases.append((3, [10, 5, 11], 3, [6, 5, 10]))
# Example 3:
# Input: nums = [8,3,6], queries = [7,5,2]
# Output: 2
testcases.append((3, [8, 3, 6], 3, [7, 5, 2]))
# Example 4:
# Input: nums = [2,4,6,8,10], queries = [2,4,7,9,5]
# Output: 4
testcases.append((5, [2, 4, 6, 8, 10], 5, [2, 4, 7, 9, 5]))

# Total number of test cases.
T = len(testcases)

# Output the test cases in the required format.
print(T)
for idx, (n, nums, m, queries) in enumerate(testcases, start=1):
    print(n)
    print(" ".join(map(str, nums)))
    print(m)
    print(" ".join(map(str, queries)))