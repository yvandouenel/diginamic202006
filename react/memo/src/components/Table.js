import React, { Component } from "react";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";
import FetchData from "../services/FetchData";
import { Redirect } from "react-router";

class Table extends Component {
  constructor(props) {
    super(props);
    this.fetch_data = new FetchData();
    this.state = {
      terms: [],
      columns: [],
      // index_show_form_add_card permet de savoir dans quelle colonne
      // on va ajouter une carte. -1 indique que l'on est pas en train
      // d'ajouter une carte
      index_show_form_add_card: -1,
      error: false,
    };
  }

  addCard = (question, answer, index) => {
    console.log("Dans addCard", question, answer, index);
    console.log("lastCardId", this.getLastCardId());
    // copie du state
    const copy_state = { ...this.state };

    // modification de la copie
    copy_state.columns[index].cards.push({
      id: this.getLastCardId(),
      question: question,
      answer: answer,
    });
    copy_state.index_show_form_add_card = -1;

    // Modification éventuelle du state
    this.setState(copy_state);
  };
  getLastCardId() {
    let last_id = 0;
    for (let i = 0; i < this.state.columns.length; i++) {
      last_id += this.state.columns[i].cards.length;
    }
    return last_id;
  }
  hideFormAddCard = () => {
    console.log("Dans hideFormAddCard");
    // copie du state
    const copy_state = { ...this.state };

    // modification de la copie
    copy_state.index_show_form_add_card = -1;

    // Modification éventuelle du state
    this.setState(copy_state);
  };
  /**
   * Gestionnaire d'événement
   */
  handleClickTerm = (event, term_id) => {
    console.log("Dans handleClickTerm ", term_id);
    // VA CHERCHER LES CARTES !!!!
    this.fetch_data.getCards(
      term_id,
      this.successGetCards,
      this.failedGetCards
    );

    // copie du state
    const copy_state = { ...this.state };

    // modification de la copie
    copy_state.terms.forEach((term) => {
      if (term.id === term_id) {
        term.selected = true;
      } else term.selected = false;
    });

    // Modification éventuelle du state
    this.setState(copy_state);
  };

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
  successGetToken = (token) => {
    console.log("Dans successGetToken : ", token);
    this.fetch_data.getTerms(this.successGetTerms, this.failedGetTerms);
  };
  failedGetToken = (error) => {
    console.log("Dans failedGetToken", error);
    // copy du state
    const copy_state = { ...this.state };
    copy_state.error = error;
    this.setState(copy_state);
  };
  successGetTerms = (terms) => {
    console.log("Dans successGetTerms : ", terms);
    // copy du state
    const copy_state = { ...this.state };
    copy_state.terms = terms;
    this.setState(copy_state);
  };
  failedGetTerms(error) {
    console.log("Dans failedGetTerms", error);
  }
  successGetCards = (cards) => {
    // // Trie du tableau des colonnes
    // cards.sort(function (col1, col2) {
    //   return col1.id - col2.id;
    // });
    console.log("Dans successGetCards : ", cards);
    // copy du state
    const copy_state = { ...this.state };
    copy_state.columns = cards;
    this.setState(copy_state);
  };
  failedGetCards(error) {
    console.log("Dans failedGetCards", error);
  }
  render() {
    return (
      <div>
        {this.state.error && (
          <Redirect
            to={{
              pathname: "/error",
              state: { error: this.state.error.message },
            }}
          />
        )}
        <main className="container-fluid">
          <div className="row">
            <div className="col">
              <Nav
                terms={this.state.terms}
                onClickTerm={this.handleClickTerm}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.index_show_form_add_card !== -1 && (
                <FormAddCard
                  addCard={this.addCard}
                  index={this.state.index_show_form_add_card}
                  hideFormAddCard={this.hideFormAddCard}
                />
              )}
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
    console.log("Dans componentDidMount");
    // récupération du token
    this.fetch_data.getToken(this.successGetToken, this.failedGetToken);
  }
}

export default Table;
