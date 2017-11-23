const express = require('express');
const database = require('../database/database.json');
const app = express();

var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// app.use('/assets', express.static(__dirname + '/public'));
//
// app.use('/', function(req, res, next) {
//   console.log('Request Url:' + req.url);
//   next();
// });

// app.get('/', function(req, res) {
//   res.send(
//     '<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello world!</h1></body></html>'
//   );
// });
//
// app.get('/person/:id', function(req, res) {
//   res.send(
//     '<html><head></head><body><h1>Person: ' +
//       req.params.id +
//       '</h1></body></html>'
//   );
// });

app.get('/api', function(req, res) {
  res.json(database);
});

app.listen(port);
