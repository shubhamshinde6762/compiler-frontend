import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;

    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;
        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(closest - target) ||
                (Math.abs(root.val - target) == Math.abs(closest - target) && root.val < closest)) {
                closest = root.val;
            }
            root = target < root.val ? root.left : root.right;
        }
        return closest;
    }
}

public class Main {
    public static TreeNode constructBST(List<String> levelOrder) {
        if (levelOrder.isEmpty() || levelOrder.get(0).equals("null")) return null;

        TreeNode root = new TreeNode(Integer.parseInt(levelOrder.get(0)));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        int i = 1;
        while (!queue.isEmpty() && i < levelOrder.size()) {
            TreeNode current = queue.poll();

            // Left child
            if (i < levelOrder.size() && !levelOrder.get(i).equals("null")) {
                current.left = new TreeNode(Integer.parseInt(levelOrder.get(i)));
                queue.add(current.left);
            }
            i++;

            // Right child
            if (i < levelOrder.size() && !levelOrder.get(i).equals("null")) {
                current.right = new TreeNode(Integer.parseInt(levelOrder.get(i)));
                queue.add(current.right);
            }
            i++;
        }

        return root;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = Integer.parseInt(scanner.nextLine().trim());

        for (int tc = 1; tc <= t; tc++) {
            System.out.println(scanner.nextLine().trim()); // Test case identifier

            int n = Integer.parseInt(scanner.nextLine().trim());
            List<String> values = Arrays.asList(scanner.nextLine().trim().split(" "));
            double target = Double.parseDouble(scanner.nextLine().trim());

            TreeNode root = constructBST(values);
            Solution solution = new Solution();
            int result = solution.closestValue(root, target);

            System.out.println(result);
        }
        scanner.close();
    }
}