// CheckForSwipes.js
// Version: 0.0.1
// Event: Awake
// Description: When placed on a scene object with a screen transform, it checks for swipes within the screen transforms area. Best placed on Frame Regions.
// Pack: TBD

//---------------------------------- INPUT ---------------------------------------
//@input float swipeMinDistance = 0.5 {"widget":"slider", "min":0.0, "max":1.0, "step":0.05, "label": "Swipe Min Distance", "description":"how far does the user have to swipe to be recognized as a swipe"}

//@input bool cardinalSwipes = false;
//@input bool diagonalSwipes = false;
//@input bool showDebugMessage = true;


//@ui {"widget":"group_start", "label":"Behavior Inputs"}
//@input Component.ScriptComponent[] left {"showIf":"cardinalSwipes"}
//@input Component.ScriptComponent[] right {"showIf":"cardinalSwipes"}
//@input Component.ScriptComponent[] up {"showIf":"cardinalSwipes"}
//@input Component.ScriptComponent[] down {"showIf":"cardinalSwipes"}

//@input Component.ScriptComponent[] leftAndUp {"showIf":"diagonalSwipes"}
//@input Component.ScriptComponent[] leftAndDown {"showIf":"diagonalSwipes"}
//@input Component.ScriptComponent[] rightAndUp {"showIf":"diagonalSwipes"}
//@input Component.ScriptComponent[] rightAndDown {"showIf":"diagonalSwipes"}
//@ui {"widget":"group_end"}

//@ui {"widget":"label", "label":""}
//@ui {"widget":"group_start", "label":"Call API"}
//@input Component.ScriptComponent scriptWithApi;
//@input string[] leftFuncNames {"showIf":"cardinalSwipes"}
//@input string[] rightFuncNames {"showIf":"cardinalSwipes"}
//@input string[] upFuncNames {"showIf":"cardinalSwipes"}
//@input string[] downFuncNames {"showIf":"cardinalSwipes"}

//@input string[] leftAndUpFuncNames {"showIf":"diagonalSwipes"}
//@input string[] leftAndDownFuncNames {"showIf":"diagonalSwipes"}
//@input string[] rightAndUpFuncNames {"showIf":"diagonalSwipes"}
//@input string[] rightAndDownFuncNames {"showIf":"diagonalSwipes"}
//@ui {"widget":"group_end"}

//--------------- LOCAL VARIABLES AND INIT -------------------
/**@type vec2 */ var touchPos;
var VectorUtilities = require("VectorUtilitiesModule");
var directionsDictionary = [];

init();

//----------------- FUNCTIONS ----------------------
/**
 * declare screenTransform, disable swiping out of the lens, add touch event bindings
 */
function init() {
    if (!script.diagonalSwipes && !script.cardinalSwipes) {
        print("Warning: Both cardinal and diagonal swipe detection is disabled");
        return;
    }
    createDirectionObjects();

    global.touchSystem.touchBlocking = true;
    global.touchSystem.enableTouchBlockingException("TouchTypeSwipe", true);
    script.createEvent("TouchStartEvent").bind(onTouchStart);
    script.createEvent("TouchEndEvent").bind(onTouchEnd);    
}

function createDirectionObjects() {
    makeObj(VectorUtilities.Directions.left);
    makeObj(VectorUtilities.Directions.right);
    makeObj(VectorUtilities.Directions.up);
    makeObj(VectorUtilities.Directions.down);

    makeObj(VectorUtilities.Directions.leftAndUp);
    makeObj(VectorUtilities.Directions.rightAndUp);
    makeObj(VectorUtilities.Directions.leftAndDown);
    makeObj(VectorUtilities.Directions.rightAndDown);

    function makeObj(directionName) {
        var obj = {
            name : directionName,
            funcNames : script[directionName+"FuncNames"],
            behaviors : script[directionName],
        };
        directionsDictionary[obj.name] = obj;
    }
}

/**
 * declares touchPos
 * @param {Object} eventData 
 */
function onTouchStart(eventData) {
    touchPos = eventData.getTouchPosition();
}

/**
 * If touch position has changed since touchStart, call callSwipeBehaviors
 * @param {Object} eventData 
 */
function onTouchEnd(eventData) {
    if (touchPos) {
        /**@type vec2 */ var currentPos = eventData.getTouchPosition();
        /**@type vec2 */ var posChange = new vec2(currentPos.x - touchPos.x, currentPos.y - touchPos.y);
        callSwipeBehaviors(posChange); 
        touchPos = null;
    }
}

/**
 * calls the behaviors based on the value of posChange
 * @param {vec2} posChange how much did the touch move since touchstart
 */
function callSwipeBehaviors(posChange) {
    var direction = VectorUtilities.getDirection(posChange, script.swipeMinDistance, script.cardinalSwipes, script.diagonalSwipes);
    if (script.showDebugMessage) {
        print("swiped "+direction); 
    }
    if (direction === VectorUtilities.Directions.none) {
        return;
    }
    var obj = directionsDictionary[direction];
    triggerBehaviorsAndApi(obj.behaviors, obj.funcNames);
}


function triggerBehaviorsAndApi(behaviors, funcNames) {
    //------- API -----------
    if (!funcNames) {
        return; 
    }
    for (var i = 0; i < funcNames.length; i++) {
        var funcName = funcNames[i];
        script.scriptWithApi[funcName]();
    }  
    //----- BEHAVIORS -------
    if (!behaviors) {
        return;
    }
    for (var i=0; i<behaviors.length; i++) {
        if (behaviors[i] && behaviors[i].trigger) {
            behaviors[i].trigger();    
        } else {
            print("WARNING: please assign the Behavior Script Component");
        }                                
    }
}