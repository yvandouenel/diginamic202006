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
  handleClickAddCard(event) {
    console.log('dans handleClickAddCard');
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
            {this.state.columns.map((column) => (
              <Column 
              key={column.id} 
              column={column}
              onClickAddCard={this.handleClickAddCard}
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
