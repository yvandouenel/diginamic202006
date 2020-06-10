import React, { Component } from 'react';

class Nav extends Component {
  state = { 
    terms: [
      { id: 1, name: "bootstrap", selected: false},
      { id: 2, name: "css", selected: true},
      { id: 3, name: "html", selected: false}
    ]
   }
  render() {
    return (
      <nav>
        <ul>
          {this.state.terms.map(term => <li className="list-unstyled" key={term.id}>{term.name}</li>)}
        </ul>
      </nav>
    );
  }
}

export default Nav;