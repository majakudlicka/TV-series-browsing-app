const express = require('express');
const router = express.Router();
const episodeModel = require('./db.js');

//Route for a specific season
router.get('/api/:season', function(req, res) {
  episodeModel.find(function(err, Episodes) {
    let selectedEpisode = Episodes[0]._embedded.episodes.filter(episode => {
      return episode.season === Number(req.params.season);
    });
    res.json(selectedEpisode);
  });
});

//Route for all seasons
router.get('/api', function(req, res) {
  episodeModel.find(function(err, Episodes) {
    if (err) return console.error(err);
    res.json(Episodes[0]._embedded.episodes);
  });
});

module.exports = router;
