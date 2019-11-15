(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),BLUR_EVENT="blur",CHANGE_EVENT="change",SUBMIT_CLASS=".js-formSubmit-target",CHECK_EMPTY_CLASS=".js-valueEmptyCheck-target",CHECK_CHECKED_CLASS=".js-hasChecked-target",CHECK_MAIL_CLASS=".js-mailValidation-target",ERROR_CLASS="is-error",VALIDATE_FORMAT=/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/,ActivateSubmit=function(){function e(){_classCallCheck(this,e),this.activeSubmit()}return _createClass(e,[{key:"convertNode",value:function(e){var t=document.querySelectorAll(e);return Array.prototype.slice.call(t,0)}},{key:"isValueEmpty",value:function(){var e=this,t=this.convertNode(CHECK_EMPTY_CLASS),n=new Array(t.length);t.forEach(function(t,s){t.addEventListener(BLUR_EVENT,function(){e.checkEmpty(t,n,s)})})}},{key:"checkEmpty",value:function(e,t,n){""===e.value&&(e.classList.add(ERROR_CLASS),t[n]=!1),""!==e.value&&(e.classList.remove(ERROR_CLASS),t[n]=!0),t.filter(function(e){return!0===e}).length!==t.length?this.checkResult.empty=!1:this.checkResult.empty=!0}},{key:"isChecked",value:function(){var e=this,t=this.convertNode(CHECK_CHECKED_CLASS),n=new Array(t.length);t.forEach(function(t,s){t.addEventListener(CHANGE_EVENT,function(){e.hasCheck(t,n,s)})})}},{key:"hasCheck",value:function(e,t,n){e.checked||(e.classList.add(ERROR_CLASS),t[n]=!1),e.checked&&(e.classList.remove(ERROR_CLASS),t[n]=!0),t.filter(function(e){return!0===e}).length!==t.length?this.checkResult.checkbox=!1:this.checkResult.checkbox=!0}},{key:"mailValidate",value:function(){var e=this,t=this.convertNode(CHECK_MAIL_CLASS);this.firstInput=t[0],this.secondInput=t[1],this.firstInput.addEventListener(BLUR_EVENT,function(){VALIDATE_FORMAT.test(e.firstInput.value)||e.firstInput.classList.add(ERROR_CLASS),VALIDATE_FORMAT.test(e.firstInput.value)&&(e.firstInput.classList.remove(ERROR_CLASS),e.confirmValidate()),e.secondInput.value!==e.firstInput.value?e.secondInput.classList.add(ERROR_CLASS):e.secondInput.classList.remove(ERROR_CLASS)})}},{key:"confirmValidate",value:function(){var e=this;this.secondInput.addEventListener(BLUR_EVENT,function(){VALIDATE_FORMAT.test(e.secondInput.value)&&e.secondInput.value===e.firstInput.value||(e.secondInput.classList.add(ERROR_CLASS),e.checkResult.mail=!1),VALIDATE_FORMAT.test(e.secondInput.value)&&e.secondInput.value===e.firstInput.value&&(e.secondInput.classList.remove(ERROR_CLASS),e.checkResult.mail=!0)})}},{key:"activeSubmit",value:function(){var e=this,t=document.querySelector(SUBMIT_CLASS);this.checkResult={empty:!1,checkbox:!1,mail:!1},this.isValueEmpty(),this.isChecked(),this.mailValidate();var n=this.checkResult;Object.keys(n).forEach(function(s){Object.defineProperty(n,s,{get:function(){return e[s]},set:function(c){e[s]=c,!0===n.empty&&!0===n.checkbox&&!0===n.mail?t.disabled=!1:t.disabled=!0}})})}}]),e}();exports.default=ActivateSubmit},{}]},{},[1]);
//# sourceMappingURL=ActivateSubmit.js.map