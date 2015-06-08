var loadGame = function() {
    jqAjax.ajax({
        url: '/home',
        type: 'PUT',
        dataType: 'json',
        success: function(data){
            grid._grid = data.grid;
            resources.logs = data.logs;
            resources.stone = data.stone;
            resources.houses = data.houses;
            civilianSprite.x = data.spriteX;
            civilianSprite.y = data.spriteY;
            
            GAMESTATE = START_GAME;
        },
        failure: function(){
            console.log("didn't work");
        }
        
    });
}