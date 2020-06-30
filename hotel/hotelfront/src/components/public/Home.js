import React, { Component } from 'react';
import Header from '../common/Header';
import FetchData from '../../services/FetchData';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      error: null
    }
    this.fd = new FetchData();
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
      console.log('Erreur : ', error);
    }
  }
  renderReservation = () => {
    const { nights, persons, price } = this.state.reservation.data;
    const { endDate, startDate } = this.state.reservation
    return (
      <table className="table">
        <thead>
          <th>Nuités</th>
          <th>Nombre de personnes</th>
          <th>Prix</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th></th>
        </thead>
        <tbody>
          <td>{nights}</td>
          <td>{persons}</td>
          <td>{price}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td><button className="btn btn-danger">Supprimer</button></td>
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
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;