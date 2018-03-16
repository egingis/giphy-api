$(document).ready(function () {
    // An array of options to search
    var actions = ["house music", "dubstep", "drum and bass", "wave", "bassnectar", "ozark", "bleep bloop", "kendrick lamar", "vayne", "ableton", "shambhala", "dj", "dance"];

    function displayGifButtons() {
        //empty div so no duplicates occur
        $("#gifButtons").empty();
        for (var i = 0; i < actions.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#addGif").on("click", function () {
            var action = $("#input").val().trim();
            if (action == "") {
                // added so user cannot add a blank button
                return false; 
            }
            actions.push(action);

            displayGifButtons();
            return false;
        });
    }

    function removeLastButton() {
        $("removeGif").on("click", function () {
            actions.pop(action);
            displayGifButtons();
            return false;
        });
    }
    // Function that displays gifs
    function displayGifs() {
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=mkGSGMeLDS7KMULJKPL8d6knzLezusV3";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                $("#gifsView").empty();
                var results = response.data;
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {
                    //gif div
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    // gif rating pull
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // gif pull
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    // still image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    // animated image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    // set image
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // pulling still image of gif
                    // adding div of gifs to gifsView div
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    addNewButton();
    removeLastButton();

    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});