const https = require("https");

class ResponseWriter {
  constructor(res) {
    this.res = res;
  }
  index() {
    this.htmlSuccess(`<h1>Hello Bob</h1>
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

    https
      .get(
        `https://api.meteo-concept.com/api/forecast/daily?insee=${city}&token=${token}`,
        (apiResponse) => {
          let data = "";

          // A chunk of data has been recieved.
          apiResponse.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          apiResponse.on("end", () => {
            const json = JSON.parse(data);
            
            //console.log(JSON.parse(data).explanation);
            this.htmlSuccess(`
              <h1>Météo à ${json.city.name}</h1>
            `);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
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
}
module.exports = ResponseWriter;
