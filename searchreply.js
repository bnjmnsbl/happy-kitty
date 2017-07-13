var     Twit = require('twit'),
        fs = require('fs'),
        path = require('path'),
        config = require(path.join(__dirname, 'config.js')),
        T = new Twit(config);
        
exports.retweet = function() {
    
    var params = {
        q: 'catcontent' // REQUIRED
      }
    
    T.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication?...Tweet ID was ' + retweetId);
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...: ' + err);
        }
    });
}

exports.reply = function() {
        var b64content = fs.readFileSync('cat.png', { encoding: 'base64' })
        var params = {
        q: ':(', // REQUIRED
        lang: "en"
      }
    
    T.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to reply
            var replyID = data.statuses[0].id_str;
            var userName = data.statuses[0].user.screen_name;
            console.log(userName + " writes: " + data.statuses[0].text)
        
        // UPLOAD IMAGE //       
        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        if (err) console.log(err);
        var mediaIdStr = data.media_id_string
        var altText = "Here's a picture of a cat to cheer you up!"
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
   
        T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (err) console.log(err);
        if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet) 
      var params = {
                in_reply_to_status_id: replyID, 
                status: '@' + userName + " You seem sad :(. Here is a picture of a cat to cheer you up!",
                media_ids: [mediaIdStr] }
 
        T.post('statuses/update', params, function(err, data, response) {
                if (!err) {
                        console.log(data);
                }
        })
    }});
})
}})
}



