# Python Implementation
from collections import deque

class MovingAverage:
    def __init__(self, size):
        self.size = size
        self.queue = deque()
        self.sum = 0

    def next(self, val):
        self.queue.append(val)
        self.sum += val
        if len(self.queue) > self.size:
            self.sum -= self.queue.popleft()
        return self.sum / len(self.queue)

def main():
    T = int(input())
    for _ in range(T):
        test_case_id = input().strip()
        print(test_case_id)
        n = int(input().strip())
        operations = input().strip()
        m = int(input().strip())
        values = list(map(int, input().split()))
        
        obj = MovingAverage(n)
        print("null", end=' ')
        for val in values:
            print(f"{obj.next(val):.7f}", end=' ')
        print()

if __name__ == "__main__":
    main()