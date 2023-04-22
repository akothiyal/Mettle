var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var schema = new Schema({
    timestamp: {type: Schema.Types.Date, required: true},
    name: {type: String, required: true},
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    userID2: {type: Schema.Types.ObjectId, ref: 'User'},
    //remove groupID: {type: Schema.Types.ObjectId, ref: 'Group'}
});

schema.plugin(mongoosePaginate);


module.exports = mongoose.model('Session', schema);
