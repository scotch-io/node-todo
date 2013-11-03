// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var server   = require('http').createServer(app); 		// setup http server
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration ===============================================================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// define model ================================================================
var Todo = mongoose.model('Todo', {
	text : String,
	done : Boolean
});

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);
		});


	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		res.send('delete todo #' + req.params.todo_id + ' (via api)');
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

// listen (start app with node server.js) ======================================
server.listen(8080);
console.log("App listening on port 8080");