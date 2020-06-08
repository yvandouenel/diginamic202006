"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function() {
 // déclaration de la fonction constructeur
 function Card(q, a) {
    // les propriétés de l'objet
    this.question = q;
    this.answer = a;
    // Méthode getter de question
    this.getQuestion = function() {
        return this.question;
    }
    // Méthode getter de answer
    this.getAnswer = function() {
        return this.answer;
    }
    console.log(this);
 }
 // instanciation d'une carte
 const card1 = new Card("Comment s'appelle le créateur du web ?","Tim Berners-Lee");
 const card2 = new Card("Question ?","Réponse");
//  console.log(card1.getQuestion());
//  console.log(card1.getAnswer());
 console.log(card1);
 console.log(card2);
 console.log(typeof(Math));

})(); // appel de la fonction;

