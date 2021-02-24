webpackHotUpdate("main",{

/***/ "./src/js/main/Main.js":
/*!*****************************!*\
  !*** ./src/js/main/Main.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _components_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/renderer */ \"./src/js/main/components/renderer.js\");\n/* harmony import */ var _components_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/camera */ \"./src/js/main/components/camera.js\");\n/* harmony import */ var _components_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/controls */ \"./src/js/main/components/controls.js\");\n/* harmony import */ var three_examples_jsm_geometries_BoxLineGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/geometries/BoxLineGeometry.js */ \"./node_modules/three/examples/jsm/geometries/BoxLineGeometry.js\");\n/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\n\n\nvar Main = /*#__PURE__*/function () {\n  function Main(container) {\n    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, Main);\n\n    this._container = container;\n    this._config = Object.assign({\n      fog: {\n        color: 0x505050,\n        near: 0.0008\n      },\n      camera: {\n        fov: 75,\n        near: 0.01,\n        far: 1000,\n        aspect: 1,\n        posX: 0,\n        posY: 1.8,\n        posZ: 0\n      },\n      controls: {\n        autoRotate: false,\n        autoRotateSpeed: -0.5,\n        rotateSpeed: 0.5,\n        zoomSpeed: 0.8,\n        minDistance: 0.01,\n        maxDistance: 600,\n        minPolarAngle: Math.PI / 5,\n        maxPolarAngle: Math.PI / 2,\n        minAzimuthAngle: -Infinity,\n        maxAzimuthAngle: Infinity,\n        enableDamping: true,\n        dampingFactor: 0.5,\n        enableZoom: true,\n        target: {\n          x: 0,\n          y: 1.8,\n          z: 1.8\n        }\n      },\n      scene: {\n        //url: 'assets/vr_gallery/scene.glb',\n        //url: 'assets/kamca/scene.glb',\n        url: 'assets/izzy/scene.glb',\n        //url: 'assets/sci-fi/scene.glb',\n        //url: 'assets/female1_idle.glb',\n        size: {\n          x: 0,\n          y: 0,\n          z: 0\n        }\n      },\n      isDev: true\n    }, config);\n\n    if (this._config.isDev) {\n      console.log(this._config);\n    }\n  }\n\n  _createClass(Main, [{\n    key: \"start\",\n    value: function start() {\n      var config = this._config;\n      this._scene = this.createScene(config);\n      var scene = this._scene;\n      this._renderer = new _components_renderer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config, scene, this._container);\n      this._camera = new _components_camera__WEBPACK_IMPORTED_MODULE_2__[\"default\"](config, this._renderer.threeRenderer);\n      this._controls = new _components_controls__WEBPACK_IMPORTED_MODULE_3__[\"default\"](config, this._camera.threeCamera, this._container);\n      var light = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0x404040); // soft white light\n\n      scene.add(light);\n      var room = new three__WEBPACK_IMPORTED_MODULE_0__[\"LineSegments\"](new three_examples_jsm_geometries_BoxLineGeometry_js__WEBPACK_IMPORTED_MODULE_4__[\"BoxLineGeometry\"](6, 6, 6, 10, 10, 10), new three__WEBPACK_IMPORTED_MODULE_0__[\"LineBasicMaterial\"]({\n        color: 0x800000\n      }));\n      room.geometry.translate(0, 3, 0);\n      scene.add(room);\n      this.loadScene(config, scene);\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      this.render();\n    }\n  }, {\n    key: \"createScene\",\n    value: function createScene(config) {\n      var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n\n      if (window.devicePixelRatio) {\n        config.dpr = window.devicePixelRatio;\n      }\n\n      scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__[\"FogExp2\"](config.fog.color, config.fog.near);\n      return scene;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // Call render function and pass in created scene and camera\n      this._renderer.render(this._scene, this._camera.threeCamera);\n\n      this._controls.threeControls.update();\n\n      if (this._mixer !== undefined) {\n        var dt = (Date.now() - this._lastframe) / 1000;\n\n        this._mixer.update(dt);\n      }\n\n      this._lastframe = Date.now(); // RAF\n\n      requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object\n    }\n  }, {\n    key: \"loadScene\",\n    value: function loadScene(config, scene) {\n      var loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__[\"GLTFLoader\"]();\n      var processor = this._processScene;\n      var searchAnimations = this._searchAnimations;\n      var main_instance = this;\n      loader.load(config.scene.url, function (gltf) {\n        var gltf_scene = processor(gltf.scene); //gltf_scene.translateY(\n        //    config.scene.size.y\n        //);\n\n        var skeleton = new three__WEBPACK_IMPORTED_MODULE_0__[\"SkeletonHelper\"](gltf_scene); //skeleton.visible = false;\n\n        scene.add(skeleton);\n        scene.add(gltf_scene);\n        var mixer = new three__WEBPACK_IMPORTED_MODULE_0__[\"AnimationMixer\"](gltf.scene);\n        main_instance._mixer = mixer; //mixer.clipAction(gltf.animations[0]).play();\n        //gltf.animations.forEach((clip) => {mixer.clipAction(clip).play(); });\n\n        var animations = gltf.animations;\n        var idleAction = mixer.clipAction(animations[2]);\n        var walkAction = mixer.clipAction(animations[3]);\n        idleAction.play();\n      }, undefined, function (error) {\n        console.error(error);\n      });\n    }\n  }, {\n    key: \"_searchAnimations\",\n    value: function _searchAnimations(model) {\n      var searchAnimations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._searchAnimations;\n\n      if (model === undefined) {\n        return;\n      }\n\n      if (model.children === undefined) {\n        return;\n      }\n\n      model.children.forEach(function (element) {\n        var clips = element.animations;\n\n        if (clips !== undefined) {\n          console.log(clips);\n        }\n\n        searchAnimations(element, searchAnimations);\n      });\n    }\n  }, {\n    key: \"_processScene\",\n    value: function _processScene(scene) {\n      var mroot = scene;\n      var bbox = new three__WEBPACK_IMPORTED_MODULE_0__[\"Box3\"]().setFromObject(mroot);\n      var cent = bbox.getCenter(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]());\n      var size = bbox.getSize(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]()); //Rescale the object to normalized space\n\n      var maxAxis = Math.max(size.x, size.y, size.z);\n      mroot.scale.multiplyScalar(1.8 / maxAxis);\n      bbox.setFromObject(mroot);\n      bbox.getCenter(cent);\n      bbox.getSize(size); //Reposition to 0,halfY,0\n\n      mroot.position.copy(cent).multiplyScalar(-1);\n      mroot.position.y += size.y * 0.5;\n      return scene;\n    }\n  }, {\n    key: \"_setMixer\",\n    value: function _setMixer(mixer) {\n      this._mixer = mixer;\n    }\n  }]);\n\n  return Main;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/Main.js?");

/***/ })

})