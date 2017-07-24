var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    userGroupId: {
        type: String,
        required: true
    },
    groupMembers: {
        type: [String],
        required: false
    }
});
var model = mongoose.model('UserGroupMapping', schema);
module.exports = model;