// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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



app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Welcome to my remy's awesome api",
    documentation_url: "https://github.com/rover33/express-personal-api/blob/master/README.md",
    base_url: "https://tranquil-brushlands-55213.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about REMY PEARLSTONE"},
      {method: "POST", path: "/api/music", description: "E.g. Create new music artists"} 
    ]
  })
});

app.get('/api/profile', function(req,res){
  res.json({
    name: "Remy Pearlstone",
    github_link: "https://github.com/rover33/",
    github_profile_image: "https://avatars3.githubusercontent.com/u/17019181?s=400&v=4",
    current_city: 'Denver', 
    pets:[{name: "jin", species: "humanoid"}, {name: "kevin james", species: "Wanabe"}]
  })
})

app.get('/api/music', function(req,res){
  db.music.find(function(err, music){
    if (err) {
      return console.log ("Error:", err)
    }
    res.json(music)
  })

})

app.get('/api/music/:id', function(req,res){
  db.music.findById(req.params.id, function(err, music){
    if (err) {return console.log("You are fucked:", + err)}
    res.json(music);
  })
})

app.post('/api/music', function(req,res){
  var newMusic = new db.music({
    name: req.body.name,
    songName: req.body.songName,
  })

  newMusic.save(function(err, music){
    if (err) {
      return console.log("create error: " + err);
    }
    console.log("created ", music.name);
    res.json(music);
  });
});

app.put('/api/music/:id', function(req, res){
  db.music.findOneAndUpdate({_id: req.params.id }, {$set: {name: req.body.name, songName: req.body.songName}}, {new: true}, function(err, music){
    if (err) {return console.log("You failed:", + err)}
    res.json(music);
  })
})

app.delete('/api/music/:id', function (req, res) {
  console.log(req.params)
  var musicId = req.params.id;

  db.music.findOneAndRemove({ _id: musicId }, function (err, deletedMusic) {
    res.json(deletedMusic);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
