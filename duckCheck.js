/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/fehaqoqite/edit?js,console
// old: https://jsbin.com/nuduroyama/edit?js,console
// older: https://jsbin.com/jaravezida/edit?js,console
// older: https://jsbin.com/cevilopiqe/edit?js,console

(function () {
   'use strict';

   const duckCheck = (objectToCheck, prototypeObject) => (
      typeof objectToCheck === typeof prototypeObject
      && Array.isArray(objectToCheck) === Array.isArray(prototypeObject)
      && (
         !Array.isArray(prototypeObject)
         || prototypeObject.every(
            (value, index) => (
               Object.hasOwn(objectToCheck, index)
               && duckCheck(objectToCheck[index], value)
            )
         )
      )
      && (
         typeof prototypeObject !== 'object'
         || Object.keys(prototypeObject).every(
            (prop) => (
               Object.hasOwn(objectToCheck, prop)
               && duckCheck(objectToCheck[prop], prototypeObject[prop])
            )
         )
      )
   );

   console.log(duckCheck(3, 4));
   console.log(duckCheck(3, '4'));
   console.log(duckCheck(3, {}));
   console.log(duckCheck({}, {}));
   console.log(duckCheck({}, []));
   console.log(duckCheck({tr: 1}, {tr: 'g'}));
   console.log(duckCheck(
      {c: 'sur', tr: [1, true, {}]},
      {c: 'lan', tr: [2, false, {}]}
   ));
   console.log(duckCheck(
      {c: 'gls', tr: [1, true, {}]},
      {c: 'ken', tr: [2, false]}
   ));
   console.log(duckCheck(
      {c: 'som', tr: [1, true]},
      {c: 'drb', tr: [2, false, {}]}
   ));
}());
