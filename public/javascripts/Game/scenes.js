/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

Crafty.defineScene('Greetings', function () {
    score = 0;

    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Greetings!');

    this.restart_game = function() {Crafty.enterScene('PongGame');};
    this.bind('KeyDown', this.restart_game);

}, function () {
    this.unbind('KeyDown', this.restart_game);
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

    scoreText = Crafty.e('2D, DOM, Text')
        .attr({
            x: screenWidth - 100,
            y: 10
        })
        .textColor('#515151');

    scoreText.text('Hit:' + score);

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
        Crafty.scene('TowerJumper');
    })
}, function () {
    this.unbind('BrickBroken', this.show_victory);
    this.unbind('LOSE', this.show_lose);
});  // end of game scenes

Crafty.defineScene('TowerJumper', function () {
    var wallThickness = 10;

    Crafty.e('Floor, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: screenHeight/1.1, w: screenWidth * 2, h: wallThickness})
        .color('#b500cf');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#a50001');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: screenWidth-wallThickness, y: 0, w: wallThickness, h: screenHeight*2})
        .color('#003dc5');

    Crafty.e('Wall, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: screenHeight-300, w: screenWidth * 2, h: wallThickness})
        .color('#94f700');

    Crafty.e('Celling, 2D, Canvas, Solid, Color')
        .attr({x: 0, y: 0, w: screenWidth * 2, h: wallThickness})
        .color('#333333');

    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('TowerJumper!')
        .textColor('#ffffff');


    var player = Crafty.e('TowerPlayer');
    player.canJump = false;

    this.show_victory = this.bind('BrickBroken', function () {
        if (!Crafty('Brick').length) {
            Crafty.scene('Victory');
        }
    });

    this.show_lose = this.bind('LOSE', function () {
        Crafty.scene('Lose');
    })
}, function () {
    this.unbind('BrickBroken', this.show_victory);
    this.unbind('LOSE', this.show_lose);
});  // end of game scenes

Crafty.defineScene('Victory', function () {
    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Victory!');

    this.restart_game = function() {Crafty.enterScene('Greetings');};
    this.bind('KeyDown', this.restart_game);

}, function () {
    this.unbind('KeyDown', this.restart_game);
});

Crafty.defineScene('Lose', function () {
    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0 })
        .text('Lose!');

    this.restart_game = function() {Crafty.enterScene('Greetings');};
    this.bind('KeyDown', this.restart_game);

}, function () {
    this.unbind('KeyDown', this.restart_game);
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
