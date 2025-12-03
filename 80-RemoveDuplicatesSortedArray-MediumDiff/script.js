/**LeetCode - Remove Duplicates from Sorted Array II

Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the 
elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. 
More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you 
leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

 

Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
 

Constraints:

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
nums is sorted in non-decreasing order.
*/

/**
 *
 * @param {number[]} nums Array of numbers in non-decreasing order with duplicates
 * @returns {number} Number of unique elements k
 */
function removeDuplicates(nums) {
  let insertPosition = 0,
    count = 1; //first element is always the first occurrence of it's type

  /*
  ref    i   count    nums
  0    0     1        [1ri,1,1,2,2,3]    
  1    1     2        [1,1ri,1,2,2,3]    
  2    2     3        [1,1,1ri,2,2,3]    
  3    2     1        [1,1,1i,2r,2,3]
  4    3     2        [1,1,2,2i,2r,3]
  5    4     1        [1,1,2,2,3,3ir]
  
  */

  if (nums.length <= 2) return nums.length;

  //Checks each element of the array, first element always is kept
  for (let ref = 0; ref < nums.length; ref++) {
    //First check if the current number has been repeated
    if (count <= 2) {
      //I have to keep this nuber, should I move it?
      if (ref > insertPosition) {
        nums[insertPosition] = nums[ref];
      }

      //leave it, move to next num
      insertPosition++;
    }

    if (ref < nums.length - 1 && nums[ref] === nums[ref + 1]) {
      count++;
    } else {
      count = 1;
    }
  }

  //console.log("modified nums", nums);
  return insertPosition;
}

/**
 *
 * @param {number[]} nums Array of numbers in non-decreasing order with duplicates
 * @returns {number} Number of unique elements k
 */
let removeDuplicates2 = function (nums) {
  if (nums.length <= 2) return nums.length;

  //first two elements always is kept
  let insertPosition = 2;

  for (let ref = 2; ref < nums.length; ref++) {
    if (nums[ref] !== nums[insertPosition - 2]) {
      nums[insertPosition] = nums[ref];
      insertPosition++;
    }
  }

  return insertPosition;
};

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

  let k = removeDuplicates2(nums);

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

runTest(
  (nums = [1, 1, 1, 2, 2, 3]),
  (expectedNums = [1, 1, 2, 2, 3]),
  (testNumber = 1)
);

runTest(
  (nums = [0, 0, 1, 1, 1, 1, 2, 3, 3]),
  (expectedNums = [0, 0, 1, 1, 2, 3, 3]),
  (testNumber = 2)
);

// Test 3: All numbers are unique
runTest(
  (nums = [0, 1, 2, 3, 4, 5]),
  (expectedNums = [0, 1, 2, 3, 4, 5]),
  (testNumber = 3)
);

//Test 4: All numbers are the same
runTest(
  (nums = [1, 1, 1, 1, 1, 1, 1, 1]),
  (expectedNums = [1, 1]),
  (testNumber = 4)
);

//Test 5: One element
runTest((nums = [1]), (expectedNums = [1]), (testNumber = 5));

//Test 6: Two diff elements
runTest((nums = [1, 2]), (expectedNums = [1, 2]), (testNumber = 6));

//Test 7: Two equal elements
runTest((nums = [5, 5]), (expectedNums = [5, 5]), (testNumber = 7));

// Test 8: Negative numbers
runTest(
  (nums = [-5, -5, -3, -3, -3, -1, -1]),
  (expectedNums = [-5, -5, -3, -3, -1, -1]),
  (testNumber = 8)
);

// Test 9: Mix of negative and positive numbers
runTest(
  (nums = [-2, -2, -2, 0, 0, 0, 1, 1, 1]),
  (expectedNums = [-2, -2, 0, 0, 1, 1]),
  (testNumber = 9)
);

// Test 10: Edge case - maximum negative value
runTest(
  (nums = [-10000, -10000, -10000, -5000, -5000]),
  (expectedNums = [-10000, -10000, -5000, -5000]),
  (testNumber = 10)
);

// Test 11: Edge case - maximum positive value
runTest(
  (nums = [5000, 5000, 10000, 10000, 10000]),
  (expectedNums = [5000, 5000, 10000, 10000]),
  (testNumber = 11)
);

// Test 12: Pattern with three occurrences then two occurrences
runTest(
  (nums = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4]),
  (expectedNums = [1, 1, 2, 2, 3, 3, 4, 4]),
  (testNumber = 12)
);

// Test 13: Only two unique elements, both repeated many times
runTest(
  (nums = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2]),
  (expectedNums = [1, 1, 2, 2]),
  (testNumber = 13)
);

// Test 14: Zeros
runTest((nums = [0, 0, 0, 0]), (expectedNums = [0, 0]), (testNumber = 14));

// Test 15: Three elements, all same
runTest((nums = [7, 7, 7]), (expectedNums = [7, 7]), (testNumber = 15));

// Test 16: Alternating pattern
runTest(
  (nums = [1, 1, 2, 2, 3, 3, 4, 4]),
  (expectedNums = [1, 1, 2, 2, 3, 3, 4, 4]),
  (testNumber = 16)
);
