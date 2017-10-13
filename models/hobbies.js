var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HobbySchema = new Schema({
  hobby: String
});

var HobbiesCollection = mongoose.model('Hobbies', HobbySchema);

module.exports = HobbiesCollection;