/**
 * Created by Whiitetesla  on 09-05-2017.
 */

var scoreListData = [];

//setup the database and all the button functions
function setupDB() {
    // Populate the user table on initial pagel oad
    readScore();
    // Add button click
    $('#btnAddScore').on('click', createScore);

    //show user link click
    $('#scoreList table tbody').on('click', 'td a.linkshowscore', readAScore);
    // Delete User link click
    $('#scoreList table tbody').on('click', 'td a.linkdeletescore', deleteScore);
}

// Create
function createScore(event) {
    // Prevent Link from Firing
    event.preventDefault();
    // Super basic validation - increase errorCountvariable if any fields are blank
    var errorCount = 0;
    $('#addScore input').each(function (index, val) {
        if ($(this).val() === '') {
            errorCount++;
        }
    });
    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {
        // If it is, compile all user info into one object
        var newScore = {
            'name': $('#addScore fieldset input#inputName').val(),
            'score': $('#addScore fieldset input#inputScore').val()
        };
        // Use AJAX to post the object to our adduserservice
        $.ajax({type: 'POST', data: newScore, url: '/users/addhighscore', dataType: 'JSON'}).done(function (response) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#addScore fieldset input').val(''); // Update the table
                readScore();
            } else {
                // If something goes wrong,
                // alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    } else {
        // If errorCountis more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Read all
function readScore() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/users/highscore', function (data) {
        scoreListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowscore" rel="' + this._id + '">'
                + this.name + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowscore" rel="' + this._id + '">'
                + this.score + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeletescore" rel="' + this._id + '"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#scoreList table tbody').html(tableContent);
    });
}

// Read one
function readAScore(event) {
    // Prevent Link from Firing
    event.preventDefault();
    // Retrieve username from link rel attribute
    var thisScoreid = $(this).attr('rel');
    // Get Index of object based on id value
    var arrayPosition = scoreListData.map(function (arrayItem) {
        return arrayItem._id;
    }).indexOf(thisScoreid);

    // Get our User Object
    var thisScoreObject = scoreListData[arrayPosition];
    //Populate Info Box
    $('#scoreInfoName').text('id: ' + thisScoreObject._id + ', name: ' + thisScoreObject.name + ', score: ' + thisScoreObject.score);
}

//Update
function updateScore(event) {
    // Prevent Link from Firing
    event.preventDefault();

}


// Delete
function deleteScore(event) {
    // Prevent Link from Firing
    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this Highscore?');
    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
            type: 'DELETE', url: '/users/deletescore/' + $(this).attr('rel')
        }).done(function (response) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            } else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            readScore();
        });
    } else {
        // If they said no to the confirm, do nothing
        return false;
    }
}
