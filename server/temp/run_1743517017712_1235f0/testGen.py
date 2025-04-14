import random
import string

def random_word(length):
    """Generates a random word of given length."""
    return ''.join(random.choices(string.ascii_letters, k=length))  # Include uppercase letters

def generate_test_case(n, p):
    """Generates a single test case with a diverse and meaningful vocabulary."""
    words = ["apple", "banana", "cherry", "dog", "elephant", "fox", "grape", "happy", "igloo", 
             "jungle", "kite", "lemon", "mountain", "night", "orange", "piano", "queen", "river", 
             "sunshine", "tiger", "umbrella", "violet", "whale", "xylophone", "yellow", "zebra", 
             "ocean", "forest", "desert", "storm", "castle", "bridge", "rocket", "galaxy", "comet", 
             "asteroid", "nebula", "cloud", "rain", "snow", "wind", "flame", "ember", "canyon", 
             "volcano", "reef", "lagoon", "island", "harbor", "meadow"]
    
    # Ensure all words meet length constraints (1-20 chars)
    valid_words = [w for w in words if 1 <= len(w) <= 20]
    
    # Handle the case where n is larger than available words
    if n > len(valid_words):
        # Generate additional random words
        extra_needed = n - len(valid_words)
        extra_words = [random_word(random.randint(1, 20)) for _ in range(extra_needed)]
        valid_words.extend(extra_words)
    
    # Get sentences within constraints
    sentence1 = random.sample(valid_words, min(n, len(valid_words)))
    sentence2 = random.sample(valid_words, min(n, len(valid_words)))  # Independent selection
    
    # Generate similar pairs (ensuring they're distinct)
    used_pairs = set()
    similar_pairs = []
    attempts = 0
    
    while len(similar_pairs) < p and attempts < p*10:
        attempts += 1
        word1 = random.choice(valid_words)
        word2 = random.choice(valid_words)
        
        # Skip if words are the same or the pair already exists (in either order)
        if word1 == word2 or (word1, word2) in used_pairs or (word2, word1) in used_pairs:
            # continue
            
        similar_pairs.append([word1, word2])  # List format for pairs
        used_pairs.add((word1, word2))
        used_pairs.add((word2, word1))  # Also prevent reverse pairs
    
    return sentence1, sentence2, similar_pairs

def print_test_case(sentence1, sentence2, similar_pairs):
    """Formats and prints a single test case."""
    print(len(sentence1))
    print(" ".join(sentence1))
    print(len(sentence2))
    print(" ".join(sentence2))
    print(len(similar_pairs))
    for pair in similar_pairs:
        print(f"{pair[0]} {pair[1]}")

def generate_large_valid_case():
    """Generates a large case within constraints."""
    n = 1000  # Max sentence length
    p = 1000  # Max pairs
    
    # Generate unique words that satisfy length constraints
    words = set()
    while len(words) < n*2:  # Need enough unique words for both sentences
        words.add(random_word(random.randint(1, 20)))
    words = list(words)
    
    sentence1 = words[:n]
    sentence2 = words[n:2*n]  # Use different words for sentence2
    
    # Generate distinct similar pairs
    used_pairs = set()
    similar_pairs = []
    word_pool = sentence1 + sentence2  # Use words from both sentences
    
    while len(similar_pairs) < p and len(used_pairs) < (len(word_pool) * (len(word_pool) - 1)):
        word1 = random.choice(word_pool)
        word2 = random.choice(word_pool)
        
        if word1 != word2 and (word1, word2) not in used_pairs and (word2, word1) not in used_pairs:
            similar_pairs.append([word1, word2])
            used_pairs.add((word1, word2))
            used_pairs.add((word2, word1))
    
    return sentence1, sentence2, similar_pairs

# Generate all test cases
test_cases = []

# Generate random test cases
for _ in range(600):
    n = random.randint(1, 30)
    p = random.randint(0, min(30, n*(n-1)//2))  # Limit p to avoid too many attempts
    test_cases.append(generate_test_case(n, p))

# Add edge cases
test_cases.append((['apple'], ['banana'], []))  # Different words, no similarities
test_cases.append((['hello'], ['hello'], []))  # Identical single words

# Add specific test cases
test_cases.append((
    ['fast', 'runner', 'wins'], 
    ['quick', 'sprinter', 'triumphs'], 
    [['fast', 'quick'], ['runner', 'sprinter'], ['wins', 'triumphs']]
))

test_cases.append((
    ['brilliant'], 
    ['brilliant'], 
    []
))

test_cases.append((
    ['happy', 'journey'], 
    ['joyful', 'trip'], 
    [['happy', 'joyful'], ['journey', 'trip']]
))

test_cases.append((
    ['hello', 'world'], 
    ['hello', 'earth'], 
    [['world', 'earth']]
))

# Add one large case
# test_cases.append(generate_large_valid_case())

# Print all test cases
print(len(test_cases))
i = 1
for test_case in test_cases:
    print(f"TestCase-{i}")
    i += 1
    print_test_case(*test_case)