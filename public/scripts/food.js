var foodDecay = function() {

    if(gameTimer % 10 === 0 && resources.food >= 1) {
        resources.food = (resources.food - ( 1 * resources.population));
    }
    
    
    else if(gameTimer % 10 === 0 && resources.food === 0){
        feedbackLog = "People are starving to death...";
    }
    
    
    else if(gameTimer % 20 === 0 && resources.food === 0){
        
        if(resources.population > 1){
            resources.population--;
            resources.food = resources.food + 10;
            feedbackLog = "A colonist died from starvation and was eaten";
        }
        
        var muliplier = Math.floor(Math.random() * 15);
        if(muliplier % 2 === 0){
            resources.population--;
            feedbackLog = "A Colonist died from tainted human meat";
        }
        
        if(resources.population === 0){
            feedbackLog = "Your colony has starved to death";
            GAMESTATE = GAME_OVER;
        }
    } 
    
}