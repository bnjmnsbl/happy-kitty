var tweet = require('./tweet');
var reply = require("./searchreply.js");

tweet.post();
reply.reply();
reply.retweet();
setInterval(tweet.post, 360000);
setInterval(reply.reply, 90000);
setInterval(reply.retweet, 90000);
