import random

def generate_test_cases():
    T = 100
    print(T)
    for _ in range(T):
        n = random.randint(1, 50)
        print("TestCase-{}".format(_ + 1))
        print(n)
        ops = ["add", "find"]
        queries = ["TwoSum()"]
        values = set()
        for _ in range(n):
            op = random.choice(ops)
            if op == "add" or not values:
                x = random.randint(-10**6, 10**6)
                queries.append("add({})".format(x))
                values.add(x)
            else:
                q = random.randint(-2 * 10**6, 2 * 10**6)
                queries.append("find({})".format(q))
        print(" ".join(queries))

def generate_tle_case():
    T = 1
    print(T)
    for _ in range(T):
        n = 10**3
        print("TestCase-{}".format(_ + 1))
        print(n)
        queries = ["TwoSum()"]
        queries += ["add({})".format(i) for i in range(n // 2)]
        queries += ["find({})".format(i) for i in range(n // 2, n)]
        print(" ".join(queries))

# generate_test_cases()
generate_tle_case()