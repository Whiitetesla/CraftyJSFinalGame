/**
 * Created by Whiitetesla.
 */

$(document).ready(function () {
    var ref = new Firebase('https://craftyjsfinalgame.firebaseio.com/');

    //game start
    var screenWidth = 800;
    var screenHeight = 400;
    var hitCounter = 0;
    var highscore = [];

    //updates the tempHighscore evrytime that happens an update in highscore
    ref.child('HighScore').orderByValue().on("value", function(childSnapshot) {

        var valu = childSnapshot.val();
        var tempHighscore = [];

        $.each( valu, function( index, value ) {
            tempHighscore.push(value.score);
        });

        //update the list in the game with the one in the databsae
        if(tempHighscore.length<1){
            highscore = [1,2,3,4,5,6,7,8,9];
        }else{
            highscore = $.merge([],tempHighscore);
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $('#aButton').on('click', function () {

        var tempHighscore = $.merge([],highscore);

        //delets the database
        ref.child('HighScore').remove();
        $('#content').empty();

        //saves the highscore in the datacase
        for (var i = 0; i<tempHighscore.length;i++){

            ref.child('HighScore').push().set({
                score: (++tempHighscore[i]).toString()
            });

            $('#content').append(
                $('<li>').append(
                    $('<span>').attr('class', 'tab').append(tempHighscore[i])
                ));
        };
    });


    Crafty.init(screenWidth,screenHeight, document.getElementById('game'));

    Crafty.e('Floor, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 350, w: screenWidth * 2, h: 10})
        .color('#333333');

    var player1 = Crafty.e('Player, 2D, Canvas, Color, Solid, Twoway, Gravity, Collision')
        .attr({x: 20, y: 0, w: 30, h: 30})
        .color('#F00')
        .twoway(100)
        .gravity('Floor')
        .gravityConst(250)
        .bind("EnterFrame", function(){
            if (this.x === screenWidth)
            {
                pause();
                Crafty.e('2D, DOM, Text').attr({x:screenWidth/2, y:screenHeight/2}).text("Stage 1 Clear").textFont({size:'20px', weight:'bold'}).textColor('#515151');
            }
        });

    function drop()
    {
        var randomx = Math.floor((Math.random() * screenWidth) + 50)+20;

        Crafty.e('2D, Canvas, Text, Solid, Gravity, Collision, Tween')
            .attr({ x: randomx, y: 0})
            .text(function () { return String.fromCharCode(1e2 + Math.random() * 33)})
            .textColor('#00ff00')
            .textFont({ size: '20px' ,family: 'Georgia' })
            .gravity()
            .gravityConst(50)
            .tween({alpha: 0.2}, 5000)
            .checkHits('Player')
            .bind("HitOn", function(){
                this.destroy();
                hitCounter++;
                hitText.text('Hit:' + hitCounter);
                if (hitCounter === 6)
                {
                    player1.x = 20;
                    hitCounter = 0;
                    hitText.text('Hit:' + hitCounter);
                }
        })
            .bind("EnterFrame", function() {
                if (this.y > screenHeight)
                    this.destroy();
            });
    }

    var hitText = Crafty.e('2D, DOM, Text')
        .attr({
            x: screenWidth - 100,
            y: 10
        })
        .textColor('#515151');

    hitText.text('Hit:' + hitCounter);

    hitText.textFont({
        size: '30px',
        weight: 'bold'
    });

    Crafty.bind("EnterFrame", function(){

        if (Crafty.frame() % 3 === 0)
            drop();
    });
    //game end
});

//pause funktion
function pause()
{
    Crafty.pause();
}