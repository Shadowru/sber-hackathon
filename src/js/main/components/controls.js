import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Controls based on orbit controls
export default class Controls {
    constructor(config, camera, container) {
        // Orbit controls first needs to pass in THREE to constructor
        //const orbitControls = new OrbitControls(THREE);
        this.threeControls = new OrbitControls(camera, container);

        this.init(config);
    }

    init(config) {
        this.threeControls.target.set(config.controls.target.x, config.controls.target.y, config.controls.target.z);
        this.threeControls.autoRotate = config.controls.autoRotate;
        this.threeControls.autoRotateSpeed = config.controls.autoRotateSpeed;
        this.threeControls.rotateSpeed = config.controls.rotateSpeed;
        this.threeControls.zoomSpeed = config.controls.zoomSpeed;
        this.threeControls.minDistance = config.controls.minDistance;
        this.threeControls.maxDistance = config.controls.maxDistance;
        this.threeControls.minPolarAngle = config.controls.minPolarAngle;
        this.threeControls.maxPolarAngle = config.controls.maxPolarAngle;
        this.threeControls.enableDamping = config.controls.enableDamping;
        this.threeControls.enableZoom = config.controls.enableZoom;
        this.threeControls.dampingFactor = config.controls.dampingFactor;
        this.threeControls.keys = { LEFT: 0, RIGHT: 0, UP: 0, BOTTOM: 0 }
    }
}
