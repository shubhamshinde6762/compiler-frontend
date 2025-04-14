import sys

class Solution:
    def arraysIntersection(self, arr1, arr2, arr3):
        ans = []
        p1, p2, p3 = 0, 0, 0

        while p1 < len(arr1) and p2 < len(arr2) and p3 < len(arr3):
            if arr1[p1] == arr2[p2] == arr3[p3]:
                ans.append(arr1[p1])
                p1 += 1
                p2 += 1
                p3 += 1
            else:
                if arr1[p1] < arr2[p2]:
                    p1 += 1
                elif arr2[p2] < arr3[p3]:
                    p2 += 1
                else:
                    p3 += 1

        return ans

def main():
    input_data = sys.stdin.read().splitlines()
    index = 0
    T = int(input_data[index])
    index += 1

    for _ in range(T):
        print(input_data[index])  # String identifier
        index += 1
        solution = Solution()

        n = int(input_data[index])
        index += 1
        arr1 = list(map(int, input_data[index].split()))
        index += 1

        n = int(input_data[index])
        index += 1
        arr2 = list(map(int, input_data[index].split()))
        index += 1

        n = int(input_data[index])
        index += 1
        arr3 = list(map(int, input_data[index].split()))
        index += 1

        result = solution.arraysIntersection(arr1, arr2, arr3)
        print(" ".join(map(str, result)))

if __name__ == "__main__":
    main()