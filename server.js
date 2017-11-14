var express = require("express");
var bodyParser = require("body-parser");
//import routes and give server access
var burger_controller = require("./controllers/burgers_controller.js");
var exphbs = require("express-handlebars");
var burger = require("./models/burger.js");
var app = express();

var port = process.env.PORT || 3000;

//serve content from public folder
app.use(express.static("public"));

//sets body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sets handlesbars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
	burger.all(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject)
		res.render("index", hbsObject);
	})
})
//sets route to burger_controller
app.use("/api/burgers", burger_controller);

app.listen(port)