import random
import string

def gen_test_cases():
    cases = []
    MAX_LEN = 100000

    # TestCase-1: Worst-case, all same letter, numFriends = 1
    word = "a" * MAX_LEN
    cases.append((f"TestCase-1", word, 1))
    
    # TestCase-2: Worst-case, all same letter, numFriends = MAX_LEN
    word = "a" * MAX_LEN
    cases.append((f"TestCase-2", word, MAX_LEN))
    
    # TestCase-3: Alternating pattern "ab", worst-case for many naive comparisons
    word = ("ab" * (MAX_LEN // 2)) + ("a" if MAX_LEN % 2 else "")
    cases.append((f"TestCase-3", word, 100))
    
    # TestCase-4: Completely random word of maximum length, random numFriends in [1, MAX_LEN]
    word = ''.join(random.choices(string.ascii_lowercase, k=MAX_LEN))
    cases.append((f"TestCase-4", word, random.randint(1, MAX_LEN)))
    
    # TestCase-5: All highest letter, 'z', word of maximum length, moderate numFriends
    word = "z" * MAX_LEN
    cases.append((f"TestCase-5", word, 5000))
    
    # TestCase-6: Repeating cycle of the alphabet
    cycle = string.ascii_lowercase
    times = MAX_LEN // len(cycle)
    rem = MAX_LEN % len(cycle)
    word = cycle * times + cycle[:rem]
    cases.append((f"TestCase-6", word, random.randint(1, MAX_LEN)))
    
    # TestCase-7: Random word with smaller length
    l = 100
    word = ''.join(random.choices(string.ascii_lowercase, k=l))
    cases.append((f"TestCase-7", word, random.randint(1, l)))
    
    # TestCase-8: Random word with length 199, moderate numFriends
    l = 199
    word = ''.join(random.choices(string.ascii_lowercase, k=l))
    cases.append((f"TestCase-8", word, random.randint(1, l)))
    
    # TestCase-9: Patterned word from a common keyboard layout, repeated to maximum length
    pattern = "qwertyuiop"
    times = MAX_LEN // len(pattern)
    rem = MAX_LEN % len(pattern)
    word = pattern * times + pattern[:rem]
    cases.append((f"TestCase-9", word, random.randint(1, MAX_LEN)))
    
    # TestCase-10: Tricky pattern, mix of high and low letters
    # e.g. repeating "azby" pattern which can mislead a naive lexicographic greedy approach
    pattern = "azby"
    times = MAX_LEN // len(pattern)
    rem = MAX_LEN % len(pattern)
    word = pattern * times + pattern[:rem]
    cases.append((f"TestCase-10", word, random.randint(1, MAX_LEN)))
    
    return cases

def main():
    cases = gen_test_cases()
    # Print number of test cases
    print(len(cases))
    for name, word, numFriends in cases:
        print(name)
        print(word)
        print(numFriends)

if __name__ == "__main__":
    main()