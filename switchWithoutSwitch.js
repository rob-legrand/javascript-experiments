/*jslint devel */
// https://jsbin.com/qiharabowa/edit?js,console
// old: https://jsbin.com/fayavodiru/edit?js,console

const switchOn = function (value, toDo) {
   if (!toDo.hasOwnProperty(value)) {
      value = 'default';
   }
   if (toDo.hasOwnProperty(value) && typeof toDo[value] === 'function') {
      return toDo[value]();
   }
};

(function () {
   const s = (
      Math.random() < 0.1
      ? 'garbage'
      : Math.random() < 0.5
      ? 'hello'
      : 'sup'
   );
   console.log(s);

   switch (s) {
   case 'hello':
      console.log('hi');
      break;
   case 'sup':
      console.log('suuup');
      break;
   default:
      console.log('y u no?');
   }

   switchOn(s, {
      hello: function () {
         console.log('hi');
      },
      sup: function () {
         console.log('suuup');
      },
      default: function () {
         console.log('y u no?');
      }
   });
}());
