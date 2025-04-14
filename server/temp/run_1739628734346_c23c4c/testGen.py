#!/usr/bin/env python3
import random

def gen2():
    ts = []
    n = 10**4
    a = [random.randint(-10**9,10**9) for _ in range(n)]
    ts.append(("TestCase-1", n, a))
    b = list(range(-10**9, -10**9+n))
    ts.append(("TestCase-2", n, b))
    print(len(ts))
    for lab, n, arr in ts:
        print(lab)
        print(n)
        print(" ".join(map(str, arr)))

if __name__=="__main__":
    gen2()