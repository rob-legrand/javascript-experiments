/*jslint devel: true, indent: 3 */
// https://jsbin.com/noyipotuho/edit?js,console

(function () {
   'use strict';
   var createGaleShapleyMatching, flipMatching, randomizePrefs;

   createGaleShapleyMatching = function (askersPrefs, askedsPrefs) {
      var isEveryoneMatched, isPersonMatched, offerStatusMatrix;

      isEveryoneMatched = function (offerStatusMatrix) {
         return Object.keys(offerStatusMatrix).every(function (asker) {
            return Object.keys(offerStatusMatrix[asker]).some(function (asked) {
               return offerStatusMatrix[asker][asked] === 'matched';
            });
         });
      };

      isPersonMatched = function (offerStatusMatrix, person) {
         return offerStatusMatrix.hasOwnProperty(person) ? Object.keys(offerStatusMatrix[person]).some(function (otherPerson) {
            return offerStatusMatrix[person][otherPerson] === 'matched';
         }) : Object.keys(offerStatusMatrix).some(function (otherPerson) {
            return offerStatusMatrix[otherPerson][person] === 'matched';
         });
      };

      offerStatusMatrix = Object.keys(askersPrefs).reduce(function (statusMatrix, asker) {
         statusMatrix[asker] = askersPrefs[asker].reduce(function (statusRow, asked) {
            statusRow[asked] = 'none';
            return statusRow;
         }, {});
         return statusMatrix;
      }, {});
      (function keepMatching() {
         if (isEveryoneMatched(offerStatusMatrix)) {
            return;
         }
         Object.keys(askersPrefs).forEach(function (asker) {
            var haventAskedYet;
            if (!isPersonMatched(offerStatusMatrix, asker)) {
               haventAskedYet = askersPrefs[asker].filter(function (asked) {
                  return offerStatusMatrix[asker][asked] === 'none';
               });
               offerStatusMatrix[asker][haventAskedYet[0]] = 'matched';
            }
         });
         Object.keys(askedsPrefs).forEach(function (asked) {
            var offers;
            offers = askedsPrefs[asked].filter(function (asker) {
               return offerStatusMatrix[asker][asked] === 'matched';
            });
            offers.forEach(function (asker, which) {
               offerStatusMatrix[asker][asked] = which > 0 ? 'rejected' : 'matched';
            });
         });
         keepMatching();
      }());
      return Object.keys(askersPrefs).reduce(function (matching, asker) {
         matching[asker] = Object.keys(offerStatusMatrix[asker]).filter(function (asked) {
            return offerStatusMatrix[asker][asked] === 'matched';
         })[0];
         return matching;
      }, {});
   };

   flipMatching = function (matching) {
      return Object.keys(matching).reduce(function (flippedMatching, person) {
         flippedMatching[matching[person]] = person;
         return flippedMatching;
      }, {});
   };

   randomizePrefs = function (prefs) {
      var newPrefs, oldPrefs;
      oldPrefs = Array.from(prefs);
      newPrefs = [];
      while (oldPrefs.length > 0) {
         newPrefs = newPrefs.concat(oldPrefs.splice(Math.floor(Math.random() * oldPrefs.length), 1));
      }
      return newPrefs;
   };

   (function () {
      var mensPrefs, womensPrefs;

      womensPrefs = {
         charlotte: ['bingley', 'darcy', 'collins', 'wickham'],
         elizabeth: ['wickham', 'darcy', 'bingley', 'collins'],
         jane: ['bingley', 'wickham', 'darcy', 'collins'],
         lydia: ['bingley', 'wickham', 'darcy', 'collins']
      };

      mensPrefs = {
         bingley: ['jane', 'elizabeth', 'lydia', 'charlotte'],
         collins: ['jane', 'elizabeth', 'lydia', 'charlotte'],
         darcy: ['elizabeth', 'jane', 'charlotte', 'lydia'],
         wickham: ['lydia', 'jane', 'elizabeth', 'charlotte']
      };

      console.log(womensPrefs);
      console.log(mensPrefs);
      console.log(createGaleShapleyMatching(womensPrefs, mensPrefs));
      console.log(flipMatching(createGaleShapleyMatching(womensPrefs, mensPrefs)));
      console.log(createGaleShapleyMatching(mensPrefs, womensPrefs));

      womensPrefs = Object.keys(womensPrefs).reduce(function (newPrefs, person) {
         newPrefs[person] = randomizePrefs(womensPrefs[person]);
         return newPrefs;
      }, {});
      mensPrefs = Object.keys(mensPrefs).reduce(function (newPrefs, person) {
         newPrefs[person] = randomizePrefs(mensPrefs[person]);
         return newPrefs;
      }, {});

      console.log(womensPrefs);
      console.log(mensPrefs);
      console.log(createGaleShapleyMatching(womensPrefs, mensPrefs));
      console.log(flipMatching(createGaleShapleyMatching(womensPrefs, mensPrefs)));
      console.log(createGaleShapleyMatching(mensPrefs, womensPrefs));
   }());
}());
