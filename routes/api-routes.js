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

 	app.get("/api/burgers", function(req, res) {
 		db.burger.findAll({}).then(function(dbBurger) {
 			res.json(dbBurger);
 		})
 	})

 	app.post("/api/burgers", function(req, res) {
 		db.burger.create({
 			burger_name: req.body.name,
 			devoured: req.body.devoured
 		}).then(function(dbBurger) {
 			console.log(dbBurger)
 			res.json(dbBurger)
 		})
 		.catch(function(err) {
 			res.json(err)
 		})
 	})

 	app.put("/api/burgers/:id", function(req, res) {
 		db.burger.update({
 			devoured: true}, 
 		{
 			where: {
 				id: req.params.id
 			}
 		}).then(function(dbBurger) {
 			res.json(dbBurger)
 		})
 		.catch(function(err) {
 			res.json(err)
 		})
 	})

 	app.delete("/api/burgers/:id", function(req, res) {
 		console.log("burger to delete: " + req.params.id)
 		db.burger.destroy({
 			where: {id: req.params.id}
 		}).then(function(deleteBurger) {
 			res.json(deleteBurger)
 		})
 	})
 }