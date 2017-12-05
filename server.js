var express = require("express");
var bodyParser = require("body-parser");
//import routes and give server access
//var burger_controller = require("./controllers/burgers_controller.js");
var exphbs = require("express-handlebars");
//var burger = require("./models/burger.js");
var app = express();

var port = process.env.PORT || 3000;

var db = require("./models");

//serve content from public folder
app.use(express.static("public"));

//sets body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//sets handlesbars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
//app.get("/", function(req, res) {
//	burger.all(function(data) {
//		var hbsObject = {
//			burgers: data
//		};
//		console.log(hbsObject)
//		res.render("index", hbsObject);
//	})
//})
//sets route to burger_controller
//app.use("/api/burgers", burger_controller);
db.sequelize.sync ({ force: false }).then(function() {
	app.listen(port, function() {
		console.log("server listening on port " + port)
	});
});