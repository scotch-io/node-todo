var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },
    quad: {
        type: String,
        default: 'imp-urg'
    }
});