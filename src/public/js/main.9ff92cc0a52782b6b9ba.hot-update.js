webpackHotUpdate("main",{

/***/ "./src/js/main/Main.js":
/*!*****************************!*\
  !*** ./src/js/main/Main.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _components_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/renderer */ \"./src/js/main/components/renderer.js\");\n/* harmony import */ var _components_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/camera */ \"./src/js/main/components/camera.js\");\n/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar Main = /*#__PURE__*/function () {\n  function Main(container) {\n    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, Main);\n\n    this._container = container;\n    this._config = Object.assign({\n      fog: {\n        color: 0xffffff,\n        near: 0.0008\n      },\n      camera: {\n        fov: 75,\n        near: 0.01,\n        far: 1000,\n        aspect: 1,\n        posX: 0,\n        posY: 5,\n        posZ: 5\n      },\n      isDev: true\n    }, config);\n\n    if (this._config.isDev) {\n      console.log(this._config);\n    }\n  }\n\n  _createClass(Main, [{\n    key: \"start\",\n    value: function start() {\n      var config = this._config;\n      this._scene = this.createScene(config);\n      this._renderer = new _components_renderer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config, this._scene, this._container);\n      this._camera = new _components_camera__WEBPACK_IMPORTED_MODULE_2__[\"default\"](config, this._renderer.threeRenderer);\n      var geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"PlaneGeometry\"](1, 1, 1);\n      var material = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n        color: 0xffff00,\n        side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n      });\n      var plane = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geometry, material);\n\n      this._scene.add(plane);\n\n      this.loadScene(this._scene);\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      this.render();\n    }\n  }, {\n    key: \"createScene\",\n    value: function createScene(config) {\n      var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n\n      if (window.devicePixelRatio) {\n        config.dpr = window.devicePixelRatio;\n      }\n\n      scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__[\"FogExp2\"](config.fog.color, config.fog.near);\n      return scene;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // Call render function and pass in created scene and camera\n      this._renderer.render(this._scene, this._camera.threeCamera); //this.controls.threeControls.update();\n      // RAF\n\n\n      requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object\n    }\n  }, {\n    key: \"loadScene\",\n    value: function loadScene(scene) {\n      var loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__[\"GLTFLoader\"]();\n      loader.load('path/to/model.glb', function (gltf) {\n        scene.add(gltf.scene);\n      }, undefined, function (error) {\n        console.error(error);\n      });\n    }\n  }]);\n\n  return Main;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/Main.js?");

/***/ })

})