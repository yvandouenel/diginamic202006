import React from 'react';
function FormAddCard(props) {

  function handleSubmit(event) {
    console.log('dans handleSubmit de FormAddCard');
    event.preventDefault();
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