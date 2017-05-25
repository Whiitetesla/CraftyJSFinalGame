/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

Crafty.defineScene('Greetings', function () {
    score = 0;

    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Greetings!')
        .textColor('#ffffff');

    $.get('/gameViews/Greetings', function (data) {
        $('#game').html(data);
    });


}, function () {
    $('#game').empty();
});

Crafty.defineScene('PongGame', function () {
    var wallThickness = 10;
    var MAX_BRICKS = 64;

    Crafty.e('Floor, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: screenHeight/1.1, w: screenWidth * 2, h: wallThickness});

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#a50001');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: screenWidth-wallThickness, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#003dc5');

    Crafty.e('Celling, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: screenWidth * 2, h: wallThickness})
        .color('#333333');

    Crafty.e('PongPlayer');

    scoreText = Crafty.e('2D, DOM, Canvas, Text')
        .attr({
            x: screenWidth - 150,
            y: 10
        })
        .textColor('#51cf00');

    scoreText.text('score:' + score);

    scoreText.textFont({
        size: '30px',
        weight: 'bold'
    });

    SpawnBricks(MAX_BRICKS);
    Crafty.e('Ball');

    this.show_victory = this.bind('BrickBroken', function () {
        if (!Crafty('Brick').length) {
            Crafty.scene('TowerJumper');
        }
    });

    this.show_lose = this.bind('LOSE', function () {
        Crafty.scene('Lose');
    })
}, function () {
    this.unbind('BrickBroken', this.show_victory);
    this.unbind('LOSE', this.show_lose);
});  // end of game scenes

Crafty.defineScene('TowerJumper', function () {
    var wallThickness = 10;
    var gameStart = Crafty.frame();

    scoreText = Crafty.e('2D, DOM, Canvas, Text')
        .attr({
            x: screenWidth - 150,
            y: 10
        })
        .textColor('#51cf00');

    scoreText.text('score:' + score);

    scoreText.textFont({
        size: '30px',
        weight: 'bold'
    });

    Crafty.e('Ground,Floor, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: screenHeight/1.1, w: screenWidth * 2, h: wallThickness})
        .color('#b500cf');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#a50001');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: screenWidth-wallThickness, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#003dc5');

    Crafty.e('Celling, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: screenWidth * 2, h: wallThickness})
        .color('#333333');

    var player = Crafty.e('TowerPlayer');

    this.doDrop = Crafty.bind("EnterFrame", function(){
        if (Crafty.frame() % 100 === 0){
            var frame = Crafty.frame() - gameStart;
            score++;
            scoreText.text('score:' + score);

            if(frame < 400){
                drop('ground_cake');
            }else if(frame < 800){
                drop('ground_grass');
            }else if(frame < 1200){
                drop('ground_sand');
            }else if(frame < 1600){
                drop('ground_snow');
            }else if(frame < 2000){
                drop('ground_stone');
            }else if(frame < 2400){
                drop('ground_wood');
            }else{
                Crafty.trigger('TWin', this);
            }
        }

        if(player.y > screenHeight){
            Crafty.trigger('TLOSE', this);
        }
    });

    this.show_victory = this.bind('TWin', function () {
        if (Crafty('TowerPlayer').length) {
            Crafty.scene('Lose');
        }
    });

    this.show_lose = this.bind('TLOSE', function () {
        if (!Crafty('TowerPlayer').length) {
            Crafty.scene('Lose');
        }
    })
}, function () {
    this.unbind('TWin', this.show_victory);
    this.unbind('TLOSE', this.show_lose);
    this.unbind('EnterFrame', this.doDrop);
});  // end of game scenes

Crafty.defineScene('Victory', function () {
    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Victory!')
        .textColor('#ffffff');

    win_lose('Victory');

}, function () {
});

Crafty.defineScene('Lose', function () {
    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Lose!')
        .textColor('#ffffff');

    win_lose('GameOver');


}, function () {
});

function SpawnBricks(MAX_BRICKS) {
    var width = screenWidth/10;
    var height = screenHeight/20;
    for (i = 0; i < Math.sqrt(MAX_BRICKS); i++) {
        for(j = 0; j < Math.sqrt(MAX_BRICKS); j++){
            var spriteName = 'Brick, 2D, Canvas, Solid, ';

            switch (j){
                case 0:
                    spriteName += 'tileBlack';
                    break;
                case 1:
                    spriteName += 'tileBlue';
                    break;
                case 2:
                    spriteName += 'tileGreen';
                    break;
                case 3:
                    spriteName += 'tileGray';
                    break;
                case 4:
                    spriteName += 'tileOrange';
                    break;
                case 5:
                    spriteName += 'tilePink';
                    break;
                case 6:
                    spriteName += 'tileRed';
                    break;
                case 7:
                    spriteName += 'tileYellow';
                    break;

            }

            Crafty.e(spriteName)
                .attr({x: (i*width)+width, y: (j*height)+height*2, w: width, h: height});
        }
    }
}

function ShowHighScore() {
    readScore();
    $.get('/score/highscoreList', function (data) {
        $('#game').html(data);
        $.get('/gameViews/restart_game', function (data) {
            $('#game').append(data);
        });
    });

}

function addAscore(event) {
    createScore(event);
    ShowHighScore();
}

function play_game() {
    Crafty.enterScene('PongGame')
}

function restart_game() {
    StopGame();
    StartGame();
}

function win_lose(status) {
    $.get('/gameViews/WinLose/'+ status, function (data) {
        $('#game').html(data);
        $.get('/score/addHighscore/'+score, function (data) {
            $('#game').append(data);
            $.get('/gameViews/restart_game', function (data) {
                $('#game').append(data);
            });
        });
    });


}

function drop(tileName) {
    var floorString = 'Floor ,2D, Canvas, Solid, Gravity, Collision, ' + tileName;

    var randomx = Math.floor((Math.random() * screenWidth));

    Crafty.e(floorString)
        .attr({x: randomx, y: 0, w: 240, h: 40})
        .gravity()
        .gravityConst(15)
        .onHit("Ground", function (hitDatas) {
            for(i = 0; i< hitDatas.length; i++){
                hitDatas[i].obj.destroy();
            }
        })
        .bind("EnterFrame", function() {
            if (this.y > screenHeight){
                this.destroy();
                Crafty.trigger('TLOSE', this);
            }
        });
}