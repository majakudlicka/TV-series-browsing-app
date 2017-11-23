const express = require('express');
const mongoose = require('mongoose');

//The string should be replaced with a hidden enironment variable in production code
mongoose.connect('mongodb://test:test@ds119736.mlab.com:19736/episodes-dev');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

const episodeSchema = mongoose.Schema({
  name: String,
  url: String,
  _embedded: Object,
});

const episodeModel = mongoose.model('Episode', episodeSchema);

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
  episodeModel.find(function(err, Episodes) {
    if (err) return console.error(err);
    res.json(Episodes[0]._embedded.episodes);
  });
});

app.get('/api/:season', function(req, res) {
  selectedEpisode = database._embedded.episodes.filter(episode => {
    return episode.season === season;
  });
  res.json(selectedEpisode);
});

app.listen(port);
