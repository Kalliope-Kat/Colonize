var GRID_COLS = 21,
    GRID_ROWS = 21;
var GRASS = 0,
    WATER = 3,
    WOODCUTTER = 6,
    TREE = 7,
    FARM = 2,
    STONE = 5,
    HOUSE = 1,
    TOWNHALL = 4,
    PLAYER = 8;
var isBuild = false;
var STONECOST = 10,
    WOODCOST = 20;
var _waterTiles = [];
var _collisions = [];

var tile = {
    posX: null,
    posY: null,
}

var civilianSprite = {
    dir: null
}

var tiles = {
    _tileArray: null,

    populateTileArray: function () {
        this._tileArray = [];

        for (var i = 0; i < grid.width; i++) {
            this._tileArray.push([]);
            for (var j = 0; j < grid.height; j++) {
                this._tileArray[i].push(tile.clone());
                this._tileArray[i][j].posX = i;
                this._tileArray[i][j].posY = j;
                this._tileArray[i][j].on("click", function (evt) {
                    console.log("shift: " + evt.nativeEvent.shiftKey);
                    if (evt.nativeEvent.shiftKey) {
                        console.log("building at: " + this.x + "," + this.y);
                        isBuild = true;
                        map.moveCharacter(this, isBuild);
                    } else {
                        console.log("tile clicked at: " + this.x + ", " + this.y + ", " + this.currentAnimation);
                        isBuild = false;
                        map.moveCharacter(this, isBuild); //pass tile, posX, posY and call gather in tween call
                        //                    map.gatherResource(this, this.posX, this.posY);
                    }

                });
            }
        }
    }
    
}

var grid = {
    width: GRID_COLS,
    height: GRID_ROWS,
    _grid: [],

    init: function () {

        for (var x = 0; x < this.width; x++) {

            this._grid.push([]);

            for (var y = 0; y < this.height; y++) {
                this._grid[x].push(GRASS);

            }
        }

    },

    set: function (val, x, y) {
        this._grid[x][y] = val;
    },

    get: function (x, y) {
        return this._grid[x][y];
    }

}

var map = {

    spawnResources: function (resource) {
        var _empty = [];
        for (var x = 0; x < grid.width; x++) {
            for (var y = 0; y < grid.height; y++) {
                if (grid.get(x, y) === resource) {
                    grid.set(GRASS, x, y);
                    _empty.push({
                        x: x,
                        y: y
                    });
                }
                if (grid.get(x, y) === GRASS) {
                    _empty.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        var resourceIndex = 0;

        for (var i = resourceIndex; i < resourceIndex + 6; i++) {
            for (var j = resourceIndex; j < resourceIndex + 6; j++) {
                if (resource === WATER) {
                    var clusterPos = _empty[j, i];
                    clusterPos.x = i;
                    clusterPos.y = j;
                    grid.set(resource, clusterPos.x, clusterPos.y);

                } else {
                    var randIndex = Math.floor(Math.random() * _empty.length);
                    var randPos = _empty[randIndex];

                    grid.set(resource, randPos.x, randPos.y);

                }
            }
        }
    },

    drawMap: function () {
        for (x = 0; x < grid.width; x++) {
            for (y = 0; y < grid.height; y++) {
                tiles._tileArray[x][y].x = ((x - y) * 32) + canvas.width / 1.95;
                tiles._tileArray[x][y].y = ((x + y) * 22) + 30;
                tiles._tileArray[x][y].regX = 45;
                tiles._tileArray[x][y].regY = 30;

                switch (parseInt(grid.get(x, y))) {
                    case GRASS:
                        tiles._tileArray[x][y].gotoAndStop("grassTile");
                        break;
                    case WATER:
                        tiles._tileArray[x][y].gotoAndStop("waterTile");
                        _waterTiles.push(tiles._tileArray[x][y]);
                        break;
                    case WOODCUTTER:
                        tiles._tileArray[x][y].gotoAndStop("woodCuttersTile");
                        break;
                    case TREE:
                        tiles._tileArray[x][y].gotoAndStop("treeTile");
                        break;
                    case FARM:
                        tiles._tileArray[x][y].gotoAndStop("farmTile");
                        break;
                    case STONE:
                        tiles._tileArray[x][y].gotoAndStop("rockTile");
                        break;
                    case HOUSE:
                        tiles._tileArray[x][y].gotoAndStop("houseTile");
                        break;
                    case TOWNHALL:
                        tiles._tileArray[x][y].gotoAndStop("townHall");
                        break;
                        
                }
                
                stage.addChild(tiles._tileArray[x][y]);
                stage.addChild(civilianSprite);

            }
            stage.update();
        }
    },

    gatherResource: function (tile) {
        var tileFrame = tile.currentFrame;
        var collectable = false;
        switch (tileFrame) {
        case TREE:
            resources.logs++;
            console.log("Logs: " + resources.logs);
            collectable = true;
            break;
        case STONE:
            resources.stone++;
            console.log("Stone: " + resources.stone);
            collectable = true;
            break;
        }
        
        if(!collectable){
            alert("You can't collect that!"); //Change to something better
        }
        else{
            grid.set(GRASS, tile.posX, tile.posY);
            stage.update();
        }
        civilianSprite.stop();
    },
    
    buildHouse: function(tile) {
        var tileFrame = tile.currentFrame;
        switch (tileFrame) {
            case GRASS:
                resources.stone -= STONECOST;
                resources.logs -= WOODCOST;
                resources.houses ++;
                grid.set(HOUSE, tile.posX, tile.posY);
                stage.update();
                break;
            default: 
                //error output to error canvas
                break;
        }
        
        civilianSprite.stop();
    },
    
    handleGathering: function(tile){
        return function(){
            map.gatherResource(tile);  
        }
    },
    
    handleBuilding: function(tile){
        return function(){
            map.buildHouse(tile);
        }
    },
    
    moveCharacter: function(tile, isBuild){ //handle water movement here
        civilianSprite.gotoAndPlay("walkSouth");
        var tween = createjs.Tween.get(civilianSprite);
        if(tile.currentFrame === WATER){
            //You can't go here message.
        }
        else{
            tween.to({x:tile.x, y:tile.y}, 3500);
        }
           
        if(isBuild){
            tween.call(map.handleBuilding(tile));
        }
        else{
            tween.call(map.handleGathering(tile)); 
        }
        
        
    },
    
    
    
    
}