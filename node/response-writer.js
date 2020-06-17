const https = require("https");

class ResponseWriter {
  constructor(res) {
    this.res = res;
  }
  index() {
    this.htmlSuccess(`<h1>Hello Bob</h1>
    <p><img src="/weather.jpg" alt=""/></p>
    <p><a href="./hello">Heure du serveur ?</a></p>
    <p><a href="./weather">Météo à Mtp</a></p>
    `);
  }
  hello() {
    const now = new Date();
    const timeString = `
          ${now.getHours()} h 
          ${("0" + now.getMinutes()).slice(-2)}
          `;

    this.htmlSuccess(` 
    <h1>... Tu voulais l'heure ? la voilà !</h1>
    <p>Il est ${timeString}</p>
    <a href="/">Retour accueil</a>`);
  }
  weather(city) {
    const token =
      "08ddcc5675b44ea1f2c567010e544d25c47ca45a8392efc9ff693e471ebee936";
    const weatherApiUrl = `https://api.meteo-concept.com/api/forecast/daily?insee=${city}&token=${token}`;
    const headers = { Accept: "application/json" };
    https.get(weatherApiUrl, { headers }, (apiResponse) => {
      let responseData = "";

      // on se branche sur les événements data ici : on reçoit des bouts de réponse
      apiResponse.on("data", (chunk) => {
        responseData += chunk; // renvoit un buffer (série d'octets)
        // la concaténation appelle la méthode toString. Ici ça se passe bien
        // parece qu'il n'y a pas de caractères spéciaux ou que c'est déjà dans l'UTF-8
        console.log("chunk : " + chunk); 
      });
      // on se branche sur les événements data ici : on a reçu toutes les données
      apiResponse.on("end", () => {
        const json = JSON.parse(responseData);
        const tableRows = json.forecast
          .map((f) => `<tr><td>${f.tmin}</td><td>${f.tmax}</td></tr>`)
          .join("");
        this.htmlSuccess(`
                <h1>Météo à ${json.city.name}</h1>
                <table>
                  <tr><th>T° min</th><th>T° max</th></tr>
                  ${tableRows}
                </table>
            `);
      });
    });
  }
  htmlSuccess(bodyContent) {
    this.res.writeHead(200, { "Content-Type": "text/html" });
    this.res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>${bodyContent}</body>
    </html>`);
  }
  htmlError(status, message) {
    this.res.writeHead(status, { "Content-Type": "text/html" });
    this.res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>Erreur - Status : ${status} - Message : ${message}</body>
    </html>`);
  }
}
module.exports = ResponseWriter;
