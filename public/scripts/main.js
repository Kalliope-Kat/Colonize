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
    MENU = 1000;
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
//    console.log(gameTimer);
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

    if (gameTimer > 0) {
        if (resources.population === 0) {
            GAMESTATE = GAME_OVER;
        }

        if (gameTimer % 10 === 0) {
            if (resources.food === 0) {
                feedbackLog = "People are starving to death...";
            }
        }

        if (gameTimer % 10 === 0 && resources.food >= 1) {
            resources.food = (resources.food - (1 * resources.population));
        }


        if (gameTimer % 20 === 0 && resources.food === 0) {
            if (resources.population === 1) {
                resources.population--;
            } 
            if(resources.population > 1) {
                resources.population--;
                resources.food = resources.food + 10;
                feedbackLog = "A colonist died from starvation and was eaten";
                var muliplier = Math.floor(Math.random() * 15);
                if (muliplier % 2 === 0) {
                    resources.population--;
                    feedbackLog = "A Colonist died from tainted human meat";
                }
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
            feedbackLog = "";   
            isgameOver = false;
            grid.init();    
            tiles.populateTileArray();
            map.spawnResources(WATER);
            map.spawnResources(TREE);
            map.spawnResources(STONE);
            GAMESTATE = START_GAME;
            break;
        case INSTRUCTIONS:
//            console.log("displaying instructions");
            menu.displayInstructions();
            break;
        case START_GAME:
//            console.log("starting game...");
            resetGameTimer();
            resources.resetDefaults();
            feedbackLog = "Welcome to Colonize!";
            stage.removeAllChildren();
            map.drawMap();
            resources.displayResourcesText();
            options.display();
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
    }

    stage.update();
}
