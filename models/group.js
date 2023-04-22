var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true},
    user1ID: {type: Schema.Types.ObjectId, ref: 'User'},
    user2ID: {type: Schema.Types.ObjectId, ref: 'User'},
    timestamp: {type: Schema.Types.Date, required: true}
});

module.exports = mongoose.model('Group', schema);
