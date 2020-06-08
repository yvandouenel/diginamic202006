"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function() {
  
  /**
   * Classe pour construire des objets "Person"
   * @param  {string} firstname
   * @param  {string} lastname
   * @param  {function} introduceSelf
   */
  class Person {
    constructor(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    introduceSelf() {
      console.log(`Bonjour, je m'appelle 
      ${this.firstname} ${this.lastname}`);
    }
  }
  /**
   * @param  {string} firstname
   * @param  {string} lastname
   * @param  {string} diploma
   * @param  {function} introduceSelf
   */
  class Teacher extends Person {
    constructor(firstname, lastname, diploma) {
      super(firstname, lastname);
      this.diplointroduceSelfma = diploma;
    }
    introduceSelf() {
      super.introduceSelf();
      // utilisation des littéraux de gabarit
      console.log(`... et j'ai un diplome de ${this.diploma}`);
    }
  }
  /**
   * @param  {string} firstname
   * @param  {string} lastname
   * @param  {string} diploma
   * @param  {function} introduceSelf
   * @param  {function} teachJs
   */
  class TeacherJs extends Teacher {
    teachJs() {
      console.log("J'enseigne le js ... et c'est de la bombe !");
    }
  }

  const p1 = new Person("Bob", "Dylan");
  p1.introduceSelf();

  const p2 = new Teacher("Bob", "Marley","Professeur");
  p2.introduceSelf();

  const p3 = new TeacherJs("aretha", "Franklin","Professeur");
  p3.introduceSelf();
  p3.teachJs();

})(); // appel de la fonction;

