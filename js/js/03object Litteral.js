"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function() {
  // objet littéral ou plain object qui est à l'origine de la 
  // syntaxe json javascript object notation
  const p1 = {
    lastname: "Dylan",
    firstname: "Bob",
    age: 79,
    introduceSelf: function() {
      console.log("Bonjour, je m'appele " + 
      this.firstname + " " + this.lastname);
    }
  }
  console.log(p1.firstname);
  // une fonction appelée depuis l'instance d'un objet est une
  // méthode
  p1.introduceSelf();

})(); // appel de la fonction;

