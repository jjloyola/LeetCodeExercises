/**LeetCode - 2620. Counter

Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

Example 1:

Input: 
n = 10 
["call","call","call"]
Output: [10,11,12]
Explanation: 
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.

Example 2:

Input: 
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.
 

Constraints:

-1000 <= n <= 1000
0 <= calls.length <= 1000
calls[i] === "call" */

/**
 * Conceptos clave:
 * - Un closure es una función junto con su entorno léxico (lexical environment), que incluye todas las variables
 * del scope externo accesibles en el momento de su creación.
 * - Lexical Scope: la función interna accede a variables del scope donde fue definida, no donde se ejecuta.
 * - Persistencia: el closure mantiene el contexto externo mientras exista una referencia a la función interna.
 * - Estado privado: prev no es accesible desde fuera, solo desde la función retornada.
 * En resumen: la función retornada mantiene una referencia al scope de createCounter,
 * por eso puede acceder a prev en llamadas posteriores. Es el mecanismo de closures de JavaScript.
 */

/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  let prev = n;
  return function () {
    return prev++;
  };
};

const counter = createCounter(10);
console.log(counter()); // 10
console.log(counter()); // 11
console.log(counter()); // 12

const counter2 = createCounter(20);
counter();
