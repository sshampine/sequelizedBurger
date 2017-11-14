var express = require("express")
//import the model to use its database functions
var burger = require("../models/burger.js")
var router = express.Router();

//creats routes and sets up logic within
router.post("/", function(req, res) {
	burger.create(["burger_name"], [req.body.name], function(result) {
		res.json({ id: result.insertId })
	})
});

router.put("/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	console.log("condtion", condition);
	burger.update({
		devoured: req.body.devoured
	}, condition, function(result) {
		if (result.changedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
		
	})
})

router.delete("/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	console.log("condition", condition)
	burger.delete(condition, function(result) {
		if (result.affectedRows == 0) {
  //   If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
	})
})

//exports routes for server to use
module.exports = router;
