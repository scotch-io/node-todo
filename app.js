// set up ======================================================================
var express  = require('express');
var app      = express();
var server   = require('http').createServer(app); 		// setup http server
var io       = require('socket.io').listen(server); 	// socket.io
var mongoose = require('mongoose'); 					// mongoose for mongodb

// routes ======================================================================
var site = require('./routes/index');

	// main routes
	app.get('/todos', site.index); 			// show all todos
	app.get('/todos/:id', site.single); 	// show single todo
	app.get('/todos/create', site.create); 	// show form for creation
	app.post('/todos/store', site.store); 	// store a todo
	app.get('/todos/edit', site.edit); 		// show form to edit

// listen ======================================================================
server.listen(8080);
console.log('Express app started on port 8080');