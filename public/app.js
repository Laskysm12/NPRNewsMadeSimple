// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Controls what happens when a user clicks on an article (meaning a "p" tag)
$(document).on("click", "p", function() {
  // Empties the notes from the note section
  $("#notes").empty();
  // Saves the id from the p tag
  var thisId = $(this).attr("data-id");

  // Makes an AJAX call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // After the AJAX call, this adds the note input information
    .then(function(data) {
      console.log(data);
      // Adds the title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // Adds an input box to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // Adds a text area to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // Adds a button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there is a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // AND Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Controls what happens when you click the "Save Note" button
$(document).on("click", "#savenote", function() {
  // Grabs the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Runs a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from the title input
      title: $("#titleinput").val(),
      // Value taken from the text area of the note
      body: $("#bodyinput").val()
    }
  })
    // After the AJAX Post...
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Finally, removes the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});