// @input Component.ScriptComponent playerController

function onTap() {
    if (!script.playerController.gameOver && !script.playerController.win) return;

    script.playerController.resetHit = true;
    script.getSceneObject().enabled = false;
}

script.createEvent("TapEvent").bind(onTap);