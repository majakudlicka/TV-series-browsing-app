const express = require('express');
const routes = require('./routes.js');

const app = express();

//Sets headers to accept cross origin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', routes);

module.exports = app;
