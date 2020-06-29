import React, { Component } from 'react';
import Header from '../common/Header';
import FetchData from '../../services/FetchData';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
    } catch (error) {
      console.log('Erreur : ', error);
    }



  }
  render() {
    return (
      <div>
        <Header path="/" />
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Réservation</h2>
              <form onSubmit={this.handleSubmit} className="form-group">
                <label htmlFor="start-date">
                  Date d'arrivée :
                  <input required className="form-control" id="start-date" type="date" defaultValue={""} />
                </label>
                <label htmlFor="end-date">
                  Date de départ :
                  <input required className="form-control" id="end-date" type="date" defaultValue={""} />
                </label>
                <label htmlFor="nb-person">
                  Nombre de personnes :
                  <input required className="form-control" id="nb-person" type="number" min="1" max="3" />
                </label>
                <label htmlFor="category">
                  Catégorie de chambre :
                  <select required id="category">
                    <option value="1">1 - Chambre simple</option>
                    <option value="2">2 - Chambre double</option>
                    <option value="3">3 - Chambre double - lits séparés</option>
                    <option value="4">4 - Chambre triple - 1 lit double - 1 lit simple</option>
                  </select>
                </label>
                <input type="submit" value="Envoyer" />
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;