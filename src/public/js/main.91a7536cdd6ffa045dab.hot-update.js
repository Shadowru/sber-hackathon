webpackHotUpdate("main",{

/***/ "./src/js/main/Main.js":
/*!*****************************!*\
  !*** ./src/js/main/Main.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _components_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/renderer */ \"./src/js/main/components/renderer.js\");\n/* harmony import */ var _components_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/camera */ \"./src/js/main/components/camera.js\");\n/* harmony import */ var _components_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/controls */ \"./src/js/main/components/controls.js\");\n/* harmony import */ var three_examples_jsm_geometries_BoxLineGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/geometries/BoxLineGeometry.js */ \"./node_modules/three/examples/jsm/geometries/BoxLineGeometry.js\");\n/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\n\n\nvar Main = /*#__PURE__*/function () {\n  function Main(container) {\n    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, Main);\n\n    this._container = container;\n    this._config = Object.assign({\n      fog: {\n        color: 0x505050,\n        near: 0.0008\n      },\n      camera: {\n        fov: 75,\n        near: 0.01,\n        far: 1000,\n        aspect: 1,\n        posX: 0,\n        posY: 1.8,\n        posZ: 0\n      },\n      controls: {\n        autoRotate: false,\n        autoRotateSpeed: -0.5,\n        rotateSpeed: 0.5,\n        zoomSpeed: 0.8,\n        minDistance: 0.01,\n        maxDistance: 600,\n        minPolarAngle: Math.PI / 5,\n        maxPolarAngle: Math.PI / 2,\n        minAzimuthAngle: -Infinity,\n        maxAzimuthAngle: Infinity,\n        enableDamping: true,\n        dampingFactor: 0.5,\n        enableZoom: true,\n        target: {\n          x: 0,\n          y: 0,\n          z: 0\n        }\n      },\n      scene: {\n        //url: 'assets/vr_gallery/scene.glb',\n        url: 'assets/izzy/scene.glb',\n        size: {\n          x: 0,\n          y: 0,\n          z: 0\n        }\n      },\n      isDev: true\n    }, config);\n\n    if (this._config.isDev) {\n      console.log(this._config);\n    }\n  }\n\n  _createClass(Main, [{\n    key: \"start\",\n    value: function start() {\n      var config = this._config;\n      this._scene = this.createScene(config);\n      var scene = this._scene;\n      this._renderer = new _components_renderer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config, scene, this._container);\n      this._camera = new _components_camera__WEBPACK_IMPORTED_MODULE_2__[\"default\"](config, this._renderer.threeRenderer);\n      this._controls = new _components_controls__WEBPACK_IMPORTED_MODULE_3__[\"default\"](config, this._camera.threeCamera, this._container);\n      var light = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0x404040); // soft white light\n\n      scene.add(light);\n      var room = new three__WEBPACK_IMPORTED_MODULE_0__[\"LineSegments\"](new three_examples_jsm_geometries_BoxLineGeometry_js__WEBPACK_IMPORTED_MODULE_4__[\"BoxLineGeometry\"](6, 6, 6, 10, 10, 10), new three__WEBPACK_IMPORTED_MODULE_0__[\"LineBasicMaterial\"]({\n        color: 0x800000\n      }));\n      room.geometry.translate(0, 3, 0);\n      scene.add(room);\n      this.loadScene(config, scene);\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      this.render();\n    }\n  }, {\n    key: \"createScene\",\n    value: function createScene(config) {\n      var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n\n      if (window.devicePixelRatio) {\n        config.dpr = window.devicePixelRatio;\n      }\n\n      scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__[\"FogExp2\"](config.fog.color, config.fog.near);\n      return scene;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // Call render function and pass in created scene and camera\n      this._renderer.render(this._scene, this._camera.threeCamera);\n\n      this._controls.threeControls.update(); // RAF\n\n\n      requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object\n    }\n  }, {\n    key: \"loadScene\",\n    value: function loadScene(config, scene) {\n      var loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__[\"GLTFLoader\"]();\n      var processor = this._processScene;\n      loader.load(config.scene.url, function (gltf) {\n        var gltf_scene = processor(gltf.scene); //gltf_scene.translateY(\n        //    config.scene.size.y\n        //);\n\n        scene.add(gltf_scene);\n        this.searchAnimations(gltf_scene.children[0]);\n        var mixer = new three__WEBPACK_IMPORTED_MODULE_0__[\"AnimationMixer\"](model); // Play all animations\n\n        clips.forEach(function (clip) {\n          mixer.clipAction(clip).play();\n        });\n      }, undefined, function (error) {\n        console.error(error);\n      });\n    }\n  }, {\n    key: \"searchAnimations\",\n    value: function searchAnimations(model) {\n      if (model === undefined) {\n        return;\n      }\n\n      var clips = model.animations;\n\n      if (clips !== undefined) {\n        console.log(clips);\n      }\n\n      this.searchAnimations(model.children[0]);\n    }\n  }, {\n    key: \"_processScene\",\n    value: function _processScene(scene) {\n      var mroot = scene;\n      var bbox = new three__WEBPACK_IMPORTED_MODULE_0__[\"Box3\"]().setFromObject(mroot);\n      var cent = bbox.getCenter(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]());\n      var size = bbox.getSize(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]()); //Rescale the object to normalized space\n\n      var maxAxis = Math.max(size.x, size.y, size.z);\n      mroot.scale.multiplyScalar(100.0 / maxAxis);\n      bbox.setFromObject(mroot);\n      bbox.getCenter(cent);\n      bbox.getSize(size); //Reposition to 0,halfY,0\n\n      mroot.position.copy(cent).multiplyScalar(-1);\n      mroot.position.y += size.y * 0.5;\n      return scene;\n    }\n  }]);\n\n  return Main;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/Main.js?");

/***/ }),

