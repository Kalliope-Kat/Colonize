var menu = {
    display: function () {
        stage.removeAllChildren();
        titleScreen.x = 0;
        titleScreen.y = 0;

        playButton.x = 100;
        playButton.y = 500;
        
        loadButton.x = 400;
        loadButton.y = 500;

        instructionsButton.x = 700;
        instructionsButton.y = 500;

        stage.addChild(titleScreen);
        stage.addChild(playButton);
        stage.addChild(loadButton);
        stage.addChild(instructionsButton);
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