"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function() {
  const fruits = [
    "Banane",
    "Pomme",
    "Kiwi"
  ];
  console.log(fruits);
  console.log("Nombre d'éléments : ", fruits.length);
  console.log('Premier élément : ', fruits[0]);
  console.log('Dernier élément : ', fruits[(fruits.length - 1)]);
  
  // ajouter un élément à un tableau : méthode push
  fruits.push("Orange");
  console.log(fruits);
  // Trouver l'index du fruit "Pomme"
  const index_of_apple = fruits.indexOf("Pomme");
  console.log('index de Pomme : ', index_of_apple);

  // Transformation du tableau en un nouveau tableau
  const fruits_upper = fruits.map(fruit => fruit.toUpperCase());
  console.log(fruits_upper);
  fruits.push("Fraise");
  console.log(fruits);
  console.log(fruits_upper);
  // Passage par référence ou par valeur ?

  const fruits_bis = fruits;// référence xxxx
  fruits.push("Melon");
  console.log('fruits_bis : ', fruits_bis);
  let i = 10;
  let j = i; // valeur xxxx
  i = 12;
  console.log('j = ', j);

  // Méthode filter
  const fruits_short = fruits.filter(fruit => fruit.length < 5);
  console.log('fruits_short : ', fruits_short);

})(); // appel de la fonction;

