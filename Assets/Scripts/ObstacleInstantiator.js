// @input Asset.ObjectPrefab[] obstacles
// @input Asset.ObjectPrefab[] collectibles
// @input float collectibleChance = 0.5

let collectiblesArr = [];

let startZPosition = 40;
let currentZPosition = startZPosition;
let distance = 45;
let obstaclesArr = [];
let xPositions = [11, 0, -11];

function setObstaclePosition(obstacle) {
    const randomXIndex = Math.floor(MathUtils.randomRange(0, xPositions.length));
    obstacle.getTransform().setLocalPosition(new vec3(xPositions[randomXIndex], 5, currentZPosition));
    currentZPosition -= distance;
}

function instantiateObstacle() {
    const randomObstacleIndex = Math.floor(MathUtils.randomRange(0, script.obstacles.length));
    const newObstacle = script.obstacles[randomObstacleIndex].instantiate(script.getSceneObject());
    setObstaclePosition(newObstacle);
    if (Math.random() < script.collectibleChance) {
        instantiateCollectible();
    }
    obstaclesArr.push(newObstacle);
}

function resetObstacles() {
    currentZPosition = startZPosition;
    for (let i = 0; i < obstaclesArr.length; i++) {
        setObstaclePosition(obstaclesArr[i]);
        if (Math.random() < script.collectibleChance) {
            instantiateCollectible();
        }
    }
}

function setCollectiblePosition(collectible) {
    const randomXIndex = Math.floor(MathUtils.randomRange(0, xPositions.length));
    let z = currentZPosition + distance * 0.5;
    collectible.getTransform().setLocalPosition(new vec3(xPositions[randomXIndex], 5, z));
}

function instantiateCollectible() {
    if (!script.collectibles || script.collectibles.length === 0) { return; }
    const randomIndex = Math.floor(MathUtils.randomRange(0, script.collectibles.length));
    const newObj = script.collectibles[randomIndex].instantiate(script.getSceneObject());
    setCollectiblePosition(newObj);
    collectiblesArr.push(newObj);
}

function init() {
    for (let i = 0; i < 3; i++) {
        instantiateObstacle();
    }
}

init();

script.resetObstacles = resetObstacles;