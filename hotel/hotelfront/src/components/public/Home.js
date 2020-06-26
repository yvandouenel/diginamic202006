import React, { Component } from 'react';
import Header from '../common/Header';

class Home extends Component {
  state = {}
  render() {
    return (
      <div>
        <Header path="/"/>
        <h1>Dans le Home public</h1>
      </div>
    );
  }
}

export default Home;