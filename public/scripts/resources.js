var logsText, firewoodText, foodText, stoneText, houseText;

var resources = {
    logs: 38,
//    firewood: 100,
//    food: 250,
    stone: 18,
    houses: 0,

    displayResourcesText: function () {

        logsText = new createjs.Text("Logs: " + this.logs, "18px lucida Console", "#333");
        logsText.x = 10;
        logsText.y = 880;

//        firewoodText = new createjs.Text("Firewood: " + this.firewood, "16px lucida Console", "#333");
//        firewoodText.x = 10;
//        firewoodText.y = 920;
//
//        foodText = new createjs.Text("Food: " + this.food, "16px lucida Console", "#333");
//        foodText.x = 10;
//        foodText.y = 940;

        stoneText = new createjs.Text("Stone: " + this.stone, "18px lucida Console", "#333");
        stoneText.x = 10;
        stoneText.y = 900;
        
        houseText = new createjs.Text("Houses: " + this.houses, "18px lucida Console", "#333");
        houseText.x = 10;
        houseText.y = 920;

        stage.addChild(logsText);
//        stage.addChild(firewoodText);
//        stage.addChild(foodText);
        stage.addChild(stoneText);
        stage.addChild(houseText);

        stage.update();
    }
}