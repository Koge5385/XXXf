(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var MetaReplace=function(){function e(t,n){_classCallCheck(this,e),this.replaceTitle(t),this.replaceDescription(n),this.replaceOgp(t,n)}return _createClass(e,[{key:"replaceTitle",value:function(e){document.title=""+e}},{key:"replaceDescription",value:function(e){document.getElementsByName("description")[0].content=e}},{key:"replaceOgp",value:function(e,t){var n=document.head.children,r=location.pathname+location.search;Array.prototype.forEach.call(n,function(n){"og:title"===n.getAttribute("property")&&(n.content=""+e),"og:description"===n.getAttribute("property")&&(n.content=t),"og:url"===n.getAttribute("property")&&(n.content="https://job.mplat.jp"+r)})}}]),e}();exports.default=MetaReplace},{}]},{},[1]);