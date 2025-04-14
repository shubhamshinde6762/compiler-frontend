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




//It is just a variation of Intersection of LinkedList!
class Solution {
public:
    Node* lowestCommonAncestor(Node* p, Node * q) {
        Node* a = p;
        Node* b = q;
        while(a != b) {
            a = a == nullptr ? q : a->parent;
            b = b == nullptr ? p : b->parent;  
        }
        return a;
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
    //  TreeNode* ans = sol.lowestCommonAncestor(nodeP,nodeQ);
    if(ans)
    cout<<ans->data<<endl;
    else
    cout<<"null\n";
  }
}