const http = require("http");
// destructuring
//const {ResponseWriter} = require('./response-writer');
// ou const {ResponseWriter} = require('./response-writer');
const ResponseWriter = require('./response-writer');
http
  .createServer((req, res) => {
    const responseWriter = new ResponseWriter(res);
    if (req.url === "/hello") {
      responseWriter.hello();
    } else if (req.url === "/weather") {
      responseWriter.weather(34172);
    }else {
      responseWriter.index();
    }
  })
  .listen(8000);
