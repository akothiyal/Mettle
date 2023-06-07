var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	sessionID: {type: Schema.Types.ObjectId, ref: 'Session'},
    pageID: {type: String, required: true},
    roleUser1:{type: String},
    roleUser2:{type: String},
    timestamp: {type: Schema.Types.Date, required: true},
	logData: {type: String, required: true}
});

module.exports = mongoose.model('Log', schema);
