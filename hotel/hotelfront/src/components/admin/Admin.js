import React, { Component } from 'react';
import Header from '../common/Header';

class Admin extends Component {
  state = {}
  render() {
    return (
      <div>
        <Header path="/admin"/>
        <h1>Dans l'admin</h1>
      </div>
    );
  }
}

export default Admin;