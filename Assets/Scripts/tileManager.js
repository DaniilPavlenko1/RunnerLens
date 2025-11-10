//@input SceneObject player
//@input Component.ScriptComponent playerController
//@input Component.ScriptComponent playerController
//@input Asset.ObjectPrefab firstTile
//@input Asset.ObjectPrefab otherTiles
//@input SceneObject parent

let zSpawn;
let tileLength = 300;
let totalTiles = 2;
let firstGrounds = [];
let grounds = [];

function spawnFirstTile() {
    const newTile = script.firstTile.instantiate(script.parent);
    const tilePos = new vec3(0, -20, zSpawn);
    newTile.getTransform().setLocalPosition(tilePos);
    firstGrounds.push(newTile);
    zSpawn -= tileLength;
}

function spawnTile() {
    const newTile = script.otherTiles.instantiate(script.parent);
    const tilePos = new vec3(0, -20, zSpawn);
    newTile.getTransform().setLocalPosition(tilePos);
    grounds.push(newTile);
    zSpawn -= tileLength;
}

function resetTile(tile) {
    const newPosition = new vec3(0, -20, zSpawn);
    tile.getTransform().setLocalPosition(newPosition);
    zSpawn -= tileLength;
}

function onStart() {
    zSpawn = 0;
    
    for (let i = 0; i < grounds.length; i++) {
        grounds[i].destroy();
    }
    
    grounds = [];
    firstGrounds = [];
    
    for (let x = 0; x < totalTiles; x++) {
        spawnFirstTile();
    }
}

var startEvent = script.createEvent("OnStartEvent");
startEvent.bind(onStart);

function onUpdate() {
    const playerPos = script.player.getTransform().getWorldPosition();
    
    if (script.playerController.resetHit) {
        onStart();
    } else {
        
        if (firstGrounds.length > 0) {
            for (let i = 0; i < firstGrounds.length; i++) {
                const currentPos = firstGrounds[i].getTransform().getLocalPosition();
                if ((currentPos.z - playerPos.z) >= 200) {
                    firstGrounds[i].destroy();
                    firstGrounds.shift();
                }
            }
        }

        if (grounds.length > 0) {
            for (let i = 0; i < grounds.length; i++) {
                const currentPos = grounds[i].getTransform().getLocalPosition();
                if ((currentPos.z - playerPos.z) >= 200) {
                    resetTile(grounds[i]);
                    const obstacleInstantiator = grounds[i].getComponent("Component.ScriptComponent");
                    obstacleInstantiator.resetObstacles();
                    print("reset")
                }
            }
        }
    
        if ((firstGrounds.length + grounds.length) < totalTiles){
            spawnTile();
        }
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);