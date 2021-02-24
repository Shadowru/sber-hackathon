import * as THREE from 'three';

import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Controls from "./components/controls";

import SkyBox from "./components/SkyBox";

import FlatGenerator from "./generators/FlatGenerator"

import InputManager from "./managers/InputManager";
import AvatarManager from "./managers/AvatarManager";

import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
import {BVHLoader} from 'three/examples/jsm/loaders/BVHLoader.js';


import {VRM} from '@pixiv/three-vrm';


export default class Main {

  constructor(container, config = {}) {
    this._container = container;
    this._config = Object.assign({
      fog: {
        color: 0x505050,
        near: 0.0008
      },
      camera: {
        fov: 60,
        near: 0.001,
        far: 1000,
        aspect: 1,
        posX: 0,
        posY: 1.8,
        posZ: 10.2
      },
      controls: {
        autoRotate: false,
        autoRotateSpeed: -0.5,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        minDistance: 0.01,
        maxDistance: 600,
        minPolarAngle: Math.PI / 5,
        maxPolarAngle: Math.PI / 2,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableDamping: true,
        dampingFactor: 0.5,
        enableZoom: true,
        target: {
          x: 0,
          y: 1.8,
          z: 0
        }
      },
      scene: [
        {
          url: 'assets/interior/generated/test.json',
          size: {
            x: 1,
            y: 1,
            z: 1
          },
          translate: {
            x: 0,
            y: 0,
            z: 0,
          },
          animated: false
        },
        {
          url: 'assets/claudia/mixamo-1613450024492.glb',
          size: {
            x: 0.01,
            y: 0.01,
            z: 0.01
          },
          translate1: {
            x: -6,
            y: -0.55,
            z: 6.5,
          },
          translate: {
            x: 3,
            y: -0.05,
            z: 3.6,
          },
          avatar: true,
          animated: false,
          animatedCycle: [
            {
              animation: 'idle',
              time: 2
            },
            {
              animation: 'pointing'
            },
            {
              speed: 0.2,
              time: 20,
              animation: 'walk'
            },
            {
              animation: 'gesture'
            }
          ]
        }],
      isDev: true
    }, config);

    if (this._config.isDev) {
      console.log(this._config);
    }
  }

  start() {

    const config = this._config;

    this._scene = this.createScene(config);

    const scene = this._scene;

    this._renderer = new Renderer(config, scene, this._container);
    this._camera = new Camera(config, this._renderer.threeRenderer);

    this._controls = new Controls(config, this._camera.threeCamera, this._container);

    const light = new THREE.AmbientLight(0x404040, 3); // soft white light
    scene.add(light);

    /*
        const room = new THREE.LineSegments(
            new BoxLineGeometry(6, 6, 6, 10, 10, 10),
            new THREE.LineBasicMaterial({color: 0x800000})
        );
        room.geometry.translate(0, 3, 0);
        scene.add(room);
    */

    for (const sceneElement of config.scene) {
      this.loadScene(sceneElement, scene);
    }

    const sky = new SkyBox(scene);

    this._inputManager = new InputManager();
    this._avatarManager = undefined;

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

    if (this._mixer !== undefined) {
      this._mixer.update(dt);
    }

    this._lastframe = Date.now();

    this._inputManager.update();

    if(this._avatarManager !== undefined) {
      this._avatarManager.update(dt, this._inputManager, this._scene.boundingBoxes);
    }

    // RAF
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }

  loadScene(config, scene) {
    const scene_url = config.url.toLowerCase();

    if (scene_url.endsWith('json')) {
      const flatGenerator = new FlatGenerator(config, scene);
    } else if (scene_url.endsWith('gltf') || scene_url.endsWith('glb')) {
      this._loadGLTF(config, scene);
    } else if (scene_url.endsWith('fbx')) {
      this._loadFBX(config, scene);
    } else if (scene_url.endsWith('vrm')) {
      this._loadVRM(config, scene);
    } else if (scene_url.endsWith('bvh')) {
      this._loadBVH(config, scene);
    } else {
      console.log('Unknown format! ' + scene_url);
    }
  }

