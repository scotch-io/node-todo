/**
	All Todos
*/
exports.index = function(req, res) {
	res.send('all todos (via api)')
};

/**
	Get a single todo
*/
exports.show = function(req, res) {
	res.send('get single todo #' + req.params.todo_id + ' (via api)' )
}

/**
	Create todo
*/
exports.create = function(req, res) {
	res.send('creating todo (via api)')
}

/**
	Edit todo
*/
exports.edit = function(req, res) {
	res.send('edit todo #' + req.params.todo_id + '(via api)')
}

/**
	Delete a todo
*/
exports.delete = function(req, res) {
	res.send('delete todo #' + req.params.todo_id + ' (via api)')
}
