(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var c=t[r];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,r,c){return r&&e(t.prototype,r),c&&e(t,c),t}}(),CHANGE_EVENT="change",HasChecked=function(){function e(){_classCallCheck(this,e),this.isChecked()}return _createClass(e,[{key:"isChecked",value:function(){this.targetCheckbox=document.querySelectorAll(".js-hasChecked-target"),this.targetCheckbox.forEach(function(e){e.addEventListener(CHANGE_EVENT,function(){if(!1===e.checked&&e.classList.add("is-error"),!0===e.checked)return e.classList.remove("is-error"),!0})})}}]),e}();exports.default=HasChecked},{}]},{},[1]);
//# sourceMappingURL=HasChecked.js.map