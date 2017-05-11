/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

var screenWidth = 800;
var screenHeight = 400;
var hitCounter = 0;
var gameRunning = false;

function StopGame() {
    gameRunning = false;
    Crafty.stop();
    $('#game').remove();
}

function StartGame() {
    $('body').append("<div id='game' style='margin:0 auto;'></div>");
    //game start
    var assetsObj = {
        "audio": {},
        "images": [],
        "sprites": {
            //Backgrund
            "/images/Background/bg_layer1.png": {
                "tile": 2048,
                "tileh": 2048,
                "map": {"bg_layer1": [0, 0]}
            },
            "/images/Background/bg_layer2.png": {
                "tile": 2048,
                "tileh": 2048,
                "map": {"bg_layer2": [0, 0]}
            },
            "/images/Background/bg_layer3.png": {
                "tile": 2048,
                "tileh": 2048,
                "map": {"bg_layer3": [0, 0]}
            },
            "/images/Background/bg_layer4.png": {
                "tile": 2048,
                "tileh": 2048,
                "map": {"bg_layer4": [0, 0]}
            },
            //Balls
            "/images/Balls/spritesheet_balls.png": {
                "tile": 128,
                "tileh": 128,
                "map": {
                    "ballGrey_01": [2, 5],
                    "ballGrey_02": [2, 6],
                    "ballGrey_03": [3, 1],
                    "ballGrey_04": [3, 2]
                }
            },
            //Coins
            "/images/Coins/spritesheet_coins.png": {
                "tile": 128,
                "tileh": 128,
                "map": {
                    "coins_01": [0, 0],
                    "coins_02": [0, 1],
                    "coins_03": [0, 2],
                    "coins_04": [0, 3],
                    "coins_05": [0, 4],
                    "coins_06": [0, 5],
                    "coins_07": [1, 0],
                    "coins_08": [1, 1],
                    "coins_9": [1, 2],
                    "coins_10": [1, 3],
                    "coins_11": [1, 4],
                    "coins_12": [1, 5],
                    "coins_13": [2, 0],
                    "coins_14": [2, 1],
                    "coins_15": [2, 2],
                    "coins_16": [2, 3],
                    "coins_17": [2, 4],
                    "coins_18": [2, 5],
                    "coins_13": [3, 1],
                    "coins_20": [3, 2],
                }
            },
            //Enviromment
            "/images/Environment/ground_cake.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_cake": [0, 0]}
            },
            "/images/Environment/ground_cake_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_cake_broken": [0, 0]}
            },
            "/images/Environment/ground_cake_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_cake_small": [0, 0]}
            },
            "/images/Environment/ground_cake_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_cake_small_broken": [0, 0]}
            },
            "/images/Environment/ground_grass.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_grass": [0, 0]}
            },
            "/images/Environment/ground_grass_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_grass_broken": [0, 0]}
            },
            "/images/Environment/ground_grass_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_grass_small": [0, 0]}
            },
            "/images/Environment/ground_grass_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_grass_small_broken": [0, 0]}
            },
            "/images/Environment/ground_sand.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_sand": [0, 0]}
            },
            "/images/Environment/ground_sand_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_sand_broken": [0, 0]}
            },
            "/images/Environment/ground_sand_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_sand_small": [0, 0]}
            },
            "/images/Environment/ground_sand_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_sand_small_broken": [0, 0]}
            },
            "/images/Environment/ground_snow.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_snow": [0, 0]}
            },
            "/images/Environment/ground_snow_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_snow_broken": [0, 0]}
            },
            "/images/Environment/ground_snow_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_snow_small": [0, 0]}
            },
            "/images/Environment/ground_snow_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_snow_small_broken": [0, 0]}
            },
            "/images/Environment/ground_stone.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_stone": [0, 0]}
            },
            "/images/Environment/ground_stone_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_stone_broken": [0, 0]}
            },
            "/images/Environment/ground_stone_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_stone_small": [0, 0]}
            },
            "/images/Environment/ground_stone_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_stone_small_broken": [0, 0]}
            },
            "/images/Environment/ground_wood.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_wood": [0, 0]}
            },
            "/images/Environment/ground_wood_broken.png": {
                "tile": 380,
                "tileh": 94,
                "map": {"ground_wood_broken": [0, 0]}
            },
            "/images/Environment/ground_wood_small.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_wood_small": [0, 0]}
            },
            "/images/Environment/ground_wood_small_broken.png": {
                "tile": 201,
                "tileh": 100,
                "map": {"ground_wood_small_broken": [0, 0]}
            },
            //GUI
            "/images/GUI/blue_button00.png": {
                "tile": 190,
                "tileh": 49,
                "map": {"blue_button00": [0, 0]}
            },
            "/images/GUI/blue_button01.png": {
                "tile": 190,
                "tileh": 45,
                "map": {"blue_button01": [0, 0]}
            },
            "/images/GUI/blue_button02.png": {
                "tile": 49,
                "tileh": 49,
                "map": {"blue_button02": [0, 0]}
            },
            "/images/GUI/blue_button03.png": {
                "tile": 49,
                "tileh": 49,
                "map": {"blue_button03": [0, 0]}
            },
            "/images/GUI/blue_button04.png": {
                "tile": 49,
                "tileh": 45,
                "map": {"blue_button04": [0, 0]}
            },
            "/images/GUI/blue_button05.png": {
                "tile": 190,
                "tileh": 49,
                "map": {"blue_button05": [0, 0]}
            },
            "/images/GUI/blue_checkmark.png": {
                "tile": 21,
                "tileh": 20,
                "map": {"blue_checkmark": [0, 0]}
            },
            "/images/GUI/blue_circle.png": {
                "tile": 36,
                "tileh": 36,
                "map": {"blue_circle": [0, 0]}
            },
            "/images/GUI/blue_cross.png": {
                "tile": 18,
                "tileh": 18,
                "map": {"blue_cross": [0, 0]}
            },
            "/images/GUI/blue_panel.png": {
                "tile": 100,
                "tileh": 100,
                "map": {"blue_panel": [0, 0]}
            },
            "/images/GUI/blue_sliderDown.png": {
                "tile": 28,
                "tileh": 42,
                "map": {"blue_sliderDown": [0, 0]}
            },
            "/images/GUI/blue_sliderLeft.png": {
                "tile": 39,
                "tileh": 31,
                "map": {"blue_sliderLeft": [0, 0]}
            },
            "/images/GUI/blue_sliderRight.png": {
                "tile": 39,
                "tileh": 31,
                "map": {"blue_sliderRight": [0, 0]}
            },
            "/images/GUI/blue_sliderUp.png": {
                "tile": 28,
                "tileh": 42,
                "map": {"blue_sliderUp": [0, 0]}
            },
            "/images/GUI/blue_tick.png": {
                "tile": 17,
                "tileh": 17,
                "map": {"blue_tick": [0, 0]}
            },
            "/images/GUI/dropdownBottom.png": {
                "tile": 190,
                "tileh": 24,
                "map": {"dropdownBottom": [0, 0]}
            },
            "/images/GUI/dropdownMid.png": {
                "tile": 190,
                "tileh": 24,
                "map": {"dropdownMid": [0, 0]}
            },
            "/images/GUI/dropdownTop.png": {
                "tile": 190,
                "tileh": 24,
                "map": {"dropdownTop": [0, 0]}
            },
            //Paddles
            "/images/Paddles/paddle_01.png": {
                "tile": 520,
                "tileh": 140,
                "map": {"paddle1": [0, 0]}
            },
            "/images/Paddles/paddle_02.png": {
                "tile": 640,
                "tileh": 140,
                "map": {"paddle2": [0, 0]}
            },
            "/images/Paddles/paddle_03.png": {
                "tile": 500,
                "tileh": 120,
                "map": {"paddle3": [0, 0]}
            },
            "/images/Paddles/paddle_04.png": {
                "tile": 620,
                "tileh": 120,
                "map": {"paddle4": [0, 0]}
            },
            "/images/Paddles/paddle_05.png": {
                "tile": 520,
                "tileh": 140,
                "map": {"paddle5": [0, 0]}
            },
            "/images/Paddles/paddle_06.png": {
                "tile": 640,
                "tileh": 140,
                "map": {"paddle6": [0, 0]}
            },
            "/images/Paddles/paddle_07.png": {
                "tile": 500,
                "tileh": 120,
                "map": {"paddle7": [0, 0]}
            },
            "/images/Paddles/paddle_08.png": {
                "tile": 620,
                "tileh": 120,
                "map": {"paddle8": [0, 0]}
            },
            "/images/Paddles/paddle_09.png": {
                "tile": 520,
                "tileh": 141,
                "map": {"paddle9": [0, 0]}
            },
            "/images/Paddles/paddle_10.png": {
                "tile": 640,
                "tileh": 141,
                "map": {"paddle10": [0, 0]}
            },
            "/images/Paddles/paddle_11.png": {
                "tile": 500,
                "tileh": 121,
                "map": {"paddle11": [0, 0]}
            },
            "/images/Paddles/paddle_12.png": {
                "tile": 620,
                "tileh": 121,
                "map": {"paddle12": [0, 0]}
            },
            //Particles
            "/images/Particles/particleYellow_1.png": {
                "tile": 224,
                "tileh": 222,
                "map": {"particle1": [0, 0]}
            },
            "/images/Particles/particleYellow_2.png": {
                "tile": 223,
                "tileh": 222,
                "map": {"particle2": [0, 0]}
            },
            "/images/Particles/particleYellow_3.png": {
                "tile": 192,
                "tileh": 183,
                "map": {"particle3": [0, 0]}
            },
            "/images/Particles/particleYellow_4.png": {
                "tile": 182,
                "tileh": 182,
                "map": {"particle4": [0, 0]}
            },
            "/images/Particles/particleYellow_5.png": {
                "tile": 59,
                "tileh": 249,
                "map": {"particle5": [0, 0]}
            },
            "/images/Particles/particleYellow_6.png": {
                "tile": 228,
                "tileh": 226,
                "map": {"particle6": [0, 0]}
            },
            "/images/Particles/particleYellow_7.png": {
                "tile": 224,
                "tileh": 222,
                "map": {"particle7": [0, 0]}
            },
            //Players
            "/images/Players/bunny1_hurt.png": {
                "tile": 150,
                "tileh": 174,
                "map": {"Player1_hurt": [0, 0]}
            },
            "/images/Players/bunny1_jump.png": {
                "tile": 150,
                "tileh": 181,
                "map": {"Player1_jump": [0, 0]}
            },
            "/images/Players/bunny1_ready.png": {
                "tile": 120,
                "tileh": 191,
                "map": {"Player1_ready": [0, 0]}
            },
            "/images/Players/bunny1_stand.png": {
                "tile": 120,
                "tileh": 201,
                "map": {"Player1_stand": [0, 0]}
            },
            "/images/Players/bunny1_walk1.png": {
                "tile": 120,
                "tileh": 201,
                "map": {"Player1_walk1": [0, 0]}
            },
            "/images/Players/bunny1_walk2.png": {
                "tile": 120,
                "tileh": 207,
                "map": {"Player1_walk2": [0, 0]}
            },
            "/images/Players/bunny2_hurt.png": {
                "tile": 150,
                "tileh": 174,
                "map": {"Player2_hurt": [0, 0]}
            },
            "/images/Players/bunny2_jump.png": {
                "tile": 150,
                "tileh": 181,
                "map": {"Player2_jump": [0, 0]}
            },
            "/images/Players/bunny2_ready.png": {
                "tile": 121,
                "tileh": 191,
                "map": {"Player2_ready": [0, 0]}
            },
            "/images/Players/bunny2_stand.png": {
                "tile": 121,
                "tileh": 201,
                "map": {"Player2_stand": [0, 0]}
            },
            "/images/Players/bunny2_walk1.png": {
                "tile": 121,
                "tileh": 201,
                "map": {"Player2_walk1": [0, 0]}
            },
            "/images/Players/bunny2_walk2.png": {
                "tile": 121,
                "tileh": 207,
                "map": {"Player2_walk2": [0, 0]}
            },
            //Tiles
            "/images/Tiles/tileBlack_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileBlack": [0, 0]}
            },
            "/images/Tiles/tileBlue_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileBlue": [0, 0]}
            },
            "/images/Tiles/tileGreen_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileGreen": [0, 0]}
            },
            "/images/Tiles/tileGrey_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileGray": [0, 0]}
            },
            "/images/Tiles/tileOrange_01.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileOrange": [0, 0]}
            },
            "/images/Tiles/tilePink_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tilePink": [0, 0]}
            },
            "/images/Tiles/tileRed_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileRed": [0, 0]}
            },
            "/images/Tiles/tileYellow_02.png": {
                "tile": 188,
                "tileh": 88,
                "map": {"tileYellow": [0, 0]}
            },
        }
    };

    Crafty.load(assetsObj, function () { //when loaded
        Crafty.init(screenWidth, screenHeight, document.getElementById('game'));

        Crafty.e('Floor, 2D, Canvas, Solid, Color')
            .attr({x: 0, y: 350, w: screenWidth * 2, h: 10})
            .color('#333333');

        var player1 = Crafty.e('Player, Canvas, Solid, Twoway, Gravity, Collision, Player1_ready')
            .attr({x: 20, y: 0, w: 30, h: 30})
            .twoway(100)
            .gravity('Floor')
            .gravityConst(250)
            .origin('center')
            .sprite('Player1_ready')
            .bind("EnterFrame", function () {
                if (this.x === screenWidth) {
                    pause();
                    Crafty.e('2D, DOM, Text').attr({
                        x: screenWidth / 2,
                        y: screenHeight / 2
                    }).text("Stage 1 Clear").textFont({size: '20px', weight: 'bold'}).textColor('#515151');
                }
            });

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
        //game end
    });
    gameRunning = true;
}

function drop() {
    var randomx = Math.floor((Math.random() * screenWidth) + 50) + 20;

    Crafty.e('2D, Canvas, Text, Solid, Gravity, Collision, Tween')
        .attr({x: randomx, y: 0})
        .text(function () {
            return String.fromCharCode(1e2 + Math.random() * 33)
        })
        .textColor('#00ff00')
        .textFont({size: '20px', family: 'Georgia'})
        .gravity()
        .gravityConst(50)
        .tween({alpha: 0.2}, 5000)
        .checkHits('Player')
        .bind("HitOn", function () {
            this.destroy();
            hitCounter++;
            hitText.text('Hit:' + hitCounter);
            if (hitCounter === 6) {
                player1.x = 20;
                hitCounter = 0;
                hitText.text('Hit:' + hitCounter);
            }
        })
        .bind("EnterFrame", function () {
            if (this.y > screenHeight)
                this.destroy();
        });
}

Crafty.bind("EnterFrame", function () {

    if (Crafty.frame() % 3 === 0)
        drop();
});

//pause funktion
function pause() {
    Crafty.pause();
}

function isGameRuning() {
    return gameRunning;
}