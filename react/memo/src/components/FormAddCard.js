import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
function FormAddCard(props) {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("dans handleSubmit de FormAddCard");
    // récupération des inputs
    const question = event.target.querySelector("#inputquestion").value;
    const answer = event.target.querySelector("#inputanswer").value;

    // appel de la fonction addCard qui se trouve dans App.js
    props.addCard(question, answer, props.index);
  }
  const handleClose = (e, index) => {
    console.log('Dans handleClose');
    // Appel de la méthode qui va permettre de cacher le formulaire
    props.hideFormAddCard();
  } 


  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajout d'une carte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default FormAddCard;
