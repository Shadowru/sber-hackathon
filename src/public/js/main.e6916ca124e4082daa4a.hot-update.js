webpackHotUpdate("main",{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/detector.js */ \"./src/js/utils/detector.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '/util/preload.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n // Styles\n\n\nconsole.log('Start sequor.edu');\nvar detector = new _utils_detector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar preloadScene = new !(function webpackMissingModule() { var e = new Error(\"Cannot find module '/util/preload.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(document);\n\nif (detector.webgl()) {} else {\n  detector.addGetWebGLMessage({\n    parent: document.getElementById('appContainer'),\n    id: 'webgl-error'\n  });\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

})