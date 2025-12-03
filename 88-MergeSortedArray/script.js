/**
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.


Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
Example 2:

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
Example 3:

Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
 

Constraints:

nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-109 <= nums1[i], nums2[j] <= 109
 

Follow up: Can you come up with an algorithm that runs in O(m + n) time?
 */

/**Hint 1
You can easily solve this problem if you simply think about two elements at a time rather than 
two arrays. We know that each of the individual arrays is sorted. What we don't know is how they 
will intertwine. Can we take a local decision and arrive at an optimal solution? */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // console.log("nums1", nums1, "nums2", nums2);
  //Base cases

  if (n === 0) return; //result is num1

  const aux = nums1.slice(0, m);
  // console.log("aux", aux);

  let i = 0, //pointer to traverse aux
    j = 0, //pointer to traverse nums2
    k = 0; //pointer to replace values in num1

  // console.log("i", "j", "k");
  while (i < m && j < n && k < m + n) {
    // console.log(i, j, k);
    nums1[k++] = aux[i] < nums2[j] ? aux[i++] : nums2[j++];
  }

  while (k < m + n) {
    // console.log(".", i, j, k);
    nums1[k++] = i < m ? aux[i++] : nums2[j++];
  }

  // console.log("-", i, j, k);

  return;
};

/** Three pointers
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge2 = function (nums1, m, nums2, n) {
  let p1 = m - 1, //starting from the last sortable item in nums1
    p2 = n - 1, //starting at the end of nums2
    p = m + n - 1; //starting at the end of nums1, where we'll introduce the new numbers

  while (p1 >= 0 && p2 >= 0) {
    nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--];
  }

  //While nums2 has numbers left, introduce them in nums1
  while (p2 >= 0 && p >= 0) {
    nums1[p--] = nums2[p2--];
  }

  //If nums1 has numbers left, they're already in place
};

/**
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {boolean}
 */
function arrayCompare(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (i in arr1) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

function runTest(testNumber, testMethod, nums1, m, nums2, n, expectedResult) {
  testMethod(nums1, m, nums2, n);
  console.log(
    `Test Case ${testNumber} - Expected:`,
    expectedResult,
    "Result:",
    nums1,
    "Correct?:",
    arrayCompare(expectedResult, nums1)
  );
}

let testMethod = merge2; //CHANGE THIS TO TEST OTHER VERSION

// -- CASE1
runTest(1, testMethod, [1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3, [1, 2, 2, 3, 5, 6]);

// -- CASE 2
runTest(2, testMethod, [1], 1, [], 0, [1]);

// -- CASE 3
runTest(3, testMethod, [0], 0, [1], 1, [1]);

// -- TEST CASE 4: All elements from nums2 are smaller than nums1
// Expected: All nums2 elements should appear first
runTest(4, testMethod, [4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3, [1, 2, 3, 4, 5, 6]);

// -- TEST CASE 5: All elements from nums1 are smaller than nums2
// Expected: All nums1 elements should appear first
runTest(5, testMethod, [1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3, [1, 2, 3, 4, 5, 6]);

// -- TEST CASE 6: Arrays with negative numbers
// Expected: Proper sorting with negative values
runTest(
  6,
  testMethod,
  [-3, -1, 2, 0, 0, 0],
  3,
  [-5, -2, 4],
  3,
  [-5, -3, -2, -1, 2, 4]
);

// -- TEST CASE 7: Single element in each array
// Expected: Simple merge of two single elements
runTest(7, testMethod, [2, 0], 1, [1], 1, [1, 2]);

// -- TEST CASE 8: Larger array with mixed values
// Expected: Proper interleaving of elements
runTest(
  8,
  testMethod,
  [1, 3, 5, 7, 9, 0, 0, 0, 0],
  5,
  [2, 4, 6, 8],
  4,
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
);
