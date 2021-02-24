webpackHotUpdate("main",{

/***/ "./src/js/main/components/camera.js":
/*!******************************************!*\
  !*** ./src/js/main/components/camera.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Camera; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // Class that creates and updates the main camera\n\nvar Camera = /*#__PURE__*/function () {\n  function Camera(config, renderer) {\n    var _this = this;\n\n    _classCallCheck(this, Camera);\n\n    var width = renderer.domElement.width;\n    var height = renderer.domElement.height; // Create and position a Perspective Camera\n\n    this.threeCamera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](config.camera.fov, width / height, config.camera.near, config.camera.far);\n    this.threeCamera.position.set(config.camera.posX, config.camera.posY, config.camera.posZ);\n    this.threeCamera.lookAt(); // Initial sizing\n\n    this.updateSize(renderer); // Listeners\n\n    window.addEventListener('resize', function () {\n      return _this.updateSize(renderer);\n    }, false);\n  }\n\n  _createClass(Camera, [{\n    key: \"updateSize\",\n    value: function updateSize(renderer) {\n      // Update camera aspect ratio with window aspect ratio\n      this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height; // Always call updateProjectionMatrix on camera change\n\n      this.threeCamera.updateProjectionMatrix();\n    }\n  }]);\n\n  return Camera;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/camera.js?");

/***/ })

})