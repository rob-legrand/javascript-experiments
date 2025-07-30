/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/jaravezida/edit?js,console
// old: https://jsbin.com/cevilopiqe/edit?js,console

(function () {
   'use strict';

   const duckCheck = function duckCheck(objectToCheck, prototypeObject) {
      return (
         (
            typeof objectToCheck !== typeof prototypeObject
            || Array.isArray(objectToCheck) !== Array.isArray(prototypeObject)
         )
         ? false
         : Array.isArray(prototypeObject)
         ? prototypeObject.every((value, index) => (
            objectToCheck.hasOwnProperty(index)
            && duckCheck(objectToCheck[index], value)
         ))
         : typeof prototypeObject === 'object'
         ? Object.keys(prototypeObject).every((prop) => (
            objectToCheck.hasOwnProperty(prop)
            && duckCheck(objectToCheck[prop], prototypeObject[prop])
         ))
         : true
      );
   };

   console.log(duckCheck(3, 4));
   console.log(duckCheck(3, '4'));
   console.log(duckCheck(3, {}));
   console.log(duckCheck({}, {}));
   console.log(duckCheck({}, []));
   console.log(duckCheck({tr: 1}, {tr: 'g'}));
   console.log(duckCheck(
      {c: 'sry', tr: [1, true, {}]},
      {c: 'lan', tr: [2, false, {}]}
   ));
   console.log(duckCheck(
      {c: 'sry', tr: [1, true, {}]},
      {c: 'lan', tr: [2, false]}
   ));
   console.log(duckCheck(
      {c: 'sry', tr: [1, true]},
      {c: 'lan', tr: [2, false, {}]}
   ));
}());
