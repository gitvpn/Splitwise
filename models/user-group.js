var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numberOfUsers: {
        type: Number,
        required: true,
        default:0,
    },
    admin: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true,
        default:true
    }
});
var model = mongoose.model('UserGroup', schema);
module.exports = model;