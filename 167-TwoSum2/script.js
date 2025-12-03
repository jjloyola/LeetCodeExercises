/**167. Two Sum II - Input Array Is Sorted
Medium

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that 
they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 
1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

Example 1:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
Example 2:

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
Example 3:

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
 

Constraints:

2 <= numbers.length <= 3 * 104
-1000 <= numbers[i] <= 1000
numbers is sorted in non-decreasing order.
-1000 <= target <= 1000

The tests are generated such that there is exactly one solution.
 */

/**
 * @param {number[]} nums - Array of numbers
 * @param {number} target - Target sum
 * @returns {number[]} Indices of the two numbers that sum = target */
var twoSum2 = function (nums, target) {
  /**
   * Example.
   * numbers = [1, 3, 8, 12, 15, 17, 25], target = 25
   *                  i          j
   * 1+25 = 26 > target -> num grande es muy grande, move j
   * 1+17 = 18 < target -> num pequeño no alcanza, move i
   * 3+17 = 20 < target -> num peq no alcanza, move i
   * 8+17 = 25 -> found!
   *
   * Example.
   * numbers = [-40, -32, -24, -17, -11, -5, 0, 4, 10, 18, 27, 38, 50, 65]. target = 4
   *                        i                               j
   * -40+65 = 25 > target -> move j
   * -40+50 = 10 > target -> move j
   * -40+38 = -2 < target -> move i
   * -32+38 = 6 > target -> move j
   * -32+27 = -5 < target -> move i
   * -24+27 = 3 ...
   */

  let i = 0,
    j = nums.length - 1;

  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i + 1, j + 1]; //indexes in base 1
    if (sum < target) i++;
    else j--;
  }
};

/**
 *
 * @param {number[]} nums
 * @param {number} val
 * @param {number[]} expectedNums
 */
function runTest(nums, target, testName) {
  console.log(`${testName}: nums: [${nums}] - target: ${target}`);

  const result = twoSum2(nums, target);
  console.log(`result (base 1)=[${result}]`);

  //change to base 0
  result[0]--;
  result[1]--;

  const sum = nums[result[0]] + nums[result[1]];

  if (sum !== target) {
    console.log(
      `Incorrect 🚫: result=[${result}], summing=${nums[result[0]]}+${
        nums[result[1]]
      }, sum=${sum}, target=${target}`
    );
    return false;
  }

  console.log(
    `CORRECT SOLUTION!! 🎉🎉🎉 result=[${result}], summing=${nums[result[0]]}+${
      nums[result[1]]
    }, sum=${sum}, target=${target}`
  );
  return true;
  // for (int i = 0; i < actualLength; i++) {
  //   assert nums[i] == expectedNums[i];
}

/** RUN TESTS */

// Test 1 - Example from problem
runTest((nums = [2, 7, 11, 15]), (target = 9), "Test 1 - Base Example");
// output [1,2], because numbers[1] + numbers[2] = 2 + 7 = 9

// Test 2 - Example from problem
runTest((nums = [2, 3, 4]), (target = 6), "Test 2 - Base Example");
// output [1,3], because numbers[1] + numbers[3] = 2 + 4 = 6

// Test 3 - Example from problem (negative numbers)
runTest((nums = [-1, 0]), (target = -1), "Test 3 - Negative and Zero");
// output [1,2], because numbers[1] + numbers[2] = -1 + 0 = -1

// Test 4 - Duplicates
runTest((nums = [1, 3, 3, 5, 8]), (target = 6), "Test 4 - Duplicates");
// output [2,3], because numbers[2] + numbers[3] = 3 + 3 = 6

// Test 5 - All negative numbers
runTest(
  (nums = [-10, -5, -3, -1]),
  (target = -8),
  "Test 5 - All Negative Numbers"
);
// output [2,3], because numbers[2] + numbers[3] = -5 + (-3) = -8

// Test 6 - Zero sum with negatives and positives
runTest((nums = [-4, -2, 0, 2, 5]), (target = 0), "Test 6 - Zero Sum");
// output [2,4], because numbers[2] + numbers[4] = -2 + 2 = 0

// Test 7 - Longer array, target at extremes
runTest(
  (nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  (target = 11),
  "Test 7 - First and Last"
);
// output [1,10], because numbers[1] + numbers[10] = 1 + 10 = 11

// Test 8 - Longer array, target in middle
runTest(
  (nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  (target = 19),
  "Test 8 - Last Two Elements"
);
// output [9,10], because numbers[9] + numbers[10] = 9 + 10 = 19

// Test 9 - Large numbers at boundary constraints
runTest(
  (nums = [-1000, -500, 0, 500, 1000]),
  (target = 0),
  "Test 9 - Boundary Values"
);
// output [1,5], because numbers[1] + numbers[5] = -1000 + 1000 = 0

// Test 10 - Minimum array length
runTest((nums = [5, 12]), (target = 17), "Test 10 - Minimum Length");
// output [1,2], because numbers[1] + numbers[2] = 5 + 12 = 17

// Test 11 - Solution at indices 3 and 6 (7 elements, 1-indexed)
runTest(
  (nums = [1, 3, 8, 12, 15, 17, 25]),
  (target = 25),
  "Test 11 - Middle Indices [3,6]"
);
// output [3,6], because numbers[3] + numbers[6] = 8 + 17 = 25

// Test 12 - Mixed neg/pos (10 elements), solution at middle indices [5,6]
runTest(
  (nums = [-25, -18, -12, -7, -2, 3, 9, 16, 24, 35]),
  (target = 1),
  "Test 12 - Mixed Neg/Pos Middle [5,6]"
);
// output [5,6], because numbers[5] + numbers[6] = -2 + 3 = 1

// Test 13 - Mixed neg/pos (12 elements), solution at middle indices [6,7]
runTest(
  (nums = [-30, -22, -15, -9, -4, 1, 5, 12, 20, 29, 40, 52]),
  (target = 6),
  "Test 13 - Mixed Neg/Pos Middle [6,7]"
);
// output [6,7], because numbers[6] + numbers[7] = 1 + 5 = 6

// Test 14 - Mixed neg/pos (14 elements), solution at middle indices [7,8]
runTest(
  (nums = [-40, -32, -24, -17, -11, -5, 0, 4, 10, 18, 27, 38, 50, 65]),
  (target = 4),
  "Test 14 - Mixed Neg/Pos Middle [7,8]"
);
// output [7,8], because numbers[7] + numbers[8] = 0 + 4 = 4

// Test 15 - Mixed neg/pos (10 elements), negative target, solution [4,5]
runTest(
  (nums = [-50, -35, -20, -8, -3, 2, 15, 28, 42, 60]),
  (target = -11),
  "Test 15 - Mixed Neg/Pos Negative Target [4,5]"
);
// output [4,5], because numbers[4] + numbers[5] = -8 + (-3) = -11

// Test 16 - Mixed neg/pos (12 elements), wider middle gap [5,8]
runTest(
  (nums = [-45, -30, -18, -10, -4, 1, 6, 14, 23, 35, 48, 63]),
  (target = 10),
  "Test 16 - Mixed Neg/Pos Wider Middle [5,8]"
);
// output [5,8], because numbers[5] + numbers[8] = -4 + 14 = 10

// Test 17 - Mixed neg/pos (10 elements), asymmetric middle [4,7]
runTest(
  (nums = [-38, -25, -14, -6, 0, 3, 11, 20, 32, 47]),
  (target = 5),
  "Test 17 - Mixed Neg/Pos Asymmetric [4,7]"
);
// output [4,7], because numbers[4] + numbers[7] = -6 + 11 = 5
