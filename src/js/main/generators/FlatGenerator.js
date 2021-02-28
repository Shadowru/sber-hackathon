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

    scene.userData.textureManager = textureManager;

    this._loadJSON(config.url, this._sceneImporter, config, scene, textureManager);

  }

  _generateFlat(data, textureManager) {

    const roomGenerator = new RoomGenerator();
    const roomMeshesArray = roomGenerator.generate(
      data['rooms'],
      data['doors'],
      data['external_walls'],
      data['windows'],
      textureManager
    );


    const roomGeometryGenerator = new RoomGeometryGenerator();

    const jsonData = JsonConstruct.json_construct(data);

    console.log(jsonData);

    // const roomGeometry = roomGeometryGenerator.generate(
    //   jsonData
    // );
    //
    // const dd = 0.01;
    //
    // roomGeometry.scale.set(
    //   dd,dd,dd
    // );
    //
    // console.log(roomGeometry);
    //
    // roomMeshesArray.push(roomGeometry);

    return roomMeshesArray;

  }

  _sceneImporter(config, scene, flatObject) {

    const lightPositions =[];

    scene.userData.boundingBoxes = [];

    for (const object of flatObject) {
      object.scale.set(config.size.x, config.size.y, config.size.z);
      object.translateX(config.translate.x);
      object.translateY(config.translate.y);
      object.translateZ(config.translate.z);

      scene.add(object);

      if (object.userData !== undefined) {
        if (object.userData.id === 'walls') {
          continue;
        }



        let bbBox = undefined;

        try {
          object.geometry.computeBoundingBox();
          object.updateMatrixWorld();

          const box1 = object.geometry.boundingBox.clone();
          box1.applyMatrix4(object.matrixWorld);
          box1.userData = object.userData;
          bbBox = box1;
          scene.userData.boundingBoxes.push(bbBox);

          if (object.userData.roomId !== undefined) {
            const room_center = bbBox.getCenter();
            lightPositions.push(room_center);
            //console.log(room_center);
          }

        } catch (e) {

        }
      }

    }

    for (const lightPosition of lightPositions) {
      // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      // light.translateX(lightPosition.x);
      // light.translateY(2.0);//lightPosition.y);
      // light.translateZ(lightPosition.z);
      // const helper = new THREE.HemisphereLightHelper( light, 0.05 );
      // scene.add( helper );

      const spotLight = new THREE.SpotLight( 0xffffff, 0.8 );
      spotLight.position.set( lightPosition.x, 3.5, lightPosition.z );
      spotLight.angle = 1.0;
      spotLight.penumbra = 0.1;
      spotLight.decay = 2;
      spotLight.distance = 12;

      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 512;
      spotLight.shadow.mapSize.height = 512;
      spotLight.shadow.camera.near = 0.01;
      spotLight.shadow.camera.far = 100;
      spotLight.shadow.focus = 1;

      spotLight.userData.id = 'light';

      scene.add( spotLight );

      const targetObject = new THREE.Object3D();
      targetObject.position.set(lightPosition.x, 0.0, lightPosition.z);

      scene.add(targetObject);
      spotLight.target = targetObject;

      // const lightHelper = new THREE.SpotLightHelper( spotLight );
      // scene.add( lightHelper );

    }

  }

  _calcCenter(mesh) {

    const geometry = mesh.geometry;
    geometry.computeBoundingBox();

    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);

    mesh.localToWorld(center);
    return center;
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
