import * as THREE from 'three';

import {Sky} from 'three/examples/jsm/objects/Sky.js';


export default class SkyBox {


  constructor(scene) {

    this._initSky(scene);

  }

  _initSky(scene) {

    // Add Sky
    const sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);

    const sun = new THREE.Vector3();

    /// GUI

    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      inclination: 0.49, // elevation / inclination
      azimuth: 0.25, // Facing front,
     // exposure: renderer.toneMappingExposure
    };

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const theta = Math.PI * (effectController.inclination - 0.5);
    const phi = 2 * Math.PI * (effectController.azimuth - 0.5);

    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);

    uniforms["sunPosition"].value.copy(sun);

    //renderer.toneMappingExposure = effectController.exposure;

  }
}
