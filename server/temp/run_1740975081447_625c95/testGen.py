import random

def is_armstrong(n):
    digits = list(map(int, str(n)))
    power = len(digits)
    return sum(d ** power for d in digits) == n

def generate_random_cases(count=100, max_n=10*8):
    return [random.randint(1, max_n) for _ in range(count)]

def generate_edge_cases():
    return [1, 9, 10, 99, 100, 999, 1000, 9999, 10000, 99999, 100000, 99999999, 100000000]

def generate_tricky_cases():
    return [9474, 9475, 8208, 407, 370, 371, 1634, 9473, 999, 100000001]

def generate_large_cases(count=5):
    return [random.randint(10**7, 10**8) for _ in range(count)]

def main():
    test_cases = []
    
    # 100 Random Cases
    test_cases.extend(generate_random_cases(100))
    
    # Edge Cases
    test_cases.extend(generate_edge_cases())
    
    # Tricky Cases
    test_cases.extend(generate_tricky_cases())
    
    # Large Cases to cause TLE for brute force
    # test_cases.extend(generate_large_cases(5))
    
    # Example Cases
    example_cases = [9474, 9475, 8208, 407]
    test_cases.extend(example_cases)
    
    # Print in required format
    print(len(test_cases))
    i = 1
    for case in test_cases:
        print(f"TestCase-{i}")
        i = i + 1
        print(case)

if __name__ == "__main__":
    main()