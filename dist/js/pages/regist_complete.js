(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),REGISTERING_FLAG="entry_mail",REGIST_HREF="./create_account.html",Registering=function(){function e(){_classCallCheck(this,e),this.isRegistering()}return _createClass(e,[{key:"isRegistering",value:function(){null===localStorage.getItem(REGISTERING_FLAG)&&(document.location.href=REGIST_HREF)}}]),e}();exports.default=Registering},{}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _Registering=require("../module/Registering"),_Registering2=_interopRequireDefault(_Registering),LOAD_EVENT="DOMContentLoaded";new _Registering2.default,window.addEventListener(LOAD_EVENT,function(){})},{"../module/Registering":1}]},{},[2]);
//# sourceMappingURL=regist_complete.js.map