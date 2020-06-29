import React, { Component } from 'react';
import Header from '../common/Header';
import Reservation from './reservation/Reservation';

import { Route, Switch, Link } from 'react-router-dom';
import Room from './room/Room';
import Period from './period/Period';

class Admin extends Component {
  state = {}
  isSelected = (path) => {
    const urlPath = this.props.location.pathname;
    return (path === urlPath) ? "btn-danger" : "btn-secondary";
  }
  render() {
    return (
      <div>
        <Header path="/admin" />
        <main className="container">
          <div className="row">
            <div className="col">
              <nav >
                <ul className="list-unstyled d-flex justify-content-end">
                  <li><Link className={`p-1 m-1 h3 btn ${this.isSelected("/admin/reservations")}`} to="/admin/reservations">Réservations</Link></li>
                  <li><Link className={`p-1 m-1 h3 btn ${this.isSelected("/admin/rooms")}`} to="/admin/rooms">Chambres</Link></li>
                  <li><Link className={`p-1 m-1 h3 btn ${this.isSelected("/admin/periods")}`} to="/admin/periods">Périodes</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <Switch>
              <Route path="/admin/reservations" component={Reservation} />
              <Route path="/admin/rooms" component={Room} />
              <Route path="/admin/periods" component={Period} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;