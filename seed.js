var db = require('./models');

var new_music = {description: "edm music for life"}

db.music.create(new_music, function(err, music){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new musical sounds", music._id)
  process.exit(); 
})
