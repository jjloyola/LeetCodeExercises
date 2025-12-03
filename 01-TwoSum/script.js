/**LeetCode - 01 - Two Sum
Easy

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not 
use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
Assume that each input would have exactly one solution, and you may not 
use the same element twice.
 

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?>
 */

/**
 * @param {number[]} nums - Array of numbers
 * @param {number} target - Target sum
 * @returns {number[]} Indices of the two numbers that sum = target */
var twoSum = function (nums, target) {
  /** Runtime 2 ms - Beats 69.47%
   *  Memory 57.40 MB - Beats 33.10%
   */

  //console.log(`nums = ${nums}, target = ${target}`);
  //nums = [2,7,11,15], target = 9

  /*hashTable element num: i contains the complement number num that, if found and summed to the already visited number in index i, 
  will result in target
  {
    target-val: i,
    7: 0 <-- index of 2
    2: 1
  }
  */

  let hashTable = {};

  for (let i = 0; i < nums.length; i++) {
    //i=1
    const val = nums[i]; //val=7
    //console.log(`hashTable[${val}] = ${hashTable[val]}`);

    //if (hashTable[val] != undefined) {
    if (val in hashTable) {
      // console.log(
      //   `Match found! ${nums[hashTable[val]]}+${nums[i]} = target = ${target}`
      // );
      //console.log(hashTable);
      return [hashTable[val], i]; //[0,1]
    }

    hashTable[target - val] = i; //Number target-val=7 must be summed with the value in num[i]=2
  }
  //a solution will be found, no additional return needed
};

/**
 * @param {number[]} nums - Array of numbers
 * @param {number} target - Target sum
 * @returns {number[]} Indices of the two numbers that sum = target */
var twoSumOld = function (nums, target) {
  /** Runtime 103 ms - Beats 6.50%
   *  Memory 56.34 MB - Beats 52.56%
   */

  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total = nums.at(i);
    //console.log(`nums[${i}]=${nums[i]}`);
    for (let j = i + 1; j < nums.length; j++) {
      //console.log(`-- nums[${j}]=${nums[j]}`);
      if (total + nums.at(j) === target) return [i, j];
    }
    total = 0;
  }

  return [];
};

/**
 *
 * @param {number[]} nums
 * @param {number} val
 * @param {number[]} expectedNums
 */
function runTest(nums, target, testName) {
  console.log(`${testName}: nums: [${nums}] - target: ${target}`);

  const result = twoSumOld(nums, target);
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

runTest((nums = [2, 7, 11, 15]), (target = 9), "Test 1 - Base Test"); //output [0,1], because nums[0] + nums[1] == 9
runTest((nums = [3, 2, 4]), (target = 6), "Test 2 - Base Test"); //output [1,2], because nums[1] + nums[2] == 6
runTest((nums = [3, 3]), (target = 6), "Test 3 - Base Test"); //output [0,1]
runTest(
  (nums = [-1, -2, -3, -4, -5]),
  (target = -8),
  "Test 4 - Negative Numbers"
); //output [2,4], because nums[2] + nums[4] == -8
runTest((nums = [0, 4, 3, 0]), (target = 0), "Test 5 - Zero Sum"); //output [0,3], because nums[0] + nums[3] == 0
runTest(
  (nums = [-3, 4, 3, 90]),
  (target = 0),
  "Test 6 - Negative and Positive"
); //output [0,2], because nums[0] + nums[2] == 0
runTest(
  (nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  (target = 19),
  "Test 7 - Longer Array"
); //output [8,9], because nums[8] + nums[9] == 19
runTest(
  (nums = [100000000, -100000000]),
  (target = 0),
  "Test 8 - Large Numbers"
); //output [0,1], because nums[0] + nums[1] == 0
runTest((nums = [5, 75, 25]), (target = 100), "Test 9 - Target 100"); //output [1,2], because nums[1] + nums[2] == 100
runTest(
  (nums = [1, 5, 5, 11]),
  (target = 10),
  "Test 10 - Duplicates Non-consecutive"
); //output [1,2], because nums[1] + nums[2] == 10
runTest(
  (nums = [-10, -1, -18, -19]),
  (target = -19),
  "Test 11 - Negative Target"
); //output [1,2], because nums[1] + nums[2] == -19
runTest((nums = [0, 1]), (target = 1), "Test 12 - Minimum Array Length"); //output [0,1], because nums[0] + nums[1] == 1
runTest(
  (nums = [
    230, 863, 916, 585, 981, 404, 316, 785, 88, 12, 70, 435, 384, 778, 887, 755,
    740, 337, 86, 92, 325, 422, 815, 650, 920, 125, 277, 336, 221, 847, 168, 23,
    677, 61, 400, 136, 874, 363, 394, 199, 863, 997, 794, 587, 124, 321, 212,
    957, 764, 173, 314, 422, 927, 783, 930, 282, 306, 506, 44, 926, 691, 568,
    68, 730, 933, 737, 531, 180, 414, 751, 28, 546, 60, 371, 493, 370, 527, 387,
    43, 541, 13, 457, 328, 227, 652, 365, 430, 803, 59, 858, 538, 427, 583, 368,
    375, 173, 809, 896, 370, 789,
  ]),
  (target = 542),
  "Test 13 - Large Array"
); //output varies, two numbers that sum to 542
