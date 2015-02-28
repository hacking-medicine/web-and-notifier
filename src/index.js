var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var sockets = require('./socket');

//var db = require('./db.js');


// Constants
var PORT = 3001;


// App

app.configure(function(){
	app.set('port', PORT);
 	app.use(bodyParser.json());
  	app.use(app.router);
  	app.use(express.static(__dirname + '/public'));
});




app.post('/', function(req, res){
	console.log('recived:');
	console.log(req.body);
	for (var i = 0; i < req.body.length; i++) {
		sockets.subscribers.notify(req.body[i].user_id,req.body[i]);
	};
	res.send('correct');
});


io.sockets.on('connection', sockets.socket);


server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
//app.listen(PORT);
//console.log('Running on http://localhost:' + PORT);