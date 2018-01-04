var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MusicSchema = new Schema({
  name: String,  
  songName: String

});

var music = mongoose.model('music', MusicSchema);

module.exports = music;