/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/madovaxuto/edit?js,console

(function () {
   'use strict';

   const lexLessThan = (a1, a2) => (
      Array.isArray(a1) && Array.isArray(a2) && a2.length > 0 && (
         a1.length <= 0 || a1[0] < a2[0] || (
            a1[0] === a2[0] && lexLessThan(a1.slice(1), a2.slice(1))
         )
      )
   );

   console.log(lexLessThan([], []));
   console.log(lexLessThan([], [3]));
   console.log(lexLessThan([3], []));
   console.log(lexLessThan([3], [3]));
   console.log(lexLessThan([3, 4], [3, 2]));
   console.log(lexLessThan([3, 4], [3, 5]));
   console.log(lexLessThan([3, 4], [3, 4, 5]));

   const a = [
      [15, 9],
      [5, 19],
      [15, 19],
      [5, 9],
      [1, 19],
      [1, 9],
      [5, 3]
   ];

   const b = a.reduce(
      (leastSoFar, currentValue) => (
         lexLessThan(currentValue, leastSoFar)
         ? currentValue
         : leastSoFar
      ),
      [Number.POSITIVE_INFINITY]
   );
   console.log(b);
}());
