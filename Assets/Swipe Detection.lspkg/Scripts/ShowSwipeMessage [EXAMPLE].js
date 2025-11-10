// -----JS CODE-----
//@input float showTextTime = 3;

var text = script.getSceneObject().getComponent("Component.Text");
text.text = "";
var delayedEvent;

//------------------ FUNCTIONS FOR EACH DIRECTION -----------------
script.leftSwipe = function() {
    showText("left"); 
};
script.rightSwipe = function() {
    showText("right"); 
};
script.upSwipe = function() {
    showText("up"); 
};
script.downSwipe = function() {
    showText("down"); 
};
script.leftAndUpSwipe = function() {
    showText("left and up"); 
};
script.rightAndUpSwipe = function() {
    showText("right and up"); 
};
script.leftAndDownSwipe = function() {
    showText("left and down"); 
};
script.rightAndDownSwipe = function() {
    showText("right and down"); 
};

//------------SHOW TEXT ----------------
/**
 * displays name of direction on screen and clears it again in 2 seconds
 * @param {string} direction the name of the direction
 */
function showText(direction) {
    text.text = "You swiped "+direction+"!";
    if (delayedEvent) {
        script.removeEvent(delayedEvent);
    }
    delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function() {
        text.text = ""; 
    });
    delayedEvent.reset(script.showTextTime);
}
