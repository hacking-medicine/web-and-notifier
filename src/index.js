var express = require('express');
var bodyParser = require('body-parser');

//var db = require('./db.js');


// Constants
var PORT = 3001;


// App
var app = express();
app.configure(function(){
 	app.use(bodyParser.json());
  	app.use(app.router);
  	app.use(express.static(__dirname + '/public'));
});




app.post('/', function(req, res){
	console.log('recived:');
	console.log(req.body);
	res.send('correct');
});



app.listen(PORT);
console.log('Running on http://localhost:' + PORT);