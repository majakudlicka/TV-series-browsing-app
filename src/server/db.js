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

module.exports = episodeModel;
