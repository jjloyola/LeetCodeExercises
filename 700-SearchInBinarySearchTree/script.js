/**
 * 700. Search in a Binary Search Tree
 *
 * You are given the root of a binary search tree (BST) and an integer val.
 * Find the node in the BST that the node's value equals val and return the
 * subtree rooted with that node. If such a node does not exist, return null.
 *
 * Example:
 *     4
 *    / \
 *   2   7
 *  / \
 * 1   3
 *
 * Example 1:
 * Input: root = [4,2,7,1,3], val = 2
 * Output: [2,1,3]
 *
 * Example 2:
 * Input: root = [4,2,7,1,3], val = 5
 * Output: null
 * 
 * Constraints:

    The number of nodes in the tree is in the range [1, 5000].
    1 <= Node.val <= 107
    root is a binary search tree.
    1 <= val <= 107
 */

/**
 * Definition for a binary tree node.
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
  return {
    val: val === undefined ? 0 : val,
    left: left === undefined ? null : left,
    right: right === undefined ? null : right,
  };
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (root !== null) console.log(`Checking node: `, root.val);
  if (root === null || root.val === val) return root;

  return root.val > val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
};

/**
 * @param {number[]} array
 * @returns {TreeNode} root of the tree
 */
function getTree(array) {
  if (array.length === 0) return null;
  if (array.length === 1) return TreeNode(array[0]);

  const root = TreeNode(array[0]);
  let parents = [root]; //Queue
  // console.log("parents", parents);
  // console.log("Root", root);

  let i = 1;
  while (parents.length > 0 && parents[0] !== null) {
    parents[0].left = i < array.length ? TreeNode(array[i]) : null;
    parents[0].right = i + 1 < array.length ? TreeNode(array[i + 1]) : null;
    i = i + 2;

    //console.log(`Current Parent State, ${parents[0].val}`);

    parents.push(parents[0].left);
    parents.push(parents[0].right);
    parents.splice(0, 1); //remove first element
  }

  return root;
}

function runTest(arr, val) {
  console.log(`Input: root = ${arr}, val = ${val}`);
  const root = getTree(arr);
  const result = searchBST(root, val);
  result === null
    ? console.log("Value not found in tree ❌")
    : console.log("Value found 🎉", result);
}

//getTree([4, 2, 7, 1, 3]);

runTest([4, 2, 7, 1, 3], 2);
runTest([4, 2, 7, 1, 3], 5);

// Test 3: Single node tree - value found (minimum tree size)
runTest([1], 1);

// Test 4: Single node tree - value not found
runTest([5], 3);

// Test 5: Search for root value
runTest([10, 5, 15, 3, 7, 12, 20], 10);

// Test 6: Search for a leaf node (leftmost)
runTest([10, 5, 15, 3, 7, 12, 20], 3);

// Test 7: Search for a leaf node (rightmost)
runTest([10, 5, 15, 3, 7, 12, 20], 20);

// Test 8: Value smaller than all nodes in tree
runTest([10, 5, 15, 3, 7, 12, 20], 1);

// Test 9: Value larger than all nodes in tree
runTest([10, 5, 15, 3, 7, 12, 20], 25);

// Test 10: Two-node tree (left child only)
runTest([5, 2], 2);

// Test 11: Deeper tree - search in middle level
runTest([50, 25, 75, 10, 30, 60, 90, 5, 15, 28, 35], 30);

// Test 12: Large values within constraints (up to 10^7)
runTest([5000000, 2500000, 7500000, 1000000, 3500000], 7500000);
