
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
    
    GAMESTATE = CONSTRUCT;
    startLoop();
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
    
    stage.update();
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
        displayInstructions();
        break;
    case START_GAME:
        console.log("starting game...");
        //runGameTimer();
        map.drawMap();
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
