/**
 * Created by Niels Hviid Lund on 07-05-2017.
 */

var screenWidth = 1200;
var screenHeight = 800;
var score;
var gameRunning = false;
var scoreText;

function StopGame() {
    gameRunning = false;
    Crafty.stop();
    $('#game').remove();
}

function StartGame() {
    $('body').append("<div id='game' style='margin:0 auto;'></div>");
    //game start
    gameRunning = true;
    var assetsObj = {
        "audio": {},
        "images": [],
        "sprites": {
            //Backgrund
            "/images/Background/bg_layer3.png": {
                "tile": 2048,
                "tileh": 2048,
                "map": {"bg_layer3": [0, 0]}
            },
            //Balls
            "/images/Balls/spritesheet_balls.png": {
                "tile": 149,
                "tileh": 150,
                "map": {
                    "ballGrey_01": [2, 4],
                    "ballGrey_02": [2, 5],
                    "ballGrey_03": [3, 0],
                    "ballGrey_04": [3, 1]
                }
            },
            //Coins
            "/images/Coins/spritesheet_coins.png": {
                "tile": 150,
                "tileh": 150,
                "map": {
                    "coins_01": [0, 0],
                    "coins_02": [0, 1],
                    "coins_03": [0, 2],
                    "coins_04": [0, 3],
                    "coins_05": [0, 4]
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
             //Paddles
            "/images/Paddles/paddle_01.png": {
                "tile": 520,
                "tileh": 140,
                "map": {"paddle1": [0, 0]}
            },
            //Players
            "/images/Players/bunny1_stand.png": {
                "tile": 120,
                "tileh": 191,
                "map": {"Player1_stand": [0, 0]}
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
        Crafty.enterScene('Greetings');
        //game end
    });
    $('#game').focus();
}

function pause() {
    Crafty.pause();
}

function isGameRuning() {
    return gameRunning;
}

