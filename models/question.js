var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    sessionID: {type: Schema.Types.ObjectId, ref: 'Session'},
    pageID: {type: String, required: true},
    questionID: {type: String, required: true},
    questionData: {type: Schema.Types.Mixed},
	timestamp: {type: Schema.Types.Date, required: true}
});

module.exports = mongoose.model('Question', schema);
