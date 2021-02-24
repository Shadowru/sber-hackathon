webpackHotUpdate("main",{

/***/ "./src/js/main/components/controls.js":
/*!********************************************!*\
  !*** ./src/js/main/components/controls.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controls; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n // Controls based on orbit controls\n\nvar Controls = /*#__PURE__*/function () {\n  function Controls(config, camera, container) {\n    _classCallCheck(this, Controls);\n\n    // Orbit controls first needs to pass in THREE to constructor\n    //const orbitControls = new OrbitControls(THREE);\n    this.threeControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__[\"default\"](camera, container);\n    this.init(config);\n  }\n\n  _createClass(Controls, [{\n    key: \"init\",\n    value: function init(config) {\n      this.threeControls.target.set(config.controls.target.x, config.controls.target.y, config.controls.target.z);\n      this.threeControls.autoRotate = config.controls.autoRotate;\n      this.threeControls.autoRotateSpeed = config.controls.autoRotateSpeed;\n      this.threeControls.rotateSpeed = config.controls.rotateSpeed;\n      this.threeControls.zoomSpeed = config.controls.zoomSpeed;\n      this.threeControls.minDistance = config.controls.minDistance;\n      this.threeControls.maxDistance = config.controls.maxDistance;\n      this.threeControls.minPolarAngle = config.controls.minPolarAngle;\n      this.threeControls.maxPolarAngle = config.controls.maxPolarAngle;\n      this.threeControls.enableDamping = config.controls.enableDamping;\n      this.threeControls.enableZoom = config.controls.enableZoom;\n      this.threeControls.dampingFactor = config.controls.dampingFactor;\n    }\n  }]);\n\n  return Controls;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/controls.js?");

/***/ })

})