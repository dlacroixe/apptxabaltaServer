var MongoClient = require('mongodb').MongoClient;
var events = require('events');
var event = new events.EventEmitter();
var client = null;


// Connection URL
var url = 'mongodb://dlacroixe:mongo007@ds039261.mongolab.com:39261/apptxabaltadb';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (!err) {
    client = db;
    console.log('database connected');
    event.emit('connect');
  } else {
    console.log('database connection error', err);
    event.emit('error');
  }
});

exports.get = function(fn) {
  if(client) {
    fn(client);
  } else {
    event.on('connect', function() {
      fn(client);
    });
  }
};
