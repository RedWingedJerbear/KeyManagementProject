var mongoose = require('mongoose');

Schema = mongoose.Schema;

KeyRequestsSchema = new Schema({
        request_date : {type : Date, default: Date.now},
        request_department : String,
        request_email : String,
        request_name : String,
        request_919 : String,
        request_number : String,
        request_keys : [String],
        request_authorized : Boolean
});

module.exports = mongoose.model('KeyRequests', KeyRequestsSchema);
