/*jslint devel */
/*jshint esnext: true */
// https://jsbin.com/kimeceheni/edit?js,console
// old: https://jsbin.com/noyipotuho/edit?js,console

(function () {
   'use strict';

   const createGaleShapleyMatching = function (askersPrefs, askedsPrefs) {
      let offerStatusMatrix;

      const isEveryoneMatched = function (offerStatusMatrix) {
         return Object.keys(offerStatusMatrix).every(function (asker) {
            return Object.keys(offerStatusMatrix[asker]).some(function (asked) {
               return offerStatusMatrix[asker][asked] === 'matched';
            });
         });
      };

      const isPersonMatched = function (offerStatusMatrix, person) {
         return (
            offerStatusMatrix.hasOwnProperty(person)
            ? Object.keys(offerStatusMatrix[person]).some(function (otherPerson) {
               return offerStatusMatrix[person][otherPerson] === 'matched';
            })
            : Object.keys(offerStatusMatrix).some(function (otherPerson) {
               return offerStatusMatrix[otherPerson][person] === 'matched';
            })
         );
      };

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
                  const haventAskedYet = askersPrefs[asker].filter(function (asked) {
                     return offerStatusMatrix[asker][asked] === 'none';
                  });
                  offerStatusMatrix[asker][haventAskedYet[0]] = 'matched';
               }
            });
            Object.keys(askedsPrefs).forEach(function (asked) {
               const offers = askedsPrefs[asked].filter(function (asker) {
                  return offerStatusMatrix[asker][asked] === 'matched';
               });
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
         matching[asker] = Object.keys(offerStatusMatrix[asker]).filter(function (asked) {
            return offerStatusMatrix[asker][asked] === 'matched';
         })[0];
         return matching;
      }, {});
   };

   const flipMatching = function (matching) {
      return Object.keys(matching).reduce(function (flippedMatching, person) {
         flippedMatching[matching[person]] = person;
         return flippedMatching;
      }, {});
   };

   const randomizePrefs = function (prefs) {
      return prefs.reduce(function (soFar) {
         const whichChosen = Math.floor(Math.random() * soFar.prefsLeft.length);
         return {
            randomizedPrefs: soFar.randomizedPrefs.concat(soFar.prefsLeft[whichChosen]),
            prefsLeft: soFar.prefsLeft.slice(0, whichChosen).concat(soFar.prefsLeft.slice(whichChosen + 1))
         };
      }, {
         randomizedPrefs: [],
         prefsLeft: prefs
      }).randomizedPrefs;
   };

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

   testPrefs(
      Object.keys(womensOriginalPrefs).reduce(function (newPrefs, person) {
         newPrefs[person] = randomizePrefs(womensOriginalPrefs[person]);
         return newPrefs;
      }, {}),
      Object.keys(mensOriginalPrefs).reduce(function (newPrefs, person) {
         newPrefs[person] = randomizePrefs(mensOriginalPrefs[person]);
         return newPrefs;
      }, {})
   );
}());
