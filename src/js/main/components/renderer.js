import * as THREE from 'three';

import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { XRControllerModelFactory  } from 'three/examples/jsm/webxr/XRControllerModelFactory';


// Main webGL renderer class
export default class Renderer {
  constructor(config, scene, container) {
    // Properties
    this.scene = scene;
    this.container = container;

    // Create WebGL renderer and set its antialias
    this.threeRenderer = new THREE.WebGLRenderer({antialias: true});

    // Set clear color to fog to enable fog or to hex color for no fog
    this.threeRenderer.setClearColor(scene.fog.color);
    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina

    // Appends canvas
    container.appendChild(this.threeRenderer.domElement);

    // Shadow map options
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Get anisotropy for textures
    config.maxAnisotropy = this.threeRenderer.capabilities.getMaxAnisotropy();

    // Initial size update set to canvas container
    this.updateSize();

    this.threeRenderer.outputEncoding = THREE.sRGBEncoding;
    this.threeRenderer.xr.enabled = true;

    // VR Button
    document.body.appendChild( VRButton.createButton( this.threeRenderer ) );

    // Listeners
    document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
    window.addEventListener('resize', () => this.updateSize(), false);
  }

  updateSize() {
    this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }

  render(scene, camera) {
    // Renders scene to canvas target
    this.threeRenderer.render(scene, camera);
  }
}
