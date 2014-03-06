var mongoose = require('mongoose');
var User = require('./models/user.js');
var Coordinator = require('./models/coordinator.js');
var Driver = require('./models/driver.js');
var Ride = require('./models/ride.js');
var Rider = require('./models/rider.js');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var MONGO = {
    uri: process.env.MONGOHQ_URL || 'mongodb://localhost/disgoDB',
    options: {
        server:{
            auto_reconnect: true,
            poolSize: 10,
            socketOptions:{
                keepAlive: 1
            }
        },
        db: {
            numberOfRetries: 10,
            retryMiliSeconds: 1000
        }
    }
}

mongoose.connect(MONGO.uri, MONGO.options);

// Do the initialization here

// Step 1: load the JSON data
var users_json = require('./users.json');

// Step 2: Remove all existing documents
User.model
  .find()
  .remove()
  .exec(function(){ console.log("done wiping users"); }); // callback to continue at

/*Coordinator.model
  .find()
  .remove()
  .exec(onceClear);*/

/*  .find()
  .remove()
  .exec(onceClear);*/

Ride.model
  .find()
  .remove()
  .exec(function(){ console.log("done wiping rides"); });

/*Rider.model
  .find()
  .remove()
  .exec(onceClear);*/

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  /*var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var user = new User.model(json);

    user.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }*/
}