// set up ======================================================================
var express  = require('express');
var app      = module.exports = express();
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

	// routes
	var routes = require('./routes/app'); 				// link to routes file for frontend application (routes/app.js)
	var api    = require('./routes/api'); 				// link to routes file for api (routes/api.js)

// configuration ===============================================================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongodb database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// routes ======================================================================

	// home page
	app.get('/', routes.index);

	// api
	app.get('/api/todos', api.index); 					// get all todos
	app.get('/api/todos/:todo_id', api.show); 			// get single todo
	app.post('/api/todos', api.create); 				// create todo
	app.put('/api/todos/:todo_id', api.edit); 			// edit todo
	app.delete('/api/todos/:todo_id', api.delete);    	// delete

	// application
	app.get('*', routes.index);

// listen ======================================================================
server.listen(8080);
console.log("App listening on port 8080");
