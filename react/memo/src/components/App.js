import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";

class App extends Component {
  state = {
    terms: [
      { id: 1, name: "Bootstrap", selected: false },
      { id: 2, name: "CSS", selected: true },
      { id: 3, name: "HTML", selected: false },
    ],
    columns: [
      { id: 1, title: "A apprendre", cards: [
        {id:1, question:"question", answer:"réponse"}
      ] },
      { id: 2, title: "Je sais un peu", cards: [] },
      { id: 3, title: "Je sais bien", cards: [] },
      { id: 4, title: "Je sais parfaitement", cards: [] },
    ],
  };
  /**
   * Gestionnaire d'événement
   */
  handleClickAddCard (event) {
    console.log('Dans handleClickAddCard');
  }
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">Memo</h1>
          <Nav terms={this.state.terms} />
        </header>
        <main className="container-fluid">
          <section className="row">
            {this.state.columns.map(column => 
            <Column 
            key={column.id} 
            column={column} 
            onClickAddCard={this.handleClickAddCard}
            />)}
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
