#!/usr/bin/env python3
import random

def gen1():
    ts = []
    for _ in range(100):
        n = random.randint(5,200)
        arr = [random.randint(0,99) for _ in range(n)]
        ts.append(("TestCase-1", n, arr))
    ts.append(("TestCase-1", 5, [0,0,0,0,0]))
    ts.append(("TestCase-1", 5, [1,2,3,4,5]))
    ts.append(("TestCase-1", 5, [5,4,3,2,1]))
    ts.append(("TestCase-1", 6, [1,2,1,2,1,2]))
    ts.append(("TestCase-1", 7, [2,2,3,3,2,3,2]))
    ts.append(("TestCase-1", 6, [2,2,2,2,2,2]))
    ts.append(("TestCase-1", 6, [3,1,3,2,3,4]))
    ts.append(("TestCase-1", 7, [1,2,3,3,4,5,3]))
    ts.append(("TestCase-1", 8, [7,8,9,10,11,12,13,14]))
    print(len(ts))
    for lab, n, arr in ts:
        print(lab)
        print(n)
        print(" ".join(map(str, arr)))

if __name__=="__main__":
    gen1()