/***/ "./src/js/main/components/camera.js":
/*!******************************************!*\
  !*** ./src/js/main/components/camera.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Camera; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // Class that creates and updates the main camera\n\nvar Camera = /*#__PURE__*/function () {\n  function Camera(config, renderer) {\n    var _this = this;\n\n    _classCallCheck(this, Camera);\n\n    var width = renderer.domElement.width;\n    var height = renderer.domElement.height; // Create and position a Perspective Camera\n\n    this.threeCamera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](config.camera.fov, width / height, config.camera.near, config.camera.far);\n    this.threeCamera.position.set(config.camera.posX, config.camera.posY, config.camera.posZ);\n    this.threeCamera.lookAt(0, 0, 0); // Initial sizing\n\n    this.updateSize(renderer); // Listeners\n\n    window.addEventListener('resize', function () {\n      return _this.updateSize(renderer);\n    }, false);\n  }\n\n  _createClass(Camera, [{\n    key: \"updateSize\",\n    value: function updateSize(renderer) {\n      // Update camera aspect ratio with window aspect ratio\n      this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height; // Always call updateProjectionMatrix on camera change\n\n      this.threeCamera.updateProjectionMatrix();\n    }\n  }]);\n\n  return Camera;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/camera.js?");

/***/ }),

/***/ "./src/js/main/components/controls.js":
/*!********************************************!*\
  !*** ./src/js/main/components/controls.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controls; });\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // Controls based on orbit controls\n\nvar Controls = /*#__PURE__*/function () {\n  function Controls(config, camera, container) {\n    _classCallCheck(this, Controls);\n\n    // Orbit controls first needs to pass in THREE to constructor\n    //const orbitControls = new OrbitControls(THREE);\n    this.threeControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__[\"OrbitControls\"](camera, container);\n    this.init(config);\n  }\n\n  _createClass(Controls, [{\n    key: \"init\",\n    value: function init(config) {\n      this.threeControls.target.set(config.controls.target.x, config.controls.target.y, config.controls.target.z);\n      this.threeControls.autoRotate = config.controls.autoRotate;\n      this.threeControls.autoRotateSpeed = config.controls.autoRotateSpeed;\n      this.threeControls.rotateSpeed = config.controls.rotateSpeed;\n      this.threeControls.zoomSpeed = config.controls.zoomSpeed;\n      this.threeControls.minDistance = config.controls.minDistance;\n      this.threeControls.maxDistance = config.controls.maxDistance;\n      this.threeControls.minPolarAngle = config.controls.minPolarAngle;\n      this.threeControls.maxPolarAngle = config.controls.maxPolarAngle;\n      this.threeControls.enableDamping = config.controls.enableDamping;\n      this.threeControls.enableZoom = config.controls.enableZoom;\n      this.threeControls.dampingFactor = config.controls.dampingFactor;\n    }\n  }]);\n\n  return Controls;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/controls.js?");

/***/ }),

/***/ "./src/js/main/components/renderer.js":
/*!********************************************!*\
  !*** ./src/js/main/components/renderer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Renderer; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_webxr_VRButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/webxr/VRButton */ \"./node_modules/three/examples/jsm/webxr/VRButton.js\");\n/* harmony import */ var three_examples_jsm_webxr_XRControllerModelFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/webxr/XRControllerModelFactory */ \"./node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n // Main webGL renderer class\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer(config, scene, container) {\n    var _this = this;\n\n    _classCallCheck(this, Renderer);\n\n    // Properties\n    this.scene = scene;\n    this.container = container; // Create WebGL renderer and set its antialias\n\n    this.threeRenderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n      antialias: true\n    }); // Set clear color to fog to enable fog or to hex color for no fog\n\n    this.threeRenderer.setClearColor(scene.fog.color);\n    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina\n    // Appends canvas\n\n    container.appendChild(this.threeRenderer.domElement); // Shadow map options\n\n    this.threeRenderer.shadowMap.enabled = true;\n    this.threeRenderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__[\"PCFSoftShadowMap\"]; // Get anisotropy for textures\n\n    config.maxAnisotropy = this.threeRenderer.capabilities.getMaxAnisotropy(); // Initial size update set to canvas container\n\n    this.updateSize();\n    this.threeRenderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__[\"sRGBEncoding\"];\n    this.threeRenderer.xr.enabled = true; // VR Button\n\n    document.body.appendChild(three_examples_jsm_webxr_VRButton__WEBPACK_IMPORTED_MODULE_1__[\"VRButton\"].createButton(this.threeRenderer)); // Listeners\n\n    document.addEventListener('DOMContentLoaded', function () {\n      return _this.updateSize();\n    }, false);\n    window.addEventListener('resize', function () {\n      return _this.updateSize();\n    }, false);\n  }\n\n  _createClass(Renderer, [{\n    key: \"updateSize\",\n    value: function updateSize() {\n      this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);\n    }\n  }, {\n    key: \"render\",\n    value: function render(scene, camera) {\n      // Renders scene to canvas target\n      this.threeRenderer.render(scene, camera);\n    }\n  }]);\n\n  return Renderer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/renderer.js?");

/***/ })

})