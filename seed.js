// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }
//
//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

// HOBBY STUFF
var new_hobby = {hobby: "hike"}

db.HobbiesCollection.create(new_hobby, function(err, hobby){
  if(err){
    return console.log('Error', err);
  }
  console.log("created new hobby!", hobby._id)
  process.exit();// we're all done! exit the program.
})