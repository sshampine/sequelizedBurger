//imports mysql connection
var connection = require("../config/connection.js")

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


//object for SQL statement functions
var orm = {
	all: function(tableInput, callback) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(error, result) {
			if (error) {
				throw error;
			}
			callback(result);
		})
	},

	create: function(table, cols, vals, callback){
		var queryString = "INSERT INTO " + table;
		
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(error, result) {
			if (error) {
				throw error
			}
			callback(result)
		})
	},

	update: function(tableInput, objVals, condition, callback) {
		var queryString = "UPDATE " + tableInput;
		queryString += " SET ";
		queryString += objToSql(objVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(error, result) {
			if (error) {
				throw error;
			}
			callback(result)
		})
	},

	delete: function(table, condition, callback) {
		var queryString = "DELETE FROM " + table
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(error, result) {
			if (error) {
				throw error;
			}
			callback(result)
		})
	}
}

//exports the orm for the model
module.exports = orm;