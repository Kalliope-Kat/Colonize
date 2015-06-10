var menu = {
    display: function () {
        stage.removeAllChildren();
        titleScreen.x = 275;
        titleScreen.y = 0;

        playButton.x = 680;
        playButton.y = 575;
        
        loadButton.x = 940;
        loadButton.y = 575;

//        instructionsButton.x = 700;
//        instructionsButton.y = 500;

        stage.addChild(titleScreen);
        stage.addChild(playButton);
        stage.addChild(loadButton);
//        stage.addChild(instructionsButton);
    },

    displayInstructions: function () {
        stage.removeAllChildren();
        instructionScreen.x = 0;
        instructionScreen.y = 0;

        var instructionsText = new createjs.Text("Instructions", "16px Lucida Console", "#333");

        playButton.x = 500;
        playButton.y = 500;

        stage.addChild(instructionScreen);
        stage.addChild(playButton);
        stage.addChild(instructionsText);
    }, 
    
    displayGameOver: function() {
        stage.removeAllChildren();
        console.log("game over");
        this.display();
    }


}