/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/cevilopiqe/edit?js,console

(function () {
   'use strict';

   const duckCheck = function duckCheck(objectToCheck, prototypeObject) {
      if (
         typeof objectToCheck !== typeof prototypeObject
         || Array.isArray(objectToCheck) !== Array.isArray(prototypeObject)
      ) {
         return false;
      }
      if (Array.isArray(prototypeObject)) {
         return prototypeObject.every(function (value, index) {
            return objectToCheck.hasOwnProperty(index) && duckCheck(objectToCheck[index], value);
         });
      }
      if (typeof prototypeObject === 'object') {
         return Object.keys(prototypeObject).every(function (prop) {
            return objectToCheck.hasOwnProperty(prop) && duckCheck(objectToCheck[prop], prototypeObject[prop]);
         });
      }
      return true;
   };

   console.log(duckCheck(3, 4));
   console.log(duckCheck(3, '4'));
   console.log(duckCheck(3, {}));
   console.log(duckCheck({}, {}));
   console.log(duckCheck({tr: 1}, {tr: 'g'}));
}());
