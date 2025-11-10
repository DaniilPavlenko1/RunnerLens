// @input Component.ScriptComponent animStateManager
// @input SceneObject player
// @input Physics.ColliderComponent collider
// @input SceneObject startScreen
// @input SceneObject gameOverScreen
// @input SceneObject winnerScreen
// @input SceneObject restartScreen
// @input SceneObject livesText
// @input SceneObject scoreText
// @input Component.Text livesText1
// @input Component.Text scoreText1

let lives = 3;
let score = 0;
let hudShown = false;

let invulnerable = false;
let invulnDuration = 1.2;
let invulnStartTime = 0;

let changeDir = false;

let step = 0;
let currentDir = 0;
let targetDir = 0;
let currentMoveTime = 0;
let movementTime = 1.5;

let speed = 100;
let speedIncreaseRate = 0.5;
let maxSpeed = 300;
let timeElapsed = 0;    
let jump = false;
let jumpStartTime;
const jumpDuration = 1.5;
const jumpHight = 30;
const jumpForwardOffset = 2;

function init() {
    
    transform = script.player.getTransform();
    
    transform.setLocalPosition(vec3.zero());
    currentPos = transform.getLocalPosition();
    targetPos = currentPos;

    currentDir = 0;
    targetDir = 0;
    changeDir = false;
    
    jump = false;
    jumpStartTime = 0;
    
    step = 0;

    script.animStateManager.setParameter("fall", false);
    script.animStateManager.setParameter("idle", true);

    script.startScreen.enabled = true;
    script.gameOverScreen.enabled = false;
    script.winnerScreen.enabled = false;
    script.restartScreen.enabled = false;

    if (script.livesText) { script.livesText.enabled = false; }
    if (script.scoreText) { script.scoreText.enabled = false; }

    script.gameStart = false;
    script.gameOver = false;
    script.resetHit = false;
    script.win = false;
    hudShown = false;



    lives = 3;
    score = 0;
    invulnerable = false;
    if (script.collider) { script.collider.enabled = true; }
    updateUI();
    
}


const startEvent = script.createEvent("OnStartEvent");
startEvent.bind(init);

function updateUI() {
    if (script.livesText1) { script.livesText1.text = "Lives: " + lives; }
    if (script.scoreText1) { script.scoreText1.text = "Score: " + Math.floor(score); }
}

script.addScore = function(points) {
    score += points;
    updateUI();
};

script.upSwipe = function() {
    script.animStateManager.setTrigger("jump");
    jump = true;
    jumpStartTime = getTime();
};

script.downSwipe = function() {
};

script.leftSwipe = function() {
    if (currentPos.x >= 0) {
        step = -7;
        changeDir = true;
    }
    targetDir = -1;
};

script.rightSwipe = function() {
    if (currentPos.x <= 0) {
        step = 7;
        changeDir = true;
    }
    targetDir = 1;
};

function canGameStart() {
    if (script.gameStart && !script.gameOver && !script.win) {
        if (script.startScreen && script.startScreen.enabled) {
            script.startScreen.enabled = false;
        }
        if (!hudShown) {
            if (script.livesText) script.livesText.enabled = true;
            if (script.scoreText) script.scoreText.enabled = true;
            hudShown = true;
        }
        script.animStateManager.setParameter("idle", false);
        return true;
    } else if (script.win) {
        script.animStateManager.setParameter("idle", true);
        script.restartScreen.enabled = true;
    }
    return false;
}

function onUpdate(){
    if (script.resetHit) {
        init();
    }

    if (canGameStart()) {
        timeElapsed += getDeltaTime();
        if (speed < maxSpeed) {
            speed += speedIncreaseRate * getDeltaTime(); 
        }
        currentPos.z -= speed * getDeltaTime();
        
        if (changeDir) {
            if (currentMoveTime >= movementTime) {
                currentMoveTime = 0;
                changeDir = false;
            } else {
                currentMoveTime += 0.5;
                targetPos.x += step;
            }
        } else {
            targetDir = 0;
        }
        
        if (jump) {
            let elapsedTime = getTime() - jumpStartTime;
            if (elapsedTime < jumpDuration) {
                let jumpProgress = elapsedTime / jumpDuration;
                targetPos.y = Math.sin(jumpProgress * Math.PI) * jumpHight;
                currentPos.z -= jumpForwardOffset;
            } else {
                targetPos.y = 0;
                jump = false;
            }
        }

        if (invulnerable && (getTime() - invulnStartTime) >= invulnDuration) {
            invulnerable = false;
            if (script.collider) { script.collider.enabled = true; }
        }
        
        targetPos.z = currentPos.z;

        currentDir = MathUtils.lerp(currentDir, targetDir, 0.3);
        
        script.animStateManager.setParameter("direction", (currentDir + 1) / 2);
        
        transform.setLocalPosition(targetPos);
    }
}

const updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

function gameEnds() {
    targetPos.y = 0;

    script.gameOver = true;
    
    script.gameOverScreen.enabled = true;
    script.restartScreen.enabled = true;

    script.animStateManager.setParameter("fall", true);
}

script.collider.onCollisionEnter.add(function() {
    if (script.gameOver || invulnerable) { return; }

    lives -= 1;
    updateUI();

    if (lives <= 0) {
        gameEnds();
        return;
    }

    invulnerable = true;
    invulnStartTime = getTime();
    if (script.collider) { script.collider.enabled = false; }

    targetPos.x = 0; currentPos.x = 0;
    currentPos.z -= 20;
    targetPos.y = 0;
});