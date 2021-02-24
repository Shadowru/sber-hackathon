webpackHotUpdate("main",{

/***/ "./src/js/utils/preloadScene.js":
/*!**************************************!*\
  !*** ./src/js/utils/preloadScene.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PreloadScene; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PreloadScene = /*#__PURE__*/function () {\n  function PreloadScene(document) {\n    _classCallCheck(this, PreloadScene);\n\n    this._loading = document.getElementById('loading');\n\n    this._saveStyle();\n  }\n\n  _createClass(PreloadScene, [{\n    key: \"_saveStyle\",\n    value: function _saveStyle() {\n      this._old_style = this._loading.style.display;\n    }\n  }, {\n    key: \"hideLoading\",\n    value: function hideLoading() {\n      this._saveStyle();\n\n      this._loading.style.display = \"none\";\n    }\n  }, {\n    key: \"showLoading\",\n    value: function showLoading() {\n      this._loading.style.display = this._old_style;\n    }\n  }]);\n\n  return PreloadScene;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/utils/preloadScene.js?");

/***/ })

})