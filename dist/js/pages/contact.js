(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),BLUR_EVENT="blur",CHANGE_EVENT="change",SUBMIT_CLASS=".js-activate-target",CHECK_EMPTY_CLASS=".js-valueEmptyCheck-target",CHECK_SELECTED_CLASS=".js-isSelected-target",CHECK_CHECKED_CLASS=".js-hasChecked-target",CHECK_ANYCHECKED_CLASS=".js-anyChecked-target",CHECK_MAIL_CLASS=".js-mailValidation-target",CHECK_PASSWORD_CLASS=".js-passwordValidation-target",ERROR_CLASS="is-error",MAIL_VALIDATE_FORMAT=/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/,PASSWORD_VALIDATE_FORMAT=/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/,ActivateSubmit=function(){function e(){_classCallCheck(this,e),this.activeSubmit()}return _createClass(e,[{key:"convertNode",value:function(e){var t=document.querySelectorAll(e);return Array.prototype.slice.call(t,0)}},{key:"isValueEmpty",value:function(){var e=this;if(null===document.querySelector(CHECK_EMPTY_CLASS)&&(this.checkResult.empty=!0),null!==document.querySelector(CHECK_EMPTY_CLASS)){var t=this.convertNode(CHECK_EMPTY_CLASS),s=new Array(t.length);t.forEach(function(t,n){""!==t.value&&(s[n]=!0),s.filter(function(e){return!0===e}).length!==s.length?e.checkResult.empty=!1:e.checkResult.empty=!0,t.addEventListener(BLUR_EVENT,function(){e.checkEmpty(t,s,n)})})}}},{key:"checkEmpty",value:function(e,t,s){""===e.value&&(e.classList.add(ERROR_CLASS),t[s]=!1),""!==e.value&&(e.classList.remove(ERROR_CLASS),t[s]=!0),t.filter(function(e){return!0===e}).length!==t.length?this.checkResult.empty=!1:this.checkResult.empty=!0}},{key:"isSelected",value:function(){var e=this;if(null===document.querySelector(CHECK_SELECTED_CLASS)&&(this.checkResult.radio=!0),null!==document.querySelector(CHECK_SELECTED_CLASS)){var t=this.convertNode(CHECK_SELECTED_CLASS),s=new Array(t.length);t.forEach(function(t,n){t.addEventListener(CHANGE_EVENT,function(){e.checkSelected(t,s,n)})})}}},{key:"checkSelected",value:function(e,t,s){e.checked||(e.classList.add(ERROR_CLASS),t[s]=!1),e.checked&&(e.classList.remove(ERROR_CLASS),t[s]=!0),t.filter(function(e){return!0===e}).length>0?this.checkResult.radio=!0:this.checkResult.radio=!1}},{key:"isChecked",value:function(){var e=this;if(null===document.querySelector(CHECK_CHECKED_CLASS)&&(this.checkResult.checkbox=!0),null!==document.querySelector(CHECK_CHECKED_CLASS)){var t=this.convertNode(CHECK_CHECKED_CLASS),s=new Array(t.length);t.forEach(function(t,n){t.addEventListener(CHANGE_EVENT,function(){e.hasCheck(t,s,n)})})}}},{key:"hasCheck",value:function(e,t,s){e.checked||(e.classList.add(ERROR_CLASS),t[s]=!1),e.checked&&(e.classList.remove(ERROR_CLASS),t[s]=!0),t.filter(function(e){return!0===e}).length!==t.length?this.checkResult.checkbox=!1:this.checkResult.checkbox=!0}},{key:"anyChecked",value:function(){var e=this;if(null===document.querySelector(CHECK_ANYCHECKED_CLASS)&&(this.checkResult.anyCheck=!0),null!==document.querySelector(CHECK_ANYCHECKED_CLASS)){var t=this.convertNode(CHECK_ANYCHECKED_CLASS),s=new Array(t.length);t.forEach(function(t,n){var c=t.querySelectorAll("input"),a=new Array(c.length);Array.prototype.slice.call(c,0).forEach(function(t,c){t.checked&&(a[c]=!0),a.filter(function(e){return!0===e}).length>0&&(s[n]=!0),s.filter(function(e){return!0===e}).length!==s.length?e.checkResult.anyCheck=!1:e.checkResult.anyCheck=!0,t.addEventListener(CHANGE_EVENT,function(){e.hasAnyCheck(t,s,a,n,c)})})})}}},{key:"hasAnyCheck",value:function(e,t,s,n,c){e.checked||(e.classList.add(ERROR_CLASS),s[c]=!1),e.checked&&(e.classList.remove(ERROR_CLASS),s[c]=!0),0===s.filter(function(e){return!0===e}).length&&(t[n]=!1),s.filter(function(e){return!0===e}).length>0&&(t[n]=!0),t.filter(function(e){return!0===e}).length!==t.length?this.checkResult.anyCheck=!1:this.checkResult.anyCheck=!0}},{key:"mailValidate",value:function(){var e=this;if(null===document.querySelector(CHECK_MAIL_CLASS)&&(this.checkResult.mail=!0),null!==document.querySelector(CHECK_MAIL_CLASS)){var t=this.convertNode(CHECK_MAIL_CLASS);this.mailFirstInput=t[0],this.mailSecondInput=t[1],this.mailFirstInput.addEventListener(BLUR_EVENT,function(){MAIL_VALIDATE_FORMAT.test(e.mailFirstInput.value)||e.mailFirstInput.classList.add(ERROR_CLASS),MAIL_VALIDATE_FORMAT.test(e.mailFirstInput.value)&&(e.mailFirstInput.classList.remove(ERROR_CLASS),e.mailConfirmValidate()),e.mailSecondInput.value!==e.mailFirstInput.value?e.mailSecondInput.classList.add(ERROR_CLASS):e.mailSecondInput.classList.remove(ERROR_CLASS)})}}},{key:"mailConfirmValidate",value:function(){var e=this;this.mailSecondInput.addEventListener(BLUR_EVENT,function(){MAIL_VALIDATE_FORMAT.test(e.mailSecondInput.value)&&e.mailSecondInput.value===e.mailFirstInput.value||(e.mailSecondInput.classList.add(ERROR_CLASS),e.checkResult.mail=!1),MAIL_VALIDATE_FORMAT.test(e.mailSecondInput.value)&&e.mailSecondInput.value===e.mailFirstInput.value&&(e.mailSecondInput.classList.remove(ERROR_CLASS),e.checkResult.mail=!0)})}},{key:"passwordValidate",value:function(){var e=this;if(null===document.querySelector(CHECK_PASSWORD_CLASS)&&(this.checkResult.password=!0),null!==document.querySelector(CHECK_PASSWORD_CLASS)){var t=this.convertNode(CHECK_PASSWORD_CLASS);this.passwordFirstInput=t[0],this.passwordSecondInput=t[1],this.passwordFirstInput.addEventListener(BLUR_EVENT,function(){PASSWORD_VALIDATE_FORMAT.test(e.passwordFirstInput.value)||e.passwordFirstInput.classList.add(ERROR_CLASS),PASSWORD_VALIDATE_FORMAT.test(e.passwordFirstInput.value)&&(e.passwordFirstInput.classList.remove(ERROR_CLASS),e.passwordConfirmValidate()),e.passwordSecondInput.value!==e.passwordFirstInput.value?e.passwordSecondInput.classList.add(ERROR_CLASS):e.passwordSecondInput.classList.remove(ERROR_CLASS)})}}},{key:"passwordConfirmValidate",value:function(){var e=this;this.passwordSecondInput.addEventListener(BLUR_EVENT,function(){PASSWORD_VALIDATE_FORMAT.test(e.passwordSecondInput.value)&&e.passwordSecondInput.value===e.passwordFirstInput.value||(e.passwordSecondInput.classList.add(ERROR_CLASS),e.checkResult.password=!1),PASSWORD_VALIDATE_FORMAT.test(e.passwordSecondInput.value)&&e.passwordSecondInput.value===e.passwordFirstInput.value&&(e.passwordSecondInput.classList.remove(ERROR_CLASS),e.checkResult.password=!0)})}},{key:"activeSubmit",value:function(){var e=document.querySelector(SUBMIT_CLASS);this.checkResult={empty:!1,radio:!1,checkbox:!1,mail:!1,password:!1,anyCheck:!1},this.isValueEmpty(),this.isSelected(),this.isChecked(),this.anyChecked(),this.mailValidate(),this.passwordValidate(),!0===this.checkResult.empty&&!0===this.checkResult.radio&&!0===this.checkResult.checkbox&&!0===this.checkResult.mail&&!0===this.checkResult.password&&!0===this.checkResult.anyCheck&&(e.disabled=!1);var t=this.checkResult;Object.keys(t).forEach(function(s){var n=t[s];Object.defineProperty(t,s,{get:function(){return n},set:function(s){n=s,!0===t.empty&&!0===t.radio&&!0===t.checkbox&&!0===t.mail&&!0===t.password&&!0===t.anyCheck?e.disabled=!1:e.disabled=!0}})})}}]),e}();exports.default=ActivateSubmit},{}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}var _ActivateSubmit=require("../module/ActivateSubmit"),_ActivateSubmit2=_interopRequireDefault(_ActivateSubmit),LOAD_EVENT="DOMContentLoaded";window.addEventListener(LOAD_EVENT,function(){new _ActivateSubmit2.default})},{"../module/ActivateSubmit":1}]},{},[2]);
//# sourceMappingURL=contact.js.map