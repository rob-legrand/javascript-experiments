/*jslint devel: true, indent: 3 */
// https://jsbin.com/kalaqezogo/edit?js,console

(function () {
   'use strict';
   var arr, transposeArray;

   transposeArray = function (a) {
      return a[0].map(function (ignore, whichColumn) {
         return a.map(function (row) {
            return row[whichColumn];
         });
      });
   };

   arr = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]];
   console.log(arr);
   console.log(transposeArray(arr));

   arr = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12]];
   console.log(arr);
   console.log(transposeArray(arr));

   arr = [[1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12]];
   console.log(arr);
   console.log(transposeArray(arr));
}());
