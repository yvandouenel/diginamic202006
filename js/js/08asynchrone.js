"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  console.log('avant');
  setTimeout(() => { console.log('affiché après 2 secondes'); }, 2000);
  console.log('après');
})(); // appel de la fonction;

