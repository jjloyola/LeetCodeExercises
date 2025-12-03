/**LeetCode - Remove Duplicates from Sorted Array
 * 
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order 
 * of the elements should be kept the same.

 * Consider the number of unique elements in nums to be k​​​​​​​​​​​​​​. After removing duplicates, return the number of unique elements k.

 * The first k elements of nums should contain the unique numbers in sorted order. The remaining elements beyond index k - 1 can be ignored.

 * Custom Judge:

 * The judge will test your solution with the following code:

 * int[] nums = [...]; // Input array
 * int[] expectedNums = [...]; // The expected answer with correct length
 * 
 * int k = removeDuplicates(nums); // Calls your implementation
 * 
 * assert k == expectedNums.length;
 * for (int i = 0; i < k; i++) {
 *     assert nums[i] == expectedNums[i];
 * }
 * If all assertions pass, then your solution will be accepted.
 * 
 * Example 1:
 *  Input: nums = [1,1,2]
 *  Output: 2, nums = [1,2,_]
 *  Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
 *  It does not matter what you leave beyond the returned k (hence they are underscores).
 *  
 * Example 2:
 *  Input: nums = [0,0,1,1,1,2,2,3,3,4]
 *  Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 *  Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
 *  It does not matter what you leave beyond the returned k (hence they are underscores).
 * 
 * Constraints:
 *  1 <= nums.length <= 3 * 104
 *  -100 <= nums[i] <= 100
 *  nums is sorted in non-decreasing order.
 * */

/**
 *
 * @param {number[]} nums Array of numbers in non-decreasing order with duplicates
 * @returns {number} Number of unique elements k
 */
function removeDuplicates(nums) {
  let k = 0;

  let i = 0,
    insertPosition = 0;

  while (i < nums.length) {
    // console.log(`ref=nums[${i}]=${nums[i]}`);
    let ref = nums[i++];

    // console.log(`insertPosition=${insertPosition}`);
    nums[insertPosition++] = ref;
    k++;
    // console.log(`k = ${k}`);

    while (i < nums.length && nums[i] === ref) {
      //move i to the next position until we find a different number
      i++;
    }
  }

  while (insertPosition < nums.length) nums[insertPosition++] = -1111;

  console.log(nums, k);

  return k;
}

function removeDuplicates2(nums) {
  let i = 0,
    insertPosition = 0;

  while (i < nums.length) {
    // console.log(`insertPosition=${insertPosition}`);
    nums[insertPosition] = nums[i];
    i++;
    insertPosition++;
    // console.log(`k = ${k}`);

    while (i < nums.length && nums[i] === nums[insertPosition - 1]) {
      //move i to the next position until we find a different number
      i++;
    }
  }

  console.log(nums, insertPosition);

  return insertPosition;
}

/**
 *
 * @param {number[]} nums
 * @param {number[]} expectedNums
 * @param {number} testNumber Only relevant to print test number
 */
function runTest(nums, expectedNums, testNumber) {
  /** int[] nums = [...]; // Input array
   * int[] expectedNums = [...]; // The expected answer with correct length
   *
   * int k = removeDuplicates(nums); // Calls your implementation
   *
   * assert k == expectedNums.length;
   *
   * for (int i = 0; i < k; i++) {
   *     assert nums[i] == expectedNums[i];
   * } */

  console.log(`Test ${testNumber}: nums: ${nums}`);

  let k = removeDuplicates(nums);

  if (k !== expectedNums.length) {
    console.log(`Incorrect 🚫: k=${k}, expected=${expectedNums.length}`);
    return false;
  }

  console.log(`Correct: k = ${k} = expected`);

  for (let i = 0; i < k; i++) {
    if (nums[i] !== expectedNums[i]) {
      console.log(
        `Incorrect 🚫: nums[${i}]=${nums[i]} !== expectedNums[${i}]=${expectedNums[i]}`
      );
      return false;
    }
  }

  console.log(`CORRECT SOLUTION!! 🎉🎉🎉`);
  return true;
}

runTest([1, 1, 2], [1, 2], 1);
runTest([0, 0, 1, 1, 1, 2, 2, 3, 3, 4], [0, 1, 2, 3, 4], 2);

// Test 3: Array with single element (minimum length)
runTest([5], [5], 3);

// Test 4: Array with all same elements
runTest([-50, -50, -50, -50], [-50], 4);

// Test 5: Array with no duplicates
runTest([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], 5);

// Test 6: Array with negative numbers
runTest([-100, -100, -50, -50, -25, -25, -1], [-100, -50, -25, -1], 6);

// Test 7: Array with negative, zero, and positive numbers
runTest([-10, -10, -5, 0, 0, 0, 5, 10, 10], [-10, -5, 0, 5, 10], 7);

// Test 8: Array with boundary values (-100 to 100)
runTest([-100, -100, -99, 0, 0, 99, 100, 100], [-100, -99, 0, 99, 100], 8);

// Test 9: Array with multiple duplicates of different numbers
runTest([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4], [1, 2, 3, 4], 9);

// Test 10: Array with pattern of two duplicates
runTest([-20, -20, -10, -10, 0, 0, 10, 10, 20, 20], [-20, -10, 0, 10, 20], 10);
