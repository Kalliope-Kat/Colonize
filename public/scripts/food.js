var starvationMeter = 0;

var foodDecay = function() {

    if(gameTimer % 60 === 0 && resources.food >= 2) {
        resources.food = (resources.food - ( 2 * resources.population));
    }
    
    
    if(gameTimer % 60 === 0 && resources.food === 0){
        feedbackLog = "People are starving to death...";
    }
    
    
    if(gameTimer % 120 === 0 && resources.food === 0){
        starvationMeter++;
        resources.population--;
        resources.food = resources.food + 10;
        feedbackLog = "A colonist died from starvation and was eaten";
        
        var muliplier = Math.floor(Math.random() * 15);
        if(muliplier % 2 === 0){
            resources.population--;
            feedbackLog = "A Colonist died from tainted human meat";
        }
        
        if(starvationMeter === 10 && resources.population === 1){
            feedbackLog = "Your colony has starved to death";
            GAMESTATE = GAME_OVER;
        }
    } 
    
    else if(resources.food > 0) {
        starvationMeter = 0;
    }
    
}