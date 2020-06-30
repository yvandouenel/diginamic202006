import React, { Component } from 'react';
import Header from '../common/Header';
import FetchData from '../../services/FetchData';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      error: null,
      deleted_reservation: null
    }
    this.fd = new FetchData();
  } 
  handleDeleteReservation = async (event) => {
    console.log('Dans handleDeleteReservation');
    try {
      const deleted = await this.fd.deleteReservation(this.state.reservation.code);
      console.log('reservation deleted : ', deleted);
      const copy_state = { ... this.state };
      copy_state.reservation = null;
      copy_state.error = null;
      copy_state.deleted_reservation = deleted;
      this.setState(copy_state);

    } catch (error) {

    }
  }
  handleSubmit = async (event) => {
    console.log('Dans handleSubmit');
    event.preventDefault();

    const payload_reservation = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
      category: event.target.querySelector("#category").value
    }
    console.log('request : ', payload_reservation);

    // Test des entrées 

    // POST
    try {
      const reservation = await this.fd.postReservation(payload_reservation);
      console.log('reservation');
      const copy_state = { ...this.state };
      copy_state.reservation = reservation;
      this.setState(copy_state);
    } catch (error) {
      console.log('Erreur dans le catch : ', error);
      const copy_state = { ...this.state };
      copy_state.error = error.message;
      console.log('copy state', copy_state);
      this.setState(copy_state);
    }
  }
  renderReservation = (deleted = false) => {
    const { nights, persons, price } = deleted ? this.state.deleted_reservation.data : this.state.reservation.data;
    const { endDate, startDate } = deleted ? this.state.deleted_reservation : this.state.reservation;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nuités</th>
            <th>Nombre de personnes</th>
            <th>Prix</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{nights}</td>
            <td>{persons}</td>
            <td>{price}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
            <td>
              {!deleted && (
                <button
                onClick={this.handleDeleteReservation}
                className="btn btn-danger">Supprimer
              </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
  render() {
    return (
      <div>
        <Header path="/" />
        <div className="container">
          <div className="row headband">
            <div className="col-md-8">

            </div>

            <div className="col-md-4">
              <div id="wrapper-form">
                <h2 className="">Réserver cet hôtel</h2>
                <form onSubmit={this.handleSubmit} className="form-group" id="form-reservation">
                  <label htmlFor="start-date" id="start-date-label">
                    Date d'arrivée :
                  <input required className="form-control" id="start-date" type="date" defaultValue={""} />
                  </label>
                  <label htmlFor="end-date" id="end-date-label">
                    Date de départ :
                  <input required className="form-control" id="end-date" type="date" defaultValue={""} />
                  </label>
                  <label htmlFor="nb-person" id="nb-person-label">
                    Nb de personnes :
                  <input required className="form-control" id="nb-person" type="number" min="1" max="3" />
                  </label>
                  <label htmlFor="category" id="category-label">
                    <span>Catégorie de chambre :</span>
                    <select required id="category">
                      <option value="1">1 - Chambre simple</option>
                      <option value="2">2 - Chambre double</option>
                      <option value="3">3 - Chambre double </option>
                      <option value="4">4 - Chambre triple</option>
                    </select>
                  </label>
                  <input className="bg-dark text-light btn" type="submit" value="Réserver" id="submit-reservation" />
                </form>
              </div>
            </div>
          </div>
          <div className="row bg-dark">
            <div className="col-12 text-light">
              <ul className="list-unstyled d-flex" id="list-services">
                <li>Parking</li>
                <li>WIFI/Accès Internet</li>
                <li>Petit-Déjeuner</li>
                <li>Bar</li>
                <li>Restaurant</li>
                <li>Air Conditionné</li>
                <li>+ 17 services</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.reservation && (
                <section>
                  <h2>Votre réservation</h2>
                  {this.renderReservation()}

                </section>
              )}
              {this.state.error && (
                <section>
                  <h2>Erreur de réservation</h2>
                  <h3 className="text-danger">{this.state.error}</h3>

                </section>
              )}
              {this.state.deleted_reservation && (
                <section>
                  <h2 className="text-warning">Réservation supprimée : </h2>
                  {this.renderReservation(true)}

                </section>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;