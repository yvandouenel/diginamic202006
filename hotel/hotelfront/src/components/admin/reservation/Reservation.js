import React, { Component } from 'react';
import FetchData from '../../../services/FetchData';
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            error: false
        };
        this.fd = new FetchData(); // Singleton

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
        // copie du state
        const copy_state = { ...this.state };
        // Modification de la copie du state
        copy_state.error = error;

        this.setState(copy_state);

    }
    componentDidMount = async () => {
        try {
            const data = await this.fd.getReservations(); // il faut obligatoirement
            // que getReservations retourne une promesse
            console.log('data après le await : ', data);
            this.successReservation(data);

        } catch (error) {
            this.failedReservation(error);
        }

    }
    handleClickDelete = async (e, reservation) => {
        console.log('Dans handleClickDelete : ', reservation);
        try {
            const deleted = await this.fd.deleteReservation(reservation.code);
            const copy_state = { ... this.state };
            // On retrouve la réservation dans le tableau reservations
            const index_reservation = copy_state.reservations.indexOf(reservation);
            copy_state.reservations.splice(index_reservation, 1);
            copy_state.error = null;

            this.setState(copy_state);

        } catch (error) {
            console.log('Erreur attrapée dans handleClickDelete : ', error);
            const copy_state = { ... this.state };
            // On retrouve la réservation dans le tableau reservations
            copy_state.error = error;

            this.setState(copy_state);
        }
    }
    render() {
        return (
            <div className="col">
                <h2>Réservation</h2>
                {this.state.error && (
                    <div>
                        <h2 className="text-danger">Erreur</h2>
                        <p className="text-danger">Code de l'erreur : {this.state.error.message}</p>
                        <p>Merci de contacter l'administrateur : admin@hotel.com</p>
                    </div>
                )}
                <table className="table table-responsive-lg">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Catégorie</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Nb de personnes</th>
                            <th>Nb de nuits</th>
                            <th>Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservations.map(reservation => {
                            return (
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.categoryId}</td>
                                    <td>{reservation.startDate}</td>
                                    <td>{reservation.endDate}</td>
                                    <td>{reservation.data.persons}</td>
                                    <td>{reservation.data.nights}</td>
                                    <td>
                                        <button
                                            onClick={(e) => { this.handleClickDelete(e, reservation) }}
                                            className="btn btn-danger">
                                            Supprimer
                                    </button>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Reservation;