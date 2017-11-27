const express = require('express');
const episodeModel = require('./db.js');
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

// //Route for a specific season
// app.get('/api/:season', function(req, res) {
//   episodeModel.find(function(err, Episodes) {
//     let selectedEpisode = Episodes[0]._embedded.episodes.filter(episode => {
//       return episode.season === Number(req.params.season);
//     });
//     res.json(selectedEpisode);
//   });
// });
//
// //Route for all seasons
// app.get('/api', function(req, res) {
//   episodeModel.find(function(err, Episodes) {
//     if (err) return console.error(err);
//     res.json(Episodes[0]._embedded.episodes);
//   });
// });

module.exports = app;
