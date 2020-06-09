  /**
   * 
   * @param  {string} url
   * @param  {string} method='GET'
   * @param  {boolean} async=true
   */
  export default class Xhr {
  constructor(url, success, failed, method = 'GET', async = true) {
    this.url = url;
    this.method = method;
    this.async = async;

    this.req = new XMLHttpRequest();
    this.req.open(this.method, this.url, this.async);
    this.req.send(null);

    // gestion des événements
    // asynchrone donc on donne la référence sans appel immédiat ()
    this.req.onload = () => {
      this.getData(event, success, failed);
    };
  }
  getData(event, success, failed) {
    console.log('this.req : ', this.req);
    // On teste directement le status de notre instance de XMLHttpRequest
    if (this.req.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      // vérification que le json est valide
      try {
        const data = JSON.parse(this.req.responseText);
        console.log("Contenu parsé : ", data);
        success(data);
      } catch (e) {
        //console.error("Parsing error in getData:", e);
        failed(e.message);
      }
  
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.req.status, this.req.statusText);
    }
  }
}


