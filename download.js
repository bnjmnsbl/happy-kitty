var fs = require('fs'),
    request = require('request'),
    path = require('path');
      
exports.filesafe = function(uri, filename, callback){
   
  request.head(uri, function(err, res, body){
      if (err) {console.log(err)}
      else {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
      
    request(uri).on("error", function(err) {
      console.log(err);
    }).pipe(fs.createWriteStream(filename)).on('close', callback)
    };
  });
};

/*exports.filesafe('http://thecatapi.com/api/images/get?format=src', 'cat.png', function(){
  console.log('File download done');
});*/
