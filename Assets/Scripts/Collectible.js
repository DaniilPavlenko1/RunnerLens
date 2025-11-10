// @input Component.ScriptComponent playerController
// @input int points = 10

var picked = false;

var collider = script.getSceneObject().getComponent("Physics.ColliderComponent");

if (collider) {
    collider.onOverlapEnter.add(function (eventData) {
        if (picked) return;
        picked = true;

        if (script.playerController && script.playerController.addScore) {
            script.playerController.addScore(script.points);
        }

        script.getSceneObject().destroy();
    });
}
