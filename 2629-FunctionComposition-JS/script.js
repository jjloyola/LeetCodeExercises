/**LeetCode - 2629. Function Composition

Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.

 

Example 1:

Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65

Example 2:

Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
Output: 1000
Explanation:
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000

Example 3:

Input: functions = [], x = 42
Output: 42
Explanation:
The composition of zero functions is the identity function
 

Constraints:

-1000 <= x <= 1000
0 <= functions.length <= 1000
all functions accept and return a single integer
*/

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    for (let i = -1; i >= functions.length * -1; i--) {
      x = functions.at(i)(x);
    }
    return x;
  };
};

let test = function (functions, x, expected) {
  console.log(`Testing functions:[${functions}], x: ${x}`);
  const fn = compose(functions);
  console.log(`Result: ${fn(x)}, Expected: ${expected}`);
};

//Example 1
test(
  (functions = [(x) => x + 1, (x) => x * x, (x) => 2 * x]),
  (x = 4),
  (expected = 65)
);

//Example 2
test([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x], 1, 1000);

//Example 3
test([(x) => x + 1, (x) => 2 * x], 4, 9);
