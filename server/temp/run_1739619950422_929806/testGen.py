import random
import string

def gen_test_cases():
    cases = []
    MAX_LEN = 200000

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