// set up ======================================================================
var express  = require('express');
var app      = express();
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration ===============================================================
app.set('views', __dirname + '/views'); 				//
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(express.logger('dev')); 						// log every request to the console
app.use(express.cookieParser()); 						// read cookies
app.use(express.bodyParser()); 							// pull information from html in POST
app.use(express.methodOverride()); 						// simulate DELETE and PUT

// routes ======================================================================
var site = require('./routes/index');

	// main routes
	app.get('/', function(request, response) {
		response.render('index', { title: 'Route Separation Example' });
	});

	app.get('/todos', site.index); 			// show all todos
	app.get('/todos/:id', site.single); 	// show single todo
	app.get('/todos/create', site.create); 	// show form for creation
	app.post('/todos/store', site.store); 	// store a todo
	app.get('/todos/edit', site.edit); 		// show form to edit

// listen ======================================================================
server.listen(8080);
console.log('Express app started on port 8080');