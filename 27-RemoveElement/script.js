/**LeetCode - RemoveElement
 *
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
 * The order of the elements may be changed. Then return the number of elements in nums which
 * are not equal to val.
 *
 * Consider the number of elements in nums which are not equal to val be k, to get accepted,
 * you need to do the following things:
 *
 * - Change the array nums such that the first k elements of nums contain the elements which
 * are not equal to val. The remaining elements of nums are not important as well as the size
 * of nums.
 * - Return k.
 *
 * Custom Judge:
 *
 * The judge will test your solution with the following code:
 *
 *      int[] nums = [...]; // Input array
 *      int val = ...; // Value to remove
 *      int[] expectedNums = [...]; // The expected answer with correct length.
 *                                  // It is sorted with no values equaling val.
 *
 *      int k = removeElement(nums, val); // Calls your implementation
 *
 *      assert k == expectedNums.length;
 *      sort(nums, 0, k); // Sort the first k elements of nums
 *      for (int i = 0; i < actualLength; i++) {
 *          assert nums[i] == expectedNums[i];
 *      }
 *
 * If all assertions pass, then your solution will be accepted.
 *
 * Example 1:
 *
 * Input: nums = [3,2,2,3], val = 3
 * Output: 2, nums = [2,2,_,_]
 * Explanation: Your function should return k = 2, with the first two elements of nums being 2.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Example 2:
 *
 * Input: nums = [0,1,2,2,3,0,4,2], val = 2
 * Output: 5, nums = [0,1,4,0,3,_,_,_]
 * Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
 * Note that the five elements can be returned in any order.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Constraints:
 *
 * 0 <= nums.length <= 100
 * 0 <= nums[i] <= 50
 * 0 <= val <= 100
 */

/**
 * @param {number[]} nums - Array of numbers
 * @param {number} val - Value to remove from nums
 * @returns {number} Number of elements in nums not equal to val. */
let removeElement = function (nums, val) {
  let k = 0; //Number of elements in nums not equal to val.

  let i = 0,
    j = nums.length - 1;
  /** Traverse the array from the start and from the end, and switch the removed values
   * to leave them at the end of the array
   */
  while (i <= j) {
    // console.log("i", i, "j", j);
    // console.log(`checking nums[${i}]=${nums[i]}`);

    if (nums[i] === val) {
      // console.log("-Target value FOUND!, DELETE and check where to move (j)");
      //delete num[i]
      nums[i] = -1;

      // console.log(`-checking nums[${j}]=${nums[j]}`);

      //Number to remove found!
      while (nums[j] === val) {
        //delete num[j] and check next position
        // console.log("--Target value FOUND!, DELETE and check next j");
        nums[j] = -1;
        j--;
        // console.log(`--checking nums[${j}]=${nums[j]}`);
      }

      // console.log(`-After while: i=${i}, j=${j}`);

      // console.log(`-Array: [${nums}]`);

      //Check if a switch is needed
      if (i < j) {
        // console.log(
        //   `--Move nums[${i}]=${nums[i]} to j=${j}, and nums[${j}]=${nums[j]} to i=${i}`
        // );

        nums[i] = nums[j];
        nums[j] = -1;

        // console.log(`--Array after switch: [${nums}]`);
        i++; //nums[i] was moved to j, check next i
        j--; //nums[j] was replaced for val in i, check next j

        k++; //k changes with i
      } else {
        // console.log(`---- Final array: [${nums}] - k=${k}`);
        return k;
      }
    } else {
      //nums[i] is not val, check next i
      i++;
      k++;
    }
  }

  console.log(`---- Final array: [${nums}] - k=${k}`);
  return k;
};

/**
 *
 * @param {number[]} nums
 * @param {number} val
 * @param {number[]} expectedNums
 */
function runTest(nums, val, expectedNums, testNumber) {
  console.log(`Test ${testNumber}: nums: ${nums} - val: ${val}`);

  let k = removeElement(nums, val);

  if (k !== expectedNums.length) {
    console.log(`Incorrect 🚫: k=${k}, expected=${expectedNums.length}`);
    return false;
  }

  console.log(`Correct: k = ${k} = expected`);

  let aux = nums.slice(0, k);
  // console.log("aux", aux);

  aux.sort();
  // console.log("aux sorted", aux);

  for (let i in nums) {
    if (aux[i] !== expectedNums[i]) {
      console.log(
        `Incorrect 🚫: nums[${i}]=${nums[i]} !== expectedNums[${i}]=${expectedNums[i]}`
      );
      return false;
    }
  }

  console.log(`CORRECT SOLUTION!! 🎉🎉🎉`);
  return true;
  // for (int i = 0; i < actualLength; i++) {
  //   assert nums[i] == expectedNums[i];
}

/** RUN TESTS */

// Test 1: Case from Example 1 - Basic case with val at beginning and end
runTest([3, 2, 2, 3], 3, [2, 2], 1);

// Test 2: Case from Example 2 - val scattered throughout the array
runTest([0, 1, 2, 2, 3, 0, 4, 2], 2, [0, 0, 1, 3, 4], 2);

// Test 3: Empty array - edge case testing minimum constraint (length = 0)
runTest([], 5, [], 3);

// Test 4: Single element equal to val - should remove the only element
runTest([7], 7, [], 4);

// Test 5: Single element different from val - should keep the only element
runTest([5], 3, [5], 5);

// Test 6: All elements equal to val - should remove everything
runTest([4, 4, 4, 4, 4], 4, [], 6);

// Test 7: No elements equal to val - should keep all elements
runTest([1, 2, 3, 4, 5], 6, [1, 2, 3, 4, 5], 7);

// Test 8: val at the beginning of array - tests pointer movement from start
runTest([9, 9, 9, 1, 2, 3], 9, [1, 2, 3], 8);

// Test 9: val at the end of array - tests pointer movement from end
runTest([1, 2, 3, 8, 8, 8], 8, [1, 2, 3], 9);

// Test 10: Alternating pattern with val - tests frequent switching
runTest([1, 5, 2, 5, 3, 5, 4], 5, [1, 2, 3, 4], 10);

// Test 11: Large array with boundary values (testing nums[i] <= 50)
runTest([0, 50, 25, 0, 50, 30, 0, 15, 50], 0, [15, 25, 30, 50, 50, 50], 11);

// Test 12: Multiple duplicates with val not present - tests with duplicates kept
runTest([1, 1, 2, 2, 3, 3], 5, [1, 1, 2, 2, 3, 3], 12);
