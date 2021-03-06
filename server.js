
var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/routes');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.get('/', function(req, res) {
    res.sendfile('login.html');
});

app.get('/users', users.find);
app.post('/post', users.post);
app.post('/comment',users.commentAndLike);
app.post('/like', users.commentAndLike);
app.post('/user', users.modifyUser);
app.post('/follow', users.follow);
app.post('/login',users.login);
app.post('/newUser',users.newUser);
app.delete('/deleteUser', users.deleteUser);
app.delete('/deletePost', users.deletePost);
app.delete('/deleteComment', users.deleteComment);
app.delete('/repopulating',users.deleteAllUser);


app.set('port', (process.env.PORT || 3000));

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});