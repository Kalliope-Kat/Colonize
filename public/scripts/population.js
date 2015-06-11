var maxPop, lastTick;
var increasePopulation = function(){
    maxPop = ((resources.houses * 3) + 1);
    if(gameTimer % 30 === 0 && resources.population < maxPop){
//        if(gameTimer != lastTick){
            resources.population++;
            lastTick = Math.floor(gameTimer);
//        }
    }
    if(gameTimer % 30 === 0 && resources.population === maxPop){
//        if(gameTimer != lastTick){
            feedbackLog = "You do not have enough houses for more people";
//        }
        
    }
}