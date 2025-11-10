

var Directions = {
    left : "left",
    right : "right",
    up : "up",
    down : "down",
    leftAndUp : "leftAndUp",
    rightAndUp : "rightAndUp",
    leftAndDown : "leftAndDown",
    rightAndDown : "rightAndDown",
    none : "NONE"
};

function getDirection(vector, swipeMinDistance, cardinal, diagonal) {
    if (vector.length < swipeMinDistance) {
        return Directions.none; 
    }

    var maxAngle = 45;
    if (cardinal && diagonal) {
        maxAngle /=2; 
    }
    
    if (cardinal) {
        if (getDegreeAngleBetween2dVectors(vector,vec2.left()) <= maxAngle) {
            return Directions.left; 
        }
        if (getDegreeAngleBetween2dVectors(vector,vec2.right()) <= maxAngle) {
            return Directions.right; 
        }
        if (getDegreeAngleBetween2dVectors(vector,vec2.down()) <= maxAngle) {
            return Directions.up; 
        }
        if (getDegreeAngleBetween2dVectors(vector,vec2.up()) <= maxAngle) {
            return Directions.down; 
        }
        if (!diagonal) { 
            var message = "vector"+vector+" matches no direction(cardinal)\n";
            message +=  "left angle : "+getDegreeAngleBetween2dVectors(vector,vec2.left())+"\n";
            message +=  "right angle : "+getDegreeAngleBetween2dVectors(vector,vec2.right())+"\n";
            message +=  "up angle : "+getDegreeAngleBetween2dVectors(vector,vec2.down())+"\n";
            message +=  "down angle : "+getDegreeAngleBetween2dVectors(vector,vec2.up())+"\n";
            throw new Error(message);
        }
    }
    if (diagonal) {
        if (getDegreeAngleBetween2dVectors(vector, addVectors(vec2.left(),vec2.down())) <= maxAngle) {
            return Directions.leftAndUp; 
        }
        if (getDegreeAngleBetween2dVectors(vector, addVectors(vec2.right(),vec2.down())) <= maxAngle) {
            return Directions.rightAndUp; 
        }
        if (getDegreeAngleBetween2dVectors(vector, addVectors(vec2.left(),vec2.up())) <= maxAngle) {
            return Directions.leftAndDown; 
        }
        if (getDegreeAngleBetween2dVectors(vector, addVectors(vec2.right(),vec2.up())) <= maxAngle) {
            return Directions.rightAndDown; 
        }
        throw new Error("vector matches no direction(diagonal)");
    }
    throw new Error("You cannot exclude both cardinal and diagonal directions.");
}

function getDegreeAngleBetween2dVectors(v1, v2) {
    var radian = getAngleBetween2dVectors(v1, v2);
    var degrees = 360 * radian/(2*Math.PI);
    return degrees;
}
function getAngleBetween2dVectors(v1,v2) {
    var dp = dotProduct2D(v1,v2);
    var angle = Math.acos(dp/v1.length/v2.length);
    //any angle could be 0+angle or 360-angle, since the angle might loop all the way around
    var negAngle = 2*Math.PI - angle;
    var altAngle = Math.abs(negAngle);
    return Math.min(angle, altAngle);
}

function dotProduct2D(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y;
}
function addVectors(v1, v2) {
    return new vec2(v1.x+v2.x, v1.y+v2.y);
}


module.exports = {
    Directions : Directions,
    getDirection : getDirection
};