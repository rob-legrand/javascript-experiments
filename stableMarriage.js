/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/denopomawo/edit?js,console
// old: https://jsbin.com/kimeceheni/edit?js,console
// older: https://jsbin.com/noyipotuho/edit?js,console

(function () {
   'use strict';

   const createGaleShapleyMatching = function (askersPrefs, askedsPrefs) {
      let offerStatusMatrix;

      const isEveryoneMatched = (offerStatusMatrix) => (
         Object.keys(offerStatusMatrix).every((asker) => (
            Object.keys(offerStatusMatrix[asker]).some((asked) => (
               offerStatusMatrix[asker][asked] === 'matched'
            ))
         ))
      );

      /*const isEveryoneMatched = (offerStatusMatrix) => Object.keys(offerStatusMatrix).every(
         (asker) => Object.keys(offerStatusMatrix[asker]).some(
            (asked) => offerStatusMatrix[asker][asked] === 'matched'
         )
      );*/

      /*const isEveryoneMatched = (offerStatusMatrix) => (
         Object.keys(offerStatusMatrix).every(
            (asker) => (
               Object.keys(offerStatusMatrix[asker]).some(
                  (asked) => (
                     offerStatusMatrix[asker][asked] === 'matched'
                  )
               )
            )
         )
      );*/

      const isPersonMatched = (offerStatusMatrix, person) => (
         offerStatusMatrix.hasOwnProperty(person)
         ? Object.keys(offerStatusMatrix[person]).some((otherPerson) => (
            offerStatusMatrix[person][otherPerson] === 'matched'
         ))
         : Object.keys(offerStatusMatrix).some((otherPerson) => (
            offerStatusMatrix[otherPerson][person] === 'matched'
         ))
      );

      offerStatusMatrix = Object.keys(askersPrefs).reduce(function (statusMatrix, asker) {
         statusMatrix[asker] = askersPrefs[asker].reduce(function (statusRow, asked) {
            statusRow[asked] = 'none';
            return statusRow;
         }, {});
         return statusMatrix;
      }, {});
      (function keepMatching() {
         if (!isEveryoneMatched(offerStatusMatrix)) {
            Object.keys(askersPrefs).forEach(function (asker) {
               if (!isPersonMatched(offerStatusMatrix, asker)) {
                  const haventAskedYet = askersPrefs[asker].filter((asked) => (
                     offerStatusMatrix[asker][asked] === 'none'
                  ));
                  offerStatusMatrix[asker][haventAskedYet[0]] = 'matched';
               }
            });
            Object.keys(askedsPrefs).forEach(function (asked) {
               const offers = askedsPrefs[asked].filter((asker) => (
                  offerStatusMatrix[asker][asked] === 'matched'
               ));
               offers.forEach(function (asker, which) {
                  offerStatusMatrix[asker][asked] = (
                     which > 0
                     ? 'rejected'
                     : 'matched'
                  );
               });
            });
            keepMatching();
         }
      }());
      return Object.keys(askersPrefs).reduce(function (matching, asker) {
         matching[asker] = Object.keys(offerStatusMatrix[asker]).filter((asked) => (
            offerStatusMatrix[asker][asked] === 'matched'
         ))[0];
         return matching;
      }, {});
   };

   const flipMatching = (matching) => (
      Object.keys(matching).reduce(function (flippedMatching, person) {
         flippedMatching[matching[person]] = person;
         return flippedMatching;
      }, {})
   );

   const randomizePrefs = (prefs) => (
      prefs.reduce(function (soFar) {
         const whichChosen = Math.floor(Math.random() * soFar.prefsLeft.length);
         return {
            randomizedPrefs: soFar.randomizedPrefs.concat(soFar.prefsLeft[whichChosen]),
            prefsLeft: soFar.prefsLeft.slice(0, whichChosen).concat(soFar.prefsLeft.slice(whichChosen + 1))
         };
      }, {
         randomizedPrefs: [],
         prefsLeft: prefs
      }).randomizedPrefs
   );

   const testPrefs = function (womensPrefs, mensPrefs) {
      console.log(womensPrefs);
      console.log(mensPrefs);
      console.log(createGaleShapleyMatching(womensPrefs, mensPrefs));
      console.log(flipMatching(createGaleShapleyMatching(womensPrefs, mensPrefs)));
      console.log(createGaleShapleyMatching(mensPrefs, womensPrefs));
   };

   const womensOriginalPrefs = {
      charlotte: ['bingley', 'darcy', 'collins', 'wickham'],
      elizabeth: ['wickham', 'darcy', 'bingley', 'collins'],
      jane: ['bingley', 'wickham', 'darcy', 'collins'],
      lydia: ['bingley', 'wickham', 'darcy', 'collins']
   };
   const mensOriginalPrefs = {
      bingley: ['jane', 'elizabeth', 'lydia', 'charlotte'],
      collins: ['jane', 'elizabeth', 'lydia', 'charlotte'],
      darcy: ['elizabeth', 'jane', 'charlotte', 'lydia'],
      wickham: ['lydia', 'jane', 'elizabeth', 'charlotte']
   };
   testPrefs(womensOriginalPrefs, mensOriginalPrefs);

   const womensRandomPrefs = Object.keys(womensOriginalPrefs).reduce(function (newPrefs, person) {
      newPrefs[person] = randomizePrefs(womensOriginalPrefs[person]);
      return newPrefs;
   }, {});
   const mensRandomPrefs = Object.keys(mensOriginalPrefs).reduce(function (newPrefs, person) {
      newPrefs[person] = randomizePrefs(mensOriginalPrefs[person]);
      return newPrefs;
   }, {});
   testPrefs(womensRandomPrefs, mensRandomPrefs);
}());
