import FlatGenerator from "../generators/FlatGenerator";
import {BVHLoader} from "three/examples/jsm/loaders/BVHLoader";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {VRM} from "@pixiv/three-vrm";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import AvatarManager from "./AvatarManager";

export default class SceneLoaderManager {

  constructor(scene, sceneElements) {
    this._loaded = false;
    this._scene = scene;
    this._sceneElements = sceneElements;
  }

  loadScenePromises() {

    const instance = this;

    const loadPromiseList = [];
    for (const sceneElement of instance._sceneElements) {
      const loadPromise = new Promise((resolve, reject) => {
        instance._loadSceneElement(
          instance._scene,
          sceneElement,
          resolve,
          reject
        );
      });
      loadPromiseList.push(loadPromise);
    }
    return loadPromiseList;
  }

  loadScenePromise() {

    const instance = this;

    return new Promise((status) => {

        const loadPromiseList = instance.loadScenePromises();

        Promise.all(loadPromiseList)
          .then((res) => {
            console.log('success', res);
            let mergedStatus = {result: 'success'};
            for (const re of res) {
              mergedStatus = Object.assign(re, mergedStatus);
            }
            status(mergedStatus);
          })
          .catch((err) => {
            console.log('error', err);
            status({
              result: 'error' + err
            });
          })
      }
    );
  }

  _loadSceneElement(scene, sceneElement, resolve, reject) {

    try {
      const scene_url = sceneElement.url.toLowerCase();

      if (scene_url.endsWith('json')) {
        const flatGenerator = new FlatGenerator(sceneElement, scene);
        resolve({});
      } else if (scene_url.endsWith('gltf') || scene_url.endsWith('glb')) {
        this._loadGLTF(scene, sceneElement, function (status) {
          resolve(status);
        });
      } else if (scene_url.endsWith('fbx')) {
        this._loadFBX(config, scene);
      } else if (scene_url.endsWith('vrm')) {
        this._loadVRM(config, scene);
      } else if (scene_url.endsWith('bvh')) {
        this._loadBVH(config, scene);
      } else {
        console.log('Unknown format! ' + scene_url);
        reject('Unknown format! ' + scene_url);
      }
    } catch (e) {
      reject('Exc! ' + e);
    }
  }

  _loadGLTF(scene, sceneElement, callback) {
    const loader = new GLTFLoader();
    const processor = this._processScene;
    const searchAnimations = this._searchAnimations;
    const main_instance = this;

    loader.load(sceneElement.url, function (gltf) {

      const gltf_scene = processor(gltf.scene);

      let avatarManager = undefined;

      if (sceneElement.isAvatar) {

        const skeleton = new THREE.SkeletonHelper(gltf_scene);

        // if (config.isDev) {
        //   console.log(skeleton);
        //   skeleton.visible = true;
        //   scene.add(skeleton);
        // }
        //
        const faceVector = new THREE.Vector3(0, 0, 1)

        avatarManager = new AvatarManager(
          gltf,
          faceVector
        );

      }

      const gltfObject = main_instance._fixObject(
        sceneElement.translate,
        main_instance._resizeObject(
          sceneElement.size,
          gltf_scene
        )
      )

      scene.add(gltfObject);

      callback({
        avatar: {
          manager: avatarManager
        }
      })

    }, undefined, function (error) {

      console.error(error);

    });
  }

  _ddd() {
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

}
