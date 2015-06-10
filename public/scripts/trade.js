var openTraderBoard = function(){
    bootbox.dialog({
        message: '<div class="row"> ' + 
                '<div class="col-md-4"> ' +
                '<div class="col-md-4"> ' +
                '<label class="col-md-4" for="want">Wanted: </label> ' +
                '<span class="help-block"> Logs:  ' ,
        title: "Welcome to the Trader Board",
        buttons: {
            cancel: {
                label: "Cancel",
                className: "btn-primary",
                callback: function(){
                    console.log("trade cancelled"); // add to game console once made
                }
            },
            trade: { 
                label: "Trade",
                className: "btn-primary",
                callback: function() {
                    console.log("Sucessful Trade"); // game console
                    GAMESTATE = IN_GAME;
                }
            }
        }
    });
}