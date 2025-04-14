#include<bits/stdc++.h>
using namespace std;


class TreeNode{
  
  public:
  
  int data;
  TreeNode* left;
  TreeNode* right;
  TreeNode* parent;
  
  TreeNode(int val){
    
    data = val;
    left = NULL;
    right = NULL;
    parent = NULL;
  }
};


void setParent(TreeNode* node, TreeNode* parent) {
    if (!node) return;
    node->parent = parent;
    setParent(node->left, node);
    setParent(node->right, node);
}


int stringToInt(string s){
  
  int val = 0;
  int i = 0;
  bool flag = 0;
  
  if(s[i] == '-'){
    flag = 1;
    i++;
  }
  
  while(i<s.size()){
    val = (val*10 + (s[i]-'0'));
    i++;
  }
  
  if(flag){
    val *= (-1);
  }
  
  return val;
}


TreeNode* buildTree(string s){
  
  if(s.size()==0 || (s[0]=='n' || s[0]=='N')){
    return NULL;
  }
  
  vector<string> nodes;
  
  stringstream st(s);
  for(string str; st>>str;){
    nodes.push_back(str);
  }
  
  TreeNode* root = new TreeNode(stringToInt(nodes[0]));
  
  queue<TreeNode*> q;
  q.push(root);
  
  int ind = 1;
  while(!q.empty() && ind<nodes.size()){
    
    TreeNode* currNode = q.front();
    q.pop();
    
    string temp = nodes[ind];
    
    if(temp[0]!='n' && temp[0]!='N'){
      
      currNode->left = new TreeNode(stringToInt(temp));
      q.push(currNode->left);
    }
    
    ind++;
    if(ind >= nodes.size()){
      break;
    }
    
    temp = nodes[ind];
    
    if(temp[0]!='n' && temp[0]!='N'){
      
      currNode->right = new TreeNode(stringToInt(temp));
      q.push(currNode->right);
    }
    ind++;
  }
  
  return root;
}


TreeNode* findNode(TreeNode* root, int value) {
    if (!root) return nullptr;
    if (root->data == value) return root;
    
    TreeNode* res1 = findNode(root->left, value);
        if (res1) return res1;
    TreeNode* res2 = findNode(root->right, value);
    if (res2) return res2;
    return nullptr;
}




class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* p, TreeNode* q) {
        bool nodesFound = false;

        function<TreeNode*(TreeNode*)> dfs = [&](TreeNode* node) {
            // Base case: If the node is null, return null
            if (!node) return node;

            // Recursively search the left and right subtrees
            TreeNode* left = dfs(node->left);
            TreeNode* right = dfs(node->right);

            // Check conditions for current node being part of the solution
            int conditions = 0;
            if (node == p || node == q) conditions++;
            if (left != NULL) conditions++;
            if (right != NULL) conditions++;
            if (conditions == 2)
                nodesFound = true;  // Mark that both nodes are found

            // Determine if current node is the lowest common ancestor
            if ((left && right) || (node == p) || (node == q)) return node;

            // Return the non-null child, if any
            return left ? left : right;
        };

        // Start DFS traversal to find the lowest common ancestor
        TreeNode* ans = dfs(root);
        // Return the result only if both nodes are found
        return nodesFound ? ans : NULL;
    }
};

int main(){
 // cout<<"20";

  int t=0;
  cin>>t;
//  cout<<t;
  
  while(t--){
      
      Solution sol;
      
      string testCase;
      cin>>testCase;
      cout<<testCase<<endl;
      
      cin.ignore();
    
    string s;
    getline(cin,s);
    
    TreeNode* root = buildTree(s);
    setParent(root, NULL);

       int p,q;
        cin>>p;
        cin>>q;
    TreeNode* nodeP = findNode(root, p);
    TreeNode* nodeQ = findNode(root, q);
    if(!nodeP)
    {
        cout << "NodeP mising" << endl;
        nodeP=new TreeNode(p);
    }
    if(!nodeQ)
    {
        cout << "NodeQ mising" << endl;
        nodeQ=new TreeNode(q);
    }
     TreeNode* ans = sol.lowestCommonAncestor(nodeP,nodeQ);
    if(ans)
    cout<<ans->data<<endl;
    else
    cout<<"null\n";
  }
}