import random

# Set seed for reproducibility.
random.seed(0)

# TestCase-1: Strictly Increasing Consecutive Numbers [1, 2, 3, ..., 100000]
def test_case_1():
    n = 50000
    arr = list(range(1, n + 1))
    return n, list(map(str, arr))

# TestCase-2: Strictly Decreasing Consecutive Numbers [100000, 99999, ..., 1]
def test_case_2():
    n = 50000
    arr = list(range(10000, 0, -1))
    return n, list(map(str, arr))

# TestCase-3: Two Large Blocks – first increasing, then decreasing.
# First block: [1, 2, 3, ..., 50000]
# Second block: [100000, 99999, ..., 50001]
def test_case_3():
    n = 50000
    first_block = list(range(1, 50001))
    second_block = list(range(100000, 50000, -1))
    arr = first_block + second_block
    return n, list(map(str, arr))

# TestCase-4: All elements are the same (e.g. all 42)
def test_case_4():
    n = 10000
    arr = [42] * n
    return n, list(map(str, arr))

# TestCase-5: Blocks of Consecutive Sequences.
# 100 blocks of 1000 consecutive numbers each; blocks separated by a gap.
def test_case_5():
    blocks = []
    for i in range(100):
        start = i * 2000 + 1  # gap between blocks
        block = list(range(start, start + 1000))
        blocks.extend(block)
    n = len(blocks)  # Should be 100 * 1000 = 100000
    return n, list(map(str, blocks))

# TestCase-6: Random Walk (Mostly Consecutive)
# n = 100000; starting at 50000, each next element is +1 or -1 (with probability 0.9) 
# or a random jump (with probability 0.1), while ensuring values stay in [1, 10^5].
def test_case_6():
    n = 100000
    arr = []
    current = 50000
    arr.append(current)
    for _ in range(n - 1):
        if random.random() < 0.9:
            # With high probability, step by +1 or -1
            if current == 1:
                step = 1
            elif current == 100000:
                step = -1
            else:
                step = random.choice([1, -1])
            current += step
        else:
            # Otherwise, take a random jump.
            current = random.randint(1, 100000)
        arr.append(current)
    return n, list(map(str, arr))

# TestCase-7: Alternating Blocks of Increasing and Decreasing Sequences.
# 20 blocks, each of length 5000. Even-indexed blocks are strictly increasing;
# odd-indexed blocks are strictly decreasing.
def test_case_7():
    block_size = 5000
    blocks = []
    for i in range(20):
        if i % 2 == 0:
            # For increasing block, choose a start ensuring the block fits in [1, 10^5]
            start = random.randint(1, 100000 - block_size + 1)
            block = list(range(start, start + block_size))
        else:
            # For decreasing block, choose a start ensuring the block fits in [1, 10^5]
            start = random.randint(block_size, 100000)
            block = list(range(start, start - block_size, -1))
        blocks.extend(block)
    n = len(blocks)
    return n, list(map(str, blocks))

def main():
    # List of test case generator functions.
    test_case_functions = [
        test_case_1,
        test_case_2
    ]
    
    T = len(test_case_functions)
    print(T)
    for i, func in enumerate(test_case_functions, 1):
        n, arr = func()
        print(f"TestCase-{i}")
        print(n)
        print(" ".join(arr))

if __name__ == "__main__":
    main()