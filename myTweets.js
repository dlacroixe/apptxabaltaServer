var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'BtRb8qvuJhsSSuBtxt6WpCSpp',
  consumer_secret: '4WtySSflagxrUNnLTecQMU40rBu8UJJSCLJMolN5fQKysJg61b',
  access_token_key: '3075832239-JDGUwETfFGeSHbKlOe1CofHc4ERAtqopAoJcD2W',
  access_token_secret: 'QIUOdvEfaCL6yQm4RDWjfZcQGps5Z1TmpPZBMqnc5Lp4s'
});


module.exports = {

  stream: function(element, callback){
    // "statuses/filter" para filtrar por palabra
    client.stream('user', {track: element}, function(stream) {
      stream.on('data', function(tweet) {
        console.log(tweet.text);
        callback(tweet);
      });

      stream.on('error', function(error) {
        throw error;
      });
    });
  }
}
