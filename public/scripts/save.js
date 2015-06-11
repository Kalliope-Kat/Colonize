var saveGame = function (grid, sprite, resources) {
    var saveData = {
        grid: grid._grid,
        spriteX: sprite.x,
        spriteY: sprite.y,
        logs: resources.logs,
        stone: resources.stone,
        houses: resources.houses,
        population: resources.population,
        farms: resources.farms,
        food: resources.food
    };

    jqAjax.ajax({
        url: '/home',
        type: 'PUT',
        data: saveData,
        dataType: 'json',
        success: function () {
//            console.log("saved game");
            feedbackLog = "Game Saved!";
            GAMESTATE = IN_GAME;
        },
        failure: function(){
            feedbackLog = "Something went wrong...";
            GAMESTATE = IN_GAME;
        }
        
    });


}