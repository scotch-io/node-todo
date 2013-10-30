exports.index = function(req, res) {
  res.send('routing!');
};

exports.single = function(req, res) {
	res.send(req.params.id);
};

exports.create = function(req, reponse) {

};

exports.store = function(req, res) {

};

exports.edit = function(req, res) {

};