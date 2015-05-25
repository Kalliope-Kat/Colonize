var GRID_COLS = 25,
    GRID_ROWS = 25;
var GRASS = 0,
    WATER = 3,
    WOODCUTTER = 6,
    TREE = 7,
    FARM = 2,
    STONE = 5,
    HOUSE = 1,
    TOWNHALL = 4;

var tile = {
    posX: null,
    posY: null,
    sprite: new createjs.Sprite(tilesSheet)
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
                    console.log("tile clicked at: " + this.x + ", " + this.y + ", " + this.currentAnimation);
                    map.gatherResource(this, this.posX, this.posY);
                });
            }
        }
    }
}

var grid = {
    width: null,
    height: null,
    _grid: [],

    init: function () {
        this.width = GRID_COLS;
        this.height = GRID_ROWS;

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

        var resourceIndex = Math.floor(Math.random() * _empty.length / 26);

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
                tiles._tileArray[x][y].x = ((x - y) * 32) + canvas.width / 2;
                tiles._tileArray[x][y].y = (x + y) * 22;
                tiles._tileArray[x][y].regX = 45;
                tiles._tileArray[x][y].regY = 30;

                switch (grid.get(x, y)) {
                case GRASS:
                    tiles._tileArray[x][y].gotoAndStop("grassTile");
                    break;
                case WATER:
                    tiles._tileArray[x][y].gotoAndStop("waterTile");
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

            }
            stage.update();
        }
    },

    gatherResource: function (tile, tileX, tileY) {
        var tileFrame = tile.currentFrame;
        switch (tileFrame) {
        case GRASS:
            break;
        case WATER:
            break;
        case WOODCUTTER:
            break;
        case TREE:
            resources.logs++;
            console.log("Logs: " + resources.logs);
            break;
        case FARM:
            break;
        case STONE:
            resources.stone++;
            console.log("Stone: " + resources.stone);
            break;
        case HOUSE:
            break;
        case TOWNHALL:
            break;
        }
        
        if(tileFrame === WATER){
            alert("You can't collect that");
        }
        else{
            grid.set(GRASS, tileX, tileY);
            stage.update();
        }
    }
}