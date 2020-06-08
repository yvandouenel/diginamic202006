"use strict";
// fonction anonyme immédiate IIFES
(function() {
 // création d'une arrow function
 let msg = ""; 
 
 
 const helloLast = lastname => msg + " (nom de famille : " + lastname + ")";  
 // fonction qui renvoie une autre fonction (high order function)
 const helloFirst = firstname => {
     msg = "Hello " + firstname;
     return helloLast
    }; 
 console.log(helloFirst("Bob")("Dylan"));

/**
 * Exemple de "high order function" car elle attend une fonction 
 * en argument
 * @param  {string} toto
 * @return {void}
 */
function test(toto) {
    console.log("type de toto : ", typeof(toto));
    toto(); // appel de la fonction passée en argument
};
test(() => { console.log("test")});

})(); // appel de la fonction;

