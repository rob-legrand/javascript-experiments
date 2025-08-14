/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/kilaqivehe/edit?js,console
// old: https://jsbin.com/jetopakuwa/edit?js,console
// older: https://jsbin.com/buracomula/edit?js,console
// older: https://jsbin.com/hosiremilo/edit?js,console
// older: https://jsbin.com/qidikiquju/edit?js,console
// older: https://jsbin.com/mudamefaku/edit?js,console
// my solutions to Zirak's js-questions:
//    https://zirak.me/js-questions/
//    https://github.com/Zirak/js-questions

(function () {
   'use strict';

   // check recursively whether two values are deeply equal,
   // even if arrays or objects
   const isDeeplyEqualTo = (thing1, thing2) => (
      Array.isArray(thing1)
      ? (
         Array.isArray(thing2) && thing1.length === thing2.length
         && thing1.every(
            (value, index) => isDeeplyEqualTo(value, thing2[index])
         )
      )
      : typeof thing1 === 'object'
      ? (
         typeof thing2 === 'object' && !Array.isArray(thing2)
         && Object.keys(thing1).length === Object.keys(thing2).length
         && Object.keys(thing1).every(
            (propertyName) => (
               Object.hasOwn(thing2, propertyName)
               && isDeeplyEqualTo(
                  thing1[propertyName],
                  thing2[propertyName]
               )
            )
         )
      )
      : thing1 === thing2
   );

   // print values if not deeply equal to each other
   const assertDeepEquality = function (thing1, thing2) {
      if (!isDeeplyEqualTo(thing1, thing2)) {
         console.log({wrong: thing1, right: thing2});
      }
   };

   // an object to hold solution functions
   const box = {};

   // return x squared
   box.square = (x) => x * x;

   assertDeepEquality(box.square(2), 4);
   assertDeepEquality(box.square(4), 16);
   assertDeepEquality(box.square(1.5), 2.25);
   assertDeepEquality(box.square(-12), 144);
   assertDeepEquality(box.square(-1.5), 2.25);
   assertDeepEquality(box.square(0), 0);
   assertDeepEquality(box.square(-2), 4);
   assertDeepEquality(box.square(-4), 16);
   assertDeepEquality(box.square(12), 144);
   assertDeepEquality(box.square(-1e10), 1e20);
   assertDeepEquality(box.square(1e10), 1e20);
   assertDeepEquality(box.square(Number.NEGATIVE_INFINITY), Number.POSITIVE_INFINITY);
   assertDeepEquality(box.square(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);

   // x is a string. turn lowercase letters to uppercase and vice versa.
   box.invertCase = (x) => [...x].map(
      (c) => (
         c === c.toUpperCase()
         ? c.toLowerCase()
         : c.toUpperCase()
      )
   ).join('');

   assertDeepEquality(box.invertCase('funkey monkey'), 'FUNKEY MONKEY');
   assertDeepEquality(box.invertCase('MONKEY MAGIC'), 'monkey magic');
   assertDeepEquality(box.invertCase('FlIrPyDuck'), 'fLiRpYdUCK');
   assertDeepEquality(box.invertCase(''), '');

   // sum the digits of the number x
   box.sumDigits = (x) => [
      ...x.toString()
   ].map(
      (c) => Number(c) || 0
   ).reduce(
      (s, n) => s + n,
      0
   );

   assertDeepEquality(box.sumDigits(2), 2);
   assertDeepEquality(box.sumDigits(412), 7);
   assertDeepEquality(box.sumDigits(8.19), 18);
   assertDeepEquality(box.sumDigits(4.12), 7);
   assertDeepEquality(box.sumDigits(0), 0);
   assertDeepEquality(box.sumDigits(-14), 5);
   assertDeepEquality(box.sumDigits(-1.4), 5);

   // x is an arbitrarily nested, multidimensional array.
   // return x flattened (all items in 1 dimension)
   box.flatten = (x) => x.flat(Number.POSITIVE_INFINITY);

   assertDeepEquality(box.flatten([]), []);
   assertDeepEquality(box.flatten([0, 1, 2]), [0, 1, 2]);
   assertDeepEquality(box.flatten([[], 0, [1]]), [0, 1]);
   assertDeepEquality(box.flatten([0, [[[[[1, [2]]]]], 3], [4, [5]]]), [0, 1, 2, 3, 4, 5]);
   assertDeepEquality(
      box.flatten([[[[[[[[[[[[[[[1], 2], 3], 4], 5], 6], 7], 8], 9]]]]]]]),
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
   );
   assertDeepEquality(
      box.flatten([[[[[[[[[[[[[[[[[1], 2]], 3]], 4]], 5]], 6]], 7]], 8]], 9]]),
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
   );
   assertDeepEquality(
      box.flatten([1, [[2, [[3, [[4, [5, 6]], 7]], 8]], 9]]),
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
   );

   // x is a string. return whether its parentheses are balanced
   // that is, whether every opening ( has a closing )
   box.isBalanced = (x) => [...x].reduce(
      (s, c) => (
         c === '('
         ? s + 1
         : c !== ')'
         ? s
         : s > 0
         ? s - 1
         : undefined
      ),
      0
   ) === 0;

   assertDeepEquality(box.isBalanced(''), true);
   assertDeepEquality(box.isBalanced('('), false);
   assertDeepEquality(box.isBalanced('()'), true);
   assertDeepEquality(box.isBalanced('(1)'), true);
   assertDeepEquality(box.isBalanced(')('), false);
   assertDeepEquality(box.isBalanced('())(()'), false);
   assertDeepEquality(box.isBalanced('((a()b)c(l(pnq))())'), true);
   assertDeepEquality(box.isBalanced('((a()b)c(l(pnq))()'), false);

   // x is an array of numbers. return whether there is an index where the sum
   // before (excluding) it is equal to the sum after (including) it.
   box.hasBalancePoint = (x) => [...x, 0].some(
      (ignore, index) => x.slice(0, index).reduce(
         (s, n) => s + n,
         0
      ) === x.slice(index).reduce(
         (s, n) => s + n,
         0
      )
   );

   assertDeepEquality(box.hasBalancePoint([]), true);
   assertDeepEquality(box.hasBalancePoint([0]), true);
   assertDeepEquality(box.hasBalancePoint([42, 6, 19, 11, 11, 7]), true);
   assertDeepEquality(box.hasBalancePoint([1, 2]), false);
   assertDeepEquality(box.hasBalancePoint([1, 1, 1, 1, 2, 1, 1, 1, 1]), false);
   assertDeepEquality(box.hasBalancePoint([1, 1, 1, 1, 1, 2, 1, 1, 1]), true);

   // x is an array of at least 1 item.
   // return the most frequent item (there won't be collisions)
   box.mode = function (x) {
      const freqs = x.map(
         (item) => x.filter(
            (otherItem) => otherItem === item
         ).length
      );
      const maxFreq = Math.max(...freqs);
      return x[
         freqs.findIndex(
            (freq) => freq >= maxFreq
         )
      ];
   };

   assertDeepEquality(box.mode([0]), 0);
   assertDeepEquality(box.mode([0, 1, 1, 2]), 1);
   assertDeepEquality(box.mode([{}, 0, [1], 'foo', true, false, null, true]), true);
   assertDeepEquality(box.mode([4, 3, 2, 1, 4, 1, 2, 3, 4]), 4);
   assertDeepEquality(box.mode(['m', true, true, 9, 9, 9, 'm', 1, 'x']), 9);
   assertDeepEquality(box.mode([76, 76, 76, 76, 76, 98, 98, 98, 98, 98, 98]), 98);

   // x is an array of at least 2 unique members
   // return 0 if it's not sorted, 1 if it's ascending, -1 if it's descending
   box.sortingType = function sortingType(x) {
      let isAsc = true;
      let isDesc = true;
      x.forEach(function (left, index) {
         x.slice(index + 1).forEach(function (right) {
            if (left < right) {
               isDesc = false;
            } else if (left > right) {
               isAsc = false;
            }
         });
      });
      return (
         isAsc
         ? 1
         : isDesc
         ? -1
         : 0
      );
   };

   assertDeepEquality(box.sortingType([0, 1]), 1);
   assertDeepEquality(box.sortingType([-1, 4, 2]), 0);
   assertDeepEquality(box.sortingType([10, 1, 100]), 0);
   assertDeepEquality(box.sortingType([0, -1, -100]), -1);
   assertDeepEquality(box.sortingType([-2, 4, 10, 19]), 1);
   assertDeepEquality(box.sortingType([1, 11, 101]), 1);
   assertDeepEquality(box.sortingType([101, 11, 1]), -1);
   assertDeepEquality(box.sortingType([14, -2, 1.5]), 0);
   assertDeepEquality(box.sortingType([18, 18.1, 19]), 1);
   assertDeepEquality(box.sortingType([0.9, 0.4, -0.1, -0.12, -1]), -1);
   assertDeepEquality(box.sortingType([0, 1, 1, 1, 1, 1]), 1);
   assertDeepEquality(box.sortingType([1, 1, 1, 1, 1, 1]), 0);
   assertDeepEquality(box.sortingType([1, 1, 1, 1, 1, 2]), 1);
   assertDeepEquality(box.sortingType([2, 1, 1, 1, 1, 2]), 0);
   assertDeepEquality(box.sortingType([2, 1, 1, 1, 1, 1]), -1);

   console.log('TESTS COMPLETED');
}());
