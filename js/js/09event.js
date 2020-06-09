
// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  const h1 = window.document.getElementById("h1");
  function Test(msg) {
    this.msg = msg;
    console.log('this dans Test', this);
    this.methodTest = () => {
      console.log('this dans methodTest : ', this);
    }
    h1.onclick = event => {
      console.log('Click sur h1');
      console.log("event.target : ", event.target);
      // supprime le comportement par défaut (ici le changement d'url)
      event.preventDefault();
      // this
      console.log("this : ", this);
    }
  }
  const t = new Test('msg');
  t.methodTest();

  
})(); // appel de la fonction;

