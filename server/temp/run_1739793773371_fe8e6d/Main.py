import sys
from collections import defaultdict

class TwoSum:
    def __init__(self):
        self.freq = defaultdict(int)

    def add(self, number):
        self.freq[number] += 1

    def find(self, value):
        for num in self.freq:
            complement = value - num
            if (complement != num and complement in self.freq) or (complement == num and self.freq[num] > 1):
                return True
        return False

def main():
    T = int(sys.stdin.readline().strip())
    for _ in range(T):
        case_name = sys.stdin.readline().strip()
        print(case_name)
        n = int(sys.stdin.readline().strip())
        ts = TwoSum()
        operations = sys.stdin.readline().strip().split()
        output = []

        for op in operations:
            if op.startswith("add("):
                x = int(op[4:-1])
                ts.add(x)
                output.append("null")
            elif op.startswith("find("):
                x = int(op[5:-1])
                output.append("true" if ts.find(x) else "false")

        print(" ".join(output))

if __name__ == "__main__":
    main()