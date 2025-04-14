# Write your test generator code here
import random
import string

def gen_word(l):
    return ''.join(random.choice(string.ascii_lowercase) for _ in range(l))

def main():
    cases = []
    
    # Generate random test cases until total count is 100
    while len(cases) < 100:
        l = random.randint(1, 199)
        word = gen_word(l)
        nf = random.randint(1, l)
        cases.append((word, nf))
        
    # Edge and tricky cases
    cases.append(("a", 1))
    cases.append(("z", 1))
    cases.append(("aaa", 2))
    cases.append(("zzzzzz", 3))
    cases.append(("abcdef", 4))
    cases.append(("fedcba", 3))
    cases.append(("ababab", 3))
    cases.append(("zzxyzz", 2))
    cases.append(("qwerty", 3))
    cases.append(("ytrewq", 2))
    
    
    # Four example cases
    cases.append(("pqrs", 2))
    cases.append(("zxy", 2))
    cases.append(("abz", 3))
    cases.append(("aaab", 2))
    # Print total test cases count
    print(len(cases))
    for i, (word, nf) in enumerate(cases, 1):
        print(f"TestCase-{i}")
        print(word)
        print(nf)

if __name__ == '__main__':
    main()