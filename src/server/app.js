const express = require('express');
const database = require('../database/database.json');
const mongoose = require('mongoose');
// const env = require('env2');
// env('./config.env');

mongoose.connect('mongodb://test:test@ds119736.mlab.com:19736/episodes-dev');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

var episodeSchema = mongoose.Schema({
  name: String,
});

var episodeModel = mongoose.model('Episode', episodeSchema);

var silence = new episodeModel({name: 'Silence'});
console.log(silence.name); // 'Silence'

episodeSchema.methods.speak = function() {
  var greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name";
  console.log(greeting);
};

var Episode = mongoose.model('Episode', episodeSchema);

var fluffy = new Episode({name: 'fluffy'});
// fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function(err, fluffy) {
  if (err) return console.error(err);
  // fluffy.speak();
});

Episode.find(function(err, Episodes) {
  if (err) return console.error(err);
  console.log('Episodes are ', Episodes);
});

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
  res.json(database._embedded.episodes);
});

app.get('/api/:season', function(req, res) {
  selectedEpisode = database._embedded.episodes.filter(episode => {
    return episode.season === season;
  });
  res.json(selectedEpisode);
});

// Episodes.find(res => {
//   console.log('res is', res);
// });

app.listen(port);
