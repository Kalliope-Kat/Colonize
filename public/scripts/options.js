var options = {
    display: function(){
        saveButton.x = 10;
        saveButton.y = 640;
        
        quitButton.x = 10;
        quitButton.y = 713;
        
        stage.addChild(saveButton);
        stage.addChild(quitButton);
    }
}