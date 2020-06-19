const fs = require('fs');

const miniExpress = require('./mini-express');

const app = miniExpress();

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

const favicon = (iconPath) => {
  return (req, res, next) => {
    if (req.method.toLowerCase() === 'get'
        && req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-type': 'image/x-icon'});
      const iconReadable = fs.createReadStream(iconPath);
      iconReadable.pipe(res)
        // .on('finish') {
        //   next();
        // }
    } else {
      next();
    }
  };
};
// const faviconMiddleware = favicon(__dirname + '/favicon.ico');
// app.use(faviconMiddleware);
app.use(favicon(__dirname + '/toto.ico'));



// app.get('/favicon.ico', (req, res) => {
//   res.writeHead(200, {'Content-type': 'image/x-icon'});
//   const iconReadable = fs.createReadStream(__dirname + '/favicon.ico');
//   iconReadable.pipe(res)
// });
  
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.end('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});