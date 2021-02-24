webpackHotUpdate("main",{

/***/ "":
false,

/***/ "./src/css/app.scss":
/*!**************************!*\
  !*** ./src/css/app.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/app.scss?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/detector.js */ \"./src/js/utils/detector.js\");\n/* harmony import */ var _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/preloadScene.js */ \"./src/js/utils/preloadScene.js\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n // Styles\n\n\nconsole.log('Start sequor.edu');\nvar detector = new _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar preloadScene = new _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document);\n\nif (detector.webgl()) {} else {\n  detector.addGetWebGLMessage({\n    parent: document.getElementById('appContainer'),\n    id: 'webgl-error'\n  });\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/utils/preloadScene.js":
/*!**************************************!*\
  !*** ./src/js/utils/preloadScene.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PreloadScene; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar PreloadScene = function PreloadScene() {\n  _classCallCheck(this, PreloadScene);\n};\n\n\n\n//# sourceURL=webpack:///./src/js/utils/preloadScene.js?");

/***/ })

})