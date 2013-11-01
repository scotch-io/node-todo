// set up ======================================================================
var express  = require('express');
var app      = express();
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration ===============================================================

	// views
	app.set('views', __dirname + '/views'); 				// set location for views
	app.set('view engine', 'html');

	// express modules
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.cookieParser()); 						// read cookies
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT

// routes ======================================================================

	// main route
	app.get('*', function(req, res) {
		res.sendfile('./views/index.html');
	});

// listen ======================================================================
server.listen(8080);
console.log('Express app started on port 8080');