var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var FPS = 30;

var canvas, timerCount, gameTimer;

function main() {
    init();
}
function init() {
    openCanvas();
}
function openCanvas() {
    console.log("opened canvas");
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var div = document.getElementById("game");
    console.log(div);
    div.appendChild(canvas);
    
    var ctx = canvas.getContext('2d');
    ctx.font = "30px Arial";
    ctx.fillText("This is my canvas", 10, 50);
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

if( !!(window.addEventListener)) {
    window.addEventListener ("DOMContentLoaded", main);
}else{ //MSIE
    window.attachEvent("onload", main);
}