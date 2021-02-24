webpackHotUpdate("main",{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/detector.js */ \"./src/js/utils/detector.js\");\n/* harmony import */ var _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/preloadScene.js */ \"./src/js/utils/preloadScene.js\");\n/* harmony import */ var _main_Main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/Main.js */ \"./src/js/main/Main.js\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // Styles\n\n\nconsole.log('Start sequor.edu');\nvar detector = new _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar preloadScene = new _utils_preloadScene_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document);\n\nif (detector.webgl()) {\n  var container = document.getElementById('appContainer');\n  var main = new _main_Main_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](container);\n  main.start();\n  preloadScene.hideLoading();\n  container.style.display = 'none';\n  main.run();\n} else {\n  preloadScene.hideLoading();\n  detector.addGetWebGLMessage({\n    parent: document.getElementById('appContainer'),\n    id: 'webgl-error'\n  });\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

})