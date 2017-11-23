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

app.get('/api', function(req, res) {
  res.json(database);
});

app.get('/api/:season', function(req, res) {
  selectedEpisode = database._embedded.episodes.filter(episode => {
    return episode.season === season;
  });
  res.json(selectedEpisode);
});

app.listen(port);
