(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}();function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var JsonConvert=function(){function e(r,n){_classCallCheck(this,e),this.targetFormClass=r,this.optionObject=n}return _createClass(e,[{key:"convertObject",value:function(){var e={};return new FormData(document.querySelector(this.targetFormClass)).forEach(function(r,n){switch(n){case"person_u_nenrei_year":e.person_u_nenrei=r;break;case"person_u_nenrei_month":case"person_u_nenrei_day":e.person_u_nenrei+="/"+r;break;case"resume_p_experienced_industry":case"resume_p_experienced_job_category":case"resume_p_expect_employment_type":case"resume_p_expect_job_category":void 0===e[n]?e[n]=r+",":e[n]+=r+",";break;case"resume_p_carrier_summary_2":case"resume_p_carrier_summary_3":e.resume_p_carrier_summary+="\r\n\r\n"+r+",";break;default:e[n]=r}}),void 0!==this.optionObject&&Object.assign(e,this.optionObject),JSON.stringify(e)}}]),e}();exports.default=JsonConvert},{}]},{},[1]);