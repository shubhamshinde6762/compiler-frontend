import random

def generate_test_cases():
    T = 100
    print(T + 4)
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
    print("TestCase-101")
    print(6)
    print(" ".join(["TwoSum()", "add(2)", "add(6)", "add(8)", "find(10)", "find(12)"]))
    print("TestCase-102")
    print(7)
    print(" ".join(["TwoSum()", "add(-1)", "add(0)", "add(1)", "add(3)", "find(2)", "find(4)"]  ))
    print("TestCase-103")
    print(7)
    print(" ".join(["TwoSum()", "add(4)", "add(7)", "add(11)", "add(15)", "find(18)", "find(20)"]))
    print("TestCase-104")
    print(7)
    print(" ".join(["TwoSum()", "add(0)", "add(0)", "add(5)", "add(10)", "find(0)", "find(15)"]))

def generate_tle_case():
    T = 5
    print(T)
    for _ in range(T):
        n = 10**5
        print("TestCase-{}".format(_ + 1))
        print(n)
        queries = ["TwoSum()"]
        queries += ["add({})".format(i) for i in range(n // 2)]
        queries += ["find({})".format(i) for i in range(n // 2, n)]
        print(" ".join(queries))

generate_test_cases()
# generate_tle_case()