import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";

class App extends Component {
  state = {
    terms: [
      { id: 1, name: "Bootstrap", selected: false },
      { id: 2, name: "CSS", selected: true },
      { id: 3, name: "HTML", selected: false },
    ],
    columns: [
      {
        id: 1,
        title: "A apprendre",
        cards: [{ id: 1, question: "question", answer: "réponse" }],
      },
      { id: 2, title: "Je sais un peu", cards: [] },
      { id: 3, title: "Je sais bien", cards: [] },
      { id: 4, title: "Je sais parfaitement", cards: [] },
    ],
    // index_show_form_add_card permet de savoir dans quelle colonne
    // on va ajouter une carte. -1 indique que l'on est pas en train
    // d'ajouter une carte
    index_show_form_add_card: -1,
  };
  addCard = (question, answer, index) => {
    console.log('Dans addCard', question, answer, index);
    console.log('lastCardId', this.getLastCardId());
    // copie du state
    const copy_state = { ... this.state};

    // modification de la copie
    copy_state.columns[index].cards.push({
      id: this.getLastCardId(),
      question: question,
      answer: answer
    });
    copy_state.index_show_form_add_card = -1;

    // Modification éventuelle du state
    this.setState(copy_state);
  }
  getLastCardId() {
    let last_id = 0;
    for(let i = 0; i < this.state.columns.length; i++) {
      last_id += this.state.columns[i].cards.length;
    }
    return last_id;
  }
  /**
   * Gestionnaire d'événement
   */
  handleClickAddCard(index) {
    console.log("Dans handleClickAddCard");
    // copie du state
    const copy_state = { ...this.state };
    // Modification de la la copie du state
    copy_state.index_show_form_add_card = index;

    // Comparaison et éventuelle modification du state
    // S'il y a une différence, la méthode render sera appelée
    this.setState(copy_state);
  }
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">Memo</h1>
          <Nav terms={this.state.terms} />
        </header>
        <main className="container-fluid">
          <div className="row">
            <div className="col">
              {this.state.index_show_form_add_card !== -1 && 
              <FormAddCard 
              addCard={this.addCard}
              index={this.state.index_show_form_add_card} />}
            </div>
          </div>

          <section className="row">
            {this.state.columns.map((column, index) => (
              <Column
                key={column.id}
                column={column}
                onClickAddCard={() => {
                  this.handleClickAddCard(index);
                }}
              />
            ))}
          </section>
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
  componentDidMount() {
    //console.log("this dans componentDidMount", this);
  }
}

export default App;
