var app     =     require("express")();
var http    =     require('http').Server(app);
var io      =     require("socket.io")(http);
var GCM     =     require('gcm').GCM;
var feed    =     require("feed-read");
var scrap   =     require("./scraping.js");
var tweets  =     require("./myTweets.js");
var db      =     require("./db.js");





// tweets.stream("apptxabalta", function(data){
//   console.log(data);
// });


scrap.call("http://goiena.eus/aretxabaleta", ".item", function(err, res){

  var doc = null;

  if(!err ){
    console.log(res);
    for(i=0;i < res.length; i++){
      doc = res[i];

      db.get(function(client) {
        //insert record
        client.collection('news').insert(doc, function(err, records) {
          if (err) throw err;
          console.log("Record added as "+records[0]._id);
        });
      });

    }


  }else{
    console.log(err);
  }
});




/*var apiKey = 'AIzaSyAjitIGxVX4uQFWjz-hAz07amyXcB-5pyI';
var gcm = new GCM(apiKey);

feed("http://feeds.weblogssl.com/xataka2", function(err, articles) {
  if (err) throw err;
  // Each article has the following properties:
  //
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  //



  for(i=0;i<2;i++){

    var article = articles[i];
    console.log(article.title);
    var message = {
        registration_id: 'APA91bEJ9LgtEE-BmNPijKb96ZPv82YIBQLzsabXzD6CR0kw_6C3ukf6ziTlWrKwtr-ItqjZXh2pcx9tD7XSH4eJjCOqwhu0kJlWdNh4W8S9ODBLE2ZRVCOi_rAqtRomk6Aqumw7crJzQwBNrxxnW5XE6TB6hVv--Q', // required
        collapse_key: 'lol',
        'data.key1': article.title
    };

    gcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Sent with message ID: ", messageId);
        }
    });
  }


});*/



app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});

/*  This is auto initiated event when Client connects to Your Machien.  */

io.on('connection',function(socket){
    console.log("A user is connected");
    socket.on('status added',function(status){
      add_status(status,function(res){
        if(res){
            io.emit('refresh feed',status);
        } else {
            io.emit('error');
        }
      });
    });
});

var add_status = function (status,callback) {
  console.log(status);
  callback(true);
  return;
}

http.listen(3000,function(){
    console.log("Listening on 3000");
});
