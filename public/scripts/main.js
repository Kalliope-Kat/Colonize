var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var titleScreen, instructionScreen, gameScreen;
var playButton, instructionsButton;
var FPS = 30;
var gameOver;
var GAMESTATE;
var CONSTRUCT = 100, INSTRUCTIONS = 200, START_GAME = 300, 
    IN_GAME = 400, GAME_OVER = 500;

var canvas, stage, queue, timerCount, gameTimer;

function main() {
    init();
}
function init() {
    openCanvas();
    loadFiles();
    gameOver = false;
    
    mouseInit();
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
}
function loadComplete(evt) {
    titleScreen = new createjs.Bitmap(queue.getResult("titleScreen"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructionsScreen"));
    gameScreen = new createjs.Bitmap(queue.getResult("gameScreen")):
        playButton = new createjs.Bitmap(queue.getResult("playButton"));
    instructionsButton = new createjs.Bitmap(queue.getResult("instructionsButton"));
    
    handleButtonClick();
    startLoop();
    GAMESTATE = CONSTRUCT;
    
    fileManifest = [
        {src:"GameScreen.png", id:"gameScreen"},
        {src:"InstructionsScreen.png", id:"instructionsScreen"},
        {src:"TitleScreen.png", id:"titleScreen"},
        {src:"InstructionsButton.png", id:"instructionsButton"},
        {src:"playButton.png", id:"playButton"},
    ];

}

function loadFiles(){
    queue = new createjs.LoadQueue(true, "assets/images/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
}
function openCanvas() {
    console.log("opened canvas");
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var div = document.getElementById("game");
    console.log(div);
    div.appendChild(canvas);
    
    stage = new createjs.stage(canvas);

}

var mouseX, mouseY;
function mouseInit() {
    stage.on("stagemousemove", function(evt) {
    mouseX = Math.floor(evt.stageX);
    mouseY = Math.floor(evt.stageY);
    });
}

function handleButtonClick() {
    playButton.addEventListener("click", function (event){ 
        GAMESTATE = START_GAME;
    });

    instructionsButton.addEventListener("click", function (event){
        GAMESTATE = INSTRUCTIONS;
    });
}

function keyDown(e){
    switch(e.keycode){
        case 65:
            console.log("left down");
            break;
        case 87:
            console.log("Up down");
            break;
        case 69:
            console.log("Right down");
            break;
        case 83:
            console.log("Down pressed");
            break;
    }
}
function keyUp(e){
    switch(e.keycode){
        case 65:
            console.log("left up");
            break;
        case 87:
            console.log("Up up");
            break;
        case 69:
            console.log("Right up");
            break;
        case 83:
            console.log("Down released");
            break;
    }
    
}

function displayMenu(){
    stage.removeAllChildren();
    titleScreen.x = 0;
    titleScreen.y = 0;
    
    playButton.x = 100;
    playButton.y = 500;
    
    instructionsButton.x = 100;
    instructionButton.y = 500;
    
    stage.addChild(titleScreen);
    stage.addChild(playButton);
    stage.addChild(instructionsButton);
}

function displayInstructions(){
    stage.removeAllChildren();
    instructionScreen.x = 0;
    instructionScreen.y = 0;
    
    var instructionsText = new createjs.Text("Instructions","16px Lucida Console", "#333");
    
    playButton.x = 500;
    playButton.y = 500;
    
    stage.addChild(instructionScreen);
    stage.addChild(playButton);
    stage.addChild(instructionsText);
}

function displayGame(){
    stage.removeAllChildren();
    gameScreen.x = 0;
    gameScreen.y = 0;
    
    var gameText = new createjs.Text("Game", "16px lucida Console", "#333");

    stage.addChild(gameScreen);
    stage.addChild(gameText);
}

function gameOverScreen(){
    stage.removeAllChildren();
    console.log("Reset Screen");
    displayMainMenu();
    gameTimer = 0;
    timerCount = 0;
    
}

function startLoop(){
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
}

timerCount = 0;
function runGameTimer(){
    timerCount +=1;
    //console.log(timerCount);
    if(timerCount%(FPS/10) === 0) {
        gameTimer = timerCount/(FPS);
    }
    console.log(gameTimer);
}

function resetGameTimer() {
    timerCount = 0;
    gameTimer = 0;
}

function loop(){
    switch(GAMESTATE){
            case CONSTRUCT:
                displayMenu();
                break;
            case INSTRUCTIONS:
                displayInstructions();
                break;
            case START_GAME:
                //runGameTimer();
                displayGame();
                break;
            case IN_GAME:
                //logic
                break;
            case GAME_OVER:
                gameOverScreen();
                break;
    }
    
    stage.update();
}
if( !!(window.addEventListener)) {
    window.addEventListener ("DOMContentLoaded", main);
}else{ //MSIE
    window.attachEvent("onload", main);
}