//jquery to grab html handlers from dom

$(function() {
	$(".devour-burger").on("click", function(event) {
		var id = $(this).data("id");

		var newEatState = {
			devoured: true
		};

		$.ajax("/api/burgers/" + id, {
			//send PUT request
			type: "PUT",
			data: newEatState
		}).then(
		function() {
			console.log("changed devoured to ");
			location.reload();
		}
		)
	});

	$(".create-form").on("submit", function(event) {
		event.preventDefault();

		var newBurger = {
			name: $("#burg").val().trim(),
		}
		$.ajax("api/burgers/", {
			//send POST reqeust
			type: "POST",
			data: newBurger
		}).then(function(){
			console.log("created new burger")
			//reloads the page to get updated list
			location.reload();
		})
	})

	$(".poop-burger").on("click", function(event) {
		var id = $(this).data("id");
		console.log(id)
		$.ajax("/api/burgers/" + id, {
			//send DELETE request
			type: "DELETE",
		}).then(
			function() {
				console.log("deleted burger, " + id);
				//reloads the page to get updated list
				location.reload()
			}
		)
	})

	
})