"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  const jc = {
    nom: "Dusse",
    prenom: "Jean-Claude",
    age: 35,
    sePresenter: function () {
      console.log("Bonjour, je m'appelle " +
        this.prenom + " " + this.nom);
    }
  }
  // utilisation de la boucle for in
  // en JS, les objets sont des tableaux associatifs
  for (let key in jc) {
    // console.log('clé : ', key);
    // console.log('type : ', typeof(jc[key]));
    // Si la valeur est une fonction, on l'appelle
    if (typeof (jc[key]) == 'function') {
      jc[key]();
    } else { // sinon, on affiche la clé et la valeur de la propriété
      console.log("clé : ", key);
      console.log('valeur : ', jc[key]);
    }
  }

  // Tableau littéral à index
  var personnages = ["Harry", "Hermione", "Ron", "Voldemore"];

  let taille = personnages.length;

  for (let i = 0; i < personnages.length; i++) {
    console.log(personnages[i]);
  }

  Object.prototype.type = function(){
    return typeof(this);
  };
  console.log(jc.type());
})(); // appel de la fonction;

