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
        feedbackText.x = 750;
        feedbackText.y = 400;
    }
    else{
        feedbackText.x = 10;
        feedbackText.y = 880;
    }
    
    stage.addChild(feedbackText);
    
}

var gameOver = function(){
    stage.removeAllChildren();
    gameOverScreen.x = 275;
    gameOverScreen.y = 0;

    playButton.x = 680;
    playButton.y = 575;

    loadButton.x = 940;
    loadButton.y = 575;
    
    stage.addChild(gameOverScreen);
    stage.addChild(playButton);
    stage.addChild(loadButton);
    displayFeedback(isgameOver);
}