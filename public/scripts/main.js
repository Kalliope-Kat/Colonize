var FPS = 30;
var gameOver;
var GAMESTATE;
var CONSTRUCT = 100,
    INSTRUCTIONS = 200,
    START_GAME = 300,
    IN_GAME = 400,
    GAME_OVER = 500;
var queue, timerCount, gameTimer;
var logs = 100, firewood = 100, food = 250, stone = 100;

if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
} else { //MSIE
    window.attachEvent("onload", main);
}

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

function loadFiles() {
    queue = new createjs.LoadQueue(true, "styles/images/");
    queue.on("complete", load.loadComplete, this);
    queue.loadManifest(fileManifest);
    
//    GAMESTATE = CONSTRUCT;
//    startLoop();
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

function update(){
    stage.removeAllChildren();
    map.drawMap();
    resources.displayResourcesText();
}

function loop() {

    switch (GAMESTATE) {
    case CONSTRUCT:
        console.log("constructing...");
        menu.display();
        handleButtonClick();
        grid.init();    
        tiles.populateTileArray();
        map.spawnResources(WATER);
        map.spawnResources(TREE);
        map.spawnResources(STONE);
        GAMESTATE = "Hold";
        break;
    case INSTRUCTIONS:
        console.log("displaying instructions");
        menu.displayInstructions();
        break;
    case START_GAME:
        console.log("starting game...");
        stage.removeAllChildren();
        map.drawMap();
        resources.displayResourcesText();
        map.placeSprite();
        GAMESTATE = IN_GAME;
        break;
    case IN_GAME:
        console.log("in game");
        update();
        break;
    case GAME_OVER:
        console.log("game over");
        gameOverScreen();
        break;
    }

    stage.update();
}
