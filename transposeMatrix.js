/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/dutiyudiya/edit?js,console
// old: https://jsbin.com/kalaqezogo/edit?js,console

(function () {
   'use strict';
   let arr;

   const transposeArrayA = (a) => (
      a[0].map((ignore, whichColumn) => (
         a.map((row) => (
            row[whichColumn]
         ))
      ))
   );

   const transposeArrayB = (a) => (
      a[0].map(
         (ignore, whichColumn) => (
            a.map(
               (row) => (
                  row[whichColumn]
               )
            )
         )
      )
   );

   const transposeArrayC = (a) => a[0].map(
      (ignore, whichColumn) => a.map(
         (row) => row[whichColumn]
      )
   );

   arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
   ];
   console.log(arr);
   console.log(transposeArrayA(arr));

   arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
   ];
   console.log(arr);
   console.log(transposeArrayB(arr));

   arr = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
   ];
   console.log(arr);
   console.log(transposeArrayC(arr));
}());
