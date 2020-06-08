"use strict";
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function() {
  function Circle(radius, name) {
    this.radius = radius;
    this.name = name;
  }
  /**
   * Dès qu'il est possible de placer une propriété dans le prototype
   * du constructeur, il faut le faire pour factoriser
   */
  Circle.prototype.pi = 3.14;
  Circle.prototype.area = function() {
    let area = this.pi * (Math.pow(this.radius,2));
    console.log('Aire du cercle ' + 
    this.name + " est égal à : " + area);
  }

  const circle1 = new Circle(2,"petit_cercle");
  const circle2 = new Circle(4,"grand_cercle");
  if(circle1.area === circle2.area) {
    console.log('Les deux cercles ont accès à la même propriété');
  } else {
    console.log('Les deux cercles n\'ont pas accès à la même propriété');
  }

  circle1.area();
  circle2.area();
  console.log('circle1 : ', circle1);

})(); // appel de la fonction;

