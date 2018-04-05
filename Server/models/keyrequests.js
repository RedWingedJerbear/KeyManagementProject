var mongoose = require('mongoose');

Schema = mongoose.Schema;

KeyRequestsSchema = new Schema({
        request_date : {type : date, default: date.now},
        request_department : string,
        request_email : string,
        request_name : string,
        request_919 : string,
        request_number : string,
        request_keys : string,
        request_authorized : boolean
});

module.exports = mongoose.model('KeyRequests', KeyRequestsSchema);
