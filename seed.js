var db = require('./models');

var new_music =[
    {
    name: "Calvin Harris",
    songName: "Bounce",
    },
    {
    name: "David Guetta",
    songName: "Memories",
    },
    {
    name: "Marshmello",
    songName: "Alone",
    }
];

db.music.remove({}, function(err, music){
    if (err) {
        return console.log('Error:', err);
    } else {
        return console.log("success", music)
    }
db.music.create(new_music, function(err, music){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new musical", music)
  process.exit(); 
    })
});
