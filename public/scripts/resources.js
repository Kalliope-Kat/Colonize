var logsText, firewoodText, foodText, StoneText;

var resources = {
    logs: 100,
//    firewood: 100,
//    food: 250,
    stone: 100,

    displayResourcesText: function () {

        logsText = new createjs.Text("Logs: " + this.logs, "16px lucida Console", "#333");
        logsText.x = 10;
        logsText.y = 900;

//        firewoodText = new createjs.Text("Firewood: " + this.firewood, "16px lucida Console", "#333");
//        firewoodText.x = 10;
//        firewoodText.y = 920;
//
//        foodText = new createjs.Text("Food: " + this.food, "16px lucida Console", "#333");
//        foodText.x = 10;
//        foodText.y = 940;

        stoneText = new createjs.Text("Stone: " + this.stone, "16px lucida Console", "#333");
        stoneText.x = 10;
        stoneText.y = 920;

        stage.addChild(logsText);
//        stage.addChild(firewoodText);
//        stage.addChild(foodText);
        stage.addChild(stoneText);

        stage.update();
    }
}