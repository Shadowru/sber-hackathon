webpackHotUpdate("main",{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/detector.js */ \"./src/js/utils/detector.js\");\n/* harmony import */ var _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/preloadScene.js */ \"./src/js/utils/preloadScene.js\");\n/* harmony import */ var _main_Main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/Main.js */ \"./src/js/main/Main.js\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // Styles\n\n\nconsole.log('Start sequor.edu');\nvar detector = new _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar preloadScene = new _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document);\n\nif (detector.webgl()) {\n  var container = document.getElementById('appContainer');\n  var main = new _main_Main_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](container);\n} else {\n  preloadScene.hideLoading();\n  detector.addGetWebGLMessage({\n    parent: document.getElementById('appContainer'),\n    id: 'webgl-error'\n  });\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/main/Main.js":
/*!*****************************!*\
  !*** ./src/js/main/Main.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Main = /*#__PURE__*/function () {\n  function Main() {\n    _classCallCheck(this, Main);\n  }\n\n  _createClass(Main, [{\n    key: \"start\",\n    value: function start() {}\n  }]);\n\n  return Main;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/main/Main.js?");

/***/ })

})