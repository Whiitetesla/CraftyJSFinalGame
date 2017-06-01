/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

$(document).ready(function () {
        $('body').append("<button type='button', class='btn btn-primary' id='btnPlayGame'>Play Game</button>");

        $('#btnPlayGame').on('click', playGame);

    },

    function (e) { //progress
    },

    function (e) { //uh oh, error loading
    }
);
// Functions ================================

function playGame() {
    if (!isGameRuning()) {
        StartGame();
        $('#btnPlayGame').hide();
    } else {
        StopGame();
        $('#btnPlayGame').show();
    }
}



