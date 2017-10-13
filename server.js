// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/campsites', function campSites(req, res){
  // console.log(data)
  res.json({campsites: "campsites"})
})

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});
//GET MY PROFILE DATA AND RETURN AS JSON
app.get('/api/profile', function apiProfile(req, res){
  console.log("you made it into the profile api route!")
  console.log(req.params)
  res.json({
    name: 'Stephanie Snopek',
    github: "https://github.com/snopeks",
    linkedIn: "https://www.linkedin.com/in/snopeks/",
    favFood: "ice-cream!",
    petName: "River",
    species: "felis catus",
    hobbies: "so many"
  })
})
///TODO: GET ALL HOBBIES
app.get('/api/hobbies', function getAllHobbies(req, res){
  db.HobbiesCollection.find({}, { hobby: true })
  .exec(function getAllHobbies(err, allHobbies){
    if(err) { return console.log("index error: " + err); }
    res.json(allHobbies)
  });
});
//TODO: GET ONE HOBBY
app.get('/api/hobbies/:id', function getOneHobby(req, res){
  console.log(req)
  res.json({
    hobby: "view one hobby"
  })
});

//POST A NEW HOBBY TO THE HOBBY RESOURCE
app.post('/api/hobbies', function addHobby(req, res){
  console.log(req.body.hobby)
  //the "hobby" part comes from the name i set in index.html
  db.HobbiesCollection.create(req.body, function (err, createdHobby){
    if (err){
      return console.log("could not create new hobby!", err)
    }
    res.json({
      newHobby: createdHobby.hobby
    })
  })
});

//TODO: UPDATE HOBBY
app.put('/', function updateHobby(req, res){
  console.log(req.params)
  res.json({
    updatedHobby: "the updated hobby"
  })
})
//TODO: DELETE HOBBY
app.delete('/', function deleteHobby(req, res){
  console.log(req)
  res.json({
    deletedHobby: "the hobby I deleted"
  })
})
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
