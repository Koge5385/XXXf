(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),AutoTextOmit=function(){function t(e,r){_classCallCheck(this,t),this.getTextArray(e),this.textOmit(r)}return _createClass(t,[{key:"getTextArray",value:function(t){var e=this;this.targetElement=document.querySelectorAll(t),this.targetArray=[],this.targetElement.forEach(function(t){e.targetArray.push(t)})}},{key:"textOmit",value:function(t){this.targetArray.forEach(function(e){e.innerText.length>t&&(e.innerText=e.innerText.substr(0,t),e.append("…"))})}}]),t}();exports.default=AutoTextOmit},{}]},{},[1]);
//# sourceMappingURL=AutoTextOmit.js.map