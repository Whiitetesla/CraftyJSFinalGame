/**
 * Created by Whiitetesla  on 09-05-2017.
 */

var scoreListData = [];

//setup the database and all the button functions
function setupDB() {
    // Populate the user table on initial page oad
    //readScore();
    // Add button click
    $('#btnAddScore').on('click', createScore);


    //show user link click
    //$('#scoreList table tbody').on('click', 'td a.linkshowscore', readAScore);
    // Delete User link click
    //$('#scoreList table tbody').on('click', 'td a.linkdeletescore', deleteScore);
}

// Create
function createScore(event) {
    // Prevent Link from Firing
    //event.preventDefault();
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

        $.each(scoreListData, function () {
            $.ajax({
                type: 'DELETE', url: '/score/deletescore/' + this._id
            }).done(function (response) {
                // Check for a successful (blank) response
                if (response.msg === '') {
                } else {
                    alert('Error: ' + response.msg);
                }
            });
        });


        scoreListData.push(newScore);
        sortScores();
        // Use AJAX to post the object to our adduserservice
        for (i = 0; i < 10; i++){
            if(scoreListData[i] != null){
                $.ajax({type: 'POST', data: scoreListData[i], url: '/score/addhighscore', dataType: 'JSON'}).done(function (response) {
                    // Check for successful (blank) response
                    if (response.msg === '') {
                        // Clear the form inputs
                        $('#addScore fieldset input').val(''); // Update the table
                    } else {
                        // If something goes wrong,
                        // alert the error message that our service returned
                        alert('Error: ' + response.msg);
                    }
                });
            }
        }
    } else {
        // If errorCountis more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
}

// Read all
function readScore() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/score/highscore', function (data) {
        scoreListData = data;
        sortScores();

        // For each item in our JSON, add a table row and cells to the content string
        tableContent += '<ol>';
        $.each(scoreListData, function () {
            tableContent += '<li><mark href="#" class="linkshowscore" rel="' + this._id + '">'
                + this.name + '</mark>';
            tableContent += '<small href="#" class="linkshowscore" rel="' + this._id + '">'
                + this.score + '</small></li>';
        });
        tableContent += '</ol>';
        // Inject the whole content string into our existing HTML table
        $('#scoreList').append(tableContent);
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
            type: 'DELETE', url: '/score/deletescore/' + $(this).attr('rel')
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

function sortScores() {

    scoreListData.sort(function (a, b) {  return b.score - a.score;  });

}
