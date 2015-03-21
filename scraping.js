
var request = require("request");
var cheerio = require("cheerio");

module.exports = {

    call : function(url, element, callback){
        // The URL we will scrape from - in our example Anchorman 2.
        console.log("callll");

        // The structure of our request call
        // The first parameter is our URL
        // The callback function takes 3 parameters, an error, response status code and the html

        request(url, function(error, response, html){

            var arrayNews = [];
            // First we'll check to make sure no errors occurred when making the request

            var json = { title : "", href : "", video : "", resume : "", text : "", date : "",author : "", hoto : ""};

            if(!error){
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                console.log("bien");
                var $ = cheerio.load(html);

                var elements = $(".item");

                // for (var i = 0; i < elements.length - 1; i++) {
                for (var i = 0; i < 5; i++) {

                    // Reset json values
                    json = { title : "", href : "", video : "", resume : "", text : "", date : "",author : "", hoto : ""};

                    var element = elements[i];
                    console.log("-----------------------------");

                    if(element.children[1].children[0].children != undefined){
                        json.title = element.children[1].children[0].children[0].data;
                    }
                    if(element.children[1].children[0].attribs != undefined){
                        json.href = "www.goiena.eus/"+element.children[1].children[0].attribs.href;
                    }
                    if(json.video = element.children[5] != undefined){
                        json.video = element.children[5].attribs.src;
                    }
                    if(element.children[7] != undefined && element.children[7].children[0] != undefined){
                        json.text = element.children[7].children[0].data;
                    }
                    if(element.children[8] != undefined && element.children[8].children  != undefined){
                        json.resume = element.children[8].children[0].data;
                    }


                    console.log("title  : "+json.title);
                    console.log("href   : "+json.href);
                    console.log("resume : "+json.resume);
                    console.log("text   : "+json.text);

                    arrayNews.push(json);


                };

                // Finally, we'll define the variables we're going to capture



                callback (false, arrayNews);
            }
            else{
                callback (error, null);
            }
        })

    }
}
