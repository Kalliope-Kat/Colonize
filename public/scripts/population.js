var maxPop;
var increasePopulation = function(){
    maxPop = ((resources.houses * 3) + 1);
    if(gameTimer % 180 === 0 && resources.population < maxPop){
        resources.population++;
    }
    else{
        feedbackLog = "You do not have enough houses for more people";
    }
}