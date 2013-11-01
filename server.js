// set up ======================================================================
var express  = require('express');
var app      = express();
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

	// routes
	var routes = require('./routes/app');
	var api    = require('./routes/api');

// configuration ===============================================================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

app.configure(function() {

	// views
	app.set('views', __dirname + '/views'); 				// set location for views
	app.set('view engine', 'html');

	// express modules
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT

});

// routes ======================================================================

	// application
	app.get('*', app.index);

	// api
	app.get('/api/todos', api.all); 					// get all todos
	app.get('/api/todos/:todo_id', api.show); 			// get single todo
	app.post('/api/todos', api.create); 				// create todo
	app.put('/api/todos/:todo_id', api.edit); 			// edit todo
	app.delete('/api/todos/:todo_id', api.delete);    	// delete

// listen ======================================================================
server.listen(8080, function()
{
	console.log('App started on port 8080');
});
