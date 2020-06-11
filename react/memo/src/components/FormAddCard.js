import React from 'react';
function FormAddCard(props) {

  function handleSubmit(event) {
    event.preventDefault();
    console.log('dans handleSubmit de FormAddCard');
    // récupération des inputs
    const question = event.target.querySelector("#inputquestion").value;
    const answer = event.target.querySelector("#inputanswer").value;
    
    // appel de la fonction addCard qui se trouve dans App.js
    props.addCard(question, answer, props.index);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question :
        <input type="text" defaultValue="" id="inputquestion" />
      </label>
      <label>
        Réponse :
        <input type="text" defaultValue="" id="inputanswer" />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
}
export default FormAddCard;