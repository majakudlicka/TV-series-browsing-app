const express = require('express');
const episodeModel = require('./db.js');
var bodyParser = require('body-parser');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/:season', function(req, res) {
  episodeModel.find(function(err, Episodes) {
    let selectedEpisode = Episodes[0]._embedded.episodes.filter(episode => {
      return episode.season === Number(req.params.season);
    });
    res.json(selectedEpisode);
  });
});

app.get('/api', function(req, res) {
  episodeModel.find(function(err, Episodes) {
    if (err) return console.error(err);
    res.json(Episodes[0]._embedded.episodes);
  });
});

module.exports = app;
