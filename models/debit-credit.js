var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    userId : {
		type : String,
		required : true
	},
	friendUserId : {
		type : String,
		required : true
	},
	debtAmount : {
		type : Number,
		required : true
	},
	expenseId : {
		type : String,
		required : true
	},
	type : {
		type : String,
		required : true,
		enum : ['Debit','Credit']
	}
});

var model = mongoose.model('DebitCredit', schema);
module.exports = model;