import React, { Component } from "react";
import "./App.css";
import Nav from "./nav/Nav";
import Column from "./column/Column";

class App extends Component {
  state = {
    columns: [
      {
        id: 1,
        title: "A apprendre",
        cards: [],
      },
      {
        id: 2,
        title: "Je sais un peu",
        cards: [],
      },
      {
        id: 3,
        title: "Je sais bien",
        cards: [],
      },
      {
        id: 4,
        title: "Je sais parfaitement",
        cards: [],
      },
    ],
  };
  /**
   * Gestionnaire d'événement click pour ajout de carte
   */
  handleClickAddCard = (event, column_index) => {
    console.log("dans handleClickAddCard");
    // copie du state
    const copy_state = { ...this.state };
    console.log('this', this);
    // Modification de la copie du state
    copy_state.columns[column_index].cards.push({
      id: 1,
      question: "Quel est le nom de l'inventeur du web",
      answer: "Tim Berners-Lee"
    });

    // Comparaison du nouveau et de l'ancien state
    this.setState(copy_state);
  }
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">Memo</h1>
          <Nav />
        </header>
        <main className="container-fluid">
          <section className="row">
            {this.state.columns.map((column, index) => (
              <Column
                key={column.id}
                column={column}
                onClickAddCard={this.handleClickAddCard}
                index={index}
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
