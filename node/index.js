const http = require('http');


const ResponseWriter = require('./response-writer');

http
  .createServer((req, res) => {
    const responseWriter = new ResponseWriter(res);
    if (req.url === "/hello") {
      responseWriter.hello();
    } else if (req.url === "/weather") {
      responseWriter.weather(34172);
    } else if (req.url === "/weather.jpg") {
      responseWriter.file("weather.jpg");
    //   res.writeHead(200, {
    //     'Content-Type': 'image/jpeg',
    //     'Content-Encoding': 'gzip'
    // });
    // const fileReadable = fs.createReadStream(__dirname + '/weather.jpg');
    // fileReadable.on('end', () => console.log('Lecture terminée'));
    // const gzipTransform = zlib.createGzip();
    // fileReadable.pipe(gzipTransform).pipe(res);
    // ######################""
      // res.writeHead(200, { "Content-type": "image/jpg" });
      // fsPromises.readFile(__dirname + '/weather.jpgrr')
      //   .then(data => res.end(data))
      //   .catch(err => {
      //     responseWriter.htmlError(404, "image introuvable");
      //   });
      //read the image using fs and send the image content back in the response
      // fs.readFile(__dirname + '/weather.jpg', function (err, content) {
      //   if (err) {
      //     res.writeHead(400, { "Content-type": "text/html" });
      //     console.log(err);
      //     res.end("No such image");
      //   } else {
      //     //specify the content type in the response will be an image
      //     res.writeHead(200, { "Content-type": "image/jpg" });
      //     res.end(content);
      //   }
      // });
    } else if (req.url === "/") {
      responseWriter.index();
    } else {
      responseWriter.htmlError(404, "Page introuvable");
    }
  })
  .listen(8000);
