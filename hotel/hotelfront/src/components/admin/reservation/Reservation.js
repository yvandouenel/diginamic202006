import React, { Component } from 'react';
import FetchData from '../../../services/FetchData';
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        };
        this.fd = new FetchData();
    }
    successReservation = (data) => {
        console.log('Dans successReservation');
        // copie du state
        const copy_state = { ...this.state };
        // Modification de la copie du state
        copy_state.reservations = data;

        this.setState(copy_state);
    }
    failedReservation = (error) => {
        console.log('Dans failedReservation ', error);

    }
    componentDidMount = () => {
        // Tentative de récupération des données
        this.fd.getReservations(this.successReservation,this.failedReservation);

    }
    render() {
        return (
            <h2>Réservation</h2>
        );
    }
}

export default Reservation;