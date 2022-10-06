var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
var history = [];

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    // store the data of favs.json into tweetinfo
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweets: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets

  // send tweetinfo and history array
   res.send({searchinfo:tweetinfo,history});
  
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.

  // request id, text, and created_at and store in variables
  var tweetID = req.body.id;
  var tweetName = req.body.text;
  var tweetTime = req.body.created_at;
  
  // push id, text, and created_at into array tweetinfo
  tweetinfo.push({
    id: Number(tweetID),
    text: tweetName,
    created_at: tweetTime
  })
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  // request userId
  var userID = req.body.userId;
 
  // push userID to array history
  history.push({id:Number(userID)});

  // send array tweetinfo
  res.send({searchinfo: tweetinfo});
  
 
});
  
  
  


//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets

  // request nm and userName and store into variables
  var newName= req.params.nm;
  var name = req.body.userName;

  var found = false;

  // search for user that has matching name as input
  // if found change that user's screen name to newName
  tweetinfo.forEach(function(tweet,index){
    if(!found && tweet.user.name === name){
      tweet.user.screen_name = newName;
    }
  });
 
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet

  // request tweetid and store into variable
  var id1 = req.params.tweetid;

  // store id1 as a number
  var numID = Number(id1);
  var found = false;
  
  // search each tweet id for matching id to the input
  // if match found, delete 1 item at that index in tweetinfo array
  tweetinfo.forEach(function(tweet, index){
    if (!found && tweet.id === numID){
      tweetinfo.splice(index,1);
    }
  });
 res.send('deleted');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});