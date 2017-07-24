var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    userId : {
		type : String,
		required : true
	},
	amountSpentByUser : {
		type : Date,
		required : true
	},
	expenseId : {
		type : String,
		required : true
	}
});

var model = mongoose.model('Transaction', schema);
module.exports = model;