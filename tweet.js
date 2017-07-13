var     Twit = require('twit'),
        fs = require('fs'),
        path = require('path'),
        config = require(path.join(__dirname, 'config.js')),
        download = require('./download'),
        b64content;
 
var T = new Twit(config);

exports.post = function() {
  
  download.filesafe('http://thecatapi.com/api/images/get?format=src', 'cat.png', function() {
  console.log("Image downloaded!Now posting!");
  
  b64content = fs.readFileSync('cat.png', { encoding: 'base64' })
  

// first we must post the media to Twitter 
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and 
  // other text-based presentations and interpreters 
  if (err) console.log(err);
  console.log(data)
  var mediaIdStr = data.media_id_string
  var altText = "Here's a picture of a cat to cheer you up!"
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  
   T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (err) console.log(err);
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet) 
      var params = { status: ' ', media_ids: [mediaIdStr] }
 
      T.post('statuses/update', params, function (err, data, response) {
        if (err) throw err;
        console.log(data)
        console.log("Tweeting complete!");
      })
    }
  })
})
})
}