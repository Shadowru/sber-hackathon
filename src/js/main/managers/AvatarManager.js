import * as THREE from "three";

import Animations from './Animations.js'
import Expressions from "./Expressions";

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

    this._stop_fade_duration = 1.5;

    this._animations = this._getAnimations(this._mixer, avatar);

    this._avatarExpressions = this._getExpressions(avatar.scene);

    this._startAnimation('idle', this._fade_duration);

    this._action = false;
    this._action2 = false;

    const bb_size = 0.5;

    const geometry = new THREE.BoxGeometry(0.7, bb_size, 0.5);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);

    this._boundingBox = cube;

    this._speakingState = false;
    this._speakingNext = -1;
    this._animationNext = -1;

    this._phonemeDuration = 3;

    this._boundingBoxes = undefined;

  }

  setSpeechManager(speechManager) {
    this._speechManager = speechManager;
  }

  update(deltaTime, inputManager, boundingBoxes) {

    this._boundingBoxes = boundingBoxes;

    let speed = this._moveSpeed
    const avatar = this._avatar;

    const fade_duration = this._fade_duration;
    const stop_fade_duration = this._stop_fade_duration

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

      const hit = this._findBoundingBox(avatar, 1.0, boundingBoxes) !== undefined;

      if (hit) {
        avatar.translateOnAxis(this._kForward, -distance);
      }
    } else {
      if (this._walk) {
        this._stopAnimation('walk', fade_duration);
        this._startAnimation('idle', this._fade_duration);
        this._walk = false;
      }
    }

    if (this._speakingState) {
      this._speakingAnimation();
      this._expressionAnimation();
    }


    const speak = inputManager.keys.speak.down;

    if (speak) {
      this.proceedSpeak();
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
        this._stopAnimation('pointing', stop_fade_duration);
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
        this._stopAnimation('gesture', stop_fade_duration);
        this._action2 = false;
      }
    }

    this._mixer.update(deltaTime);

  }

  _getAnimations(mixer, avatar) {

    // const animations = avatar.animations;
    //
    // const ddd = [];
    //
    // for (const animation of animations) {
    //   var jsonObject = animation.toJSON(); // creates a primitive object with basic animation data
    //   ddd.push(jsonObject);
    // }
    // var jsonString = JSON.stringify( ddd ); // serializes the object as a string
    // console.log(jsonString);

    const animations_json = Animations.getAinmations();

    const animations = [];

    for (const animation of animations_json) {
      animations.push(
        THREE.AnimationClip.parse(animation)
      )
    }


    const pointingAction = mixer.clipAction(
      THREE.AnimationClip.findByName(animations, 'HandRaising')
    );
    const gestureAction = mixer.clipAction(
      THREE.AnimationClip.findByName(animations, 'ArmGesture')
    );
    const walkAction = mixer.clipAction(
      THREE.AnimationClip.findByName(animations, 'Walking')
    );
    const idleAction = mixer.clipAction(
      THREE.AnimationClip.findByName(animations, 'Idle')
    );

    const talkingAction = mixer.clipAction(
      THREE.AnimationClip.findByName(animations, 'Talking')
    );

    const avatar_animations = [];
    avatar_animations['pointing'] = pointingAction;
    avatar_animations['gesture'] = gestureAction;
    avatar_animations['walk'] = walkAction;
    avatar_animations['idle'] = idleAction;


    // const jawAction = mixer.clipAction(this._makeJaw());
    //
    // jawAction.setLoop(THREE.LoopPingPong, 2);

    avatar_animations['jaw'] = talkingAction;

    return avatar_animations;
  }

  _startAnimation(action, duration) {
    this._animations[action].reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play();
  }

  _stopAnimation(action, duration) {
    this._animations[action].fadeOut(duration);
  }

  _makeJaw() {
    var xAxis = new THREE.Vector3(0, 0, 1);

    var qInitial = new THREE.Quaternion(0, 0, -0.8664570450782776, 0.4992516338825226);//.setFromAxisAngle( xAxis, 0 );
    var qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, -Math.PI);
    var quaternionKF = new THREE.QuaternionKeyframeTrack('jaw' + '.quaternion', [0, 1, 2], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w]);
    var clip = new THREE.AnimationClip('Action', 0.5, [quaternionKF]);

    return clip;
  }

  _speakAboutRoom(roomId) {
    if (this._speechManager !== undefined) {
      this._speechManager.say(roomId,
        (state) => {
          if (state === 'stop') {
            this._stopSpeak();
          }
          if (state === 'speak') {
            this._startSpeak();
          }
        }
      );
    }
  }

  _stopSpeak() {
    if (this._speechManager !== undefined) {
      this._speechManager.mute();
    }
    this._speakingState = false;
    this._stopAnimation('jaw', 0.02);
    this._stopAnimation('gesture', 3);
    this._stopAnimation('pointing', 3);

    const infl = this._avatarExpressions.mesh;
    infl.updateMorphTargets();

  }

  _startSpeak() {
    this._speakingState = true;
    this._speakingNext = Date.now();
    this._animationNext = Date.now();
    this._animationList = Expressions.getExpressions();
    this._animationFrame = 0;
  }

  _expressionAnimation() {
    /*
              "mouthOpen",
          "viseme_sil",
          "viseme_PP",
          "viseme_FF",
          "viseme_TH",
          "viseme_DD",
          "viseme_kk",
          "viseme_CH",
          "viseme_SS",
          "viseme_nn",
          "viseme_RR",
          "viseme_aa",
          "viseme_E",
          "viseme_I",
          "viseme_O",
          "viseme_U",
          "mouthSmile",
          "eyeBlinkLeft",
          "eyeBlinkRight",
          "browDownLeft",
          "browDownRight",
          "browInnerUp",
          "browOuterUpLeft",
          "browOuterUpRight",
          "eyeSquintLeft",
          "eyeSquintRight",
          "eyeWideLeft",
          "eyeWideRight",
          "jawForward",
          "jawLeft",
          "jawRight",
          "mouthFrownLeft",
          "mouthFrownRight",
          "mouthPucker",
          "mouthShrugLower",
          "mouthShrugUpper",
          "noseSneerLeft",
          "noseSneerRight",
          "mouthLowerDownLeft",
          "mouthLowerDownRight",
          "mouthLeft",
          "mouthRight",
          "cheekPuff",
          "cheekSquintLeft",
          "cheekSquintRight",
          "jawOpen",
          "mouthClose",
          "mouthFunnel",
          "mouthDimpleLeft",
          "mouthDimpleRight",
          "mouthStretchLeft",
          "mouthStretchRight",
          "mouthRollLower",
          "mouthRollUpper",
          "mouthPressLeft",
          "mouthPressRight",
          "mouthUpperUpLeft",
          "mouthUpperUpRight",
          "mouthSmileLeft",
          "mouthSmileRight",
          "eyesClosed",
          "eyesLookUp",
          "eyesLookDown"
     */
    if (this._animationNext < Date.now()) {

      const shapeNames = this._animationList.blendShapesNames;
      const animationFrameShapes = this._animationList.frames[this._animationFrame].blendshapes;

      this._animationFrame = this._animationFrame + 1;

      if (this._animationFrame > this._animationList.frames.length - 1) {
        this._animationFrame = 0;
      }

      const infl = this._avatarExpressions.mesh;

      let pos = 0;
      for (const shapeName of shapeNames) {
        let idx = this._findExpression(shapeName);
        if (idx !== -1) {
          infl.morphTargetInfluences[idx] = this._normalize(animationFrameShapes[pos]);
        }
        pos++;
      }


      const animationDuration = 1 / this._animationList.fps;
      this._animationNext = Date.now() + animationDuration * 1000;

    }
  }

  _normalize(animationFrameShape) {

    return animationFrameShape / 100;
  }


  _findExpression(name) {
    return this._avatarExpressions.expressions.indexOf(name);
  }

  _speakingAnimation() {

    if (this._speakingNext < Date.now()) {
      this._startAnimation('jaw', this._phonemeDuration);
      this._speakingNext = Date.now() + (Math.floor(Math.random() * this._phonemeDuration * 30000));
    }

    // if (this._animationNext < Date.now()) {
    //   const animationDuration = 3;
    //   const animation = this._randomAnimation(['gesture', 'pointing']);
    //   this._startAnimation(animation, animationDuration);
    //   this._animationNext = Date.now() + (Math.floor(Math.random() * animationDuration * 30000));
    // }
    //
  }


  //TODO: FIX
  _randomAnimation(array) {
    const rnd = Math.random();
    if (rnd < 0.5) {
      return array[0]
    }
    return array[1];
  }

  _findBoundingBox(avatar, height, boundingBoxes) {
    this._boundingBox.position.x = avatar.position.x;
    this._boundingBox.position.y = height;
    this._boundingBox.position.z = avatar.position.z;

    this._boundingBox.geometry.computeBoundingBox();
    this._boundingBox.updateMatrixWorld();

    const box2 = this._boundingBox.geometry.boundingBox.clone();
    box2.applyMatrix4(this._boundingBox.matrixWorld);

    let hit = false;

    for (const boundingBox of boundingBoxes) {
      if (boundingBox.intersectsBox(box2)) {
        return boundingBox;
      }
    }
  }

  proceedSpeak() {
    const avatar = this._avatar;
    const roomMesh = this._findBoundingBox(this._avatar, 0.0, this._boundingBoxes);
    if (this._speakingState !== true) {
      if (roomMesh !== undefined) {
        const roomId = roomMesh.userData.roomId;
        console.log('roomId : ' + roomId);
        this._speakAboutRoom(roomId);
        this._startSpeak();
      }
    } else {
      this._stopSpeak();
      this._speakingState = false;
    }
  }

  _getExpressions(avatar) {

    const avatarMesh = avatar.getObjectByName('Wolf3D_Avatar');
    return {
      mesh: avatarMesh,
      expressions: Object.keys(avatarMesh.morphTargetDictionary)
    }

  }

}
