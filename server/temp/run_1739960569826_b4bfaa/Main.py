import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def closestValue(self, root: TreeNode, target: float) -> int:
        closest = root.val
        while root:
            if abs(root.val - target) < abs(closest - target) or \
               (abs(root.val - target) == abs(closest - target) and root.val < closest):
                closest = root.val
            root = root.left if target < root.val else root.right
        return closest

def construct_bst(level_order):
    if not level_order or level_order[0] == "null":
        return None

    root = TreeNode(int(level_order[0]))
    queue = [root]
    i = 1

    while queue and i < len(level_order):
        current = queue.pop(0)

        # Left child
        if i < len(level_order) and level_order[i] != "null":
            current.left = TreeNode(int(level_order[i]))
            queue.append(current.left)
        i += 1

        # Right child
        if i < len(level_order) and level_order[i] != "null":
            current.right = TreeNode(int(level_order[i]))
            queue.append(current.right)
        i += 1

    return root

def main():
    input_data = sys.stdin.read().strip().split("\n")
    t = int(input_data[0])
    index = 1

    for _ in range(t):
        print(input_data[index])  # Test case identifier
        index += 1

        n = int(input_data[index])
        index += 1

        values = input_data[index].split()
        index += 1

        target = float(input_data[index])
        index += 1

        root = construct_bst(values)
        solution = Solution()
        result = solution.closestValue(root, target)

        print(result)

if __name__ == "__main__":
    main()