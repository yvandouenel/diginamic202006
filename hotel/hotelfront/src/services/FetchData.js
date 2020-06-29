class FetchData {
    constructor() {
        this.url = 'http://localhost:8000/';
        this.headers = {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("admin:admin") // btoa = encodage en base 64
        };
        this.credentials = "same-origin";
    }
    getReservations = (success, failed) => {
        fetch(`${this.url}admin/reservations`, {
            credentials: this.credentials,
            method: "GET",
            headers: this.headers
        }).then(function (response) {
            if (response.status != 200) {
                throw new Error("Erreur " + response.status);
            }
            return response.json();// teste si c'est bien du json
        })
            .then(function (data) {
                console.log('data : ', data);// J'ai ma donnée au format json
                success(data);
            })
            .catch(error => { failed(error) });

    }
}

export default FetchData;