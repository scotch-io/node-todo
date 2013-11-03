// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration ===============================================================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongodb database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {
		res.send('all todos (via api)');
	});

	// get single todo
	app.get('/api/todos/:todo_id', function(req, res) {
		res.send('get single todo #' + req.params.todo_id + ' (via api)');
	});

	// create todo
	app.post('/api/todos', function(req, res) {
		res.send('creating todo (via api)');
	});

	// edit a todo
	app.put('/api/todos/:todo_id', function(req, res) {
		res.send('edit todo #' + req.params.todo_id + '(via api)');
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		res.send('delete todo #' + req.params.todo_id + ' (via api)');
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./app/views/index.html');
	});

// listen ======================================================================
server.listen(8080);
console.log("App listening on port 8080");

// hello