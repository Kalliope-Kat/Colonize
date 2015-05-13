var GRID_COLS = 25,
    GRID_ROWS = 25;
var titleScreen, instructionScreen, gameScreen;
var playButton, instructionsButton;
var FPS = 30;
var gameOver;
var GAMESTATE;
var GRASS = 0,
    WATER = 1,
    WOODCUTTER = 2,
    TREE = 3,
    FARM = 4,
    STONE = 5,
    HOUSE = 6,
    TOWNHALL = 7;
var CONSTRUCT = 100,
    INSTRUCTIONS = 200,
    START_GAME = 300,
    IN_GAME = 400,
    GAME_OVER = 500;
var queue, timerCount, gameTimer;
var logs = 100, firewood = 100, food = 250, stone = 100;



function main() {
    init();
}

function init() {
    canvas.openCanvas();
    loadFiles();
    gameOver = false;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    mouseInit();

}

var tile, tilesSheet, boy1Walk, boy2Walk, girl1Walk, girl2Walk;

function loadComplete(evt) {

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


    
    GAMESTATE = CONSTRUCT;
    startLoop();


}



function loadFiles() {
    queue = new createjs.LoadQueue(true, "styles/images/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
}

var grid = {
    width: null,
    height: null,
    _grid: null,

    init: function () {
        this.width = GRID_COLS;
        this.height = GRID_ROWS;
        this._grid = [];

        for (var x = 0; x < this.width; x++) {

            this._grid.push([]);

            for (var y = 0; y < this.height; y++) {
                this._grid[x].push(GRASS);
                
            }
        }

    },

    set: function (val, x, y) {
        this._grid[x][y] = val;
    },

    get: function (x, y) {
        return this._grid[x][y];
    }
}



function drawMap() {
    stage.removeAllChildren();
    for (x = 0; x < grid.width; x++) {
        for (y = 0; y < grid.height; y++) {
            tile = new createjs.Sprite(tilesSheet);
            tile.x = ((x - y) * 32.5) + canvas.width / 2;
            tile.y = (x + y) * 25;
            console.log(tile.x + "," + tile.y);
            tile.regX = 45;
            tile.regY = 30;
            
            switch (grid.get(x, y)) {
            case GRASS:
                tile.gotoAndStop("grassTile");
                handleTileEvent();
                break;
            case WATER:
                tile.gotoAndStop("waterTile");
                handleTileEvent();
                break;
            case WOODCUTTER:
                tile.gotoAndStop("woodCuttersTile");
                handleTileEvent();
                break;
            case TREE:
                tile.gotoAndStop("treeTile");
                handleTileEvent();
                break;
            case FARM:
                tile.gotoAndStop("farmTile");
                handleTileEvent();
                break;
            case STONE:
                tile.gotoAndStop("rockTile");
                handleTileEvent();
                break;
            case HOUSE:
                tile.gotoAndStop("houseTile");
                handleTileEvent();
                break;
            case TOWNHALL:
                tile.gotoAndStop("townHall");
                handleTileEvent();
                break;
            }
            stage.addChild(tile);
            
        }
        stage.update();
    }
}

function spawnResources(resource) {
    var _empty = [];
    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            if (grid.get(x, y) === resource) {
                grid.set(GRASS, x, y);
                _empty.push({
                    x: x,
                    y: y
                });
            }
            if (grid.get(x, y) === GRASS) {
                _empty.push({
                    x: x,
                    y: y
                });
            }
        }
    }

    var resourceIndex = Math.floor(Math.random() * _empty.length / 28);

    for (var i = resourceIndex; i < resourceIndex+6; i++) {
        for (var j = resourceIndex; j < resourceIndex+6; j++) {
            if (resource === WATER) {
                var clusterPos = _empty[j,i];
                clusterPos.x = i;
                clusterPos.y = j;
                grid.set(resource, clusterPos.x, clusterPos.y);
                
            } else {
                var randIndex = Math.floor(Math.random() * _empty.length);
                var randPos = _empty[randIndex];

                grid.set(resource, randPos.x, randPos.y);

            }


        }
    }
}
var logsText, firewoodText, foodText, StoneText;

function displayStats(){
    
    logsText = new createjs.Text("Logs: " + logs, "16px lucida Console", "#333");
    logsText.x = 10;
    logsText.y = 900;
    
    firewoodText = new createjs.Text("Firewood: " + firewood, "16px lucida Console", "#333");
    firewoodText.x = 10;
    firewoodText.y = 920;
    
    foodText = new createjs.Text("Food: " + food, "16px lucida Console", "#333");
    foodText.x = 10;
    foodText.y = 940;
    
    stoneText = new createjs.Text("Stone: " + stone, "16px lucida Console", "#333");
    stoneText.x = 10;
    stoneText.y = 960;
    
    stage.addChild(logsText);
    stage.addChild(firewoodText);
    stage.addChild(foodText);
    stage.addChild(stoneText);
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

function handleTileEvent(){
    tile.addEventListener("click", function(event) {
        gatherResource(tile);
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
    
function gatherResource(tile){
    console.log(tile.x + ", " + tile.y);
    var tileFrame = tile.currentFrame;
    switch(tileFrame){
        case 0:
            break;
        case 1:
            break;
        case 2: 
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            stone++;
            console.log("Stone: " + stone);
            break;
        case 6:
            break;
        case 7:
            logs++;
            console.log("Logs: " + logs);
            break;
    }
    stage.update();
            
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
        grid.init();    
        spawnResources(WATER);
        spawnResources(TREE);
        spawnResources(STONE);
        handleButtonClick();
        GAMESTATE = "Hold";
        break;
    case INSTRUCTIONS:
        console.log("displaying instructions");
        displayInstructions();
        break;
    case START_GAME:
        console.log("starting game...");
        //runGameTimer();
        drawMap();
        displayStats();
        GAMESTATE = IN_GAME;
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