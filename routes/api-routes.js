var db = require("../models")

 module.exports = function(app) {
 	app.get("/", function(req, res) {
 		db.burger.findAll({}).then(function(dbBurger) {
 			var hbsOjbect = {
 				burgers: dbBurger
 			}
 			res.render("index", hbsOjbect);
 		})
 	})

 	app.post("/api/burgers/:id", function(req, res) {
 		db.burger.create({
 			burger_name: req.body.burger_name,
 			devoured: req.body.devoured
 		}).then(function(dbBurger) {
 			res.json(dbBurger)
 		})
 		.catch(function(err) {
 			res.json(err)
 		})
 	})

 	app.put("/api/burgers/:id", function(req, res) {
 		db.burger.update({
 			devoured: true
 		}).then(function(dbBurger) {
 			res.json(dbBurger)
 		})
 		.catch(function(err) {
 			res.json(err)
 		})
 	})
 }