  _loadBVH(config, scene) {

    const main_instance = this;


    const loader = new BVHLoader();
    loader.load(config.scene.url, function (result) {

      console.log(result);

      const skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);
      skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly

      const boneContainer = new THREE.Group();
      boneContainer.add(result.skeleton.bones[0]);

      scene.add(main_instance._resizeObject(config.scene.size, skeletonHelper));
      scene.add(main_instance._resizeObject(config.scene.size, boneContainer));

      // play animation
      const mixer = new THREE.AnimationMixer(skeletonHelper);
      mixer.clipAction(result.clip).setEffectiveWeight(1.0).play();

      main_instance._setMixer(mixer);

    });
  }

  _loadVRM(config, scene) {

    const loader = new GLTFLoader();
    loader.load(
      // URL of the VRM you want to load
      config.scene.url,

      // called when the resource is loaded
      (gltf) => {

        // generate a VRM instance from gltf
        VRM.from(gltf).then((vrm) => {

          console.log(vrm.meta);

          // add the loaded vrm to the scene
          scene.add(vrm.scene);

          // deal with vrm features
          console.log(vrm);

        });

      },

      // called while loading is progressing
      (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),

      // called when loading has errors
      (error) => console.error(error)
    );

  }

  _fixObject(config_translate, object) {
    object.translateX(config_translate.x);
    object.translateY(config_translate.y);
    object.translateZ(config_translate.z);
    return object;
  }

  _resizeObject(config_size, object) {

    const bbox = new THREE.Box3().setFromObject(object);
    const size = bbox.getSize(new THREE.Vector3());

    //Rescale the object to normalized space
    const maxAxis = Math.max(size.x, size.y, size.z);
    const maxSize = Math.max(config_size.x, config_size.y, config_size.z);

    object.scale.set(config_size.x, config_size.y, config_size.z);

    return object;

  }

  _loadFBX(config, scene) {
    const loader = new FBXLoader();

    const main_instance = this;

    loader.load(config.scene.url, function (object) {


      const skeleton = new THREE.SkeletonHelper(object);
      skeleton.visible = true;
      scene.add(skeleton);

      const mixer = new THREE.AnimationMixer(object);

      console.log(object.animations);

      const action = mixer.clipAction(object.animations[0]);
      action.play();

      object.traverse(function (child) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      scene.add(
        main_instance._resizeObject(
          config.scene.size,
          object
        )
      );

      main_instance._setMixer(mixer);


    });
  }

  _loadGLTF(config, scene) {
    const loader = new GLTFLoader();
    const processor = this._processScene;
    const searchAnimations = this._searchAnimations;
    const main_instance = this;

    loader.load(config.url, function (gltf) {

      const gltf_scene = processor(gltf.scene);

      if (config.avatar) {
        const skeleton = new THREE.SkeletonHelper(gltf_scene);
        // skeleton.visible = true;
        // scene.add(skeleton);

        console.log(skeleton);
        main_instance._avatarManager = new AvatarManager(gltf, new THREE.Vector3(0, 0, 1));
      }

      if (config.animated) {
        const skeleton = new THREE.SkeletonHelper(gltf_scene);
        skeleton.visible = false;
        scene.add(skeleton);

        console.log(skeleton);

        const mixer = new THREE.AnimationMixer(gltf.scene);

        main_instance._mixer = mixer;

        main_instance.bones = [];

        const animations = gltf.animations;

        console.log(animations);

        const pointingAction = mixer.clipAction(animations[6]);
        const gestureAction = mixer.clipAction(animations[0]);
        const startWalkAction = mixer.clipAction(animations[8]);
        const endWalkAction = mixer.clipAction(animations[4]);
        const walkAction = mixer.clipAction(animations[10]);
        const idleAction = mixer.clipAction(animations[12]);

        main_instance.durations = [];
        main_instance.durations['pointing'] = animations[6].duration;
        main_instance.durations['gesture'] = animations[0].duration;
        main_instance.durations['walk'] = animations[10].duration;
        main_instance.durations['startWalk'] = animations[8].duration;
        main_instance.durations['endWalk'] = animations[4].duration;
        main_instance.durations['idle'] = animations[12].duration;

        main_instance.animations = [];
        main_instance.animations['pointing'] = pointingAction;
        main_instance.animations['gesture'] = gestureAction;
        main_instance.animations['startWalk'] = startWalkAction;
        main_instance.animations['endWalk'] = endWalkAction;
        main_instance.animations['walk'] = walkAction;
        main_instance.animations['idle'] = idleAction;

        //idleAction.setLoop(THREE.LoopPingPong);

        //pointingAction.play();

        const animatedCycle = config.animatedCycle;

        if (animatedCycle !== undefined) {
          main_instance._lastAnimationPhase = Date.now();
          main_instance._animatedCycle = animatedCycle;
          main_instance._animatedCyclePos = 0;

          main_instance.animations[
            animatedCycle[
              main_instance._animatedCyclePos
              ].animation
            ].play();

        }

      }

      main_instance._action_figure = main_instance._fixObject(
        config.translate,
        main_instance._resizeObject(
          config.size,
          gltf_scene
        )
      )


      scene.add(
        main_instance._action_figure
      );


    }, undefined, function (error) {

      console.error(error);

    });
  }

  _searchAnimations(model, searchAnimations = this._searchAnimations) {
    if (model === undefined) {
      return;
    }

    if (model.children === undefined) {
      return;
    }

    model.children.forEach(element => {
      var clips = element.animations;
      if (clips !== undefined) {
        console.log(clips);
      }

      searchAnimations(element, searchAnimations);
    });

  }

  _processScene(scene) {
    const mroot = scene;
    const bbox = new THREE.Box3().setFromObject(mroot);
    const cent = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    //Rescale the object to normalized space
    var maxAxis = Math.max(size.x, size.y, size.z);

    mroot.scale.multiplyScalar(1.8 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    mroot.position.y += (size.y * 0.5);
    return scene;
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
}
