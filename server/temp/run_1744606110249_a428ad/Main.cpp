#include<bits/stdc++.h>
using namespace std;


class TreeNode{
  
  public:
  
  int data;
  TreeNode* left;
  TreeNode* right;
  
  TreeNode(int val){
    
    data = val;
    left = NULL;
    right = NULL;
  }
};


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

#include <iostream>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <utility>

using namespace std;


class Solution {
public:
    TreeNode* correctBinaryTree(TreeNode* root) {
        if (!isValidTestCase(root)) {
            return nullptr;
        }
        visited.clear();
        return correct(root);
    }

private:
    unordered_set<int> visited;

    TreeNode* correct(TreeNode* node) {
        if (node == nullptr) {
            return nullptr;
        }
        if (node->right && visited.count(node->right->val)) {
            return nullptr;
        }
        visited.insert(node->val);
        node->right = correct(node->right);
        node->left = correct(node->left);
        return node;
    }

    bool isValidTestCase(TreeNode* root) {
        if (root == nullptr) {
            cout << "Test case invalid: root is null" << endl;
            return false;
        }

        unordered_map<TreeNode*, int> level_map;
        unordered_set<int> node_values;
        queue<TreeNode*> q;
        q.push(root);
        level_map[root] = 0;
        int node_count = 0;
        vector<pair<int, int>> invalid_edges;

        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            int current_level = level_map[current];

            // Check node value range
            if (current->val < -1e9 || current->val > 1e9) {
                cout << "Test case invalid: node value " << current->val << " out of range [-1e9, 1e9]" << endl;
                return false;
            }

            // Check duplicate node values
            if (node_values.count(current->val)) {
                cout << "Test case invalid: duplicate node value " << current->val << endl;
                return false;
            }
            node_values.insert(current->val);
            node_count++;

            // Check right child for invalid edge
            if (current->right) {
                TreeNode* right_child = current->right;
                if (level_map.find(right_child) != level_map.end()) {
                    if (level_map[right_child] == current_level) {
                        invalid_edges.emplace_back(current->val, right_child->val);
                    }
                } else {
                    level_map[right_child] = current_level + 1;
                    q.push(right_child);
                }
            }

            // Process left child
            if (current->left) {
                TreeNode* left_child = current->left;
                if (level_map.find(left_child) == level_map.end()) {
                    level_map[left_child] = current_level + 1;
                    q.push(left_child);
                }
            }
        }

        // Check node count constraint
        if (node_count < 3 || node_count > 1e4) {
            cout << "Test case invalid: node count is " << node_count << " (must be in [3, 10000])" << endl;
            return false;
        }

        // Check exactly one invalid edge
        if (invalid_edges.size() != 1) {
            cout << "Test case invalid: invalid edge count is " << invalid_edges.size() << " (expected 1)" << endl;
            return false;
        }

        // Check fromNode != toNode in the invalid edge
        auto& edge = invalid_edges[0];
        if (edge.first == edge.second) {
            cout << "Test case invalid: fromNode equals toNode (" << edge.first << ")" << endl;
            return false;
        }

        return true;
    }
};

void printTree(TreeNode* root) {
    if (!root) return;

    queue<TreeNode*> q;
    q.push(root);
    vector<TreeNode*> lst;

    int nllcnt=0;

    while (!q.empty()) {
       
        TreeNode* temp = q.front();
        q.pop();
        lst.push_back(temp);
        if(!temp)
          continue;
        q.push(temp->left);
        q.push(temp->right);


    }

    while(!lst.empty())
    {
        if(lst.back()==nullptr)
            lst.pop_back();
        else
            break;
    }
    for(auto x:lst)
    {
        if(x==nullptr)
            cout<<"null ";
        else
            cout<<x->data<<" ";
    }

    cout << endl;
}


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
       int fromVal,toVal;
        cin>>fromVal>>toVal;

    TreeNode* fromNode = findNode(root, fromVal);
    TreeNode* toNode = findNode(root, toVal);
    fromNode->right=toNode;
   
    TreeNode* ans = sol.correctBinaryTree(root);
    printTree(ans);
  }
}