// @input Component.ScriptComponent playerController
// @input SceneObject startScreen

var tapEvent;

function handleTap() {
    if (script.playerController.gameStart && !script.playerController.gameOver && !script.playerController.win) {
        return;
    }

    script.playerController.gameStart = true;

    if (script.startScreen) {
        script.startScreen.enabled = false;
    }
}

tapEvent = script.createEvent("TapEvent");
tapEvent.bind(handleTap);

script.createEvent("OnEnableEvent").bind(function () {
    if (!tapEvent) {
        tapEvent = script.createEvent("TapEvent");
        tapEvent.bind(handleTap);
    }
    tapEvent.enabled = true;
});

script.createEvent("OnDisableEvent").bind(function () {
    if (tapEvent) tapEvent.enabled = false;
});