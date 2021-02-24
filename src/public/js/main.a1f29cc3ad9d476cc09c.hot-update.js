webpackHotUpdate("main",{

/***/ "./src/js/main/Main.js":
/*!*****************************!*\
  !*** ./src/js/main/Main.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Main = /*#__PURE__*/function () {\n  function Main(container, config) {\n    _classCallCheck(this, Main);\n\n    this._container = container;\n    this._config = config === undefined ? config : {};\n  }\n\n  _createClass(Main, [{\n    key: \"start\",\n    value: function start() {\n      this._scene = this.createScene(this._config);\n    }\n  }, {\n    key: \"createScene\",\n    value: function createScene(config) {\n      var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n\n      if (window.devicePixelRatio) {\n        config.dpr = window.devicePixelRatio;\n      }\n\n      return scene;\n    }\n  }]);\n\n  return Main;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/Main.js?");

/***/ })

})