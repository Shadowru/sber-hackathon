import * as THREE from 'three';

import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Controls from "./components/controls";

import SkyBox from "./components/SkyBox";

import InputManager from "./managers/InputManager";

import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import SceneLoaderManager from "./managers/SceneLoaderManager";

export default class Main {

  constructor(container, config = {}, speechManager) {
    this._container = container;
    this._config = Object.assign({
      fog: {
        color: 0x505050,
        near: 0.0008
      },
      camera: {
        fov: 60,
        near: 0.001,
        far: 10000,
        aspect: 1,
        posX: 6,
        posY: 7.8,
        posZ: 10.2
      },
      controls: {
        autoRotate: false,
        autoRotateSpeed: -0.5,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        minDistance: 0.01,
        maxDistance: 6000,
        minPolarAngle: Math.PI / 5,
        maxPolarAngle: Math.PI / 2,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableDamping: true,
        dampingFactor: 0.5,
        enableZoom: true,
        target: {
          x: 0,
          y: 1.80,
          z: 0
        }
      },
      scene: [],
      isDev: false
    }, config);

    if (this._config.isDev) {
      console.log(this._config);
    }

    this._speechManager = speechManager;

    this._speechManager.setMain(this);

  }

  start(progressCallback) {

    const config = this._config;

    this._scene = this.createScene(config);

    const scene = this._scene;

    this._renderer = new Renderer(config, scene, this._container);
    this._camera = new Camera(config, this._renderer.threeRenderer);

    this._controls = new Controls(config, this._camera.threeCamera, this._container);

    const light = new THREE.AmbientLight(0x404040, 3); // soft white light
    scene.add(light);

    if (config.isDev) {
      this._addDeveloper(scene);
    }

    if (config.sky) {
      const sky = new SkyBox(scene);
    }

    this._inputManager = new InputManager();
    this._avatarManager = undefined;

    const sceneLoaderManager = new SceneLoaderManager(scene, config.scene, progressCallback);

    const loadPromiseList = sceneLoaderManager.loadScenePromises();

    const loadCount = loadPromiseList.length;

    progressCallback(0, 'Start loading');

    Promise.all(loadPromiseList)
      .then((res) => {
        console.log('success', res);
        let idx = 0;
        for (const re of res) {
          if (re.avatar !== undefined) {
            if(re.avatar.manager) {
              this._avatarManager = re.avatar.manager;
              this._avatarManager.setSpeechManager(this._speechManager);
            }
          }
          idx++;
          progressCallback(Math.floor(idx / loadCount), '');
        }
        progressCallback(100, 'load done.');
      })
      .catch((err) => {
        console.log('error', err);
        progressCallback(-1, 'Error.');
      })

  }

  run() {
    this.render();
  }

  createScene(config) {
    const scene = new THREE.Scene();

    if (window.devicePixelRatio) {
      config.dpr = window.devicePixelRatio;
    }

    scene.fog = new THREE.FogExp2(config.fog.color, config.fog.near);

    return scene;
  }

  render() {

    // Call render function and pass in created scene and camera
    this._renderer.render(this._scene, this._camera.threeCamera);

    this._controls.threeControls.update();

    const dt = (Date.now() - this._lastframe) / 1000;

    if (this._mixer !== undefined) {
      this._mixer.update(dt);
    }

    this._lastframe = Date.now();

    this._inputManager.update();

    if (this._avatarManager !== undefined) {
      this._avatarManager.update(dt, this._inputManager, this._scene.userData.boundingBoxes, this._scene, this._camera.threeCamera,  this._controls.threeControls);
    }

    // RAF
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }

  _animateCycle() {
    if (this._animatedCycle !== undefined) {

      const currentPhase = this._animatedCycle[this._animatedCyclePos];

      let phaseDuration = currentPhase.time;

      if (phaseDuration === undefined) {
        phaseDuration = this._getDuration();
      }

      const delta_time = phaseDuration * 1000;

      const curr_msecs = Date.now();

      if (currentPhase.speed !== undefined) {
        const distance = dt * currentPhase.speed;
        this._action_figure.translateZ(distance);
      }

      if (curr_msecs - this._lastAnimationPhase > delta_time) {

        const fade_duration = 0.4;

        //this._getAnimation().stop();
        this._getAnimation().fadeOut(fade_duration);


        this._animatedCyclePos = this._animatedCyclePos + 1;

        if (this._animatedCyclePos > this._animatedCycle.length - 1) {
          this._animatedCyclePos = 0;
        }

        this._lastAnimationPhase = curr_msecs;
        this._getAnimation()
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(fade_duration)
          .play();
        console.log(this._animatedCyclePos);
      }

    }
  }

  _setMixer(mixer) {
    this._mixer = mixer;
  }

  _getAnimation() {
    return this.animations[
      this._getAnimationName()
      ]
  }

  _getDuration() {
    return this.durations[
      this._getAnimationName()
      ]
  }

  _getAnimationName() {
    return this._animatedCycle[
      this._animatedCyclePos
      ].animation
  }

  _addDeveloper(scene) {
    const room = new THREE.LineSegments(
      new BoxLineGeometry(6, 6, 6, 10, 10, 10),
      new THREE.LineBasicMaterial({color: 0x800000})
    );
    room.geometry.translate(0, 3, 0);
    scene.add(room);
  }

  getAvatarManager(){
    return this._avatarManager;
  }

}
