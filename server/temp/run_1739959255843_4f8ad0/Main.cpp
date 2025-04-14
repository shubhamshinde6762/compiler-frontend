#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        double a = root->val;
        auto kid = target < a ? root->left : root->right;
        if (!kid) return a;
        double b = closestValue(kid, target);
        if (abs(a - target) == abs(b - target))
            return min(a, b);
        return abs(a - target) < abs(b - target) ? a : b;
    }
};

TreeNode* constructBST(const vector<string>& levelOrder) {
    if (levelOrder.empty() || levelOrder[0] == "null") return nullptr;

    TreeNode* root = new TreeNode(stoi(levelOrder[0]));
    queue<TreeNode*> q;
    q.push(root);

    int i = 1;
    while (!q.empty() && i < levelOrder.size()) {
        TreeNode* current = q.front();
        q.pop();

        // Left child
        if (i < levelOrder.size() && levelOrder[i] != "null") {
            current->left = new TreeNode(stoi(levelOrder[i]));
            q.push(current->left);
        }
        i++;

        // Right child
        if (i < levelOrder.size() && levelOrder[i] != "null") {
            current->right = new TreeNode(stoi(levelOrder[i]));
            q.push(current->right);
        }
        i++;
    }

    return root;
}

void deleteTree(TreeNode* root) {
    if (!root) return;
    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    cin.ignore(); // Ignore newline after t

    for (int tc = 1; tc <= t; tc++) {
        string s;
        getline(cin, s);  // Read test case identifier (ignored)
        cout << s << endl;
        
        int n;
        cin >> n;
        // cin.ignore();  // Ignore newline after n

        vector<string> values(n);
        for (int i = 0; i < n; i++) {
            cin >> values[i];
        }
        
        cout << endl;

        double target;
        cin >> target;
        cin.ignore(); 

        // Construct tree and solve
        TreeNode* root = constructBST(values);
        // Solution solution;
        int result = solution.closestValue(root, target);

        cout << result << "\n";

        // // Clean up
        // deleteTree(root);
    }

    return 0;
}