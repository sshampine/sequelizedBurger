//imports the ORM to create functions that will interact with the db
var orm = require("../config/orm.js")

var burger = {
	all: function(callback) {
		orm.all("burgers", function(results) {
			callback(results)
		})
	},
	create: function(cols, vals, callback) {
		orm.create("burgers", cols, vals, function(results) {
			callback(results)
		})
	},
	update: function(objVals, condition, callback) {
		orm.update("burgers", objVals, condition, function(results) {
			callback(results)
		})
	},
	delete: function(condition, callback) {
		orm.delete("burgers", condition, function(results) {
			callback(results)
		})
	}
};


//exports the db functions for the controller
module.exports = burger;
