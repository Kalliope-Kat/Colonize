var titleScreen, instructionScreen, gameScreen;
var playButton, instructionsButton, tradeButton, saveButton, quitButton;
var tile, civilianSprite, tilesSheet, boy1Walk, boy1WalkSheet, boy2Walk, girl1Walk, girl2Walk;

var preload = {
    loadComplete: function (evt) {
        tilesSheet = new createjs.SpriteSheet({
            images: [queue.getResult("Tiles")],
            frames: [[0, 0, 65, 50],
                [65, 0, 65, 50],
                [130, 0, 65, 50],
                [195, 0, 65, 50],
                [260, 0, 65, 50],
                [325, 0, 65, 50],
                [390, 0, 65, 50],
                [455, 0, 65, 50]
                ],
            animations: {
                grassTile: [0],
                waterTile: [3],
                treeTile: [7],
                rockTile: [5],
                farmTile: [2],
                houseTile: [1],
                townHallTile: [4],
                woodCuttersTile: [6],
            }
        });


        boy1WalkSheet = new createjs.SpriteSheet({
            images: [queue.getResult("ColonizeSet2")],
            frames: [[0, 0, 32, 49, ],
                 [32, 0, 32, 49],
                 [96, 0, 32, 49],
                 [0, 49, 32, 49],
                 [32, 49, 32, 49],
                 [96, 49, 32, 49],
                 [0, 98, 32, 49],
                 [32, 98, 32, 49],
                 [96, 98, 32, 49],
                 [0, 147, 32, 49],
                 [32, 147, 32, 49],
                 [96, 147, 32, 49]
        ],
            animations: {
                faceSouth: [0, 0, "faceSouth"],
                faceNorth: [9, 9, "faceNorth"],
                faceEast: [6, 6, "faceEast"],
                faceWest: [3, 3, "faceWest"],
                walkSouth: [0, 2, "walkSouth", .5],
                walkNorth: [9, 11, "walkNorth", .5],
                walkEast: [6, 8, "walkEast", .5],
                walkWest: [3, 5, "walkWest", .5]
            }
        });


        titleScreen = new createjs.Bitmap(queue.getResult("titleScreen"));
        instructionScreen = new createjs.Bitmap(queue.getResult("instructionsScreen"));
        gameScreen = new createjs.Bitmap(queue.getResult("gameScreen"));
        playButton = new createjs.Bitmap(queue.getResult("playButton"));
        instructionsButton = new createjs.Bitmap(queue.getResult("instructionsButton"));
        loadButton = new createjs.Bitmap(queue.getResult("loadButton"));
        saveButton = new createjs.Bitmap(queue.getResult("saveButton"));
        quitButton = new createjs.Bitmap(queue.getResult("quitButton"));

        tile = new createjs.Sprite(tilesSheet);
        civilianSprite = new createjs.Sprite(boy1WalkSheet);
        civilianSprite.x = 890;
        civilianSprite.y = 472.5;
        civilianSprite.regX = 16;
        civilianSprite.regY = 24.5;
        
        GAMESTATE = MENU;
        startLoop();
    }
}