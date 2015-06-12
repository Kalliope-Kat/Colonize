var FPS = 30;
var isgameOver = false;
var GAMESTATE;
var CONSTRUCT = 100,
    INSTRUCTIONS = 200,
    START_GAME = 300,
    IN_GAME = 400,
    GAME_OVER = 500,
    QUIT = 600,
    SAVE_GAME = 700,
    LOAD_GAME = 800,
    TRADE = 900,
    MENU = 1000,
    WIN = 1100;
var queue, timerCount, gameTimer;
var logs = 100, firewood = 100, food = 250, stone = 100;
var feedbackLog;

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
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    

    mouseInit();

}

function loadFiles() {
    queue = new createjs.LoadQueue(true, "styles/images/");
    queue.on("complete", preload.loadComplete, this);
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
        GAMESTATE = CONSTRUCT;
    });

//    instructionsButton.addEventListener("click", function (event) {
//        GAMESTATE = INSTRUCTIONS;
//    });
    
    tradeButton.addEventListener("click", function(evt) {
        GAMESTATE = TRADE;
    });
    
    saveButton.addEventListener("click", function(evt){
        GAMESTATE = SAVE_GAME;
    });
    
    loadButton.addEventListener("click", function(evt){
        GAMESTATE = LOAD_GAME;
    });
    
    quitButton.addEventListener("click", function(evt) {
        GAMESTATE = QUIT;
    });
    
}

function handleButtonHover() {
    // file manifest first
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
        console.log("Starvation Key");
        resources.food = 0;
        timerCount = 600;
        break;
    case 87:
        console.log("Cannibalism Key");
        resources.population--;
        feedbackLog = "A colonist died from eating rotten human flesh";
        break;
    case 68:
        console.log("Death Key");
        resources.population = 1;
        resources.food = 0;
        timerCount = 1230;
        break;
    case 83:
        console.log("Win key");
        resources.farms = 4;
        resources.houses = 4;
        break;
    case 81:
        console.log("Population Key");
        resources.population++;
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


function update() {
    stage.removeAllChildren();
    map.drawMap();
    resources.displayResourcesText();
    options.display();
    displayFeedback();
    displayGameControls();
    
    
    if (gameTimer > 0) {
        respawnResources();
        foodIncrease();
        foodDecay();
        increasePopulation();
        
        if(gameTimer % 2 === 0){
            if(resources.farms === 4 && resources.houses === 5){
                GAMESTATE = WIN;
            }
        }
        
    }
    
    
}

function loop() {

    switch (GAMESTATE) {
        case MENU:
//            console.log("menu");
            menu.display();
            handleButtonClick();
            break;        
        case CONSTRUCT:
//            console.log("constructing...");
            grid.init();
            tiles.populateTileArray();
            map.spawnResources(WATER);
            map.spawnResources(TREE);
            map.spawnResources(STONE);            
            resources.resetDefaults();
            GAMESTATE = START_GAME;
            break;
        case INSTRUCTIONS:
//            console.log("displaying instructions");
            menu.displayInstructions();
            break;
        case START_GAME:
            taintedMeat = false;
            isgameOver = false;
            resetGameTimer();
//            console.log("starting game...");
            feedbackLog = "Welcome to Colonize!";
            stage.removeAllChildren();
            map.drawMap();
            resources.displayResourcesText();
            options.display();
            displayGameControls();
            GAMESTATE = IN_GAME;
            break;
        case IN_GAME:
//            console.log("in game");
            runGameTimer();
            update();
            break;
        case TRADE:
            openTraderBoard();
            GAMESTATE = "Hold";
            break;
        case SAVE_GAME:
            saveGame(grid, civilianSprite, resources);
            break;
        case LOAD_GAME:
            tiles.populateTileArray();
            loadGame();
            break;
        case QUIT:
//            console.log("quit");
            GAMESTATE = MENU;
            break;
        case GAME_OVER:
            isgameOver = true;
            gameOver();
            break;
        case WIN:
            win();
            break;
    }

    stage.update();
}
