var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    description : {
		type : String,
		required : true
	},
	date : {
		type : Date,
		required : true
	},
	splitMethod : {
		type : String,
		enum : ['EQUAL','UNEQUAL'],
		required : true
	},
	completed : {
		type : Boolean,
		default : false
	},
	totalAmount : {
		type : Number,
		required : true,
		default : 0.0
	}
});

var model = mongoose.model('Expense', schema);
module.exports = model;