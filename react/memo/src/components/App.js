import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Table from './Table';
import About from './About';
import Error from './Error';

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">Memo</h1>
        </header>
        <Switch>
          {/* de la route la plus spécifique à la plus générique */}
          <Route path="/about" component={About} />
          <Route path="/error" component={Error} />
          <Route path="/" component={Table} />
        </Switch>
      </div>
    );
  }
}

export default App;
