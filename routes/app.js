exports.index = function(req, res) {
	res.sendfile('./app/views/layouts/main.html');
};