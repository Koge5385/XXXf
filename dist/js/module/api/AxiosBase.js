(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){!function(r){function n(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=r,n.c=t,n.d=function(r,t,e){n.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:e})},n.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(t,"a",t),t},n.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},n.p="",n(n.s=0)}([function(r,n){Array.from||(Array.from=function(){var r=Object.prototype.toString,n=function(n){return"function"==typeof n||"[object Function]"===r.call(n)},t=function(r){var n=Number(r);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n},e=Math.pow(2,53)-1,o=function(r){var n=t(r);return Math.min(Math.max(n,0),e)};return function(r){var t=this,e=Object(r);if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");var u,i=arguments.length>1?arguments[1]:void 0;if(void 0!==i){if(!n(i))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(u=arguments[2])}for(var a,c=o(e.length),f=n(t)?Object(new t(c)):new Array(c),l=0;l<c;)a=e[l],f[l]=i?void 0===u?i(a,l):i.call(u,a,l):a,l+=1;return f.length=c,f}}())}])},{}],2:[function(require,module,exports){require("./dist/index")},{"./dist/index":1}],3:[function(require,module,exports){module.exports=require("./lib/axios")},{"./lib/axios":5}],4:[function(require,module,exports){(function(process){"use strict";var utils=require("./../utils"),settle=require("./../core/settle"),buildURL=require("./../helpers/buildURL"),parseHeaders=require("./../helpers/parseHeaders"),isURLSameOrigin=require("./../helpers/isURLSameOrigin"),createError=require("../core/createError"),btoa="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||require("./../helpers/btoa");module.exports=function(e){return new Promise(function(r,t){var s=e.data,o=e.headers;utils.isFormData(s)&&delete o["Content-Type"];var n=new XMLHttpRequest,i="onreadystatechange",a=!1;if("test"===process.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in n||isURLSameOrigin(e.url)||(n=new window.XDomainRequest,i="onload",a=!0,n.onprogress=function(){},n.ontimeout=function(){}),e.auth){var u=e.auth.username||"",d=e.auth.password||"";o.Authorization="Basic "+btoa(u+":"+d)}if(n.open(e.method.toUpperCase(),buildURL(e.url,e.params,e.paramsSerializer),!0),n.timeout=e.timeout,n[i]=function(){if(n&&(4===n.readyState||a)&&(0!==n.status||n.responseURL&&0===n.responseURL.indexOf("file:"))){var s="getAllResponseHeaders"in n?parseHeaders(n.getAllResponseHeaders()):null,o=e.responseType&&"text"!==e.responseType?n.response:n.responseText,i={data:o,status:1223===n.status?204:n.status,statusText:1223===n.status?"No Content":n.statusText,headers:s,config:e,request:n};settle(r,t,i),n=null}},n.onerror=function(){t(createError("Network Error",e,null,n)),n=null},n.ontimeout=function(){t(createError("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",n)),n=null},utils.isStandardBrowserEnv()){var l=require("./../helpers/cookies"),p=(e.withCredentials||isURLSameOrigin(e.url))&&e.xsrfCookieName?l.read(e.xsrfCookieName):void 0;p&&(o[e.xsrfHeaderName]=p)}if("setRequestHeader"in n&&utils.forEach(o,function(e,r){void 0===s&&"content-type"===r.toLowerCase()?delete o[r]:n.setRequestHeader(r,e)}),e.withCredentials&&(n.withCredentials=!0),e.responseType)try{n.responseType=e.responseType}catch(r){if("json"!==e.responseType)throw r}"function"==typeof e.onDownloadProgress&&n.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&n.upload&&n.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){n&&(n.abort(),t(e),n=null)}),void 0===s&&(s=null),n.send(s)})}}).call(this,require("_process"))},{"../core/createError":11,"./../core/settle":14,"./../helpers/btoa":18,"./../helpers/buildURL":19,"./../helpers/cookies":21,"./../helpers/isURLSameOrigin":23,"./../helpers/parseHeaders":25,"./../utils":27,_process:31}],5:[function(require,module,exports){"use strict";function createInstance(e){var r=new Axios(e),s=bind(Axios.prototype.request,r);return utils.extend(s,Axios.prototype,r),utils.extend(s,r),s}var utils=require("./utils"),bind=require("./helpers/bind"),Axios=require("./core/Axios"),defaults=require("./defaults"),axios=createInstance(defaults);axios.Axios=Axios,axios.create=function(e){return createInstance(utils.merge(defaults,e))},axios.Cancel=require("./cancel/Cancel"),axios.CancelToken=require("./cancel/CancelToken"),axios.isCancel=require("./cancel/isCancel"),axios.all=function(e){return Promise.all(e)},axios.spread=require("./helpers/spread"),module.exports=axios,module.exports.default=axios},{"./cancel/Cancel":6,"./cancel/CancelToken":7,"./cancel/isCancel":8,"./core/Axios":9,"./defaults":16,"./helpers/bind":17,"./helpers/spread":26,"./utils":27}],6:[function(require,module,exports){"use strict";function Cancel(e){this.message=e}Cancel.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},Cancel.prototype.__CANCEL__=!0,module.exports=Cancel},{}],7:[function(require,module,exports){"use strict";function CancelToken(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(e){n=e});var o=this;e(function(e){o.reason||(o.reason=new Cancel(e),n(o.reason))})}var Cancel=require("./Cancel");CancelToken.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},CancelToken.source=function(){var e;return{token:new CancelToken(function(n){e=n}),cancel:e}},module.exports=CancelToken},{"./Cancel":6}],8:[function(require,module,exports){"use strict";module.exports=function(t){return!(!t||!t.__CANCEL__)}},{}],9:[function(require,module,exports){"use strict";function Axios(e){this.defaults=e,this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}var defaults=require("./../defaults"),utils=require("./../utils"),InterceptorManager=require("./InterceptorManager"),dispatchRequest=require("./dispatchRequest");Axios.prototype.request=function(e){"string"==typeof e&&(e=utils.merge({url:arguments[0]},arguments[1])),e=utils.merge(defaults,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase();var t=[dispatchRequest,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},utils.forEach(["delete","get","head","options"],function(e){Axios.prototype[e]=function(t,r){return this.request(utils.merge(r||{},{method:e,url:t}))}}),utils.forEach(["post","put","patch"],function(e){Axios.prototype[e]=function(t,r,s){return this.request(utils.merge(s||{},{method:e,url:t,data:r}))}}),module.exports=Axios},{"./../defaults":16,"./../utils":27,"./InterceptorManager":10,"./dispatchRequest":12}],10:[function(require,module,exports){"use strict";function InterceptorManager(){this.handlers=[]}var utils=require("./../utils");InterceptorManager.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},InterceptorManager.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},InterceptorManager.prototype.forEach=function(e){utils.forEach(this.handlers,function(t){null!==t&&e(t)})},module.exports=InterceptorManager},{"./../utils":27}],11:[function(require,module,exports){"use strict";var enhanceError=require("./enhanceError");module.exports=function(r,e,n,o,a){var c=new Error(r);return enhanceError(c,e,n,o,a)}},{"./enhanceError":13}],12:[function(require,module,exports){"use strict";function throwIfCancellationRequested(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var utils=require("./../utils"),transformData=require("./transformData"),isCancel=require("../cancel/isCancel"),defaults=require("../defaults"),isAbsoluteURL=require("./../helpers/isAbsoluteURL"),combineURLs=require("./../helpers/combineURLs");module.exports=function(e){return throwIfCancellationRequested(e),e.baseURL&&!isAbsoluteURL(e.url)&&(e.url=combineURLs(e.baseURL,e.url)),e.headers=e.headers||{},e.data=transformData(e.data,e.headers,e.transformRequest),e.headers=utils.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),utils.forEach(["delete","get","head","post","put","patch","common"],function(a){delete e.headers[a]}),(e.adapter||defaults.adapter)(e).then(function(a){return throwIfCancellationRequested(e),a.data=transformData(a.data,a.headers,e.transformResponse),a},function(a){return isCancel(a)||(throwIfCancellationRequested(e),a&&a.response&&(a.response.data=transformData(a.response.data,a.response.headers,e.transformResponse))),Promise.reject(a)})}},{"../cancel/isCancel":8,"../defaults":16,"./../helpers/combineURLs":20,"./../helpers/isAbsoluteURL":22,"./../utils":27,"./transformData":15}],13:[function(require,module,exports){"use strict";module.exports=function(e,o,r,s,t){return e.config=o,r&&(e.code=r),e.request=s,e.response=t,e}},{}],14:[function(require,module,exports){"use strict";var createError=require("./createError");module.exports=function(t,r,e){var s=e.config.validateStatus;e.status&&s&&!s(e.status)?r(createError("Request failed with status code "+e.status,e.config,null,e.request,e)):t(e)}},{"./createError":11}],15:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=function(t,u,r){return utils.forEach(r,function(r){t=r(t,u)}),t}},{"./../utils":27}],16:[function(require,module,exports){(function(process){"use strict";function setContentTypeIfUnset(e,t){!utils.isUndefined(e)&&utils.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function getDefaultAdapter(){var e;return"undefined"!=typeof XMLHttpRequest?e=require("./adapters/xhr"):"undefined"!=typeof process&&(e=require("./adapters/http")),e}var utils=require("./utils"),normalizeHeaderName=require("./helpers/normalizeHeaderName"),DEFAULT_CONTENT_TYPE={"Content-Type":"application/x-www-form-urlencoded"},defaults={adapter:getDefaultAdapter(),transformRequest:[function(e,t){return normalizeHeaderName(t,"Content-Type"),utils.isFormData(e)||utils.isArrayBuffer(e)||utils.isBuffer(e)||utils.isStream(e)||utils.isFile(e)||utils.isBlob(e)?e:utils.isArrayBufferView(e)?e.buffer:utils.isURLSearchParams(e)?(setContentTypeIfUnset(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):utils.isObject(e)?(setContentTypeIfUnset(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};defaults.headers={common:{Accept:"application/json, text/plain, */*"}},utils.forEach(["delete","get","head"],function(e){defaults.headers[e]={}}),utils.forEach(["post","put","patch"],function(e){defaults.headers[e]=utils.merge(DEFAULT_CONTENT_TYPE)}),module.exports=defaults}).call(this,require("_process"))},{"./adapters/http":4,"./adapters/xhr":4,"./helpers/normalizeHeaderName":24,"./utils":27,_process:31}],17:[function(require,module,exports){"use strict";module.exports=function(r,n){return function(){for(var t=new Array(arguments.length),e=0;e<t.length;e++)t[e]=arguments[e];return r.apply(n,t)}}},{}],18:[function(require,module,exports){"use strict";function E(){this.message="String contains an invalid character"}function btoa(r){for(var t,a,o=String(r),e="",n=0,c=chars;o.charAt(0|n)||(c="=",n%1);e+=c.charAt(63&t>>8-n%1*8)){if((a=o.charCodeAt(n+=.75))>255)throw new E;t=t<<8|a}return e}var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";E.prototype=new Error,E.prototype.code=5,E.prototype.name="InvalidCharacterError",module.exports=btoa},{}],19:[function(require,module,exports){"use strict";function encode(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var utils=require("./../utils");module.exports=function(e,i,r){if(!i)return e;var t;if(r)t=r(i);else if(utils.isURLSearchParams(i))t=i.toString();else{var n=[];utils.forEach(i,function(e,i){null!==e&&void 0!==e&&(utils.isArray(e)&&(i+="[]"),utils.isArray(e)||(e=[e]),utils.forEach(e,function(e){utils.isDate(e)?e=e.toISOString():utils.isObject(e)&&(e=JSON.stringify(e)),n.push(encode(i)+"="+encode(e))}))}),t=n.join("&")}return t&&(e+=(-1===e.indexOf("?")?"?":"&")+t),e}},{"./../utils":27}],20:[function(require,module,exports){"use strict";module.exports=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e}},{}],21:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=utils.isStandardBrowserEnv()?function(){return{write:function(e,n,t,i,u,r){var o=[];o.push(e+"="+encodeURIComponent(n)),utils.isNumber(t)&&o.push("expires="+new Date(t).toGMTString()),utils.isString(i)&&o.push("path="+i),utils.isString(u)&&o.push("domain="+u),!0===r&&o.push("secure"),document.cookie=o.join("; ")},read:function(e){var n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},{"./../utils":27}],22:[function(require,module,exports){"use strict";module.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},{}],23:[function(require,module,exports){"use strict";var utils=require("./../utils");module.exports=utils.isStandardBrowserEnv()?function(){function t(t){var r=t;return e&&(o.setAttribute("href",r),r=o.href),o.setAttribute("href",r),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var r,e=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return r=t(window.location.href),function(e){var o=utils.isString(e)?t(e):e;return o.protocol===r.protocol&&o.host===r.host}}():function(){return function(){return!0}}()},{"./../utils":27}],24:[function(require,module,exports){"use strict";var utils=require("../utils");module.exports=function(e,t){utils.forEach(e,function(r,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[s])})}},{"../utils":27}],25:[function(require,module,exports){"use strict";var utils=require("./../utils"),ignoreDuplicateOf=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];module.exports=function(t){var e,i,r,o={};return t?(utils.forEach(t.split("\n"),function(t){if(r=t.indexOf(":"),e=utils.trim(t.substr(0,r)).toLowerCase(),i=utils.trim(t.substr(r+1)),e){if(o[e]&&ignoreDuplicateOf.indexOf(e)>=0)return;o[e]="set-cookie"===e?(o[e]?o[e]:[]).concat([i]):o[e]?o[e]+", "+i:i}}),o):o}},{"./../utils":27}],26:[function(require,module,exports){"use strict";module.exports=function(n){return function(t){return n.apply(null,t)}}},{}],27:[function(require,module,exports){"use strict";function isArray(r){return"[object Array]"===toString.call(r)}function isArrayBuffer(r){return"[object ArrayBuffer]"===toString.call(r)}function isFormData(r){return"undefined"!=typeof FormData&&r instanceof FormData}function isArrayBufferView(r){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(r):r&&r.buffer&&r.buffer instanceof ArrayBuffer}function isString(r){return"string"==typeof r}function isNumber(r){return"number"==typeof r}function isUndefined(r){return void 0===r}function isObject(r){return null!==r&&"object"==typeof r}function isDate(r){return"[object Date]"===toString.call(r)}function isFile(r){return"[object File]"===toString.call(r)}function isBlob(r){return"[object Blob]"===toString.call(r)}function isFunction(r){return"[object Function]"===toString.call(r)}function isStream(r){return isObject(r)&&isFunction(r.pipe)}function isURLSearchParams(r){return"undefined"!=typeof URLSearchParams&&r instanceof URLSearchParams}function trim(r){return r.replace(/^\s*/,"").replace(/\s*$/,"")}function isStandardBrowserEnv(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function forEach(r,e){if(null!==r&&void 0!==r)if("object"!=typeof r&&(r=[r]),isArray(r))for(var t=0,i=r.length;t<i;t++)e.call(null,r[t],t,r);else for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.call(null,r[n],n,r)}function merge(){function r(r,t){"object"==typeof e[t]&&"object"==typeof r?e[t]=merge(e[t],r):e[t]=r}for(var e={},t=0,i=arguments.length;t<i;t++)forEach(arguments[t],r);return e}function extend(r,e,t){return forEach(e,function(e,i){r[i]=t&&"function"==typeof e?bind(e,t):e}),r}var bind=require("./helpers/bind"),isBuffer=require("is-buffer"),toString=Object.prototype.toString;module.exports={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isObject:isObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isStandardBrowserEnv:isStandardBrowserEnv,forEach:forEach,merge:merge,extend:extend,trim:trim}},{"./helpers/bind":17,"is-buffer":30}],28:[function(require,module,exports){"use strict";module.exports=require("./").polyfill()},{"./":29}],29:[function(require,module,exports){(function(process,global){/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){K=t}function r(t){L=t}function o(){return void 0!==D?function(){D(s)}:i()}function i(){var t=setTimeout;return function(){return t(s,1)}}function s(){for(var t=0;t<q;t+=2){(0,G[t])(G[t+1]),G[t]=void 0,G[t+1]=void 0}q=0}function u(t,e){var n=this,r=new this.constructor(a);void 0===r[I]&&E(r);var o=n._state;if(o){var i=arguments[o-1];L(function(){return A(o,r,i,n._result)})}else w(n,r,t,e);return r}function c(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(a);return _(n,t),n}function a(){}function f(){return new TypeError("You cannot resolve a promise with itself")}function l(){return new TypeError("A promises callback cannot return that same promise.")}function h(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function v(t,e,n){L(function(t){var r=!1,o=h(n,e,function(n){r||(r=!0,e!==n?_(t,n):m(t,n))},function(e){r||(r=!0,b(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,b(t,o))},t)}function p(t,e){e._state===Q?m(t,e._result):e._state===R?b(t,e._result):w(e,void 0,function(e){return _(t,e)},function(e){return b(t,e)})}function d(t,n,r){n.constructor===t.constructor&&r===u&&n.constructor.resolve===c?p(t,n):void 0===r?m(t,n):e(r)?v(t,n,r):m(t,n)}function _(e,n){if(e===n)b(e,f());else if(t(n)){var r=void 0;try{r=n.then}catch(t){return void b(e,t)}d(e,n,r)}else m(e,n)}function y(t){t._onerror&&t._onerror(t._result),g(t)}function m(t,e){t._state===J&&(t._result=e,t._state=Q,0!==t._subscribers.length&&L(g,t))}function b(t,e){t._state===J&&(t._state=R,t._result=e,L(y,t))}function w(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Q]=n,o[i+R]=r,0===i&&t._state&&L(g,t)}function g(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?A(n,r,o,i):o(i);t._subscribers.length=0}}function A(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=!0;if(i){try{s=r(o)}catch(t){c=!1,u=t}if(n===s)return void b(n,l())}else s=o;n._state!==J||(i&&c?_(n,s):!1===c?b(n,u):t===Q?m(n,s):t===R&&b(n,s))}function S(t,e){try{e(function(e){_(t,e)},function(e){b(t,e)})}catch(e){b(t,e)}}function j(){return V++}function E(t){t[I]=V++,t._state=void 0,t._result=void 0,t._subscribers=[]}function T(){return new Error("Array Methods must be provided an Array")}function M(t){return new X(this,t).promise}function P(t){var e=this;return new e(Y(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function x(t){var e=this,n=new e(a);return b(n,t),n}function C(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function O(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function k(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=Z}var F=void 0;F=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var Y=F,q=0,D=void 0,K=void 0,L=function(t,e){G[q]=t,G[q+1]=e,2===(q+=2)&&(K?K(s):H())},N="undefined"!=typeof window?window:void 0,U=N||{},W=U.MutationObserver||U.WebKitMutationObserver,z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),B="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,G=new Array(1e3),H=void 0;H=z?function(){return function(){return process.nextTick(s)}}():W?function(){var t=0,e=new W(s),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}():B?function(){var t=new MessageChannel;return t.port1.onmessage=s,function(){return t.port2.postMessage(0)}}():void 0===N&&"function"==typeof require?function(){try{var t=Function("return this")().require("vertx");return D=t.runOnLoop||t.runOnContext,o()}catch(t){return i()}}():i();var I=Math.random().toString(36).substring(2),J=void 0,Q=1,R=2,V=0,X=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(a),this.promise[I]||E(this.promise),Y(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?m(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&m(this.promise,this._result))):b(this.promise,T())}return t.prototype._enumerate=function(t){for(var e=0;this._state===J&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===c){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===u&&t._state!==J)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===Z){var f=new n(a);s?b(f,i):d(f,t,o),this._willSettleAt(f,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===J&&(this._remaining--,t===R?b(r,n):this._result[e]=n),0===this._remaining&&m(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;w(t,void 0,function(t){return n._settledAt(Q,e,t)},function(t){return n._settledAt(R,e,t)})},t}(),Z=function(){function t(e){this[I]=j(),this._result=this._state=void 0,this._subscribers=[],a!==e&&("function"!=typeof e&&C(),this instanceof t?S(this,e):O())}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return Z.prototype.then=u,Z.all=M,Z.race=P,Z.resolve=c,Z.reject=x,Z._setScheduler=n,Z._setAsap=r,Z._asap=L,Z.polyfill=k,Z.Promise=Z,Z})}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{_process:31}],30:[function(require,module,exports){/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
function isBuffer(f){return!!f.constructor&&"function"==typeof f.constructor.isBuffer&&f.constructor.isBuffer(f)}function isSlowBuffer(f){return"function"==typeof f.readFloatLE&&"function"==typeof f.slice&&isBuffer(f.slice(0,0))}module.exports=function(f){return null!=f&&(isBuffer(f)||isSlowBuffer(f)||!!f._isBuffer)}},{}],31:[function(require,module,exports){function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var process=module.exports={},cachedSetTimeout,cachedClearTimeout;!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],32:[function(require,module,exports){var runtime=function(t){"use strict";function r(t,r,e,o){var i=r&&r.prototype instanceof n?r:n,a=Object.create(i.prototype),c=new l(o||[]);return a._invoke=u(t,e,c),a}function e(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}function n(){}function o(){}function i(){}function a(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function c(t){function r(n,o,i,a){var c=e(t[n],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&g.call(h,"__await")?Promise.resolve(h.__await).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(h).then(function(t){u.value=t,i(u)},function(t){return r("throw",t,i,a)})}a(c.arg)}function n(t,e){function n(){return new Promise(function(n,o){r(t,e,n,o)})}return o=o?o.then(n,n):n()}var o;this._invoke=n}function u(t,r,n){var o=E;return function(i,a){if(o===_)throw new Error("Generator is already running");if(o===j){if("throw"===i)throw a;return y()}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=h(c,n);if(u){if(u===O)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===E)throw o=j,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=_;var f=e(t,r,n);if("normal"===f.type){if(o=n.done?j:b,f.arg===O)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=j,n.method="throw",n.arg=f.arg)}}}function h(t,r){var n=t.iterator[r.method];if(n===v){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=v,h(t,r),"throw"===r.method))return O;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return O}var o=e(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,O;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=v),r.delegate=null,O):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,O)}function f(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function s(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function l(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(f,this),this.reset(!0)}function p(t){if(t){var r=t[w];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,n=function r(){for(;++e<t.length;)if(g.call(t,e))return r.value=t[e],r.done=!1,r;return r.value=v,r.done=!0,r};return n.next=n}}return{next:y}}function y(){return{value:v,done:!0}}var v,d=Object.prototype,g=d.hasOwnProperty,m="function"==typeof Symbol?Symbol:{},w=m.iterator||"@@iterator",L=m.asyncIterator||"@@asyncIterator",x=m.toStringTag||"@@toStringTag";t.wrap=r;var E="suspendedStart",b="suspendedYield",_="executing",j="completed",O={},k={};k[w]=function(){return this};var G=Object.getPrototypeOf,N=G&&G(G(p([])));N&&N!==d&&g.call(N,w)&&(k=N);var P=i.prototype=n.prototype=Object.create(k);return o.prototype=P.constructor=i,i.constructor=o,i[x]=o.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===o||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,i):(t.__proto__=i,x in t||(t[x]="GeneratorFunction")),t.prototype=Object.create(P),t},t.awrap=function(t){return{__await:t}},a(c.prototype),c.prototype[L]=function(){return this},t.AsyncIterator=c,t.async=function(e,n,o,i){var a=new c(r(e,n,o,i));return t.isGeneratorFunction(n)?a:a.next().then(function(t){return t.done?t.value:a.next()})},a(P),P[x]="Generator",P[w]=function(){return this},P.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=p,l.prototype={constructor:l,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.method="next",this.arg=v,this.tryEntries.forEach(s),!t)for(var r in this)"t"===r.charAt(0)&&g.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=v)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=v),!!n}if(this.done)throw t;for(var e=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var a=g.call(o,"catchLoc"),c=g.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&g.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?(this.method="next",this.next=o.finallyLoc,O):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),O},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),s(e),O}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;s(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:p(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=v),O}},t}("object"==typeof module?module.exports:{});try{regeneratorRuntime=runtime}catch(t){Function("r","regeneratorRuntime = r")(runtime)}},{}],33:[function(require,module,exports){(function(global){!function(t){"use strict";function n(t){t=t||"",(t instanceof URLSearchParams||t instanceof n)&&(t=t.toString()),this[l]=i(t)}function r(t){var n={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'\(\)~]|%20|%00/g,function(t){return n[t]})}function e(t){return t.replace(/[ +]/g,"%20").replace(/(%[a-f0-9]{2})+/gi,function(t){return decodeURIComponent(t)})}function o(n){var r={next:function(){var t=n.shift();return{done:void 0===t,value:t}}};return g&&(r[t.Symbol.iterator]=function(){return r}),r}function i(t){var n={};if("object"==typeof t)if(c(t))for(var r=0;r<t.length;r++){var o=t[r];if(!c(o)||2!==o.length)throw new TypeError("Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements");a(n,o[0],o[1])}else for(var i in t)t.hasOwnProperty(i)&&a(n,i,t[i]);else{0===t.indexOf("?")&&(t=t.slice(1));for(var u=t.split("&"),s=0;s<u.length;s++){var f=u[s],l=f.indexOf("=");-1<l?a(n,e(f.slice(0,l)),e(f.slice(l+1))):f&&a(n,e(f),"")}}return n}function a(t,n,r){var e="string"==typeof r?r:null!==r&&void 0!==r&&"function"==typeof r.toString?r.toString():JSON.stringify(r);n in t?t[n].push(e):t[n]=[e]}function c(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)}var u=t.URLSearchParams&&t.URLSearchParams.prototype.get?t.URLSearchParams:null,s=u&&"a=1"===new u({a:1}).toString(),f=u&&"+"===new u("s=%2B").get("s"),l="__URLSearchParams__",h=!u||function(){var t=new u;return t.append("s"," &"),"s=+%26"===t.toString()}(),p=n.prototype,g=!(!t.Symbol||!t.Symbol.iterator);if(!(u&&s&&f&&h)){p.append=function(t,n){a(this[l],t,n)},p.delete=function(t){delete this[l][t]},p.get=function(t){var n=this[l];return t in n?n[t][0]:null},p.getAll=function(t){var n=this[l];return t in n?n[t].slice(0):[]},p.has=function(t){return t in this[l]},p.set=function(t,n){this[l][t]=[""+n]},p.toString=function(){var t,n,e,o,i=this[l],a=[];for(n in i)for(e=r(n),t=0,o=i[n];t<o.length;t++)a.push(e+"="+r(o[t]));return a.join("&")};var v=!f,y=!v&&u&&!s&&t.Proxy;Object.defineProperty(t,"URLSearchParams",{value:y?new Proxy(u,{construct:function(t,r){return new t(new n(r[0]).toString())}}):n});var S=t.URLSearchParams.prototype;S.polyfill=!0,S.forEach=S.forEach||function(t,n){var r=i(this.toString());Object.getOwnPropertyNames(r).forEach(function(e){r[e].forEach(function(r){t.call(n,r,e,this)},this)},this)},S.sort=S.sort||function(){var t,n,r,e=i(this.toString()),o=[];for(t in e)o.push(t);for(o.sort(),n=0;n<o.length;n++)this.delete(o[n]);for(n=0;n<o.length;n++){var a=o[n],c=e[a];for(r=0;r<c.length;r++)this.append(a,c[r])}},S.keys=S.keys||function(){var t=[];return this.forEach(function(n,r){t.push(r)}),o(t)},S.values=S.values||function(){var t=[];return this.forEach(function(n){t.push(n)}),o(t)},S.entries=S.entries||function(){var t=[];return this.forEach(function(n,r){t.push([r,n])}),o(t)},g&&(S[t.Symbol.iterator]=S[t.Symbol.iterator]||S.entries)}}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this)}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],34:[function(require,module,exports){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}();require("regenerator-runtime"),require("es6-promise/auto"),require("url-search-params-polyfill"),require("array-from-polyfill");var _axios=require("axios"),_axios2=_interopRequireDefault(_axios),AxiosBase=function(){function e(){_classCallCheck(this,e),this.setBase()}return _createClass(e,[{key:"setBase",value:function(){this.axios=_axios2.default.create({baseURL:"http://54.168.137.34:3001/v1",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},responseType:"json"})}},{key:"getMethod",value:function(e,t){var r={timeout:1e4};return this.axios.get(e,r).then(function(e){return t(e.status,e.data)}).catch(function(e){return t(e.message,e.type,e.code)})}},{key:"postMethod",value:function(e,t){var r={timeout:1e4};return this.axios.post(e,r).then(function(e){return t(e.status,e.data)}).catch(function(e){return t(e.message,e.type,e.code)})}}]),e}();exports.default=AxiosBase},{"array-from-polyfill":2,axios:3,"es6-promise/auto":28,"regenerator-runtime":32,"url-search-params-polyfill":33}]},{},[34]);
//# sourceMappingURL=AxiosBase.js.map