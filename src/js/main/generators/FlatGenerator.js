import * as THREE from 'three';

import RoomGenerator from "./RoomGenerator";

import TextureManager from "../managers/TextureManager";

//import {CreateView} from "./geom/CreateView";
import JsonConstruct from "./geom/calculus/json_construct";
import RoomGeometryGenerator from "./geom/RoomGeometryGenerator";

export default class FlatGenerator {

  constructor(config, scene) {
    THREE.Cache.enabled = true;

    const textureManager = new TextureManager();

    this._loadJSON(config.url, this._sceneImporter, config, scene, textureManager);

  }

  _generateFlat(data, textureManager) {

    const roomGenerator = new RoomGenerator();
    const roomMeshesArray = roomGenerator.generate(
      data['rooms'],
      data['doors'],
      data['external_walls'],
      textureManager
    );


    const roomGeometryGenerator = new RoomGeometryGenerator();

    const jsonData = JsonConstruct.json_construct(data);

    console.log(jsonData);

    const roomGeometry = roomGeometryGenerator.generate(
      jsonData
    );

    console.log(roomGeometry);

    roomMeshesArray.push(roomGeometry);

    return roomMeshesArray;

  }

  _sceneImporter(config, scene, flatObject) {

    scene.userData.boundingBoxes = [];

    for (const object of flatObject) {
      object.scale.set(config.size.x, config.size.y, config.size.z);
      object.translateX(config.translate.x);
      object.translateY(config.translate.y);
      object.translateZ(config.translate.z);

      let bbBox = undefined;

      try {
        object.geometry.computeBoundingBox();
        object.updateMatrixWorld();

        const box1 = object.geometry.boundingBox.clone();
        box1.applyMatrix4(object.matrixWorld);
        box1.userData = object.userData;
        bbBox = box1;
      } catch (e) {

      }

      if (bbBox !== undefined) {
        scene.userData.boundingBoxes.push(bbBox);
      }


      scene.add(object);
    }

  }

  _loadJSON(url, sceneImporter, config, scene, texture) {
    const loader = new THREE.FileLoader();

    const generatorInstance = this;

    loader.load(
      url,

      function (data) {

        const flatJson = JSON.parse(data.replaceAll('\'', '\"'));

        const flat = generatorInstance._generateFlat(
          flatJson,
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

  _getBBox() {
    try {
      object.geometry.computeBoundingBox();
      object.updateMatrixWorld();

      const box1 = object.geometry.boundingBox.clone();
      box1.applyMatrix4(object.matrixWorld);
      box1.userData = object.userData;
      return box1;
    } catch (e) {

    }
    return undefined;
  }
}
