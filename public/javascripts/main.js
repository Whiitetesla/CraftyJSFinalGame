/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

$(document).ready(function () {
        setupDB();

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
    } else {
        StopGame();
    }
}


