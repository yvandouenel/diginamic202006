import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Home from './components/public/Home'

function App() {
  return (
    <div>
      <Switch>
        {/* de la route la plus spécifique à la plus générique */}
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>

    </div>
  );
}

export default App;
