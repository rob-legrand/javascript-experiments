/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/fetubasuqo/edit?js,console
// old: https://jsbin.com/gayipojubo/edit?js,console
// older: https://jsbin.com/dutiyudiya/edit?js,console
// older: https://jsbin.com/kalaqezogo/edit?js,console

(function () {
   'use strict';

   // functiony indentation
   const transposeMatrix1 = (a) => a[0].map(
      (ignore, whichColumn) => a.map(
         (row) => row[whichColumn]
      ).filter(
         (x) => x !== undefined
      )
   );

   // double indentation
   const transposeMatrix2 = (a) => (
      a[0].map(
         (ignore, whichColumn) => (
            a.map(
               (row) => (
                  row[whichColumn]
               )
            ).filter(
               (x) => (
                  x !== undefined
               )
            )
         )
      )
   );

   // loopy indentation
   const transposeMatrix3 = (a) => (
      a[0].map((ignore, whichColumn) => (
         a.map((row) => (
            row[whichColumn]
         )).filter((x) => (
            x !== undefined
         ))
      ))
   );

   const arr33 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
   ];
   console.log(arr33);
   console.log(transposeMatrix1(arr33));
   console.log(transposeMatrix2(arr33));
   console.log(transposeMatrix3(arr33));

   const arr34 = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
   ];
   console.log(arr34);
   console.log(transposeMatrix1(arr34));
   console.log(transposeMatrix2(arr34));
   console.log(transposeMatrix3(arr34));

   const arr43 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
   ];
   console.log(arr43);
   console.log(transposeMatrix1(arr43));
   console.log(transposeMatrix2(arr43));
   console.log(transposeMatrix3(arr43));

   const arrTriangle = [
      [1, 2, 3, 4],
      [5, 6, 7],
      [8, 9],
      [10]
   ];
   console.log(arrTriangle);
   console.log(transposeMatrix1(arrTriangle));
   console.log(transposeMatrix2(arrTriangle));
   console.log(transposeMatrix3(arrTriangle));
}());
