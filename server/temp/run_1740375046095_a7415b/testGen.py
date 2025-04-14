import random
import string

def generate_random_testcase():
    """
    Generates a random compressed string with letters followed by numbers
    """
    compressed_string = []
    for _ in range(random.randint(3, 10000000)):  # Random length of compressed sequence
        char = random.choice(string.ascii_letters)  # Random letter
        count = random.randint(1, 30)  # Large number of repetitions
        compressed_string.append(f"{char}{count}")
    
    return "".join(compressed_string)

def generate_edge_cases():
    """
    Generates tricky and edge test cases
    """
    return [
        "a1",                 # Single character, single occurrence
        "z1000000000",        # Single character, max occurrence
        "a1b1c1d1e1f1g1h1",   # Every character appears once
        "x5y10z15",           # Increasing repetitions
        "A10B9C8D7E6F5G4H3I2J1",  # Decreasing repetitions
        "p100000000q10000000", # Two large numbers
        "a100b200c300d400",   # Medium-sized numbers
        "m999999999n888888888o777777777",  # Large numbers in decreasing order
    ]

def generate_tle_cases():
    """
    Generates cases that should cause TLE for a brute-force approach
    """
    return [
        "a1000000000",   # Extremely large single character case
        "b500000000c500000000",  # Two characters, half each
        "x250000000y250000000z250000000w250000000",  # Four characters split equally
    ]

def example_cases():
    """
    Returns the 4 example test cases as provided earlier.
    """
    return [
        "a2b3c1",
        "x5y1",
        "m3n2",
        "z1a4"
    ]

def generate_test_cases():
    test_cases = []
    
    # Generate 100 random test cases
    for _ in range(500):
        test_cases.append(generate_random_testcase())

    # Append edge and tricky cases
    # test_cases = generate_edge_cases()

    # Append TLE cases
    test_cases = generate_tle_cases()

    # Append provided example cases
    # test_cases.extend(example_cases())

    return test_cases

# Generate all test cases
test_cases = generate_test_cases()

# Output test cases in required format
T = len(test_cases)
print(T)  # Number of test cases

for i, test in enumerate(test_cases, 1):
    print(f"TestCase-{i}")
    print("10")  # Number of operations (randomized small value)
    print("StringIterator next hasNext next next hasNext next next next hasNext")
    print(test)