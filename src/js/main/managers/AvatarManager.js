import * as THREE from "three";

export default class AvatarManager {


  constructor(avatar, forward) {
    this._moveSpeed = 0.05 / 60;
    this._turnSpeed = 4;//this._moveSpeed / 4;
    this._avatar = avatar.scene;
    this._kForward = forward;

    this._walk = false;

    this._avatar.castShadow = true;

    const mixer = new THREE.AnimationMixer(this._avatar);

    this._mixer = mixer;

    this._fade_duration = 0.4;

    this._animations = this._getAnimations(this._mixer, avatar);

    this._startAnimation('idle', this._fade_duration);

    this._action = false;
    this._action2 = false;

    const bb_size = 0.5;

    const geometry = new THREE.BoxGeometry(0.7, bb_size, 0.5);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);

    this._boundingBox = cube;

  }

  update(deltaTime, inputManager, boundingBoxes) {
    let speed = this._moveSpeed
    const avatar = this._avatar;

    const fade_duration = this._fade_duration;

    const delta_x = (inputManager.keys.up.down ? 1 : 0) +
      (inputManager.keys.down.down ? -1 : 0);

    const delta = (inputManager.keys.left.down ? 1 : 0) +
      (inputManager.keys.right.down ? -1 : 0);

    if (delta !== 0) {
      avatar.rotateY(this._turnSpeed * delta * deltaTime);
    }

    if (delta_x !== 0) {

      const distance = delta_x * deltaTime;

      avatar.translateOnAxis(this._kForward, distance);
      if (!this._walk) {
        this._stopAnimation('idle', fade_duration);
        this._startAnimation('walk', fade_duration);
        this._walk = true;
      }

      this._boundingBox.position.x = avatar.position.x;
      this._boundingBox.position.y = 1.0;
      this._boundingBox.position.z = avatar.position.z;

      this._boundingBox.geometry.computeBoundingBox();
      this._boundingBox.updateMatrixWorld();

      const box2 = this._boundingBox.geometry.boundingBox.clone();
      box2.applyMatrix4(this._boundingBox.matrixWorld);

      let hit = false;

      for (const boundingBox of boundingBoxes) {
        if (boundingBox.intersectsBox(box2)) {
          hit = true;
          break;
        }
      }

      if(hit) {
        avatar.translateOnAxis(this._kForward, -distance);
      }
    } else {
      if (this._walk) {
        this._stopAnimation('walk', fade_duration);
        this._startAnimation('idle', this._fade_duration);
        this._walk = false;
      }
    }

    const speak = inputManager.keys.speak.down;

    if(speak){
      this._startAnimation('jaw', 0.01);
    }


    const action = inputManager.keys.action.down;

    if (action) {
      if (this._action !== true) {
        this._stopAnimation('idle', fade_duration);
        this._startAnimation('pointing', fade_duration);
        this._action = true;
      }
    } else {
      if (this._action === true) {
        this._startAnimation('idle', fade_duration);
        this._stopAnimation('pointing', fade_duration);
        this._action = false;
      }
    }

    const action2 = inputManager.keys.action2.down;

    if (action2) {
      if (this._action2 !== true) {
        this._stopAnimation('idle', fade_duration);
        this._startAnimation('gesture', fade_duration);
        this._action2 = true;
      }
    } else {
      if (this._action2 === true) {
        this._startAnimation('idle', fade_duration);
        this._stopAnimation('gesture', fade_duration);
        this._action2 = false;
      }
    }

    this._mixer.update(deltaTime);

  }

  _getAnimations(mixer, avatar) {

    const animations = avatar.animations;

    const pointingAction = mixer.clipAction(animations[6]);
    const gestureAction = mixer.clipAction(animations[0]);
    const startWalkAction = mixer.clipAction(animations[8]);
    const endWalkAction = mixer.clipAction(animations[4]);
    const walkAction = mixer.clipAction(animations[10]);
    const idleAction = mixer.clipAction(animations[12]);

    const avatar_animations = [];
    avatar_animations['pointing'] = pointingAction;
    avatar_animations['gesture'] = gestureAction;
    avatar_animations['startWalk'] = startWalkAction;
    avatar_animations['endWalk'] = endWalkAction;
    avatar_animations['walk'] = walkAction;
    avatar_animations['idle'] = idleAction;

    const jawAction = mixer.clipAction(this._makeJaw());

    jawAction.setLoop(THREE.LoopPingPong, 2);

    avatar_animations['jaw'] = jawAction;

    return avatar_animations;
  }

  _startAnimation(action, fade_duration) {
    this._animations[action].reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(fade_duration)
      .play();
  }

  _stopAnimation(action, fade_duration) {
    this._animations[action].fadeOut(fade_duration);
  }

  _makeJaw() {
    var xAxis = new THREE.Vector3( 0, 0, 1 );

    var qInitial = new THREE.Quaternion(0,0, -0.8664570450782776, 0.4992516338825226);//.setFromAxisAngle( xAxis, 0 );
    var qFinal = new THREE.Quaternion().setFromAxisAngle( xAxis, -Math.PI);
    var quaternionKF = new THREE.QuaternionKeyframeTrack( 'jaw'+'.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
    var clip = new THREE.AnimationClip( 'Action', 0.5, [ quaternionKF ] );

    return clip;
  }
}
