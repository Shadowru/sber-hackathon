webpackHotUpdate("main",{

/***/ "./src/js/main/components/renderer.js":
/*!********************************************!*\
  !*** ./src/js/main/components/renderer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Renderer; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_webxr_VRButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/webxr/VRButton */ \"./node_modules/three/examples/jsm/webxr/VRButton.js\");\n/* harmony import */ var three_examples_jsm_webxr_XRControllerModelFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/webxr/XRControllerModelFactory */ \"./node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n // Main webGL renderer class\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer(config, scene, container) {\n    var _this = this;\n\n    _classCallCheck(this, Renderer);\n\n    // Properties\n    this.scene = scene;\n    this.container = container; // Create WebGL renderer and set its antialias\n\n    this.threeRenderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n      antialias: true\n    }); // Set clear color to fog to enable fog or to hex color for no fog\n\n    this.threeRenderer.setClearColor(scene.fog.color);\n    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina\n    // Appends canvas\n\n    container.appendChild(this.threeRenderer.domElement); // Shadow map options\n\n    this.threeRenderer.shadowMap.enabled = true;\n    this.threeRenderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__[\"PCFSoftShadowMap\"]; // Get anisotropy for textures\n\n    config.maxAnisotropy = this.threeRenderer.capabilities.getMaxAnisotropy(); // Initial size update set to canvas container\n\n    this.updateSize();\n    this.threeRenderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__[\"sRGBEncoding\"];\n    renderer.vr.enabled = true;\n    this.threeRenderer.xr.enabled = true; // VR Button\n\n    document.body.appendChild(three_examples_jsm_webxr_VRButton__WEBPACK_IMPORTED_MODULE_1__[\"VRButton\"].createButton(this.threeRenderer)); // Listeners\n\n    document.addEventListener('DOMContentLoaded', function () {\n      return _this.updateSize();\n    }, false);\n    window.addEventListener('resize', function () {\n      return _this.updateSize();\n    }, false);\n  }\n\n  _createClass(Renderer, [{\n    key: \"updateSize\",\n    value: function updateSize() {\n      this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);\n    }\n  }, {\n    key: \"render\",\n    value: function render(scene, camera) {\n      // Renders scene to canvas target\n      this.threeRenderer.render(scene, camera);\n    }\n  }]);\n\n  return Renderer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/components/renderer.js?");

/***/ })

})