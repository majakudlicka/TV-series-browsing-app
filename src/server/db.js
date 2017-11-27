const mongoose = require('mongoose');
const DB_URI = require('./config.json');

mongoose.connect(DB_URI.DBHost);

//Connecting to MongoDB
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
