/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/pamatagowa/edit?js,console

(function () {
   'use strict';

   const s1 = 'In 1606, Dutch sailor Willem Janszoon on board the Duyfken was the first European to land in Australia, reaching the Cape York Peninsula.';
   console.log(s1);

   (function () {
      const a = [...s1].map((c) => c.charCodeAt());
      console.log(a);
      const s2 = a.map((c) => String.fromCharCode(c)).join('');
      console.log(s2);
      const s3 = String.fromCharCode(...a);
      console.log(s3);
      console.log(s1 === s2);
      console.log(s1 === s3);
      console.log(s2 === s3);
   }());

   (function () {
      const a = [...s1].map((c) => c.codePointAt());
      console.log(a);
      const s2 = a.map((c) => String.fromCodePoint(c)).join('');
      console.log(s2);
      const s3 = String.fromCodePoint(...a);
      console.log(s3);
      console.log(s1 === s2);
      console.log(s1 === s3);
      console.log(s2 === s3);
   }());
}());
