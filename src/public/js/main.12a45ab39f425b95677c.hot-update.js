webpackHotUpdate("main",{

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_detector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/detector */ \"./src/js/utils/detector.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '/util/preload'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n // Styles\n\n\nconsole.log('Start sequor.edu');\nvar detector = new _utils_detector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nif (detector.webgl()) {} else {\n  detector.addGetWebGLMessage({\n    parent: document.getElementById('appContainer'),\n    id: 'webgl-error'\n  });\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/utils/detector.js":
/*!**********************************!*\
  !*** ./src/js/utils/detector.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Detector; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Detector = /*#__PURE__*/function () {\n  function Detector() {\n    _classCallCheck(this, Detector);\n  }\n\n  _createClass(Detector, [{\n    key: \"webgl\",\n    value: function webgl() {\n      try {\n        var canvas = document.createElement('canvas');\n        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));\n      } catch (e) {\n        return false;\n      }\n    }\n  }, {\n    key: \"getWebGLErrorMessage\",\n    value: function getWebGLErrorMessage() {\n      var element = document.createElement('div');\n      element.id = 'webgl-error-message';\n      element.style.fontFamily = 'monospace';\n      element.style.fontSize = '13px';\n      element.style.fontWeight = 'normal';\n      element.style.textAlign = 'center';\n      element.style.background = '#fff';\n      element.style.color = '#000';\n      element.style.padding = '1.5em';\n      element.style.width = '400px';\n      element.style.margin = '5em auto 0';\n      element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href=\"http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation\" style=\"color:#000000\">WebGL</a>.<br />', 'Find out how to get it <a href=\"http://get.webgl.org/\" style=\"color:#000000\">here</a>.'].join('\\n') : ['Your browser does not seem to support <a href=\"http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation\" style=\"color:#000000\">WebGL</a>.<br/>', 'Find out how to get it <a href=\"http://get.webgl.org/\" style=\"color:#000000\">here</a>.'].join('\\n');\n      return element;\n    }\n  }, {\n    key: \"addGetWebGLMessage\",\n    value: function addGetWebGLMessage(parameters) {\n      var parent, id, element;\n      parameters = parameters || {};\n      parent = parameters.parent !== undefined ? parameters.parent : document.body;\n      id = parameters.id !== undefined ? parameters.id : 'oldie';\n      element = this.getWebGLErrorMessage();\n      element.id = id;\n      parent.appendChild(element);\n    }\n  }]);\n\n  return Detector;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/utils/detector.js?");

/***/ })

})