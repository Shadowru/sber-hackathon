import * as THREE from 'three';

import RoomGenerator from "./RoomGenerator";

import TextureManager from "../managers/TextureManager";

export default class FlatGenerator {

  constructor(config, scene) {
    THREE.Cache.enabled = true;

    const textureManager = new TextureManager();

    this._loadJSON(config.url, this._sceneImporter, config, scene, textureManager);

  }

  _generateFlat(data, textureManager) {

    const roomGenerator = new RoomGenerator();
    const roomMesh = roomGenerator.generate(
      data['rooms'],
      data['doors'],
      data['external_walls'],
      textureManager
    );

    return roomMesh;

  }

  _sceneImporter(config, scene, flatObject) {

    scene.userData.boundingBoxes = [];

    for (const object of flatObject) {
      object.scale.set(config.size.x, config.size.y, config.size.z);
      object.translateX(config.translate.x);
      object.translateY(config.translate.y);
      object.translateZ(config.translate.z);

      object.geometry.computeBoundingBox();
      object.updateMatrixWorld();

      const box1 = object.geometry.boundingBox.clone();
      box1.applyMatrix4(object.matrixWorld);
      box1.userData = object.userData;

      scene.userData.boundingBoxes.push(box1);

      scene.add(object);
    }


  }

  _loadJSON(url, sceneImporter, config, scene, texture) {
    const loader = new THREE.FileLoader();

    const generatorInstance = this;

    loader.load(
      url,

      function (data) {

        const flat = generatorInstance._generateFlat(
          JSON.parse(
            data.replaceAll('\'', '\"')
          ),
          texture
        );

        sceneImporter(config, scene, flat);

      },

      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      function (err) {
        console.error('An error happened');
      }
    );

  }

  _loadTexture(config, scene) {

    const main_instance = this;

    const loader = new THREE.TextureLoader();

// load a resource
    loader.load(
      // resource URL
      'assets/textures/floor_tiles_06_diff_1k.png ',

      // onLoad callback
      function (texture) {
        // in this example we create the material when the texture is loaded
        main_instance._material = new THREE.MeshBasicMaterial({
          map: texture, side: THREE.DoubleSide
        });

        main_instance._loadJSON(config.url, main_instance._sceneImporter, config, scene, main_instance._material);

      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err) {
        console.error('An error happened.');
      }
    );
  }
}
