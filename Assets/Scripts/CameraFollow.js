//@input SceneObject target
//@input SceneObject follower

const targetTransform = script.target.getTransform();
const followerTransform = script.follower.getTransform();

const offset = followerTransform.getWorldPosition().sub(
                    targetTransform.getWorldPosition());

const initialFollowerX = followerTransform.getWorldPosition().x;

const followThreshold = 0.1;

const smoothFactor = 0.3;

function onUpdate() {
    let currentFollowerPos = followerTransform.getWorldPosition();
    currentFollowerPos.x = initialFollowerX;

    let targetPos = targetTransform.getWorldPosition().add(offset);

    if (currentFollowerPos.distance(targetPos) > followThreshold) {
        followerTransform.setWorldPosition(vec3.lerp(
            currentFollowerPos, targetPos, smoothFactor));
    }
}

script.createEvent("UpdateEvent").bind(onUpdate);