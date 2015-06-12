var taintedMeat;

var foodDecay = function () {

    if (resources.population === 0) {
        GAMESTATE = GAME_OVER;
    }

    if (gameTimer % 9 === 0) {
        if (resources.food === 0) {
            feedbackLog = "People are starving to death...";
        }
    }

    if (gameTimer % 9 === 0 && resources.food >= 1) {
        if(gameTimer != lastTick){
            resources.food = (resources.food - (2 * resources.population));
            lastTick = Math.floor(gameTimer);
        }
        
        if(resources.food < 0){
            resources.food = 0;
        }
    }
    
    if (gameTimer % 21 === 0 && resources.food === 0) {
        if (resources.population === 1 && gameTimer != lastTick) {
            resources.population--;
        }
        if (resources.population > 1 && gameTimer != lastTick) {
            resources.population--;
            lastTick = Math.floor(gameTimer);
            resources.food = resources.food + 10;
            feedbackLog = "A colonist died from starvation and was eaten";
            taintedMeat = "true";
        }
    }
    
    if (gameTimer % 10 === 0 && gameTimer != lastTick) {
        var muliplier = Math.floor(Math.random() * 52);
        if ( muliplier % 13 === 0 && taintedMeat) {
            resources.population--;
            lastTick = Math.floor(gameTimer);
            feedbackLog = "A colonist died from eating rotten human flesh";
        }
    }

}

var foodIncrease = function () {
    if (gameTimer % 5 === 0 && lastTick != gameTimer) {
        if (resources.farms > 0) {
            resources.food = (resources.food + (resources.farms * 8));
            lastTick = Math.floor(gameTimer);
        }
    }
}
