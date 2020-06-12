class FetchData {
  constructor(url, login = "y", pwd = "y", uid = 101) {
    this.url = url;
    this.login = login;
    this.pwd = pwd;
    this.uid = uid; 
    this.token = "";
  }
  /**
   * Permet de récupérer le token
   * @param  {function} success callback
   * @param  {function} failed callback
   */
  getToken = (success, failed) => {
    fetch(this.url + "rest/session/token/") // endpoint ou point d'entrée
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur n'a pas répondu correctement");
        } else {
          // ça roule !
          return response.text(); // renvoie une promesse
        }
      })
      .then((token) => {
        console.log("token : ", token);
        this.token = token;
        success(token);
      })
      .catch((error) => {
        failed(error);
      });
  };
  /**
   * @param  {function} success
   * @param  {function} failed
   */
  getTerms = (success, failed) => {
    console.log('Dans getTerms ');
    fetch(this.url + "memo/themes/" + this.uid, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
      },
    })
      .then((response) => {
        console.log("data reçues dans createReqTerms avant json() :", response);
        if (response.status === 200) return response.json();
        else throw new Error("Problème de réponse ", response);
      })
      .then((data) => {
        console.log("data reçues dans getTerms :", data);
        success(data);
      })
      .catch((error) => {
        console.log('error catché dans getTerms', error);
        
        failed(error);
      });
  };
}
export default FetchData;
