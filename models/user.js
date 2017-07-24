var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alias : {
        type : String,
        required : false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required:true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    active : {
        type : Boolean,
        required : false,
        default : true
    },
    regMode : {
        type : String,
        default : 'LOCAL',
        required : false,
		enum : ['LOCAL','FACEBOOK']
    }
});
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return (password==this.password);
};
var userModel = mongoose.model('User', userSchema);
module.exports = userModel;