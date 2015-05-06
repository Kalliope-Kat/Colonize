var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 1024;
var titleScreen, instructionScreen, gameScreen;
var playButton, instructionsButton;
var FPS = 30;
var gameOver;
var GAMESTATE;
var CONSTRUCT = 100,
    INSTRUCTIONS = 200,
    START_GAME = 300,
    IN_GAME = 400,
    GAME_OVER = 500;

var canvas, stage, queue, timerCount, gameTimer;

function main() {
    init();
}

function init() {
    openCanvas();
    loadFiles();
    gameOver = false;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    mouseInit();

}

var tiles, tilesSheet, boy1Walk, boy2Walk, girl1Walk, girl2Walk;

function loadComplete(evt) {

        tilesSheet = new createjs.SpriteSheet({
        images: [queue.getResult("Tiles")],
        frames: [[0, 0, 90, 60],
                 [0, 60, 90, 60],
                 [0, 120, 90, 60],
                 [0, 180, 90, 60],
                 [0, 240, 90, 60],
                 [0, 300, 90, 60],
                 [0, 360, 90, 60],
                 [0, 420, 90, 60]
                ],
        animations: {
            grassTile: [0],
            waterTile: [3],
            treeTile: [7],
            rockTile: [5],
            farmTile: [2],
            houseTile: [1],
            townHallTile: [4],
            woodCuttersStation: [6],
        }
    });





    var boy1WalkSheet = new createjs.SpriteSheet({
        images: [queue.getResult("ColonizeSet2")],
        // x, y, width, height, imageIndex*, regX*, regY*
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



    boy1Walk = new createjs.Sprite(boy1WalkSheet);
    console.log(boy1WalkSheet.getNumFrames("walkNorth"));

    titleScreen = new createjs.Bitmap(queue.getResult("titleScreen"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructionsScreen"));
    gameScreen = new createjs.Bitmap(queue.getResult("gameScreen"));
    playButton = new createjs.Bitmap(queue.getResult("playButton"));
    instructionsButton = new createjs.Bitmap(queue.getResult("instructionsButton"));


    handleButtonClick();
    GAMESTATE = CONSTRUCT;
    startLoop();


}

fileManifest = [
    {
        src: "GameScreen.png",
        id: "gameScreen"
    },
    {
        src: "instructionsScreen.png",
        id: "instructionsScreen"
    },
    {
        src: "titleScreen.png",
        id: "titleScreen"
    },
    {
        src: "InstructionsButton.png",
        id: "instructionsButton"
    },
    {
        src: "playButton.png",
        id: "playButton"
    },
    {
        src: "ColonizeSet2.png",
        id: "ColonizeSet2"
    },
    {
        src: "TileSheet.png",
        id: "Tiles"
    }


];


function loadFiles() {
    queue = new createjs.LoadQueue(true, "styles/images/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
}

function drawMap(){
    stage.removeAllChildren();
    for(i = 0; i < 20 ; i++){
        for(j = 0; j <20; j++){
            tiles = new createjs.Sprite(tilesSheet);
            tiles.x = ((j-i) * 45) + canvas.width/2;
            tiles.y = (i+j) * 30;
            console.log(tiles.x + "," + tiles.y);
            tiles.regX = 45;
            tiles.regY = 30;
            tiles.gotoAndStop("grassTile");
            stage.addChild(tiles);
        }
    }
}

function openCanvas() {
    console.log("opened canvas");
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var div = document.getElementById("game");
    console.log(div);
    div.appendChild(canvas);

    stage = new createjs.Stage(canvas);

}

var mouseX, mouseY;

function mouseInit() {
    stage.on("stagemousemove", function (evt) {
        mouseX = Math.floor(evt.stageX);
        mouseY = Math.floor(evt.stageY);
    });
}

function handleButtonClick() {
    playButton.addEventListener("click", function (event) {
        GAMESTATE = START_GAME;
    });

    instructionsButton.addEventListener("click", function (event) {
        GAMESTATE = INSTRUCTIONS;
    });
}

function keyDown(e) {
    switch (e.keyCode) {
    case 65:
        console.log("left down");
        break;
    case 87:
        console.log("Up down");
        break;
    case 68:
        console.log("Right down");
        break;
    case 83:
        console.log("Down pressed");
        break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
    case 65:
        console.log("left up");
        break;
    case 87:
        console.log("Up up");
        break;
    case 68:
        console.log("Right up");
        break;
    case 83:
        console.log("Down released");
        break;
    }

}

function displayMenu() {
    stage.removeAllChildren();
    titleScreen.x = 0;
    titleScreen.y = 0;

    playButton.x = 100;
    playButton.y = 500;

    instructionsButton.x = 400;
    instructionsButton.y = 500;

    stage.addChild(titleScreen);
    stage.addChild(playButton);
    stage.addChild(instructionsButton);
    displaySprites();

}

function displaySprites() {
    boy1Walk.x = 560;
    boy1Walk.y = 200;
    boy1Walk.gotoAndPlay("walkNorth");
    stage.addChild(boy1Walk);
    stage.update();
}

function displayInstructions() {
    stage.removeAllChildren();
    instructionScreen.x = 0;
    instructionScreen.y = 0;

    var instructionsText = new createjs.Text("Instructions", "16px Lucida Console", "#333");

    playButton.x = 500;
    playButton.y = 500;

    stage.addChild(instructionScreen);
    stage.addChild(playButton);
    stage.addChild(instructionsText);
}

function displayGame() {
    stage.removeAllChildren();
    gameScreen.x = 0;
    gameScreen.y = 0;

    var gameText = new createjs.Text("Game", "16px lucida Console", "#333");

    stage.addChild(gameScreen);
    stage.addChild(gameText);
}

function gameOverScreen() {
    stage.removeAllChildren();
    console.log("Reset Screen");
    displayMainMenu();
    gameTimer = 0;
    timerCount = 0;

}

function startLoop() {
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", loop);

}

timerCount = 0;

function runGameTimer() {
    timerCount += 1;
    //console.log(timerCount);
    if (timerCount % (FPS / 10) === 0) {
        gameTimer = timerCount / (FPS);
    }
    console.log(gameTimer);
}

function resetGameTimer() {
    timerCount = 0;
    gameTimer = 0;
}

function loop() {

    switch (GAMESTATE) {
    case CONSTRUCT:
        console.log("constructing...");
        displayMenu();
        GAMESTATE = "Hold";
        break;
    case INSTRUCTIONS:
        console.log("displaying instructions");
        displayInstructions();
        break;
    case START_GAME:
        console.log("starting game...");
        GAMESTATE = "hold";
        //runGameTimer();
        drawMap();
//      displayGame();
        break;
    case IN_GAME:
        console.log("in game");
        //logic
        break;
    case GAME_OVER:
        console.log("game over");
        gameOverScreen();
        break;
    }

    stage.update();
}
if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
} else { //MSIE
    window.attachEvent("onload", main);
}