var options = {
    display: function(){
        tradeButton.x = 10;
        tradeButton.y = 567;
        
        saveButton.x = 10;
        saveButton.y = 640;
        
        quitButton.x = 10;
        quitButton.y = 713;
        
        stage.addChild(saveButton);
        stage.addChild(quitButton);
//        stage.addChild(tradeButton);
    }
}

var displayFeedback = function(isgameOver){
    var feedbackText = new createjs.Text(feedbackLog, "18px lucida Console", "#333");
    if(isgameOver){
        feedbackText.x = 730;
        feedbackText.y = 400;
        feedbackText.font = "24px lucida Console";
        feedbackText.color = "#FFF";
    }
    else{
        feedbackText.x = 10;
        feedbackText.y = 880;
    }
    
    stage.addChild(feedbackText);
    feedbackText = "";
}

var displayGameControls = function(){
    controls.x = 10;
    controls.y = 50;
    
    key.x = 1600;
    key.y = 50;
    
    stage.addChild(controls);
    stage.addChild(key);
}

var gameOver = function(){
    stage.removeAllChildren();
    feedbackLog = "Your colony has died out";
    gameOverScreen.x = 275;
    gameOverScreen.y = 0;

    playButton.x = 670;
    playButton.y = 575;

    loadButton.x = 930;
    loadButton.y = 575;
    
    stage.addChild(gameOverScreen);
    stage.addChild(playButton);
    stage.addChild(loadButton);
    displayFeedback(isgameOver);
}