/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:5000/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(6)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

module.exports = VueRouter;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

var setUp = false;

const loaded = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  if (typeof window === 'undefined') {
    // Do nothing if run from server-side
    return;
  }
  window['vueGoogleMapsInit'] = resolve;
});
/* harmony export (immutable) */ __webpack_exports__["b"] = loaded;




/**
 * @param apiKey    API Key, or object with the URL parameters. For example
 *                  to use Google Maps Premium API, pass
 *                    `{ client: <YOUR-CLIENT-ID> }`.
 *                  You may pass the libraries and/or version (as `v`) parameter into
 *                  this parameter and skip the next two parameters
 * @param version   Google for Maps version
 * @param libraries Libraries to load (@see
 *                  https://developers.google.com/maps/documentation/javascript/libraries)
 * @param loadCn    Boolean. If set to true, the map will be loaded form goole maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 *
 * Example:
 * ```
 *      import {load} from 'vue-google-maps'
 *
 *      load(<YOUR-API-KEY>)
 *
 *      load({
 *              key: <YOUR-API-KEY>,
 *      })
 *
 *      load({
 *              client: <YOUR-CLIENT-ID>,
 *              channel: <YOUR CHANNEL>
 *      })
 * ```
 */
const load = (apiKey, version, libraries, loadCn) => {
  if (typeof document === 'undefined') {
    // Do nothing if run from server-side
    return;
  }
  if (!setUp) {
    const googleMapScript = document.createElement('SCRIPT');
    const markerScript = document.createElement('SCRIPT');

    // Allow apiKey to be an object.
    // This is to support more esoteric means of loading Google Maps,
    // such as Google for business
    // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
    var options = {};
    if (typeof apiKey == 'string') {
      options.key = apiKey;
    }
    else if (typeof apiKey == 'object') {
      for (let k in apiKey) { // transfer values in apiKey to options
        options[k] = apiKey[k];
      }
    }
    else {
      throw new Error('apiKey should either be a string or an object');
    }

    // libraries
    let librariesPath = '';
    if (libraries && libraries.length > 0) {
      librariesPath = libraries.join(',');
      options['libraries'] = librariesPath;
    }
    else if (Array.prototype.isPrototypeOf(options.libraries)) {
      options.libraries = options.libraries.join(',');
    }
    options['callback'] = 'vueGoogleMapsInit';

    //let baseUrl = 'https://maps.googleapis.com/';
    let baseUrl = 'http://maps.google.cn/';

    if (typeof loadCn == 'boolean' && loadCn === true) {
      baseUrl = 'http://maps.google.cn/';
    }

    let url = baseUrl + 'maps/api/js?' +
      Object.keys(options)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(options[key]))
        .join('&');
    
      Object.keys(options)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(options[key]))
        .join('&');

    let markerurl = 'http://developers.google.cn/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';

    if (version) {
      url = url + '&v=' + version;
    }
//<script src="http://developers.google.cn/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    markerScript.setAttribute('src', markerurl);
    document.body.appendChild(markerScript);
    googleMapScript.setAttribute('src', url);
    googleMapScript.setAttribute('async', '');
    googleMapScript.setAttribute('defer', '');
    document.body.appendChild(googleMapScript);
  } else {
    throw new Error('You already started the loading of google maps');
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = load;



/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(83)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(75),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/components/common/Schedule.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Schedule.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84592bb2", Component.options)
  } else {
    hotAPI.reload("data-v-84592bb2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_config_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_plugin_GoogleMap_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_plugin_GoogleMap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_plugin_GoogleMap_vue__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return __WEBPACK_IMPORTED_MODULE_2__google_config_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "loaded", function() { return __WEBPACK_IMPORTED_MODULE_2__google_config_js__["b"]; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "GMap", function() { return __WEBPACK_IMPORTED_MODULE_4__components_plugin_GoogleMap_vue___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_common_Plan_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_common_Plan_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_common_Plan_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_Hotel_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_Hotel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_common_Hotel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_common_Food_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_common_Food_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_common_Food_vue__);





__webpack_require__(63);
__webpack_require__(26);





__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__google_config_js__["a" /* load */])('AIzaSyCVw1_JjXxdPMjZPluDqsXrVQV0AuaGRsU','v=3.exp');

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('GoogleMap', __WEBPACK_IMPORTED_MODULE_4__components_plugin_GoogleMap_vue___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_router___default.a);






const router = new __WEBPACK_IMPORTED_MODULE_3_vue_router___default.a({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: __WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue___default.a
    },
    {
      path: '/plan',
      component: __WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue___default.a, 
      props: true
    },
    {
      path: '/plan/:day',
      component: __WEBPACK_IMPORTED_MODULE_6__components_common_Plan_vue___default.a, 
      props: true
    },
    {
      path: '/hotel',
      component: __WEBPACK_IMPORTED_MODULE_7__components_common_Hotel_vue___default.a, 
      props: true
    },
    {
      path: '/food',
      component: __WEBPACK_IMPORTED_MODULE_5__components_common_Schedule_vue___default.a, 
      props: true
    },
    {
      path: '/food/:zoon',
      component: __WEBPACK_IMPORTED_MODULE_8__components_common_Food_vue___default.a, 
      props: true
    }
  ]
})

var Main = window.Main = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  router: router,
  methods: {
      init: function(){
          this.$emit('create-map');
      }
  },
  render: h => h(__WEBPACK_IMPORTED_MODULE_1__App_vue___default.a, {
      // props: {
      //   active: 'index'
      // }
  })
}).$mount('#app')

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {


console.log("common.js");

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_Schedule_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_Schedule_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_common_Schedule_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app',
    props: ['active'],
    components: {
        schedule: __WEBPACK_IMPORTED_MODULE_0__components_common_Schedule_vue___default.a
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            map: null,
            id: 'main',
            from: '東京',
            to: '京都',
            waypts: [{ location: '湘南', stopover: true }, { location: '箱根', stopover: true }, { location: '名古屋', stopover: true }],
            center: { lat: 35.7075734, lng: 139.7320827 },
            markers: [{
                loc: { lat: 35.709026, lng: 139.731992 },
                title: '東京'
            }, {
                loc: { lat: 35.352376, lng: 139.383201 },
                title: '湘南'
            }, {
                loc: { lat: 35.181446, lng: 136.906398 },
                title: '名古屋'
            }, {
                loc: { lat: 35.011636, lng: 135.768029 },
                title: '京都'
            }],
            styles: [{
                "featureType": "all",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#CDDC39"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#3a3a3a"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": "3"
                }, {
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ff0000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#000000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }],
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            zoom: 19
        };
    },
    mounted() {}
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import GoogleMap from '../plugin/GoogleMap.vue'
var restaurants = [];
restaurants['a'] = [{
  loc: { lat: 35.71867813, lng: 139.660121 },
  station: '沼袋駅',
  title: '平和苑（焼肉）',
  content: '池袋駅',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/平和苑（焼肉）.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.7236581, lng: 139.6377397 },
  station: '鷺ノ宮駅',
  title: 'みやこや',
  content: '東京都中野区鷺宮',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/みやこや.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6909603, lng: 139.6632615 },
  station: '中野富士見町站',
  title: 'ミヤザキ商店',
  content: '東京都杉並区和田1−17−９',
  open: '18：00-2：00',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/ミヤザキ商店.jpg',
  icon: 'station'
}];
restaurants['b'] = [{
  loc: { lat: 35.7437489, lng: 139.6460803 },
  station: '豊島園駅',
  title: '満天堂',
  content: '東京都練馬区練馬4-18-15',
  open: '11:30-14:00 ; 16:30-22:00 (定休日火曜日)',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/満天堂.jpg',
  icon: 'station'
}];
restaurants['c'] = [{
  loc: { lat: 35.7110048, lng: 139.7025377 },
  station: '高田馬場',
  title: '餃子莊 ムロ',
  content: '東京都新宿区高田馬場1丁目33-2',
  open: ' 17：00ー23：00',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/餃子莊ムロ.jpg',
  icon: 'station'
}];
restaurants['d'] = [{
  loc: { lat: 35.67792, lng: 139.6747974 },
  station: '幡ヶ谷駅',
  title: '居酒屋魚貞',
  content: '東京都渋谷区幡ヶ谷2−8−13「月〜土」',
  open: '11:30-13:30 ; 17:00-23:30',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/居酒屋魚貞.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6600649, lng: 139.6677612 },
  station: '下北沢駅',
  title: 'お好み焼きと鉄板焼HIROKI',
  content: '東京都世田区北沢',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/お好み焼きと鉄板焼HIROKI.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6479085, lng: 139.708367 },
  station: '恵比寿駅',
  title: 'さいき',
  content: '東京都渋谷区恵比寿西1−7−12',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/さいき.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6710086, lng: 139.7129795 },
  station: '外苑前駅',
  title: 'シャンウェイ',
  content: '東京都渋谷区神宮前3−7−５大鉄ビル２階',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/シャンウェイ.jpg',
  icon: 'station'
}];
restaurants['e'] = [{
  loc: { lat: 35.6841063, lng: 139.7825141 },
  station: '人形町駅',
  title: '天ぷら「中山」',
  content: '東京都中央区日本橋人形町1-10-8',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/天ぷら「中山」.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6664052, lng: 139.7573256 },
  station: '新橋駅',
  title: '牛かつおか田',
  content: '東京都港区新橋2-16-1ニュー新橋ビルB１F',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/牛かつおか田.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.6719523, lng: 139.7973684 },
  station: '門前仲町',
  title: 'やきとり「庄助」',
  content: '東京都江東区富岡八幡宮',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/やきとり「庄助」.jpg',
  icon: 'station'
}];
restaurants['f'] = [{
  loc: { lat: 35.693596, lng: 139.793093 },
  station: '両国駅',
  title: 'ちゃんこ割烹大内',
  content: '東京都墨田区両国2-9-６',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
  icon: 'station'
}, {
  loc: { lat: 35.697329, lng: 139.8259066 },
  station: '亀戸駅',
  title: 'ふらっとQUSUMI',
  content: '東京都江東区亀戸駅',
  open: '',
  img: '',
  icon: 'station'
}];
restaurants['g'] = [{
  loc: { lat: 35.2431092, lng: 139.0577226 },
  station: '小涌谷駅',
  title: 'いろり家',
  content: '神奈川県足柄郡箱根町宮ノ下296',
  open: '',
  img: 'http://feversoul.com/jp/src/assets/img/restaurants/いろり家.jpg',
  icon: 'station'
}];
let allRestaurants = restaurants['a'].concat(restaurants['b']).concat(restaurants['c']).concat(restaurants['d']).concat(restaurants['e']).concat(restaurants['f']).concat(restaurants['g']);
console.log(allRestaurants);
var foodMarkers = [];
var rFrom = [];
var rTo = [];
var rWaypts = [];
var rName = [];
for (var i = 0; i < restaurants['a'].length; ++i) {
  foodMarkers[i] = { loc: restaurants['a'][i]['loc'], title: restaurants['a'][i]['title'] };
  rFrom[i] = restaurants['a'][i]['station'];
  rTo[i] = restaurants['a'][i]['loc']['lat'] + ',' + restaurants['a'][i]['loc']['lng'];
  rWaypts[i] = null;
  rName[i] = restaurants['a'][i]['title'];
}
/* harmony default export */ __webpack_exports__["default"] = ({
  /* eslint-disable no-undef */
  name: "food",
  /*components: {
    'google-map': GoogleMap
  },*/
  props: ['zoon'],
  data() {
    return {
      restaurants: restaurants[this.zoon],
      id: 99,
      idName: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq'],
      center: { lat: 35.695000, lng: 139.730000 },
      from: '東京',
      to: '京都',
      waypts: [{ location: '湘南', stopover: true }, { location: '箱根', stopover: true }, { location: '名古屋', stopover: true }],
      markers: restaurants[this.zoon].map(x => {
        return { loc: x['loc'], title: x['title'] };
      }),
      rfrom: restaurants[this.zoon].map(x => {
        return x['station'];
      }),
      rto: restaurants[this.zoon].map(x => {
        return x['loc']['lat'] + ',' + x['loc']['lng'];
      }),
      rwaypts: restaurants[this.zoon].map(x => {
        return null;
      }),
      mainMarker: allRestaurants.map(x => {
        return { loc: x['loc'], title: x['title'] };
      }),
      icon: 'food',
      styles: [{
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }, {
          "visibility": "on"
        }, {
          "weight": 1.2
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3a3a3a"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "visibility": "on"
        }, {
          "weight": "3"
        }]
      }, {
        "featureType": "administrative.province",
        "stylers": [{
          "color": "#CDDC39"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "road",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
          "saturation": -75
        }, {
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [{
          "color": "#ff8000"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#800040"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [{
          "color": "#ff8000"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#800000"
        }]
      }, {
        "featureType": "water",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }],
      backgroundColor: 'hsla(0, 0%, 0%, 0)',
      zoom: 12
    };
  },
  beforeCreate() {
    if ($('.plan-back').length > 0) {
      $('.plan-back').remove();
    }
    if ($('.schedule-map').length > 0) {
      $('.schedule-map').remove();
    }
    if ($('html').hasClass('fp-enabled')) {
      $.fn.fullpage.destroy('all');
    }
  },
  destroyed() {},
  created() {},
  mounted() {
    $('#food').fullpage({
      menu: '#menu',
      scrollingSpeed: 1000,
      navigation: true,
      scrollOverflow: true,
      navigationPosition: 'right',
      normalScrollElements: '.normal-scroll',
      afterLoad: function (anchorLink, index) {
        var loadedSection = $(this);
        console.log(index);
        //using index
        //console.log($('.mapcard-item.active').data('bgimg'))
        //$('body').css('background','linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)), url('+ $('.hotels-item.active').data('bgimg')+')');
      }
    });
    $.fn.fullpage.reBuild();
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import GoogleMap from '../plugin/GoogleMap.vue'
var hotels = [{
    loc: { lat: 35.7242355, lng: 139.8211222 },
    station: { lat: 35.7243000, lng: 139.819456 },
    title: '墨田民宿',
    icon: 'info',
    stationPoint: 'stationPoint',
    bgimg: 'http://feversoul.com/jp/src/assets/img/banner/skytree.jpg',
    photos: ['https://a0.muscache.com/im/pictures/ca9f1d9a-fba6-4104-8030-591949f59bcd.jpg?aki_policy=xx_large', 'https://a0.muscache.com/im/pictures/3c190b8f-2bce-4470-8740-d7d8e1c4b0c6.jpg?aki_policy=x_large', 'https://a0.muscache.com/im/pictures/9b5dd9b5-3b91-49b9-900a-242963cc2aed.jpg?aki_policy=x_large', 'https://a0.muscache.com/im/pictures/d82357f9-e780-46e7-8af2-3136938b5a5d.jpg?aki_policy=x_large']
}, {
    loc: { lat: 35.308176, lng: 139.492449 },
    station: { lat: 35.308294, lng: 139.4931566 },
    title: 'AS ONE STYLE IN 湘南',
    icon: 'info',
    stationPoint: 'stationPoint',
    bgimg: 'http://feversoul.com/jp/src/assets/img/banner/kamakuraroad.jpg',
    photos: ['https://pix6.agoda.net/hotelImages/161/1615512/1615512_16112200560048954440.jpg?s=1024x768', 'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511420048724555.jpg?s=1024x768', 'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511410048724525.jpg?s=1024x768', 'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511420048724557.jpg?s=1024x768']
}, {
    loc: { lat: 35.248006, lng: 139.046124 },
    station: { lat: 35.250714, lng: 139.048215 },
    title: 'メルヴェール箱根強羅',
    icon: 'info',
    stationPoint: 'stationPoint',
    bgimg: 'http://feversoul.com/jp/src/assets/img/banner/箱根.jpg',
    photos: ['https://tabiiro.jp/lpimg/yado/100933/guestroom/img2.jpg', 'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831902.jpg', 'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831AD5.jpg', 'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831883.jpg']
}, {
    loc: { lat: 35.171230, lng: 136.907094 },
    station: { lat: 35.170436, lng: 136.908821 },
    title: '名古屋特拉斯蒂酒店',
    icon: 'info',
    stationPoint: 'stationPoint',
    bgimg: 'https://www.tokyuhotelsjapan.com/zh-tw/cm_pg_bridge/1416072672389/main3/457/877/[%E7%B9%81]R%20%E5%90%8D%E5%8F%A4%E5%B1%8B%E6%A0%84.jpg',
    photos: ['https://r-ak.bstatic.com/images/hotel/max1024x768/130/13016644.jpg', 'https://r-ak.bstatic.com/images/hotel/max1024x768/130/13016660.jpg', 'https://r-ak.bstatic.com/images/hotel/max1024x768/130/13015849.jpg', 'https://r-ak.bstatic.com/images/hotel/max1024x768/130/13015977.jpg']
}, {
    loc: { lat: 34.981091, lng: 135.817508 },
    station: { lat: 34.981626, lng: 135.816595 },
    title: '東野民宿',
    stationPoint: 'stationPoint',
    bgimg: 'http://feversoul.com/jp/src/assets/img/banner/京都.jpg',
    photos: ['https://a0.muscache.com/im/pictures/ca12e056-6e16-41d4-8fa7-7aa652754198.jpg?aki_policy=x_large', 'https://a0.muscache.com/im/pictures/98234dd4-1eb4-414c-b572-a1a4038b7621.jpg?aki_policy=x_large', 'https://a0.muscache.com/im/pictures/cf534f1d-84a0-439a-8dd9-dc09eb163bb8.jpg?aki_policy=x_large', 'https://a0.muscache.com/im/pictures/317832f7-e7be-417f-86ad-97095cd379a6.jpg?aki_policy=x_large']
}];
var a = { name: 'a' };
var b = { name: 'b' };
var c = { name: 'c' };
var d = { name: 'd' };
/* harmony default export */ __webpack_exports__["default"] = ({
    name: "content-mapcard",
    data() {
        return {
            //vue style
            photoItemStyle: {
                width: '200px',
                height: '200px'
            },
            //map prop
            hotels: hotels,
            map: [a, b, c, d],
            from: [hotels[0]['station']['lat'] + ',' + hotels[0]['station']['lng'], hotels[1]['station']['lat'] + ',' + hotels[1]['station']['lng'], hotels[2]['station']['lat'] + ',' + hotels[2]['station']['lng'], hotels[3]['station']['lat'] + ',' + hotels[3]['station']['lng']],
            to: [hotels[0]['loc']['lat'] + ',' + hotels[0]['loc']['lng'], hotels[1]['loc']['lat'] + ',' + hotels[1]['loc']['lng'], hotels[2]['loc']['lat'] + ',' + hotels[2]['loc']['lng'], hotels[3]['loc']['lat'] + ',' + hotels[3]['loc']['lng']],
            waypts: [null, [{ location: '35.307923,139.492670', stopover: true }], null, null],
            center: { lat: 35.7075734, lng: 139.7320827 },
            markers: [[{
                loc: hotels[0]['loc'],
                title: '酒店'
            }, {
                loc: hotels[0]['station'],
                title: '車站'
            }], [{
                loc: hotels[1]['loc'],
                title: '酒店'
            }, {
                loc: hotels[1]['station'],
                title: '車站'
            }], [{
                loc: hotels[2]['loc'],
                title: '酒店'
            }, {
                loc: hotels[2]['station'],
                title: '車站'
            }], [{
                loc: hotels[3]['loc'],
                title: '酒店'
            }, {
                loc: hotels[3]['station'],
                title: '車站'
            }]],
            styles: [{
                "featureType": "all",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#CDDC39"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#3a3a3a"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": "3"
                }, {
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ff0000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#000000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }],
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            zoom: 17
        };
    },
    beforeCreate() {
        if ($('.plan-back').length > 0) {
            $('.plan-back').remove();
        }
        if ($('.schedule-map').length > 0) {
            $('.schedule-map').remove();
        }
        if ($('html').hasClass('fp-enabled')) {
            $.fn.fullpage.destroy('all');
        }
    },
    created() {},
    beforeDestroy() {},
    destroyed() {},
    mounted() {
        $('#mapcard').fullpage({
            menu: '#menu',
            scrollingSpeed: 1000,
            navigation: true,
            navigationPosition: 'right',
            scrollOverflow: true,
            navigationTooltips: ['東京', '湘南', '箱根', '京都'],
            normalScrollElements: '.normal-scroll',
            afterLoad: function (anchorLink, index) {
                var loadedSection = $(this);
                //console.log(index);
                //using index
                //console.log($('.mapcard-item.active').data('bgimg'))
                //$('body').css('background','linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)), url('+ $('.hotels-item.active').data('bgimg')+')');
            }
        });
        $.fn.fullpage.reBuild();
    }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import GoogleMap from '../plugin/GoogleMap.vue'

var restaurants = [{
    loc: { lat: 35.7110048, lng: 139.7025377 },
    station: '高田馬場',
    title: '餃子莊 ムロ',
    content: '東京都新宿区高田馬場1丁目33-2',
    open: ' 17：00ー23：00',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/餃子莊ムロ.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.67792, lng: 139.6747974 },
    station: '幡ヶ谷駅',
    title: '居酒屋魚貞',
    content: '東京都渋谷区幡ヶ谷2−8−13「月〜土」',
    open: '11:30-13:30 ; 17:00-23:30',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/居酒屋魚貞.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.7437489, lng: 139.6460803 },
    station: '豊島園駅',
    title: '満天堂',
    content: '東京都練馬区練馬4-18-15',
    open: '11:30-14:00 ; 16:30-22:00 (定休日火曜日)',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/満天堂.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6909603, lng: 139.6632615 },
    station: '中野富士見町站',
    title: 'ミヤザキ商店',
    content: '東京都杉並区和田1−17−９',
    open: '18：00-2：00',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/ミヤザキ商店.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6719523, lng: 139.7973684 },
    station: '門前仲町',
    title: 'やきとり「庄助」',
    content: '東京都江東区富岡八幡宮',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/やきとり「庄助」.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.7236581, lng: 139.6377397 },
    station: '鷺ノ宮駅',
    title: 'みやこや',
    content: '東京都中野区鷺宮',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/みやこや.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6600649, lng: 139.6677612 },
    station: '下北沢駅',
    title: 'お好み焼きと鉄板焼HIROKI',
    content: '東京都世田区北沢',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/お好み焼きと鉄板焼HIROKI.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6841063, lng: 139.7825141 },
    station: '人形町駅',
    title: '天ぷら「中山」',
    content: '東京都中央区日本橋人形町1-10-8',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/天ぷら「中山」.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.71867813, lng: 139.660121 },
    station: '沼袋駅',
    title: '平和苑（焼肉）',
    content: '沼袋駅',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/平和苑（焼肉）.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.693596, lng: 139.793093 },
    station: '両国駅',
    title: 'ちゃんこ割烹大内',
    content: '東京都墨田区両国2-9-６',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.2431092, lng: 139.0577226 },
    station: '小涌谷駅',
    title: 'いろり家',
    content: '神奈川県足柄郡箱根町宮ノ下296',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/いろり家.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6710086, lng: 139.7129795 },
    station: '外苑前駅',
    title: 'シャンウェイ',
    content: '東京都渋谷区神宮前3−7−５大鉄ビル２階',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/シャンウェイ.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.6479085, lng: 139.708367 },
    station: '恵比寿駅',
    title: 'さいき居酒屋',
    content: '東京都渋谷区恵比寿西1−7−12',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/さいき.jpg',
    icon: 'station'
}, {
    loc: { lat: 35.697329, lng: 139.8259066 },
    station: '亀戸駅',
    title: 'ふらっとQUSUMI',
    content: '東京都江東区亀戸駅',
    open: '',
    img: '',
    icon: 'station'
}, {
    loc: { lat: 35.6664052, lng: 139.7573256 },
    station: '新橋駅',
    title: '牛かつおか田',
    content: '東京都港区新橋2-16-1ニュー新橋ビルB１F',
    open: '',
    img: 'http://feversoul.com/jp/src/assets/img/restaurants/牛かつおか田.jpg',
    icon: 'station'
}];
var plans = [{
    title: "Day 1 東京都 - 淺草、上野",
    from: '35.7242355,139.8211222',
    to: '晴空塔',
    waypts: [{ location: '35.7243000,139.819456', stopover: true }, { location: '35.712487,139.803965', stopover: true }],
    markers: [{ loc: { lat: 35.7242355, lng: 139.8211222 }, title: 'BNB' }, { loc: { lat: 35.7243000, lng: 139.819456 }, title: '車站' }, { loc: { lat: 35.712487, lng: 139.803965 }, title: '隅田川公園' }, { loc: { lat: 35.710063, lng: 139.810700 }, title: '晴空塔' }],
    bgimg: 'http://feversoul.com/jp/src/assets/img/banner/skytree2.jpg'
}, {
    title: "Day 2 東京都 - 築地、台場、",
    from: '35.674890,139.759605',
    to: '35.624718,139.781184',
    waypts: [{ location: '35.671839,139.755146', stopover: true }, { location: '35.664880,139.762487', stopover: true }, { location: '35.665486,139.770667', stopover: true }, { location: '35.662613,139.780453', stopover: true }, { location: '35.627843,139.771823', stopover: true }, { location: '35.625122,139.775450', stopover: true }, { location: '35.615491,139.777509', stopover: true }],
    markers: [{ loc: { lat: 35.674890, lng: 139.759605 }, name: '日比谷駅' }, { loc: { lat: 35.671839, lng: 139.755146 }, name: '日比谷公園' }, { loc: { lat: 35.664880, lng: 139.762487 }, name: 'Caretta 46F' }, { loc: { lat: 35.665486, lng: 139.770667 }, name: '築地市場' }, { loc: { lat: 35.662613, lng: 139.780453 }, name: '月島駅' }, { loc: { lat: 35.627843, lng: 139.771823 }, name: '台場自由女神' }, { loc: { lat: 35.625122, lng: 139.775450 }, name: '台場高達' }, { loc: { lat: 35.615491, lng: 139.777509 }, name: '大江戶溫泉物語' }, { loc: { lat: 35.624718, lng: 139.781184 }, name: '青海駅' }],
    bgimg: 'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
}, {
    title: "Day 3 東京都 - 千葉GameShow - 秋葉原 ",
    from: '35.7243000,139.819456',
    to: '35.7243000,139.819456',
    waypts: [{ location: '35.648190,140.041920', stopover: true }, { location: '35.647451,140.035231', stopover: true }, { location: '35.652932,140.043397', stopover: true }, { location: '35.673104,139.795040', stopover: true }, { location: '35.6719523,139.7973684', stopover: true }, { location: '35.683663,139.785063', stopover: true }, { location: '35.6841063,139.7825141', stopover: true }, { location: '35.698218,139.772884', stopover: true }, { location: '35.698713,139.774761', stopover: true }, { location: '35.697270,139.770080', stopover: true }, { location: '35.699958,139.770191', stopover: true }, { location: '35.701078,139.772879', stopover: true }, { location: '35.703280,139.774108', stopover: true }, { location: '35.693596,139.793093', stopover: true }],
    markers: [{ loc: { lat: 35.7243000, lng: 139.819456 }, name: 'BNB' }, { loc: { lat: 35.648190, lng: 140.041920 }, name: '幕張駅' }, { loc: { lat: 35.647451, lng: 140.035231 }, name: '日本千葉幕張展覽館' }, { loc: { lat: 35.652932, lng: 140.043397 }, name: '千葉IBM附近小餐館', icon: 'food' }, { loc: { lat: 35.673104, lng: 139.795040 }, name: '門前仲町' }, { loc: { lat: 35.6719523, lng: 139.7973684 }, name: 'やきとり「庄助」', icon: 'food' }, { loc: { lat: 35.683663, lng: 139.785063 }, name: '天水宮' }, { loc: { lat: 35.6841063, lng: 139.7825141 }, name: '天ぷら「中山」', icon: 'food' }, { loc: { lat: 35.698218, lng: 139.772884 }, name: '秋葉原駅' }, { loc: { lat: 35.697270, lng: 139.770080 }, name: '神田万世橋' }, { loc: { lat: 35.699958, lng: 139.770191 }, name: '秋葉原電器街' }, { loc: { lat: 35.701078, lng: 139.772879 }, name: '秋葉原UDX' }, { loc: { lat: 35.703280, lng: 139.774108 }, name: '2k540 AKI-OKA ARTISAN' }, { loc: { lat: 35.698713, lng: 139.774761 }, name: 'Yodobashi Akiba' }, { loc: { lat: 35.693596, lng: 139.793093 }, name: 'ちゃんこ割烹大内', icon: 'food' }],
    bgimg: 'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
}, {
    title: "Day 4 三鷹、練馬區、中野區、新宿",
    from: '35.7243000,139.819456',
    to: '35.7243000,139.819456',
    waypts: [{ location: '35.742090,139.649190', stopover: true }, { location: '35.7437489,139.6460803', stopover: true }, { location: '35.696238,139.570432', stopover: true }, { location: '35.722620,139.639886', stopover: true }, { location: '35.7236581,139.6377397', stopover: true }, { location: '35.709636,139.665672', stopover: true }, { location: '35.71867813,139.660121', stopover: true }, { location: '35.719149,139.664801', stopover: true }, { location: '35.728813,139.720004', stopover: true }, { location: '35.729281,139.715974', stopover: true }, { location: '35.7110048,139.7025377', stopover: true }],
    markers: [{ loc: { lat: 35.7243000, lng: 139.819456 }, name: 'BNB' }, { loc: { lat: 35.742090, lng: 139.649190 }, name: '豊島園駅' }, { loc: { lat: 35.7437489, lng: 139.6460803 }, name: '満天堂', icon: 'food' }, { loc: { lat: 35.696238, lng: 139.570432 }, name: '吉卜力美術館' }, { loc: { lat: 35.722620, lng: 139.639886 }, name: '鷺ノ宮駅' }, { loc: { lat: 35.7236581, lng: 139.6377397 }, name: 'みやこや', icon: 'food' }, { loc: { lat: 35.709636, lng: 139.665672 }, name: 'Nakano Broadway 玩具街' }, { loc: { lat: 35.71867813, lng: 139.660121 }, name: '平和苑（焼肉）', icon: 'food' }, { loc: { lat: 35.719149, lng: 139.664801 }, name: '沼袋駅' }, { loc: { lat: 35.728813, lng: 139.720004 }, name: 'J-WORLD TOKYO' }, { loc: { lat: 35.729281, lng: 139.715974 }, name: '貓咪的休憩所299' }, { loc: { lat: 35.7110048, lng: 139.7025377 }, name: '餃子莊 ムロ', icon: 'food' }],
    bgimg: 'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
}, {
    title: "Day 5 澀谷、目黑、君の名は",
    from: '35.647156,139.709739',
    to: '35.670399,139.717826',
    waypts: [{ location: '35.6479085,139.708367', stopover: true }, { location: '35.644288,139.699096', stopover: true }, { location: '35.609208,139.669361', stopover: true }, { location: '35.6600649,139.6677612', stopover: true }, { location: '35.661252,139.696393', stopover: true }, { location: '35.67792,139.6747974', stopover: true }, { location: '35.6909603,139.6632615', stopover: true }, { location: '35.686564,139.725334', stopover: true }, { location: '35.682154,139.733970', stopover: true }, { location: '35.680060,139.720320', stopover: true }, { location: '35.6710086,139.7129795', stopover: true }],
    markers: [{ loc: { lat: 35.670399, lng: 139.717826 }, name: '外苑前駅' }, { loc: { lat: 35.647156, lng: 139.709739 }, name: '恵比寿駅' }, { loc: { lat: 35.6479085, lng: 139.708367 }, name: 'さいき', icon: 'food' }, { loc: { lat: 35.644288, lng: 139.699096 }, name: '中目黑' }, { loc: { lat: 35.609208, lng: 139.669361 }, name: '自由之丘' }, { loc: { lat: 35.6600649, lng: 139.6677612 }, name: 'お好み焼きと鉄板焼HIROKI', icon: 'food' }, { loc: { lat: 35.661252, lng: 139.696393 }, name: '澀谷101' }, { loc: { lat: 35.67792, lng: 139.6747974 }, name: '居酒屋魚貞', icon: 'food' }, { loc: { lat: 35.6909603, lng: 139.6632615 }, name: 'ミヤザキ商店', icon: 'food' }, { loc: { lat: 35.686564, lng: 139.725334 }, name: '四谷二丁目(君の名は)' }, { loc: { lat: 35.682154, lng: 139.733970 }, name: '須賀神社(君の名は)' }, { loc: { lat: 35.680060, lng: 139.720320 }, name: '信濃町站(君の名は)' }, { loc: { lat: 35.6710086, lng: 139.7129795 }, name: 'シャンウェイ', icon: 'food' }],
    bgimg: 'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
}];
for (var i = 0; i < restaurants.length; ++i) {
    for (var p = 0; p < plans.length; ++p) {
        //plans[p]['markers'].push({loc:restaurants[i]['loc'],title:restaurants[i]['title'],icon:'food',content:restaurants[i]['content']});
    }
}
var a = { name: 'a' };
var b = { name: 'b' };
var c = { name: 'c' };
var d = { name: 'd' };
/* harmony default export */ __webpack_exports__["default"] = ({
    name: "plans-container",
    props: ['day'],
    data() {
        return {
            plans: plans,
            //vue style
            photoItemStyle: {
                width: '200px',
                height: '200px'
            },
            //map prop
            map: [a, b, c, d],
            waypts: plans[0]['waypts'],
            center: { lat: 35.7075734, lng: 139.7320827 },
            markers: plans[0]['markers'],
            styles: [{
                "featureType": "all",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#CDDC39"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#3a3a3a"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": "3"
                }, {
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 1
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#000000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ff0000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#000000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }],
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            zoom: 17
        };
    },
    beforeCreate() {
        if ($('.plan-back').length > 0) {
            $('.plan-back').remove();
        }
        if ($('.schedule-map').length > 0) {
            $('.schedule-map').remove();
        }
        if ($('html').hasClass('fp-enabled')) {
            $.fn.fullpage.destroy('all');
        }
    },
    created() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
        makeItRain() {
            //clear out everything
            $('.rain').empty();

            var increment = 0;
            var drops = "";
            var backDrops = "";

            while (increment < 100) {
                //couple random numbers to use for various randomizations
                //random number between 98 and 1
                var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
                //random number between 5 and 2
                var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
                //increment
                increment += randoFiver;
                //add in a new raindrop with various randomizations to certain CSS properties
                drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
                backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
            }

            $('.rain.front-row').append(drops);
            $('.rain.back-row').append(backDrops);
        },
        goDown() {
            $.fn.fullpage.moveSectionDown();
        }
    },
    mounted() {
        $('#plans-item').fullpage({
            menu: '#menu',
            scrollingSpeed: 1000,
            navigation: true,
            scrollOverflow: true,
            navigationPosition: 'right',
            fixedElements: '.plan-back',
            normalScrollElements: '.plans-map',
            afterLoad: function (anchorLink, index) {
                var loadedSection = $(this);
                console.log(index);
            }
        });
        $.fn.fullpage.reBuild();
    }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import GoogleMap from '../plugin/GoogleMap.vue'
/* harmony default export */ __webpack_exports__["default"] = ({
  /* eslint-disable no-undef */
  name: "schedule",
  /*components: {
    'google-map': GoogleMap
  },*/
  data() {
    return {
      id: 0,
      from: '東京',
      to: '京都',
      waypts: [{ location: '湘南', stopover: true }, { location: '箱根', stopover: true }, { location: '名古屋', stopover: true }],
      center: { lat: 35.10000, lng: 138.10000 },
      markers: [{
        loc: { lat: 35.709026, lng: 139.731992 },
        title: '東京'
      }, {
        loc: { lat: 35.352376, lng: 139.383201 },
        title: '湘南'
      }, {
        loc: { lat: 35.250817, lng: 139.047959 },
        title: '箱根'
      }, {
        loc: { lat: 35.181446, lng: 136.906398 },
        title: '名古屋'
      }, {
        loc: { lat: 35.011636, lng: 135.768029 },
        title: '京都'
      }],
      backgroundColor: 'hsla(0, 0%, 0%, 0)',
      zoom: 19,
      mapRotate: -30,
      windowWidth: 0,
      windowHeight: 0,
      panTo: null
    };
  },
  beforeCreate() {
    if ($('.plan-back').length > 0) {
      $('.plan-back').remove();
    }
    if ($('html').hasClass('fp-enabled')) {
      $.fn.fullpage.destroy('all');
    }
  },
  destroyed() {},
  methods: {
    getWindowSize(event) {
      console.log('a');
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
      this.mapRotate = document.documentElement.clientWidth / document.documentElement.clientHeight * 90 - 20;
    },
    setPanTo(index) {
      console.log(index);
      var pan = [0, 0, 0, 0, 0, 1, 2, 3, 4, 4];
      if (index > 1) {
        this.panTo = { location: this.markers[pan[index]]['loc'] };
      } else {
        this.panTo = { location: this.center };
      }
    }
  },
  mounted() {
    //window.addEventListener('resize', this.getWindowSize);
    var self = this;
    $('#schedule').fullpage({
      menu: '#menu',
      scrollingSpeed: 1000,
      scrollOverflow: true,
      navigation: true,
      normalScrollElements: '.normal-scroll',
      fixedElements: '.schedule-map',
      afterLoad: function (anchorLink, index) {
        var loadedSection = $(this);
        self.setPanTo(index);
      }
    });
    $.fn.fullpage.reBuild();
    var LeafScene = function (el) {
      this.viewport = el;
      this.world = document.createElement('div');
      this.leaves = [];

      this.options = {
        numLeaves: 20,
        wind: {
          magnitude: 1.2,
          maxSpeed: 6,
          duration: 300,
          start: 0,
          speed: 0
        }
      };

      this.width = this.viewport.offsetWidth;
      this.height = this.viewport.offsetHeight;

      // animation helper
      this.timer = 0;

      this._resetLeaf = function (leaf) {

        // place leaf towards the top left
        leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
        leaf.y = -10;
        leaf.z = Math.random() * 200;
        if (leaf.x > this.width) {
          leaf.x = this.width + 10;
          leaf.y = Math.random() * this.height / 2;
        }
        // at the start, the leaf can be anywhere
        if (this.timer == 0) {
          leaf.y = Math.random() * this.height;
        }

        // Choose axis of rotation.
        // If axis is not X, chose a random static x-rotation for greater variability
        leaf.rotation.speed = Math.random() * 10;
        var randomAxis = Math.random();
        if (randomAxis > 0.5) {
          leaf.rotation.axis = 'X';
        } else if (randomAxis > 0.25) {
          leaf.rotation.axis = 'Y';
          leaf.rotation.x = Math.random() * 180 + 90;
        } else {
          leaf.rotation.axis = 'Z';
          leaf.rotation.x = Math.random() * 360 - 180;
          // looks weird if the rotation is too fast around this axis
          leaf.rotation.speed = Math.random() * 3;
        }

        // random speed
        leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
        leaf.ySpeed = Math.random() + 1.5;

        return leaf;
      };

      this._updateLeaf = function (leaf) {
        var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);

        var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
        leaf.x -= xSpeed;
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
        if (leaf.rotation.axis !== 'X') {
          t += ' rotateX(' + leaf.rotation.x + 'deg)';
        }
        leaf.el.style.webkitTransform = t;
        leaf.el.style.MozTransform = t;
        leaf.el.style.oTransform = t;
        leaf.el.style.transform = t;

        // reset if out of view
        if (leaf.x < -10 || leaf.y > this.height + 10) {
          this._resetLeaf(leaf);
        }
      };

      this._updateWind = function () {
        // wind follows a sine curve: asin(b*time + c) + a
        // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
        // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

        if (this.timer === 0 || this.timer > this.options.wind.start + this.options.wind.duration) {

          this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
          this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
          this.options.wind.start = this.timer;

          var screenHeight = this.height;

          this.options.wind.speed = function (t, y) {
            // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
            var a = this.magnitude / 2 * (screenHeight - 2 * y / 3) / screenHeight;
            return a * Math.sin(2 * Math.PI / this.duration * t + 3 * Math.PI / 2) + a;
          };
        }
      };
    };

    LeafScene.prototype.init = function () {

      for (var i = 0; i < this.options.numLeaves; i++) {
        var leaf = {
          el: document.createElement('div'),
          x: 0,
          y: 0,
          z: 0,
          rotation: {
            axis: 'X',
            value: 0,
            speed: 0,
            x: 0
          },
          xSpeedVariation: 0,
          ySpeed: 0,
          path: {
            type: 1,
            start: 0

          },
          image: 1
        };
        this._resetLeaf(leaf);
        this.leaves.push(leaf);
        this.world.appendChild(leaf.el);
      }

      this.world.className = 'leaf-scene';
      this.viewport.appendChild(this.world);

      // set perspective
      this.world.style.webkitPerspective = "400px";
      this.world.style.MozPerspective = "400px";
      this.world.style.oPerspective = "400px";
      this.world.style.perspective = "400px";

      // reset window height/width on resize
      var self = this;
    };

    LeafScene.prototype.render = function () {
      this._updateWind();
      for (var i = 0; i < this.leaves.length; i++) {
        this._updateLeaf(this.leaves[i]);
      }

      this.timer++;

      requestAnimationFrame(this.render.bind(this));
    };

    // start up leaf scene
    var leafContainer = document.querySelector('.falling-leaves'),
        leaves = new LeafScene(leafContainer);

    leaves.init();
    leaves.render();
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__google_config_js__ = __webpack_require__(10);
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        id: 0,
        center: {
            type: Object,
            default: null
        },
        from: {
            type: String,
            default: null
        },
        to: {
            type: String,
            default: null
        },
        markers: {
            type: Array,
            default: null
        },
        icon: {
            type: String,
            default: 'point'
        },
        styles: {
            type: Array,
            default: [{
                "featureType": "all",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#CDDC39"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#3a3a3a"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": "3"
                }, {
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ff0000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#000000"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }]
        },
        waypts: {
            type: Array,
            default: null
        },
        drections: {
            type: Object,
            default: null
        },
        backgroundColor: {
            type: String,
            default: 'hsla(0, 0%, 0%, 0)'
        },
        zoom: {
            type: Number,
            default: 19
        },
        travelMode: {
            type: String,
            default: 'WALKING'
        },
        preViewport: {
            type: String,
            default: null
        },
        panTo: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            mapMarker: {
                type: Object,
                default: null
            },
            infowindow: [],
            map: [],
            directionsDisplay: [],
            directionsService: []
        };
    },
    created: function () {
        return __WEBPACK_IMPORTED_MODULE_0__google_config_js__["b" /* loaded */].then(() => {
            // getting the DOM element where to create the map
            var icons = {
                point: {
                    icon: 'http://feversoul.com/jp/src/assets/img/maps-and-flags.svg'
                },
                food: {
                    icon: 'http://feversoul.com/jp/src/assets/img/sushi-c.svg'
                },
                stationB: {
                    icon: 'http://feversoul.com/jp/src/assets/img/placeholder_b.svg'
                },
                stationPoint: {
                    icon: 'http://feversoul.com/jp/src/assets/img/bus.svg'
                }
            };
            this.map = new google.maps.Map(document.getElementById('map-' + this.id), {
                center: this.center,
                zoom: this.zoom,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: false,
                scaleControl: true,
                styles: this.styles,
                backgroundColor: this.backgroundColor,
                mapTypeControlOptions: {
                    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
                }
            });
            this.infowindow = new google.maps.InfoWindow();
            if (this.markers) {
                for (var i = 0; i < this.markers.length; ++i) {
                    this.mapMarker[i] = new google.maps.Marker({
                        position: this.markers[i]['loc'],
                        // label: {
                        //   text:this.markers[i]['title'],
                        //   color:'#ee4d4d'
                        // },
                        icon: {
                            url: icons[this.markers[i]['icon'] ? this.markers[i]['icon'] : this.icon].icon,
                            scaledSize: new google.maps.Size(30, 30),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(15, 30),
                            labelOrigin: new google.maps.Point(40, 33)
                        },
                        map: this.map
                    });
                    if (this.markers[i]['name']) {
                        var msg;
                        if (this.markers[i]['content']) {
                            msg = this.markers[i]['name'] + '<br/>' + this.markers[i]['content'];
                        } else {
                            msg = this.markers[i]['name'];
                        }
                        this.attachSecretMessage(this.mapMarker[i], msg, this.infowindow);
                    }
                }
            }
            console.log(this.panTo);
            if (this.panTo) {
                placeMarkerAndPanTo(this.panTo['location'], this.map);
            }
            if (this.from) {
                this.directionsDisplay = new google.maps.DirectionsRenderer();
                this.directionsDisplay.setMap(this.map);
                this.directionsDisplay.setOptions({ suppressMarkers: true });
                this.directionsService = new google.maps.DirectionsService();
                this.calcRoute(this.from, this.to, this.waypts, this.directionsDisplay, this.directionsService, this.travelMode, this.preViewport);
            }
        });
    },
    watch: {
        // 如果 question 发生改变，这个函数就会运行
        panTo: function () {
            this.placeMarkerAndPanTo(this.panTo['location'], this.map);
        }
    },
    methods: {
        placeMarkerAndPanTo(latLng, map) {
            console.log(latLng);
            map.panTo(latLng);
        },
        calcRoute: function (from, to, waypts, directionsDisplay, directionsService, travelMode, preViewport) {
            var start = from;
            var end = to;
            var waypts = waypts;
            // var checkboxArray = document.getElementById('waypoints');
            // for (var i = 0; i < checkboxArray.length; i++) {
            //   if (checkboxArray.options[i].selected == true) {
            //     waypts.push({
            //         location:checkboxArray[i].value,
            //         stopover:true});
            //   }
            // }
            var request = {
                origin: start,
                destination: end,
                waypoints: waypts,
                optimizeWaypoints: false,
                travelMode: travelMode
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    if (preViewport) {
                        directionsDisplay.setOptions({ preserveViewport: true });
                    }
                    directionsDisplay.setDirections(response);
                    var route = response.routes[0];
                    //var summaryPanel = document.getElementById('directions_panel');
                    //summaryPanel.innerHTML = '';
                    // For each route, display summary information.
                    /*for (var i = 0; i < route.legs.length; i++) {
                      var routeSegment = i + 1;
                      summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                      summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                      summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                      summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    }*/
                }
            });
        },
        attachSecretMessage: function (marker, secretMessage, infowindow) {
            marker.addListener('click', function () {
                console.log(infowindow);
                infowindow.setContent(secretMessage);
                infowindow.open(marker.get('map'), marker);
            });
        }
    }
});

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.plan-back-icon {\n  position: fixed;\n  top: 60px;\n  right: 30px;\n  color: #ee4d4d;\n  opacity: .9;\n  height: 32px;\n  width: 32px;\n  background: #fff;\n  border-radius: 50%;\n  text-align: center;\n  padding-top: 6px;\n  border: 2px solid #ee4d4d;\n}\n.plan-back-icon .fa {\n    font-size: 28px;\n}\n.plans .section .plans-map {\n  width: 100vw;\n  height: calc(100vh - 100px);\n  overflow-y: hidden;\n}\n.plans .inner-section {\n  padding: 30px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 960px;\n  width: 80%;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.5);\n}\n.plans .inner-section .plans-content .h5 {\n    margin-top: 20px;\n    margin-bottom: 20px;\n}\n#plans-container {\n  height: 100%;\n  margin: 0;\n  overflow: hidden;\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(\"https://farm4.staticflickr.com/3756/14312253575_5220fbdbdc_h.jpg\");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: bottom;\n}\n", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.map {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.map-container #map {\n  position: relative;\n}\n.map-container #map:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-image: -webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n    background-image: -moz-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n    background-image: -ms-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n    background-image: repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);\n    -webkit-background-size: 3px 3px;\n    -moz-background-size: 3px 3px;\n    background-size: 3px 3px;\n}\n#content-mapcard .mapcard-item .inner-section {\n  max-width: 1024px;\n  width: 90%;\n  margin: 0 auto;\n}\n#content-mapcard .mapcard-item .inner-section:before {\n    content: '';\n    display: block;\n    width: 100%;\n    height: 100px;\n}\n#content-mapcard .mapcard-item .inner-section:after {\n    content: '';\n    display: block;\n    width: 100%;\n    height: 100px;\n}\n#content-mapcard .rs-img-bg {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n#content-mapcard .div-circle {\n  border-radius: 50%;\n  overflow: hidden;\n}\n.photos-gallery .floating {\n  animation-name: floating;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n  margin-top: 5px;\n}\n@keyframes floating {\nfrom {\n    transform: translate(0, 0px);\n}\n65% {\n    transform: translate(15px, 15px);\n}\nto {\n    transform: translate(0px, 0px);\n}\n}\n", ""]);

// exports


/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n#home-bg-map:before {\n  content: '';\n  width: 100%;\n  height: 100%;\n  z-index: 9;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n#schedule {\n  position: relative;\n  z-index: 2;\n}\n#schedule #timeline:before {\n    content: \"\";\n    top: 70vh !important;\n}\n#schedule .section .inner-section-fixed {\n    padding-top: 100px;\n    width: 100%;\n    min-height: 100%;\n    height: auto;\n}\n.falling-leaves {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 100%;\n  height: 100%;\n  transform: translate(-50%, 0);\n  z-index: 9;\n  border-radius: 50px;\n  background-size: cover;\n  overflow: hidden;\n}\n.leaf-scene {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 9;\n  transform-style: preserve-3d;\n}\n.leaf-scene div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 20px;\n    height: 20px;\n    z-index: 9;\n    background: url(https://image.flaticon.com/icons/svg/234/234908.svg) no-repeat;\n    background-size: 100%;\n    transform-style: preserve-3d;\n    backface-visibility: visible;\n    opacity: 0.9;\n}\n", ""]);

// exports


/***/ }),
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n#food .section .inner-section-fixed {\n  position: absolute;\n  top: 0px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n#food .map-container {\n  height: calc(100% - 90px);\n}\n#food .station {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n#food .station a {\n    color: #f27c7c !important;\n}\n", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local(\"Dosis Light\"), local(\"Dosis-Light\"), url(https://fonts.gstatic.com/s/dosis/v6/SHQzTQBI7152hSrIuGUiVBkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local(\"Dosis Light\"), local(\"Dosis-Light\"), url(https://fonts.gstatic.com/s/dosis/v6/7aJzV14HzAOiwNTiPgucGXYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* sampled usage */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: url(https://fonts.gstatic.com/stats/Dosis/normal/300);\n  unicode-range: U+20;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Dosis Regular\"), local(\"Dosis-Regular\"), url(https://fonts.gstatic.com/s/dosis/v6/3isE9muMMOq1K7TQ7HkKvIDGDUGfDkXyfkzVDelzfFk.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Dosis Regular\"), local(\"Dosis-Regular\"), url(https://fonts.gstatic.com/s/dosis/v6/oaBFj7Fz9Y9_eW3k9Jd9X6CWcynf_cDxXwCLxiixG1c.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local(\"Dosis Medium\"), local(\"Dosis-Medium\"), url(https://fonts.gstatic.com/s/dosis/v6/NI3uVO_o2Ursx6Z1Lyy3oRkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local(\"Dosis Medium\"), local(\"Dosis-Medium\"), url(https://fonts.gstatic.com/s/dosis/v6/mAcLJWdPWDNiDJwJvcWKc3YhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Dosis SemiBold\"), local(\"Dosis-SemiBold\"), url(https://fonts.gstatic.com/s/dosis/v6/yeSIYeveYSpVN04ZbWTWghkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Dosis SemiBold\"), local(\"Dosis-SemiBold\"), url(https://fonts.gstatic.com/s/dosis/v6/O6SOu9hYsPHTU43R17NS5XYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Dosis Bold\"), local(\"Dosis-Bold\"), url(https://fonts.gstatic.com/s/dosis/v6/fP7ud4UTUWGxo-nV1joC1RkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Dosis Bold\"), local(\"Dosis-Bold\"), url(https://fonts.gstatic.com/s/dosis/v6/22aDRG5X9l7obljtz7tihnYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n.jp-travel .rs-bg-img {\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.jp-travel #timeline .timeline-item:after,\n.jp-travel #timeline .timeline-item:before {\n  content: '';\n  display: block;\n  width: 100%;\n  clear: both;\n}\n\n.jp-travel *,\n.jp-travel *:before,\n.jp-travel *:after {\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n}\n\n.jp-travel .gmnoprint a,\n.jp-travel .gmnoprint span {\n  display: none;\n}\n\n.jp-travel .gmnoprint div {\n  background: none !important;\n}\n\n.jp-travel #GMapsID div div a div img {\n  display: none;\n}\n\n.jp-travel #fp-nav.right {\n  right: 5px;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.jp-travel #fp-nav li {\n  margin-top: 12px;\n  margin-bottom: 12px;\n}\n\n.jp-travel body,\n.jp-travel html {\n  height: 100%;\n}\n\n.jp-travel body {\n  background: #f9f9f9;\n  background-size: cover;\n  margin: 0;\n  padding: 0;\n  font-family: helvetica, arial, tahoma, verdana;\n  line-height: 20px;\n  font-size: 14px;\n  color: #726f77;\n}\n\n.jp-travel .small {\n  font-size: 12px;\n}\n\n.jp-travel img {\n  max-width: 100%;\n}\n\n.jp-travel a {\n  text-decoration: none;\n}\n\n.jp-travel .container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding-top: 40px;\n}\n\n.jp-travel h1,\n.jp-travel h2,\n.jp-travel h3,\n.jp-travel h4 {\n  font-family: \"Dosis\", arial, tahoma, verdana;\n  font-weight: 500;\n}\n\n.jp-travel .font-white {\n  color: #fff;\n}\n\n.jp-travel header {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: #fff;\n  height: 40px;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  text-align: center;\n  z-index: 3;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.jp-travel header nav {\n  height: 100%;\n}\n\n.jp-travel header nav .nav-item {\n  padding: 0 15px;\n  height: 100%;\n  text-align: center;\n  line-height: 40px;\n  cursor: pointer;\n}\n\n.jp-travel header nav .nav-item a {\n  color: #fff;\n  text-decoration: none;\n  line-height: 40px;\n  font-size: 12px;\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: block;\n}\n\n.jp-travel header nav .nav-item a:hover:before,\n.jp-travel header nav .nav-item a.active:before {\n  content: '';\n  background-image: url(\"http://feversoul.com/jp/src/assets/img/spinner-circle.svg\");\n  background-size: 36px;\n  width: 36px;\n  height: 36px;\n  background-repeat: no-repeat;\n  background-position: center;\n  display: block;\n  position: absolute;\n  top: 2px;\n  left: calc(50% - 18px);\n}\n\n.jp-travel .map-container {\n  width: 100%;\n}\n\n.jp-travel .map-container .container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.jp-travel .map-container input {\n  display: none;\n  visibility: hidden;\n}\n\n.jp-travel .map-container label {\n  display: block;\n  padding: 0.5em;\n  text-align: center;\n  border-bottom: 1px solid #CCC;\n  color: #666;\n  margin-bottom: 0px;\n}\n\n.jp-travel .map-container label:hover {\n  color: #000;\n}\n\n.jp-travel .map-container label::before {\n  font-family: Consolas, monaco, monospace;\n  font-weight: bold;\n  font-size: 15px;\n  content: \"+\";\n  vertical-align: text-top;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin-left: 3px;\n  margin-right: 3px;\n  background: radial-gradient(ellipse at center, #CCC 50%, transparent 50%);\n}\n\n.jp-travel .map-container section {\n  padding: 0 20px;\n}\n\n.jp-travel #preview {\n  top: 75px;\n  height: 220px;\n  position: fixed;\n  width: 220px;\n  z-index: 3;\n  background-position: center;\n  background-size: cover;\n  border: 1px solid #eee;\n  display: none;\n}\n\n.jp-travel .project-name {\n  text-align: center;\n  padding: 10px 0;\n}\n\n.jp-travel .fixed-line {\n  width: 3px;\n  height: 100%;\n  left: 50%;\n  top: 70vh !important;\n  position: fixed;\n  z-index: 2;\n}\n\n.jp-travel .fixed-line .timeline-icon {\n  background: #ee4d4d;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  overflow: hidden;\n  margin-left: -23px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n}\n\n.jp-travel .fixed-line .timeline-icon .start {\n  position: relative;\n  top: 14px;\n  left: 14px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel .fixed-line {\n    left: 28px;\n  }\n}\n\n.jp-travel #timeline {\n  width: 100%;\n  margin: 30px auto;\n  position: relative;\n  padding: 0 10px;\n  -webkit-transition: all 0.4s ease;\n  -moz-transition: all 0.4s ease;\n  -ms-transition: all 0.4s ease;\n  transition: all 0.4s ease;\n}\n\n.jp-travel #timeline:before {\n  content: \"\";\n  width: 3px;\n  height: 100%;\n  background: #ee4d4d;\n  left: 50%;\n  top: 0;\n  position: absolute;\n}\n\n.jp-travel #timeline:after {\n  content: \"\";\n  clear: both;\n  display: table;\n  width: 100%;\n}\n\n.jp-travel #timeline .timeline-item {\n  margin-bottom: 50px;\n  position: relative;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon {\n  background: #ee4d4d;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  overflow: hidden;\n  margin-left: -23px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon .start {\n  position: relative;\n  top: 14px;\n  left: 14px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon svg {\n  position: relative;\n  top: 14px;\n  left: 14px;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content {\n  width: 45%;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.5);\n  padding: 20px;\n  -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -ms-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -ms-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content h5 {\n  padding: 15px;\n  color: #fff;\n  margin: -20px -20px 0 -20px;\n  font-weight: 300;\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  -ms-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content p {\n  padding-top: 10px;\n  line-height: 1.75;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content:before {\n  content: '';\n  position: absolute;\n  left: 45%;\n  top: 20px;\n  width: 0;\n  height: 0;\n  border-top: 7px solid transparent;\n  border-bottom: 7px solid transparent;\n  border-left: 7px solid #fff;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content.right {\n  float: right;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content.right:before {\n  content: '';\n  right: 45%;\n  left: inherit;\n  border-left: 0;\n  border-right: 7px solid #fff;\n}\n\n.jp-travel #mapcard .mapcard-item {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map {\n  height: 300px;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map.full-screen-bg {\n  height: 100vh;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map.large {\n  height: 70vh;\n  width: 100%;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content {\n  opacity: 0.9;\n  background: #fff;\n  padding: 20px;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content h5 {\n  padding: 15px;\n  color: #ee4d4d;\n  background: #fff;\n  margin: -20px -20px 0 -20px;\n  font-weight: 300;\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  -ms-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content p {\n  padding-top: 10px;\n  line-height: 1.75;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content:before {\n  content: '';\n  position: absolute;\n  left: 100%;\n  top: 20px;\n  width: 0;\n  height: 0;\n  border-top: 7px solid transparent;\n  border-bottom: 7px solid transparent;\n  border-left: 7px solid #ee4d4d;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content.right {\n  float: right;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content.right:before {\n  content: '';\n  right: 100%;\n  left: inherit;\n  border-left: 0;\n  border-right: 7px solid #ee4d4d;\n}\n\n.jp-travel #fp-nav ul li a span,\n.jp-travel .fp-slidesNav ul li a span {\n  background: #fff !important;\n}\n\n.jp-travel .btn-radius {\n  height: 50px;\n  width: 50px;\n  cursor: pointer;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  background: transparent;\n  border: 2px solid #f27c7c;\n  color: #f27c7c;\n  display: inline-block;\n  position: relative;\n  text-transform: uppercase;\n  font-size: 12px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-transition: background 0.3s ease;\n  -moz-transition: background 0.3s ease;\n  -ms-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  -webkit-box-shadow: 2px 2px 0 #f27c7c;\n  -moz-box-shadow: 2px 2px 0 #f27c7c;\n  -ms-box-shadow: 2px 2px 0 #f27c7c;\n  box-shadow: 2px 2px 0 #f27c7c;\n}\n\n.jp-travel .btn-radius:hover {\n  box-shadow: none;\n  top: 2px;\n  left: 2px;\n  -webkit-box-shadow: 2px 2px 0 transparent;\n  -moz-box-shadow: 2px 2px 0 transparent;\n  -ms-box-shadow: 2px 2px 0 transparent;\n  box-shadow: 2px 2px 0 transparent;\n}\n\n.jp-travel .btn {\n  padding: 5px 15px;\n  text-decoration: none;\n  background: transparent;\n  border: 2px solid white;\n  color: white;\n  display: inline-block;\n  position: relative;\n  text-transform: uppercase;\n  font-size: 12px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-transition: background 0.3s ease;\n  -moz-transition: background 0.3s ease;\n  -ms-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  -webkit-box-shadow: 2px 2px 0 white;\n  -moz-box-shadow: 2px 2px 0 white;\n  -ms-box-shadow: 2px 2px 0 white;\n  box-shadow: 2px 2px 0 white;\n}\n\n.jp-travel .btn a {\n  color: white;\n}\n\n.jp-travel .btn:hover {\n  box-shadow: none;\n  top: 2px;\n  left: 2px;\n  -webkit-box-shadow: 2px 2px 0 transparent;\n  -moz-box-shadow: 2px 2px 0 transparent;\n  -ms-box-shadow: 2px 2px 0 transparent;\n  box-shadow: 2px 2px 0 transparent;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel #timeline {\n    margin: 30px;\n    padding: 0px;\n    width: 90%;\n  }\n\n  .jp-travel #timeline:before {\n    left: 0;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-content {\n    width: 90%;\n    float: right;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-content:before,\n  .jp-travel #timeline .timeline-item .timeline-content.right:before {\n    left: 10%;\n    margin-left: -6px;\n    border-left: 0;\n    border-right: 7px solid #ee4d4d;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-icon {\n    left: 0;\n  }\n}\n\n.jp-travel .station .station-item {\n  text-align: center;\n  padding: 5px;\n}\n\n.jp-travel .go-down {\n  width: 30px;\n  height: 30px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 40px;\n  margin-top: -15px;\n  transform: translateY(0px);\n  animation: arrowDown 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n  cursor: pointer;\n}\n\n.jp-travel .icon-arrow {\n  display: inline-block;\n  font-size: 26px;\n  color: #f27c7c;\n  text-align: center;\n  width: 100px;\n  height: 50px;\n  line-height: 50px;\n  /* border: 2px solid $color; */\n  overflow: hidden;\n  text-transform: uppercase;\n  transform: rotateZ(90deg);\n  /* webkit-box-shadow: 2px -2px 0 #b3c33a;\n    -moz-box-shadow: 2px -2px 0 #b3c33a;\n    -ms-box-shadow: 2px -2px 0 #b3c33a;\n    box-shadow: 2px -2px 0 #b3c33a; */\n  transition: width 0.5s ease-in-out, margin 0.5s ease-in-out, border-radius 0.25s ease-in-out, color 0.25s ease-in-out;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel .icon-arrow {\n    display: none;\n  }\n}\n\n.jp-travel .icon-arrow:hover,\n.jp-travel .icon-arrow.auto {\n  width: 50px;\n  border-radius: 40px;\n  color: rgba(242, 124, 124, 0);\n  transition: width 0.5s ease-in-out, margin 0.5s ease-in-out, border-radius 1s 0.25 ease-in-out, color 0.25s ease-in-out 0.25s;\n}\n\n.jp-travel .icon-arrow:hover:before,\n.jp-travel .icon-arrow.auto:before {\n  animation: lineUp 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n}\n\n.jp-travel .icon-arrow:hover:after,\n.jp-travel .icon-arrow.auto:after {\n  animation: tipUp 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n}\n\n.jp-travel .icon-arrow:before {\n  position: absolute;\n  display: inline-block;\n  content: \"\";\n  background: #f27c7c;\n  width: 5px;\n  height: 35px;\n  top: 50%;\n  left: 50%;\n  margin-top: -8px;\n  margin-left: -3px;\n  transform: translateY(50px);\n}\n\n.jp-travel .icon-arrow:after {\n  position: absolute;\n  display: inline-block;\n  content: \"\";\n  width: 20px;\n  height: 20px;\n  color: #f27c7c;\n  border-top: 5px solid;\n  border-left: 5px solid;\n  transform: rotateZ(45deg);\n  top: 50%;\n  left: 55%;\n  margin-top: -6px;\n  margin-left: -13px;\n  transform: translateY(50px) rotateZ(45deg);\n}\n\n@keyframes arrowDown {\n  0% {\n    transform: translateY(-20px);\n  }\n\n  100% {\n    transform: translateY(20px);\n  }\n}\n\n@keyframes tipUp {\n  0% {\n    transform: translateY(50px) rotateZ(45deg);\n  }\n\n  100% {\n    transform: translateY(-70px) rotateZ(45deg);\n  }\n}\n\n@keyframes lineUp {\n  0% {\n    transform: translateY(50px);\n  }\n\n  100% {\n    transform: translateY(-70px);\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sZXZlbnBhbmcvd3d3L3Z1ZS10cmF2ZWwvY2xpZW50L3ZpZXdzL2NvbW1vbi9jb21tb24uc2NzcyIsIi9Vc2Vycy9sZXZlbnBhbmcvd3d3L3Z1ZS10cmF2ZWwvY2xpZW50L3ZpZXdzL2NvbW1vbi9mb250L2dvb2dsZS1mb250LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcImZvbnQvZ29vZ2xlLWZvbnRcIjtcbi8vIFZhcmlhYmxlc1xuJGJnLWJvZHk6ICNmOWY5Zjk7XG5cbiRyZWQ6ICNlZTRkNGQ7XG4kYmx1ZTogIzJiMmU0ODtcbiRwcmltYXJ5LWNvbG9yOiAkcmVkO1xuJHNlY29uZGFyeS1jb2xvcjogJGJsdWU7XG5cblxuLy8gVHlwb2dyYXBoeVxuJGJhc2UtZm9udDogaGVsdmV0aWNhLCBhcmlhbCwgdGFob21hLCB2ZXJkYW5hO1xuJGJhc2UtZm9udC10aXRsZTogXCJEb3Npc1wiLCBhcmlhbCwgdGFob21hLCB2ZXJkYW5hO1xuXG4kYmFzZS1mb250LWNvbG9yOiAjNzI2Zjc3O1xuXG4vLyBUaW1lbGluZVxuJHRpbWVsaW5lLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcblxuLmpwLXRyYXZlbHtcbiAgLy8gTWl4aW5zIGFuZCBQbGFjZWhvbGRlcnNcbiAgLnJzLWJnLWltZ3tcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICB9XG4gICVjbGVhcmZpeCB7XG4gICAgJjphZnRlciwgJjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgfVxuICB9XG5cbiAgQG1peGluIHByZWZpeCgkcHJvcCwgJHZhbCkge1xuICAgIEBlYWNoICRwcmVmaXggaW4gJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nLCAnJyB7XG4gICAgICAjeyRwcmVmaXh9I3skcHJvcH06ICR2YWw7XG4gICAgfVxuICB9XG4gICosICo6YmVmb3JlLCAqOmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLy9nb29nbGVcbiAgLmdtbm9wcmludCBhLCAuZ21ub3ByaW50IHNwYW4ge1xuICAgICAgZGlzcGxheTpub25lO1xuICB9XG4gIC5nbW5vcHJpbnQgZGl2IHtcbiAgICAgIGJhY2tncm91bmQ6bm9uZSAhaW1wb3J0YW50O1xuICB9XG4gICNHTWFwc0lEIGRpdiBkaXYgYSBkaXYgaW1ne1xuICAgICAgZGlzcGxheTpub25lO1xuICB9XG4gIC8vZ29vZ2xlXG4gIC8vZnVsbHBhZ2VcbiAgI2ZwLW5hdntcbiAgICAmLnJpZ2h0e1xuICAgICAgcmlnaHQ6IDVweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC43KTtcbiAgICB9XG4gICAgbGl7XG4gICAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gIH0gXG4gIC8vZnVsbHBhZ2VcbiAgYm9keSwgaHRtbCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG4gIGJvZHkge1xuICAgIGJhY2tncm91bmQ6ICRiZy1ib2R5O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC1mYW1pbHk6ICRiYXNlLWZvbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAkYmFzZS1mb250LWNvbG9yO1xuICB9XG4gIC5zbWFsbHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbiAgaW1nIHttYXgtd2lkdGg6IDEwMCU7fVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuXG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMTEwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICB9XG4gIC5jb250YWluZXItZnVsbHNjcmVlbntcbiAgfVxuICBoMSwgaDIsIGgzLCBoNCB7XG4gICAgZm9udDp7XG4gICAgICBmYW1pbHk6ICRiYXNlLWZvbnQtdGl0bGU7XG4gICAgICB3ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cblxuICAuZm9udC13aGl0ZXtcbiAgICBjb2xvcjogI2ZmZjtcbiAgfSAgXG5cbiAgaGVhZGVye1xuICAgIC8vb3BhY2l0eTogMC45O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC4zKTtcbiAgICBjb2xvcjojZmZmO1xuICAgIGhlaWdodDogNDBweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHotaW5kZXg6IDM7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgbmF2e1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgLm5hdi1pdGVte1xuICAgICAgICBwYWRkaW5nOiAwIDE1cHg7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBhe1xuICAgICAgICAgIGNvbG9yOiNmZmY7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAmOmhvdmVyLCYuYWN0aXZle1xuICAgICAgICAgICAgJjpiZWZvcmV7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHA6Ly9mZXZlcnNvdWwuY29tL2pwL3NyYy9hc3NldHMvaW1nL3NwaW5uZXItY2lyY2xlLnN2ZycpO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDM2cHg7XG4gICAgICAgICAgICAgIHdpZHRoOiAzNnB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgdG9wOiAycHg7XG4gICAgICAgICAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMThweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfVxuICAubWFwLWNvbnRhaW5lcntcbiAgICAvL2JhY2tncm91bmQ6ICNmZmY7XG4gICAgLy90b3A6IDQwcHg7XG4gICAgLy9sZWZ0OiAwO1xuICAgIC8vIG92ZXJmbG93LXk6aGlkZGVuO1xuICAgIC8vIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICAvLyB6LWluZGV4OiAyO1xuICAgIC5jb250YWluZXJ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuICAgIGlucHV0IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuICAgIGxhYmVsIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0NDQztcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgLy9iYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICAgIH1cbiAgICBsYWJlbDpob3ZlciB7XG4gICAgICBjb2xvcjogIzAwMDtcbiAgICB9XG4gICAgbGFiZWw6OmJlZm9yZSB7XG4gICAgICBmb250LWZhbWlseTogQ29uc29sYXMsIG1vbmFjbywgbW9ub3NwYWNlO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICBjb250ZW50OiBcIitcIjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgIG1hcmdpbi1yaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCAjQ0NDIDUwJSwgdHJhbnNwYXJlbnQgNTAlKTtcbiAgICB9XG4gICAgc2VjdGlvbiB7XG4gICAgICBwYWRkaW5nOiAwIDIwcHg7XG4gICAgfVxuICB9XG4gICNwcmV2aWV3e1xuICAgIHRvcDogNzVweDtcbiAgICBoZWlnaHQ6MjIwcHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAyMjBweDtcbiAgICB6LWluZGV4OiAzO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuICAucHJvamVjdC1uYW1lIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICB9XG5cbiAgLy8gSGVhZGVyXG5cblxuICAvLyBUaW1lbGluZVxuXG4gIC5maXhlZC1saW5le1xuICAgIHdpZHRoOiAzcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6NzB2aCFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDI7XG4gICAgLnRpbWVsaW5lLWljb24ge1xuICAgICAgYmFja2dyb3VuZDogI2VlNGQ0ZDtcbiAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMjNweDtcbiAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLW1vei1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAtbXMtYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLnN0YXJ0e1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMTRweDtcbiAgICAgICAgbGVmdDogMTRweDtcbiAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgfVxuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgbGVmdDoyOHB4XG4gICAgfVxuICB9XG4gICN0aW1lbGluZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAzMHB4IGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICBAaW5jbHVkZSBwcmVmaXgodHJhbnNpdGlvbiwgYWxsIC40cyBlYXNlKTtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6XCJcIjtcbiAgICAgIHdpZHRoOiAzcHg7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kOiAkdGltZWxpbmUtY29sb3I7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICB0b3A6IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICBcbiAgICAudGltZWxpbmUtaXRlbSB7XG4gICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgQGV4dGVuZCAlY2xlYXJmaXg7XG5cbiAgICAgIC50aW1lbGluZS1pY29uIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTIzcHg7XG4gICAgICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCA1MCUpO1xuICAgICAgICAuc3RhcnR7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHRvcDogMTRweDtcbiAgICAgICAgICBsZWZ0OiAxNHB4O1xuICAgICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuICAgICAgICBzdmcge1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB0b3A6IDE0cHg7XG4gICAgICAgICAgbGVmdDogMTRweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAudGltZWxpbmUtY29udGVudCB7XG4gICAgICAgIHdpZHRoOiA0NSU7XG4gICAgICAgIC8vYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4KGJveC1zaGFkb3csIDAgM3B4IDAgcmdiYSgwLDAsMCwwLjEpKTtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4KGJvcmRlci1yYWRpdXMsIDVweCk7XG4gICAgICAgIEBpbmNsdWRlIHByZWZpeCh0cmFuc2l0aW9uLCBhbGwgLjNzIGVhc2UpO1xuICAgICAgICBoNSB7XG4gICAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBtYXJnaW46IC0yMHB4IC0yMHB4IDAgLTIwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICBAaW5jbHVkZSBwcmVmaXgoYm9yZGVyLXJhZGl1cywgM3B4IDNweCAwIDApO1xuICAgICAgICAgIC8vYmFja2dyb3VuZDogJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHB7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNzU7XG4gICAgICAgIH1cbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBsZWZ0OiA0NSU7XG4gICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgIHdpZHRoOiAwOyBcbiAgICAgICAgICBoZWlnaHQ6IDA7IFxuICAgICAgICAgIGJvcmRlci10b3A6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA3cHggc29saWQgdHJhbnNwYXJlbnQ7IFxuICAgICAgICAgIGJvcmRlci1sZWZ0OjdweCBzb2xpZCAjZmZmOyBcbiAgICAgICAgfVxuXG4gICAgICAgICYucmlnaHQge1xuICAgICAgICAgIGZsb2F0OiByaWdodDtcblxuICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcmlnaHQ6IDQ1JTtcbiAgICAgICAgICAgIGxlZnQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogN3B4IHNvbGlkICNmZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICNtYXBjYXJke1xuICAgIC5tYXBjYXJkLWl0ZW0ge1xuICAgICAgLy9tYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgLy9wb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAvL2hlaWdodDogMTAwdmg7XG4gICAgICAvL3BhZGRpbmc6IDIwcHggMjBweCAyMHB4IDIwcHg7XG4gICAgICAvL0BleHRlbmQgJWNsZWFyZml4O1xuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAubWFwY2FyZC1tYXB7XG4gICAgICAgIC8vb3BhY2l0eTogMC45O1xuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xuICAgICAgICAmLmZ1bGwtc2NyZWVuLWJne1xuICAgICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgfVxuICAgICAgICAmLmxhcmdle1xuICAgICAgICAgIGhlaWdodDogNzB2aDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm1hcGNhcmQtY29udGVudCB7XG4gICAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgaDUge1xuICAgICAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICAgICAgY29sb3I6ICR0aW1lbGluZS1jb2xvcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIG1hcmdpbjogLTIwcHggLTIwcHggMCAtMjBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCAzcHggM3B4IDAgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcHtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS43NTtcbiAgICAgICAgfVxuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGxlZnQ6IDEwMCU7XG4gICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgIHdpZHRoOiAwOyBcbiAgICAgICAgICBoZWlnaHQ6IDA7IFxuICAgICAgICAgIGJvcmRlci10b3A6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA3cHggc29saWQgdHJhbnNwYXJlbnQ7IFxuICAgICAgICAgIGJvcmRlci1sZWZ0OjdweCBzb2xpZCAkdGltZWxpbmUtY29sb3I7IFxuICAgICAgICB9XG5cbiAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuXG4gICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICByaWdodDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogN3B4IHNvbGlkICR0aW1lbGluZS1jb2xvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdWxscGFnZSBqc1xuXG4gICNmcC1uYXYgdWwgbGkgYSBzcGFuLCAuZnAtc2xpZGVzTmF2IHVsIGxpIGEgc3BhbntcbiAgICBiYWNrZ3JvdW5kOiAjZmZmIWltcG9ydGFudDtcbiAgfVxuXG5cbiAgLy8gQnV0dG9uc1xuICAuYnRuLXJhZGl1cyB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGxpZ2h0ZW4oJHByaW1hcnktY29sb3IsIDEwJSk7XG4gICAgY29sb3I6IGxpZ2h0ZW4oJHByaW1hcnktY29sb3IsIDEwJSk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBAaW5jbHVkZSBwcmVmaXgoYm9yZGVyLXJhZGl1cywgNTAlKTtcbiAgICBAaW5jbHVkZSBwcmVmaXgodHJhbnNpdGlvbiwgYmFja2dyb3VuZCAuM3MgZWFzZSk7XG4gICAgQGluY2x1ZGUgcHJlZml4KGJveC1zaGFkb3csIDJweCAycHggMCBsaWdodGVuKCRwcmltYXJ5LWNvbG9yLCAxMCUpKTtcblxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogbm9uZSA7XG4gICAgICB0b3A6IDJweDtcbiAgICAgIGxlZnQ6IDJweDtcbiAgICAgIEBpbmNsdWRlIHByZWZpeChib3gtc2hhZG93LCAycHggMnB4IDAgdHJhbnNwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC5idG4ge1xuICAgIHBhZGRpbmc6IDVweCAxNXB4O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBsaWdodGVuKCNmZmYsIDEwJSk7XG4gICAgY29sb3I6IGxpZ2h0ZW4oI2ZmZiwgMTAlKTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCA1cHgpO1xuICAgIEBpbmNsdWRlIHByZWZpeCh0cmFuc2l0aW9uLCBiYWNrZ3JvdW5kIC4zcyBlYXNlKTtcbiAgICBAaW5jbHVkZSBwcmVmaXgoYm94LXNoYWRvdywgMnB4IDJweCAwIGxpZ2h0ZW4oI2ZmZiwgMTAlKSk7XG4gICAgYXtcbiAgICAgIGNvbG9yOiBsaWdodGVuKCNmZmYsIDEwJSk7XG4gICAgfVxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogbm9uZSA7XG4gICAgICB0b3A6IDJweDtcbiAgICAgIGxlZnQ6IDJweDtcbiAgICAgIEBpbmNsdWRlIHByZWZpeChib3gtc2hhZG93LCAycHggMnB4IDAgdHJhbnNwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgI3RpbWVsaW5lIHtcbiAgICAgIG1hcmdpbjogMzBweDtcbiAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50aW1lbGluZS1pdGVtIHtcbiAgICAgICAgLnRpbWVsaW5lLWNvbnRlbnQge1xuICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgIFxuICAgICAgICAgICY6YmVmb3JlLCAmLnJpZ2h0OmJlZm9yZSB7XG4gICAgICAgICAgICBsZWZ0OiAxMCU7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogLTZweDtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiA3cHggc29saWQgJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC50aW1lbGluZS1pY29uIHtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9zdGF0aW9uXG4gIC5zdGF0aW9ue1xuICAgIC5zdGF0aW9uLWl0ZW17XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA1cHg7XG4gICAgfVxuICB9XG5cblxuXG4gICRiYWNrOiAjMzMzO1xuICAvLyRjb2xvcjogI2IzYzMzYTtcbiAgJGFycm93Q29sb3I6I2YyN2M3YztcbiAgJHNwZWVkOiAxcztcblxuICAuZ28tZG93bntcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDQwcHg7XG4gICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XG4gICAgYW5pbWF0aW9uOiBhcnJvd0Rvd24gJHNwZWVkIGN1YmljLWJlemllcigwLjAsIDAuNiwgMS4wLCAwLjQpIGluZmluaXRlIC41cztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAuaWNvbi1hcnJvdyB7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDI2cHg7XG4gICAgY29sb3I6ICRhcnJvd0NvbG9yO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkICRjb2xvcjsgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKDkwZGVnKTtcbiAgICAvKiB3ZWJraXQtYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhO1xuICAgIC1tb3otYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhO1xuICAgIC1tcy1ib3gtc2hhZG93OiAycHggLTJweCAwICNiM2MzM2E7XG4gICAgYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhOyAqL1xuICAgIHRyYW5zaXRpb246IHdpZHRoICRzcGVlZCouNSBlYXNlLWluLW91dCxcbiAgICAgICAgICAgICAgICBtYXJnaW4gJHNwZWVkKi41IGVhc2UtaW4tb3V0LFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXMgJHNwZWVkKi4yNSBlYXNlLWluLW91dCxcbiAgICAgICAgICAgICAgICBjb2xvciAkc3BlZWQqLjI1IGVhc2UtaW4tb3V0O1xuICAgICY6aG92ZXIsICYuYXV0byB7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gICAgICBjb2xvcjogcmdiYSgkYXJyb3dDb2xvciwgMCk7XG4gICAgICB0cmFuc2l0aW9uOiB3aWR0aCAkc3BlZWQqLjUgZWFzZS1pbi1vdXQsXG4gICAgICAgICAgICAgICAgICBtYXJnaW4gJHNwZWVkKi41IGVhc2UtaW4tb3V0LFxuICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1cyAkc3BlZWQuMjUgZWFzZS1pbi1vdXQsXG4gICAgICAgICAgICAgICAgICBjb2xvciAkc3BlZWQqLjI1IGVhc2UtaW4tb3V0ICRzcGVlZCouMjU7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGFuaW1hdGlvbjogbGluZVVwICRzcGVlZCBjdWJpYy1iZXppZXIoMC4wLCAwLjYsIDEuMCwgMC40KSBpbmZpbml0ZSAuNXM7XG4gICAgICB9XG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0aXBVcCAkc3BlZWQgY3ViaWMtYmV6aWVyKDAuMCwgMC42LCAxLjAsIDAuNCkgaW5maW5pdGUgLjVzO1xuICAgICAgfVxuICAgIH1cbiAgICAmOmJlZm9yZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgYmFja2dyb3VuZDogJGFycm93Q29sb3I7XG4gICAgICB3aWR0aDogNXB4O1xuICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICBtYXJnaW4tdG9wOiAtOHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IC0zcHg7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCk7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgY29sb3I6ICRhcnJvd0NvbG9yO1xuICAgICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkO1xuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDU1JTtcbiAgICAgIG1hcmdpbi10b3A6IC02cHg7XG4gICAgICBtYXJnaW4tbGVmdDogLTEzcHg7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCkgcm90YXRlWig0NWRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBhcnJvd0Rvd24ge1xuICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpfVxuICAgIDEwMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KX1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgdGlwVXAge1xuICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCkgcm90YXRlWig0NWRlZyk7IH1cbiAgICAxMDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwcHgpIHJvdGF0ZVooNDVkZWcpOyB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGxpbmVVcCB7XG4gICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1MHB4KTsgfVxuICAgIDEwMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzBweCk7IH1cbiAgfVxufVxuXG5cbiIsIi8qIGxhdGluLWV4dCAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnRG9zaXMnO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHNyYzogbG9jYWwoJ0Rvc2lzIExpZ2h0JyksIGxvY2FsKCdEb3Npcy1MaWdodCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L1NIUXpUUUJJNzE1MmhTckl1R1VpVkJrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgTGlnaHQnKSwgbG9jYWwoJ0Rvc2lzLUxpZ2h0JyksIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvZG9zaXMvdjYvN2FKelYxNEh6QU9pd05UaVBndWNHWFloamJTcHZjNDdlZTZ4Ul84MEhudy53b2ZmMikgZm9ybWF0KCd3b2ZmMicpO1xuICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkM2LCBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIyMTIsIFUrMjIxNTtcbn1cbi8qIHNhbXBsZWQgdXNhZ2UgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogMzAwO1xuICBzcmM6IHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3N0YXRzL0Rvc2lzL25vcm1hbC8zMDApO1xuICB1bmljb2RlLXJhbmdlOiBVKzIwO1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgUmVndWxhcicpLCBsb2NhbCgnRG9zaXMtUmVndWxhcicpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2LzNpc0U5bXVNTU9xMUs3VFE3SGtLdklER0RVR2ZEa1h5Zmt6VkRlbHpmRmsud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgUmVndWxhcicpLCBsb2NhbCgnRG9zaXMtUmVndWxhcicpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L29hQkZqN0Z6OVk5X2VXM2s5SmQ5WDZDV2N5bmZfY0R4WHdDTHhpaXhHMWMud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMjEyLCBVKzIyMTU7XG59XG4vKiBsYXRpbi1leHQgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBzcmM6IGxvY2FsKCdEb3NpcyBNZWRpdW0nKSwgbG9jYWwoJ0Rvc2lzLU1lZGl1bScpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L05JM3VWT19vMlVyc3g2WjFMeXkzb1JrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgTWVkaXVtJyksIGxvY2FsKCdEb3Npcy1NZWRpdW0nKSwgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9kb3Npcy92Ni9tQWNMSldkUFdETmlESndKdmNXS2MzWWhqYlNwdmM0N2VlNnhSXzgwSG53LndvZmYyKSBmb3JtYXQoJ3dvZmYyJyk7XG4gIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQzYsIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjIxMiwgVSsyMjE1O1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgU2VtaUJvbGQnKSwgbG9jYWwoJ0Rvc2lzLVNlbWlCb2xkJyksIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvZG9zaXMvdjYveWVTSVlldmVZU3BWTjA0WmJXVFdnaGtBejRyWW40N1p5MnJ2aWdXUWY2dy53b2ZmMikgZm9ybWF0KCd3b2ZmMicpO1xuICB1bmljb2RlLXJhbmdlOiBVKzAxMDAtMDI0RiwgVSsxRTAwLTFFRkYsIFUrMjBBMC0yMEFCLCBVKzIwQUQtMjBDRiwgVSsyQzYwLTJDN0YsIFUrQTcyMC1BN0ZGO1xufVxuLyogbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNjAwO1xuICBzcmM6IGxvY2FsKCdEb3NpcyBTZW1pQm9sZCcpLCBsb2NhbCgnRG9zaXMtU2VtaUJvbGQnKSwgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9kb3Npcy92Ni9PNlNPdTloWXNQSFRVNDNSMTdOUzVYWWhqYlNwdmM0N2VlNnhSXzgwSG53LndvZmYyKSBmb3JtYXQoJ3dvZmYyJyk7XG4gIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQzYsIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjIxMiwgVSsyMjE1O1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgQm9sZCcpLCBsb2NhbCgnRG9zaXMtQm9sZCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L2ZQN3VkNFVUVVdHeG8tblYxam9DMVJrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgQm9sZCcpLCBsb2NhbCgnRG9zaXMtQm9sZCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2LzIyYURSRzVYOWw3b2JsanR6N3RpaG5ZaGpiU3B2YzQ3ZWU2eFJfODBIbncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMjEyLCBVKzIyMTU7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBLGVBQWU7QUFDZixVQUFVO0VBQ1IsV0FBVyxFQUFFLE9BQU87RUFDcEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLEdBQUc7RUFDaEIsR0FBRyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLDJGQUEyRixDQUFDLGVBQWU7RUFDNUosYUFBYSxFQUFFLDRFQUE0RTs7QUFFN0YsV0FBVztBQUNYLFVBQVU7RUFDUixXQUFXLEVBQUUsT0FBTztFQUNwQixVQUFVLEVBQUUsTUFBTTtFQUNsQixXQUFXLEVBQUUsR0FBRztFQUNoQixHQUFHLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsMkZBQTJGLENBQUMsZUFBZTtFQUM1SixhQUFhLEVBQUUscUdBQXFHOztBQUV0SCxtQkFBbUI7QUFDbkIsVUFBVTtFQUNSLFdBQVcsRUFBRSxPQUFPO0VBQ3BCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLEdBQUcsRUFBRSxxREFBcUQ7RUFDMUQsYUFBYSxFQUFFLElBQUk7O0FBRXJCLGVBQWU7QUFDZixVQUFVO0VBQ1IsV0FBVyxFQUFFLE9BQU87RUFDcEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLEdBQUc7RUFDaEIsR0FBRyxFQUFF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 */", "", {"version":3,"sources":["/Users/levenpang/www/vue-travel/client/views/common/font/google-font.scss","/Users/levenpang/www/vue-travel/client/views/common/common.scss","/Users/levenpang/www/vue-travel/client/views/common/common.scss"],"names":[],"mappings":"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pBc;EDqBd,aCpBY;EDqBZ,iBC/RI;EDgSJ,kBCpBa;EDqBb,0ECpBU;CDqBX;;AAED;EACE,gBClBe;CDmBhB;;AAED;EACE,UChBI;EDiBJ,cChBc;EDiBd,gBC3CA;ED4CA,aCdM;EDeN,WCda;EDeb,4BCdkB;EDelB,uBCdwB;EDexB,uBCdY;EDeZ,cCde;CDehB;;AAED;EACE,mBCpRI;EDqRJ,gBCrRI;CDsRL;;AAED;EACE,WCjBa;EDkBb,aCjBc;EDkBd,UCjBQ;EDkBR,qBCjBoB;EDkBpB,gBCjBQ;EDkBR,WCjBQ;CDkBT;;AAED;EACE,oBCfO;EDgBP,YCrTQ;EDsTR,aCba;EDcb,mBCZiB;EDajB,OCZM;EDaN,UCZM;EDaN,iBCxSI;EDySJ,mBCzSsB;ED0StB,2BCdyC;EDezC,wBCf0C;EDgB1C,uBC5SI;ED6SJ,mBC7SI;CD8SL;;AAED;EACE,mBCjTsB;EDkTtB,UClTI;EDmTJ,WCnTI;EDoTJ,YCtUF;EDuUE,aCrBe;EDsBf,mBCrBmB;EDsBnB,uBCrBgB;CDsBjB;;AAED;EACE;IACE,WC5TE;GD6TH;CACF;;AAED;EACE,YCrBQ;EDsBR,kBCrBkB;EDsBlB,mBCrBiB;EDsBjB,gBCrBiB;EDsBjB,kCCrBgB;EDsBhB,+BCrBiB;EDsBjB,8BCrBoB;EDsBpB,0BCrBuB;CDsBxB;;AAED;EACE,YC9VF;ED+VE,WClBU;EDmBV,aClBe;EDmBf,oBClBgB;EDmBhB,UClBU;EDmBV,OAAO;EACP,mBAAmB;CCpWrB;;ADuWA;ECPM,YAAA;EAhWN,YAuVE;EDmBA,eCPmB;EDQnB,YC3WQ;CD4WT;;AAED;EACE,oBCPe;EDQf,mBCNO;CDOR;;AAED;ECnXA,oBAwVI;ED6BF,YCJe;EDKf,aCJgB;EDKhB,mBCgCK;ED/BL,OCxXF;EDyXE,UCJQ;EDKR,iBCzYI;ED0YJ,mBCJoB;EDKpB,2BCJgB;EDKhB,wBCJwB;EDKxB,uBC5WI;ED6WJ,mBC7WI;CD8WL;;AAED;EACE,mBCNqB;EDOrB,UCNQ;EDOR,WCrYF;EDsYE,YCLe;EDMf,aCLgB;EDMhB,mBCLkB;EDMlB,uBCLiB;CDMlB;;AAED;EACE,mBCLuB;EDMvB,UCLQ;EDMR,WC/YF;CDgZC;;AAED;EACE,WCFe;EDGf,YCFgB;EDGhB,qCCFwB;EDGxB,cCFU;EDGV,+CAA+C;ECvZjD,4CA6ZwB;EACpB,2CACD;EDLD,uCAAuC;EC1ZzC,2BAmac;EACV,wBAAY;EACZ,uBAAW;EACX,mBAAe;EACf,kCAAiB;EACjB,+BAAkB;EAClB,8BAAqB;EACrB,0BAAuB;CDP1B;;AAED;ECSI,cAAU;EACV,YAAA;EACA,4BAAe;EA9Zb,iBAAA;EAAA,mCA+ZgC;EA/ZhC,gCA+ZgC;EA/ZhC,+BA+ZgC;EA/ZhC,2BAga0B;CDJ/B;;AAED;EC9ZM,kBAAkB;EAAlB,kBAia0B;CDA/B;;AAED;EACE,YCAc;EDCd,mBCAY;EDCZ,UCAU;EDCV,UCvaI;EDwaJ,SCxaI;EDyaJ,UCzaI;ED0aJ,kCCH0C;EDI1C,qCAAqC;EC7bvC,4BA6bO;CDEN;;AAED;ECAI,aAAY;CDEf;;AAED;ECAI,YAAA;EACA,WAAW;EApbT,cAAA;EAAA,eAAA;EAAA,6BAqbgC;CDIrC;;AAED;EC3bM,uBAsb0B;EAtb1B,4BAsbyC;EAtbzC,6BAubmC;CDQxC;;AAED;ECndA,cA6bE;CDwBD;;AAED;EACE,cCTY;EDUZ,mBCTa;EDUb,OCxcI;EDycJ,QCzcI;ED0cJ,aC1cI;CD2cL;;ACRC;EArdF,aAsdI;EDWF,YCVY;CDWb;;AAED;EACE,aCVa;EDWb,iBChBE;EDiBF,cCPkB;CDQnB;;AAED;EACE,cCNU;EDOV,eCNU;EDOV,iBCNU;EDOV,4BChBI;EDiBJ,iBCFO;EDGP,mCAAmC;EChfrC,gCAofiB;EACX,+BAAkB;EAClB,2BACD;CDHJ;;AAED;ECaI,kBAAY;EACZ,kBAAc;CDXjB;;AAED;ECaI,YAAY;EACZ,mBAAW;EACX,WAAW;EACX,UAAQ;EDXV,SAAS;EChgBX,UA8gBE;EAIE,kCAAqB;EACrB,qCAAe;EACf,+BAtBiB;CDOpB;;AAED;ECiBI,aAAa;CDfhB;;AAED;ECiBI,YAAW;EACX,YAAA;EDfF,cAAc;EACd,eAAe;EACf,gCAAgC;CACjC;;AAED;;ECnhBA,4BAqiBW;CDfV;;AAED;EACE,aCgBc;EDfd,YC1hBQ;ED2hBR,gBCmBiB;EDlBjB,kBCdA;EDeA,mBCoBiB;EAjjBnB,sBA8gBa;EDiBX,wBCsBsB;EDrBtB,0BCsByB;EDrBzB,eCsBe;EDrBf,sBCpCmB;EDqCnB,mBCsBc;EDrBd,0BCsBgB;EDrBhB,gBCsBY;EDrBZ,2BCsBa;EDrBb,wBCsBoB;EDrBpB,uBCsBqB;EDrBrB,mBCsBe;EA/jBjB,yCAikBY;EDtBV,sCCuBsB;EDtBtB,qCCuByB;EDtBzB,iCCuBe;EDtBf,sCCuBe;EDtBf,mCCuBgB;EDtBhB,kCClDmB;EDmDnB,8BCuByB;CDtB1B;;AAED;EACE,iBCuBa;EDtBb,SCuBI;EDtBJ,UCuBI;EDtBJ,0CCuBgC;EDtBhC,uCAAuC;EC0BvC,sCAAU;EACR,kCAAE;CDxBL;;AAED;EACE,kBAAkB;ECyBlB,sBAAU;EACR,wBAAE;EDvBJ,wBCuBoB;EAClB,aAAI;EDtBN,sBCsBsB;EDrBtB,mBAAmB;ECwBnB,0BAAU;EACR,gBAAE;EDtBJ,2BCsBoB;EAClB,wBAAI;EDrBN,uBCqBsB;EDpBtB,mBAAmB;EACnB,yCAAyC;EACzC,sCAAsC;EACtC,qCAAqC;EACrC,iCAAiC;EACjC,oCAAoC;EACpC,iCAAiC;EACjC,gCAAgC;EAChC,4BAA4B;CAC7B;;AAED;EACE,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,SAAS;EACT,UAAU;EACV,0CAA0C;EAC1C,uCAAuC;EACvC,sCAAsC;EACtC,kCAAkC;CACnC;;AAED;EACE;IACE,aAAa;IACb,aAAa;IACb,WAAW;GACZ;;EAED;IACE,QAAQ;GACT;;EAED;IACE,WAAW;IACX,aAAa;GACd;;EAED;;IAEE,UAAU;IACV,kBAAkB;IAClB,eAAe;IACf,gCAAgC;GACjC;;EAED;IACE,QAAQ;GACT;CACF;;AAED;EACE,mBAAmB;EACnB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,kBAAkB;EAClB,2BAA2B;EAC3B,mEAAmE;EACnE,gBAAgB;CACjB;;AAED;EACE,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,aAAa;EACb,aAAa;EACb,kBAAkB;EAClB,+BAA+B;EAC/B,iBAAiB;EACjB,0BAA0B;EAC1B,0BAA0B;EAC1B;;;sCAGoC;EACpC,sHAAsH;CACvH;;AAED;EACE;IACE,cAAc;GACf;CACF;;AAED;;EAEE,YAAY;EACZ,oBAAoB;EACpB,8BAA8B;EAC9B,8HAA8H;CAC/H;;AAED;;EAEE,gEAAgE;CACjE;;AAED;;EAEE,+DAA+D;CAChE;;AAED;EACE,mBAAmB;EACnB,sBAAsB;EACtB,YAAY;EACZ,oBAAoB;EACpB,WAAW;EACX,aAAa;EACb,SAAS;EACT,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,4BAA4B;CAC7B;;AAED;EACE,mBAAmB;EACnB,sBAAsB;EACtB,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,uBAAuB;EACvB,0BAA0B;EAC1B,SAAS;EACT,UAAU;EACV,iBAAiB;EACjB,mBAAmB;EACnB,2CAA2C;CAC5C;;AAED;EACE;IACE,6BAA6B;GAC9B;;EAED;IACE,4BAA4B;GAC7B;CACF;;AAED;EACE;IACE,2CAA2C;GAC5C;;EAED;IACE,4CAA4C;GAC7C;CACF;;AAED;EACE;IACE,4BAA4B;GAC7B;;EAED;IACE,6BAA6B;GAC9B;CACF;;AAED,+y8CAA+y8C","file":"common.scss","sourcesContent":["/* latin-ext */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Dosis Light'), local('Dosis-Light'), url(https://fonts.gstatic.com/s/dosis/v6/SHQzTQBI7152hSrIuGUiVBkAz4rYn47Zy2rvigWQf6w.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Dosis Light'), local('Dosis-Light'), url(https://fonts.gstatic.com/s/dosis/v6/7aJzV14HzAOiwNTiPgucGXYhjbSpvc47ee6xR_80Hnw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* sampled usage */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: url(https://fonts.gstatic.com/stats/Dosis/normal/300);\n  unicode-range: U+20;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Dosis Regular'), local('Dosis-Regular'), url(https://fonts.gstatic.com/s/dosis/v6/3isE9muMMOq1K7TQ7HkKvIDGDUGfDkXyfkzVDelzfFk.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Dosis Regular'), local('Dosis-Regular'), url(https://fonts.gstatic.com/s/dosis/v6/oaBFj7Fz9Y9_eW3k9Jd9X6CWcynf_cDxXwCLxiixG1c.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Dosis Medium'), local('Dosis-Medium'), url(https://fonts.gstatic.com/s/dosis/v6/NI3uVO_o2Ursx6Z1Lyy3oRkAz4rYn47Zy2rvigWQf6w.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Dosis Medium'), local('Dosis-Medium'), url(https://fonts.gstatic.com/s/dosis/v6/mAcLJWdPWDNiDJwJvcWKc3YhjbSpvc47ee6xR_80Hnw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local('Dosis SemiBold'), local('Dosis-SemiBold'), url(https://fonts.gstatic.com/s/dosis/v6/yeSIYeveYSpVN04ZbWTWghkAz4rYn47Zy2rvigWQf6w.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local('Dosis SemiBold'), local('Dosis-SemiBold'), url(https://fonts.gstatic.com/s/dosis/v6/O6SOu9hYsPHTU43R17NS5XYhjbSpvc47ee6xR_80Hnw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Dosis Bold'), local('Dosis-Bold'), url(https://fonts.gstatic.com/s/dosis/v6/fP7ud4UTUWGxo-nV1joC1RkAz4rYn47Zy2rvigWQf6w.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Dosis Bold'), local('Dosis-Bold'), url(https://fonts.gstatic.com/s/dosis/v6/22aDRG5X9l7obljtz7tihnYhjbSpvc47ee6xR_80Hnw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}","/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local(\"Dosis Light\"), local(\"Dosis-Light\"), url(https://fonts.gstatic.com/s/dosis/v6/SHQzTQBI7152hSrIuGUiVBkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: local(\"Dosis Light\"), local(\"Dosis-Light\"), url(https://fonts.gstatic.com/s/dosis/v6/7aJzV14HzAOiwNTiPgucGXYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* sampled usage */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 300;\n  src: url(https://fonts.gstatic.com/stats/Dosis/normal/300);\n  unicode-range: U+20;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Dosis Regular\"), local(\"Dosis-Regular\"), url(https://fonts.gstatic.com/s/dosis/v6/3isE9muMMOq1K7TQ7HkKvIDGDUGfDkXyfkzVDelzfFk.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Dosis Regular\"), local(\"Dosis-Regular\"), url(https://fonts.gstatic.com/s/dosis/v6/oaBFj7Fz9Y9_eW3k9Jd9X6CWcynf_cDxXwCLxiixG1c.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local(\"Dosis Medium\"), local(\"Dosis-Medium\"), url(https://fonts.gstatic.com/s/dosis/v6/NI3uVO_o2Ursx6Z1Lyy3oRkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 500;\n  src: local(\"Dosis Medium\"), local(\"Dosis-Medium\"), url(https://fonts.gstatic.com/s/dosis/v6/mAcLJWdPWDNiDJwJvcWKc3YhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Dosis SemiBold\"), local(\"Dosis-SemiBold\"), url(https://fonts.gstatic.com/s/dosis/v6/yeSIYeveYSpVN04ZbWTWghkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 600;\n  src: local(\"Dosis SemiBold\"), local(\"Dosis-SemiBold\"), url(https://fonts.gstatic.com/s/dosis/v6/O6SOu9hYsPHTU43R17NS5XYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n/* latin-ext */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Dosis Bold\"), local(\"Dosis-Bold\"), url(https://fonts.gstatic.com/s/dosis/v6/fP7ud4UTUWGxo-nV1joC1RkAz4rYn47Zy2rvigWQf6w.woff2) format(\"woff2\");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n\n/* latin */\n\n@font-face {\n  font-family: 'Dosis';\n  font-style: normal;\n  font-weight: 700;\n  src: local(\"Dosis Bold\"), local(\"Dosis-Bold\"), url(https://fonts.gstatic.com/s/dosis/v6/22aDRG5X9l7obljtz7tihnYhjbSpvc47ee6xR_80Hnw.woff2) format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n\n.jp-travel .rs-bg-img {\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.jp-travel #timeline .timeline-item:after,\n.jp-travel #timeline .timeline-item:before {\n  content: '';\n  display: block;\n  width: 100%;\n  clear: both;\n}\n\n.jp-travel *,\n.jp-travel *:before,\n.jp-travel *:after {\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n}\n\n.jp-travel .gmnoprint a,\n.jp-travel .gmnoprint span {\n  display: none;\n}\n\n.jp-travel .gmnoprint div {\n  background: none !important;\n}\n\n.jp-travel #GMapsID div div a div img {\n  display: none;\n}\n\n.jp-travel #fp-nav.right {\n  right: 5px;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.jp-travel #fp-nav li {\n  margin-top: 12px;\n  margin-bottom: 12px;\n}\n\n.jp-travel body,\n.jp-travel html {\n  height: 100%;\n}\n\n.jp-travel body {\n  background: #f9f9f9;\n  background-size: cover;\n  margin: 0;\n  padding: 0;\n  font-family: helvetica, arial, tahoma, verdana;\n  line-height: 20px;\n  font-size: 14px;\n  color: #726f77;\n}\n\n.jp-travel .small {\n  font-size: 12px;\n}\n\n.jp-travel img {\n  max-width: 100%;\n}\n\n.jp-travel a {\n  text-decoration: none;\n}\n\n.jp-travel .container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding-top: 40px;\n}\n\n.jp-travel h1,\n.jp-travel h2,\n.jp-travel h3,\n.jp-travel h4 {\n  font-family: \"Dosis\", arial, tahoma, verdana;\n  font-weight: 500;\n}\n\n.jp-travel .font-white {\n  color: #fff;\n}\n\n.jp-travel header {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: #fff;\n  height: 40px;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  text-align: center;\n  z-index: 3;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.jp-travel header nav {\n  height: 100%;\n}\n\n.jp-travel header nav .nav-item {\n  padding: 0 15px;\n  height: 100%;\n  text-align: center;\n  line-height: 40px;\n  cursor: pointer;\n}\n\n.jp-travel header nav .nav-item a {\n  color: #fff;\n  text-decoration: none;\n  line-height: 40px;\n  font-size: 12px;\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: block;\n}\n\n.jp-travel header nav .nav-item a:hover:before,\n.jp-travel header nav .nav-item a.active:before {\n  content: '';\n  background-image: url(\"http://feversoul.com/jp/src/assets/img/spinner-circle.svg\");\n  background-size: 36px;\n  width: 36px;\n  height: 36px;\n  background-repeat: no-repeat;\n  background-position: center;\n  display: block;\n  position: absolute;\n  top: 2px;\n  left: calc(50% - 18px);\n}\n\n.jp-travel .map-container {\n  width: 100%;\n}\n\n.jp-travel .map-container .container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.jp-travel .map-container input {\n  display: none;\n  visibility: hidden;\n}\n\n.jp-travel .map-container label {\n  display: block;\n  padding: 0.5em;\n  text-align: center;\n  border-bottom: 1px solid #CCC;\n  color: #666;\n  margin-bottom: 0px;\n}\n\n.jp-travel .map-container label:hover {\n  color: #000;\n}\n\n.jp-travel .map-container label::before {\n  font-family: Consolas, monaco, monospace;\n  font-weight: bold;\n  font-size: 15px;\n  content: \"+\";\n  vertical-align: text-top;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin-left: 3px;\n  margin-right: 3px;\n  background: radial-gradient(ellipse at center, #CCC 50%, transparent 50%);\n}\n\n.jp-travel .map-container section {\n  padding: 0 20px;\n}\n\n.jp-travel #preview {\n  top: 75px;\n  height: 220px;\n  position: fixed;\n  width: 220px;\n  z-index: 3;\n  background-position: center;\n  background-size: cover;\n  border: 1px solid #eee;\n  display: none;\n}\n\n.jp-travel .project-name {\n  text-align: center;\n  padding: 10px 0;\n}\n\n.jp-travel .fixed-line {\n  width: 3px;\n  height: 100%;\n  left: 50%;\n  top: 70vh !important;\n  position: fixed;\n  z-index: 2;\n}\n\n.jp-travel .fixed-line .timeline-icon {\n  background: #ee4d4d;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  overflow: hidden;\n  margin-left: -23px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n}\n\n.jp-travel .fixed-line .timeline-icon .start {\n  position: relative;\n  top: 14px;\n  left: 14px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel .fixed-line {\n    left: 28px;\n  }\n}\n\n.jp-travel #timeline {\n  width: 100%;\n  margin: 30px auto;\n  position: relative;\n  padding: 0 10px;\n  -webkit-transition: all 0.4s ease;\n  -moz-transition: all 0.4s ease;\n  -ms-transition: all 0.4s ease;\n  transition: all 0.4s ease;\n}\n\n.jp-travel #timeline:before {\n  content: \"\";\n  width: 3px;\n  height: 100%;\n  background: #ee4d4d;\n  left: 50%;\n  top: 0;\n  position: absolute;\n}\n\n.jp-travel #timeline:after {\n  content: \"\";\n  clear: both;\n  display: table;\n  width: 100%;\n}\n\n.jp-travel #timeline .timeline-item {\n  margin-bottom: 50px;\n  position: relative;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon {\n  background: #ee4d4d;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  overflow: hidden;\n  margin-left: -23px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon .start {\n  position: relative;\n  top: 14px;\n  left: 14px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n\n.jp-travel #timeline .timeline-item .timeline-icon svg {\n  position: relative;\n  top: 14px;\n  left: 14px;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content {\n  width: 45%;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.5);\n  padding: 20px;\n  -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -ms-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -ms-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content h5 {\n  padding: 15px;\n  color: #fff;\n  margin: -20px -20px 0 -20px;\n  font-weight: 300;\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  -ms-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content p {\n  padding-top: 10px;\n  line-height: 1.75;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content:before {\n  content: '';\n  position: absolute;\n  left: 45%;\n  top: 20px;\n  width: 0;\n  height: 0;\n  border-top: 7px solid transparent;\n  border-bottom: 7px solid transparent;\n  border-left: 7px solid #fff;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content.right {\n  float: right;\n}\n\n.jp-travel #timeline .timeline-item .timeline-content.right:before {\n  content: '';\n  right: 45%;\n  left: inherit;\n  border-left: 0;\n  border-right: 7px solid #fff;\n}\n\n.jp-travel #mapcard .mapcard-item {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map {\n  height: 300px;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map.full-screen-bg {\n  height: 100vh;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-map.large {\n  height: 70vh;\n  width: 100%;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content {\n  opacity: 0.9;\n  background: #fff;\n  padding: 20px;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content h5 {\n  padding: 15px;\n  color: #ee4d4d;\n  background: #fff;\n  margin: -20px -20px 0 -20px;\n  font-weight: 300;\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  -ms-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content p {\n  padding-top: 10px;\n  line-height: 1.75;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content:before {\n  content: '';\n  position: absolute;\n  left: 100%;\n  top: 20px;\n  width: 0;\n  height: 0;\n  border-top: 7px solid transparent;\n  border-bottom: 7px solid transparent;\n  border-left: 7px solid #ee4d4d;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content.right {\n  float: right;\n}\n\n.jp-travel #mapcard .mapcard-item .mapcard-content.right:before {\n  content: '';\n  right: 100%;\n  left: inherit;\n  border-left: 0;\n  border-right: 7px solid #ee4d4d;\n}\n\n.jp-travel #fp-nav ul li a span,\n.jp-travel .fp-slidesNav ul li a span {\n  background: #fff !important;\n}\n\n.jp-travel .btn-radius {\n  height: 50px;\n  width: 50px;\n  cursor: pointer;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  background: transparent;\n  border: 2px solid #f27c7c;\n  color: #f27c7c;\n  display: inline-block;\n  position: relative;\n  text-transform: uppercase;\n  font-size: 12px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-transition: background 0.3s ease;\n  -moz-transition: background 0.3s ease;\n  -ms-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  -webkit-box-shadow: 2px 2px 0 #f27c7c;\n  -moz-box-shadow: 2px 2px 0 #f27c7c;\n  -ms-box-shadow: 2px 2px 0 #f27c7c;\n  box-shadow: 2px 2px 0 #f27c7c;\n}\n\n.jp-travel .btn-radius:hover {\n  box-shadow: none;\n  top: 2px;\n  left: 2px;\n  -webkit-box-shadow: 2px 2px 0 transparent;\n  -moz-box-shadow: 2px 2px 0 transparent;\n  -ms-box-shadow: 2px 2px 0 transparent;\n  box-shadow: 2px 2px 0 transparent;\n}\n\n.jp-travel .btn {\n  padding: 5px 15px;\n  text-decoration: none;\n  background: transparent;\n  border: 2px solid white;\n  color: white;\n  display: inline-block;\n  position: relative;\n  text-transform: uppercase;\n  font-size: 12px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-transition: background 0.3s ease;\n  -moz-transition: background 0.3s ease;\n  -ms-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  -webkit-box-shadow: 2px 2px 0 white;\n  -moz-box-shadow: 2px 2px 0 white;\n  -ms-box-shadow: 2px 2px 0 white;\n  box-shadow: 2px 2px 0 white;\n}\n\n.jp-travel .btn a {\n  color: white;\n}\n\n.jp-travel .btn:hover {\n  box-shadow: none;\n  top: 2px;\n  left: 2px;\n  -webkit-box-shadow: 2px 2px 0 transparent;\n  -moz-box-shadow: 2px 2px 0 transparent;\n  -ms-box-shadow: 2px 2px 0 transparent;\n  box-shadow: 2px 2px 0 transparent;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel #timeline {\n    margin: 30px;\n    padding: 0px;\n    width: 90%;\n  }\n\n  .jp-travel #timeline:before {\n    left: 0;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-content {\n    width: 90%;\n    float: right;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-content:before,\n  .jp-travel #timeline .timeline-item .timeline-content.right:before {\n    left: 10%;\n    margin-left: -6px;\n    border-left: 0;\n    border-right: 7px solid #ee4d4d;\n  }\n\n  .jp-travel #timeline .timeline-item .timeline-icon {\n    left: 0;\n  }\n}\n\n.jp-travel .station .station-item {\n  text-align: center;\n  padding: 5px;\n}\n\n.jp-travel .go-down {\n  width: 30px;\n  height: 30px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 40px;\n  margin-top: -15px;\n  transform: translateY(0px);\n  animation: arrowDown 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n  cursor: pointer;\n}\n\n.jp-travel .icon-arrow {\n  display: inline-block;\n  font-size: 26px;\n  color: #f27c7c;\n  text-align: center;\n  width: 100px;\n  height: 50px;\n  line-height: 50px;\n  /* border: 2px solid $color; */\n  overflow: hidden;\n  text-transform: uppercase;\n  transform: rotateZ(90deg);\n  /* webkit-box-shadow: 2px -2px 0 #b3c33a;\n    -moz-box-shadow: 2px -2px 0 #b3c33a;\n    -ms-box-shadow: 2px -2px 0 #b3c33a;\n    box-shadow: 2px -2px 0 #b3c33a; */\n  transition: width 0.5s ease-in-out, margin 0.5s ease-in-out, border-radius 0.25s ease-in-out, color 0.25s ease-in-out;\n}\n\n@media screen and (max-width: 768px) {\n  .jp-travel .icon-arrow {\n    display: none;\n  }\n}\n\n.jp-travel .icon-arrow:hover,\n.jp-travel .icon-arrow.auto {\n  width: 50px;\n  border-radius: 40px;\n  color: rgba(242, 124, 124, 0);\n  transition: width 0.5s ease-in-out, margin 0.5s ease-in-out, border-radius 1s 0.25 ease-in-out, color 0.25s ease-in-out 0.25s;\n}\n\n.jp-travel .icon-arrow:hover:before,\n.jp-travel .icon-arrow.auto:before {\n  animation: lineUp 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n}\n\n.jp-travel .icon-arrow:hover:after,\n.jp-travel .icon-arrow.auto:after {\n  animation: tipUp 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;\n}\n\n.jp-travel .icon-arrow:before {\n  position: absolute;\n  display: inline-block;\n  content: \"\";\n  background: #f27c7c;\n  width: 5px;\n  height: 35px;\n  top: 50%;\n  left: 50%;\n  margin-top: -8px;\n  margin-left: -3px;\n  transform: translateY(50px);\n}\n\n.jp-travel .icon-arrow:after {\n  position: absolute;\n  display: inline-block;\n  content: \"\";\n  width: 20px;\n  height: 20px;\n  color: #f27c7c;\n  border-top: 5px solid;\n  border-left: 5px solid;\n  transform: rotateZ(45deg);\n  top: 50%;\n  left: 55%;\n  margin-top: -6px;\n  margin-left: -13px;\n  transform: translateY(50px) rotateZ(45deg);\n}\n\n@keyframes arrowDown {\n  0% {\n    transform: translateY(-20px);\n  }\n\n  100% {\n    transform: translateY(20px);\n  }\n}\n\n@keyframes tipUp {\n  0% {\n    transform: translateY(50px) rotateZ(45deg);\n  }\n\n  100% {\n    transform: translateY(-70px) rotateZ(45deg);\n  }\n}\n\n@keyframes lineUp {\n  0% {\n    transform: translateY(50px);\n  }\n\n  100% {\n    transform: translateY(-70px);\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sZXZlbnBhbmcvd3d3L3Z1ZS10cmF2ZWwvY2xpZW50L3ZpZXdzL2NvbW1vbi9jb21tb24uc2NzcyIsIi9Vc2Vycy9sZXZlbnBhbmcvd3d3L3Z1ZS10cmF2ZWwvY2xpZW50L3ZpZXdzL2NvbW1vbi9mb250L2dvb2dsZS1mb250LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcImZvbnQvZ29vZ2xlLWZvbnRcIjtcbi8vIFZhcmlhYmxlc1xuJGJnLWJvZHk6ICNmOWY5Zjk7XG5cbiRyZWQ6ICNlZTRkNGQ7XG4kYmx1ZTogIzJiMmU0ODtcbiRwcmltYXJ5LWNvbG9yOiAkcmVkO1xuJHNlY29uZGFyeS1jb2xvcjogJGJsdWU7XG5cblxuLy8gVHlwb2dyYXBoeVxuJGJhc2UtZm9udDogaGVsdmV0aWNhLCBhcmlhbCwgdGFob21hLCB2ZXJkYW5hO1xuJGJhc2UtZm9udC10aXRsZTogXCJEb3Npc1wiLCBhcmlhbCwgdGFob21hLCB2ZXJkYW5hO1xuXG4kYmFzZS1mb250LWNvbG9yOiAjNzI2Zjc3O1xuXG4vLyBUaW1lbGluZVxuJHRpbWVsaW5lLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcblxuLmpwLXRyYXZlbHtcbiAgLy8gTWl4aW5zIGFuZCBQbGFjZWhvbGRlcnNcbiAgLnJzLWJnLWltZ3tcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICB9XG4gICVjbGVhcmZpeCB7XG4gICAgJjphZnRlciwgJjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgfVxuICB9XG5cbiAgQG1peGluIHByZWZpeCgkcHJvcCwgJHZhbCkge1xuICAgIEBlYWNoICRwcmVmaXggaW4gJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nLCAnJyB7XG4gICAgICAjeyRwcmVmaXh9I3skcHJvcH06ICR2YWw7XG4gICAgfVxuICB9XG4gICosICo6YmVmb3JlLCAqOmFmdGVyIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLy9nb29nbGVcbiAgLmdtbm9wcmludCBhLCAuZ21ub3ByaW50IHNwYW4ge1xuICAgICAgZGlzcGxheTpub25lO1xuICB9XG4gIC5nbW5vcHJpbnQgZGl2IHtcbiAgICAgIGJhY2tncm91bmQ6bm9uZSAhaW1wb3J0YW50O1xuICB9XG4gICNHTWFwc0lEIGRpdiBkaXYgYSBkaXYgaW1ne1xuICAgICAgZGlzcGxheTpub25lO1xuICB9XG4gIC8vZ29vZ2xlXG4gIC8vZnVsbHBhZ2VcbiAgI2ZwLW5hdntcbiAgICAmLnJpZ2h0e1xuICAgICAgcmlnaHQ6IDVweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC43KTtcbiAgICB9XG4gICAgbGl7XG4gICAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gIH0gXG4gIC8vZnVsbHBhZ2VcbiAgYm9keSwgaHRtbCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG4gIGJvZHkge1xuICAgIGJhY2tncm91bmQ6ICRiZy1ib2R5O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC1mYW1pbHk6ICRiYXNlLWZvbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAkYmFzZS1mb250LWNvbG9yO1xuICB9XG4gIC5zbWFsbHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbiAgaW1nIHttYXgtd2lkdGg6IDEwMCU7fVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuXG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMTEwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICB9XG4gIC5jb250YWluZXItZnVsbHNjcmVlbntcbiAgfVxuICBoMSwgaDIsIGgzLCBoNCB7XG4gICAgZm9udDp7XG4gICAgICBmYW1pbHk6ICRiYXNlLWZvbnQtdGl0bGU7XG4gICAgICB3ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cblxuICAuZm9udC13aGl0ZXtcbiAgICBjb2xvcjogI2ZmZjtcbiAgfSAgXG5cbiAgaGVhZGVye1xuICAgIC8vb3BhY2l0eTogMC45O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC4zKTtcbiAgICBjb2xvcjojZmZmO1xuICAgIGhlaWdodDogNDBweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHotaW5kZXg6IDM7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgbmF2e1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgLm5hdi1pdGVte1xuICAgICAgICBwYWRkaW5nOiAwIDE1cHg7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBhe1xuICAgICAgICAgIGNvbG9yOiNmZmY7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAmOmhvdmVyLCYuYWN0aXZle1xuICAgICAgICAgICAgJjpiZWZvcmV7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHA6Ly9mZXZlcnNvdWwuY29tL2pwL3NyYy9hc3NldHMvaW1nL3NwaW5uZXItY2lyY2xlLnN2ZycpO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDM2cHg7XG4gICAgICAgICAgICAgIHdpZHRoOiAzNnB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgdG9wOiAycHg7XG4gICAgICAgICAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMThweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfVxuICAubWFwLWNvbnRhaW5lcntcbiAgICAvL2JhY2tncm91bmQ6ICNmZmY7XG4gICAgLy90b3A6IDQwcHg7XG4gICAgLy9sZWZ0OiAwO1xuICAgIC8vIG92ZXJmbG93LXk6aGlkZGVuO1xuICAgIC8vIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICAvLyB6LWluZGV4OiAyO1xuICAgIC5jb250YWluZXJ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuICAgIGlucHV0IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuICAgIGxhYmVsIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0NDQztcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgLy9iYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICAgIH1cbiAgICBsYWJlbDpob3ZlciB7XG4gICAgICBjb2xvcjogIzAwMDtcbiAgICB9XG4gICAgbGFiZWw6OmJlZm9yZSB7XG4gICAgICBmb250LWZhbWlseTogQ29uc29sYXMsIG1vbmFjbywgbW9ub3NwYWNlO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICBjb250ZW50OiBcIitcIjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0ZXh0LXRvcDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgIG1hcmdpbi1yaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCAjQ0NDIDUwJSwgdHJhbnNwYXJlbnQgNTAlKTtcbiAgICB9XG4gICAgc2VjdGlvbiB7XG4gICAgICBwYWRkaW5nOiAwIDIwcHg7XG4gICAgfVxuICB9XG4gICNwcmV2aWV3e1xuICAgIHRvcDogNzVweDtcbiAgICBoZWlnaHQ6MjIwcHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAyMjBweDtcbiAgICB6LWluZGV4OiAzO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuICAucHJvamVjdC1uYW1lIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICB9XG5cbiAgLy8gSGVhZGVyXG5cblxuICAvLyBUaW1lbGluZVxuXG4gIC5maXhlZC1saW5le1xuICAgIHdpZHRoOiAzcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6NzB2aCFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDI7XG4gICAgLnRpbWVsaW5lLWljb24ge1xuICAgICAgYmFja2dyb3VuZDogI2VlNGQ0ZDtcbiAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMjNweDtcbiAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLW1vei1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAtbXMtYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLnN0YXJ0e1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMTRweDtcbiAgICAgICAgbGVmdDogMTRweDtcbiAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgfVxuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgbGVmdDoyOHB4XG4gICAgfVxuICB9XG4gICN0aW1lbGluZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAzMHB4IGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICBAaW5jbHVkZSBwcmVmaXgodHJhbnNpdGlvbiwgYWxsIC40cyBlYXNlKTtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6XCJcIjtcbiAgICAgIHdpZHRoOiAzcHg7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kOiAkdGltZWxpbmUtY29sb3I7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICB0b3A6IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICBcbiAgICAudGltZWxpbmUtaXRlbSB7XG4gICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgQGV4dGVuZCAlY2xlYXJmaXg7XG5cbiAgICAgIC50aW1lbGluZS1pY29uIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTIzcHg7XG4gICAgICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCA1MCUpO1xuICAgICAgICAuc3RhcnR7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHRvcDogMTRweDtcbiAgICAgICAgICBsZWZ0OiAxNHB4O1xuICAgICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuICAgICAgICBzdmcge1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB0b3A6IDE0cHg7XG4gICAgICAgICAgbGVmdDogMTRweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAudGltZWxpbmUtY29udGVudCB7XG4gICAgICAgIHdpZHRoOiA0NSU7XG4gICAgICAgIC8vYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4KGJveC1zaGFkb3csIDAgM3B4IDAgcmdiYSgwLDAsMCwwLjEpKTtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4KGJvcmRlci1yYWRpdXMsIDVweCk7XG4gICAgICAgIEBpbmNsdWRlIHByZWZpeCh0cmFuc2l0aW9uLCBhbGwgLjNzIGVhc2UpO1xuICAgICAgICBoNSB7XG4gICAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBtYXJnaW46IC0yMHB4IC0yMHB4IDAgLTIwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICBAaW5jbHVkZSBwcmVmaXgoYm9yZGVyLXJhZGl1cywgM3B4IDNweCAwIDApO1xuICAgICAgICAgIC8vYmFja2dyb3VuZDogJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHB7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNzU7XG4gICAgICAgIH1cbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBsZWZ0OiA0NSU7XG4gICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgIHdpZHRoOiAwOyBcbiAgICAgICAgICBoZWlnaHQ6IDA7IFxuICAgICAgICAgIGJvcmRlci10b3A6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA3cHggc29saWQgdHJhbnNwYXJlbnQ7IFxuICAgICAgICAgIGJvcmRlci1sZWZ0OjdweCBzb2xpZCAjZmZmOyBcbiAgICAgICAgfVxuXG4gICAgICAgICYucmlnaHQge1xuICAgICAgICAgIGZsb2F0OiByaWdodDtcblxuICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcmlnaHQ6IDQ1JTtcbiAgICAgICAgICAgIGxlZnQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogN3B4IHNvbGlkICNmZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICNtYXBjYXJke1xuICAgIC5tYXBjYXJkLWl0ZW0ge1xuICAgICAgLy9tYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgLy9wb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAvL2hlaWdodDogMTAwdmg7XG4gICAgICAvL3BhZGRpbmc6IDIwcHggMjBweCAyMHB4IDIwcHg7XG4gICAgICAvL0BleHRlbmQgJWNsZWFyZml4O1xuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAubWFwY2FyZC1tYXB7XG4gICAgICAgIC8vb3BhY2l0eTogMC45O1xuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xuICAgICAgICAmLmZ1bGwtc2NyZWVuLWJne1xuICAgICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgfVxuICAgICAgICAmLmxhcmdle1xuICAgICAgICAgIGhlaWdodDogNzB2aDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm1hcGNhcmQtY29udGVudCB7XG4gICAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgaDUge1xuICAgICAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICAgICAgY29sb3I6ICR0aW1lbGluZS1jb2xvcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIG1hcmdpbjogLTIwcHggLTIwcHggMCAtMjBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCAzcHggM3B4IDAgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcHtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS43NTtcbiAgICAgICAgfVxuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGxlZnQ6IDEwMCU7XG4gICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgIHdpZHRoOiAwOyBcbiAgICAgICAgICBoZWlnaHQ6IDA7IFxuICAgICAgICAgIGJvcmRlci10b3A6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA3cHggc29saWQgdHJhbnNwYXJlbnQ7IFxuICAgICAgICAgIGJvcmRlci1sZWZ0OjdweCBzb2xpZCAkdGltZWxpbmUtY29sb3I7IFxuICAgICAgICB9XG5cbiAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuXG4gICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICByaWdodDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogN3B4IHNvbGlkICR0aW1lbGluZS1jb2xvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdWxscGFnZSBqc1xuXG4gICNmcC1uYXYgdWwgbGkgYSBzcGFuLCAuZnAtc2xpZGVzTmF2IHVsIGxpIGEgc3BhbntcbiAgICBiYWNrZ3JvdW5kOiAjZmZmIWltcG9ydGFudDtcbiAgfVxuXG5cbiAgLy8gQnV0dG9uc1xuICAuYnRuLXJhZGl1cyB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGxpZ2h0ZW4oJHByaW1hcnktY29sb3IsIDEwJSk7XG4gICAgY29sb3I6IGxpZ2h0ZW4oJHByaW1hcnktY29sb3IsIDEwJSk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBAaW5jbHVkZSBwcmVmaXgoYm9yZGVyLXJhZGl1cywgNTAlKTtcbiAgICBAaW5jbHVkZSBwcmVmaXgodHJhbnNpdGlvbiwgYmFja2dyb3VuZCAuM3MgZWFzZSk7XG4gICAgQGluY2x1ZGUgcHJlZml4KGJveC1zaGFkb3csIDJweCAycHggMCBsaWdodGVuKCRwcmltYXJ5LWNvbG9yLCAxMCUpKTtcblxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogbm9uZSA7XG4gICAgICB0b3A6IDJweDtcbiAgICAgIGxlZnQ6IDJweDtcbiAgICAgIEBpbmNsdWRlIHByZWZpeChib3gtc2hhZG93LCAycHggMnB4IDAgdHJhbnNwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC5idG4ge1xuICAgIHBhZGRpbmc6IDVweCAxNXB4O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBsaWdodGVuKCNmZmYsIDEwJSk7XG4gICAgY29sb3I6IGxpZ2h0ZW4oI2ZmZiwgMTAlKTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIEBpbmNsdWRlIHByZWZpeChib3JkZXItcmFkaXVzLCA1cHgpO1xuICAgIEBpbmNsdWRlIHByZWZpeCh0cmFuc2l0aW9uLCBiYWNrZ3JvdW5kIC4zcyBlYXNlKTtcbiAgICBAaW5jbHVkZSBwcmVmaXgoYm94LXNoYWRvdywgMnB4IDJweCAwIGxpZ2h0ZW4oI2ZmZiwgMTAlKSk7XG4gICAgYXtcbiAgICAgIGNvbG9yOiBsaWdodGVuKCNmZmYsIDEwJSk7XG4gICAgfVxuICAgICY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogbm9uZSA7XG4gICAgICB0b3A6IDJweDtcbiAgICAgIGxlZnQ6IDJweDtcbiAgICAgIEBpbmNsdWRlIHByZWZpeChib3gtc2hhZG93LCAycHggMnB4IDAgdHJhbnNwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgI3RpbWVsaW5lIHtcbiAgICAgIG1hcmdpbjogMzBweDtcbiAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50aW1lbGluZS1pdGVtIHtcbiAgICAgICAgLnRpbWVsaW5lLWNvbnRlbnQge1xuICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgIFxuICAgICAgICAgICY6YmVmb3JlLCAmLnJpZ2h0OmJlZm9yZSB7XG4gICAgICAgICAgICBsZWZ0OiAxMCU7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogLTZweDtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiA3cHggc29saWQgJHRpbWVsaW5lLWNvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC50aW1lbGluZS1pY29uIHtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9zdGF0aW9uXG4gIC5zdGF0aW9ue1xuICAgIC5zdGF0aW9uLWl0ZW17XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA1cHg7XG4gICAgfVxuICB9XG5cblxuXG4gICRiYWNrOiAjMzMzO1xuICAvLyRjb2xvcjogI2IzYzMzYTtcbiAgJGFycm93Q29sb3I6I2YyN2M3YztcbiAgJHNwZWVkOiAxcztcblxuICAuZ28tZG93bntcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDQwcHg7XG4gICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XG4gICAgYW5pbWF0aW9uOiBhcnJvd0Rvd24gJHNwZWVkIGN1YmljLWJlemllcigwLjAsIDAuNiwgMS4wLCAwLjQpIGluZmluaXRlIC41cztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAuaWNvbi1hcnJvdyB7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDI2cHg7XG4gICAgY29sb3I6ICRhcnJvd0NvbG9yO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkICRjb2xvcjsgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKDkwZGVnKTtcbiAgICAvKiB3ZWJraXQtYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhO1xuICAgIC1tb3otYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhO1xuICAgIC1tcy1ib3gtc2hhZG93OiAycHggLTJweCAwICNiM2MzM2E7XG4gICAgYm94LXNoYWRvdzogMnB4IC0ycHggMCAjYjNjMzNhOyAqL1xuICAgIHRyYW5zaXRpb246IHdpZHRoICRzcGVlZCouNSBlYXNlLWluLW91dCxcbiAgICAgICAgICAgICAgICBtYXJnaW4gJHNwZWVkKi41IGVhc2UtaW4tb3V0LFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXMgJHNwZWVkKi4yNSBlYXNlLWluLW91dCxcbiAgICAgICAgICAgICAgICBjb2xvciAkc3BlZWQqLjI1IGVhc2UtaW4tb3V0O1xuICAgICY6aG92ZXIsICYuYXV0byB7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gICAgICBjb2xvcjogcmdiYSgkYXJyb3dDb2xvciwgMCk7XG4gICAgICB0cmFuc2l0aW9uOiB3aWR0aCAkc3BlZWQqLjUgZWFzZS1pbi1vdXQsXG4gICAgICAgICAgICAgICAgICBtYXJnaW4gJHNwZWVkKi41IGVhc2UtaW4tb3V0LFxuICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1cyAkc3BlZWQuMjUgZWFzZS1pbi1vdXQsXG4gICAgICAgICAgICAgICAgICBjb2xvciAkc3BlZWQqLjI1IGVhc2UtaW4tb3V0ICRzcGVlZCouMjU7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGFuaW1hdGlvbjogbGluZVVwICRzcGVlZCBjdWJpYy1iZXppZXIoMC4wLCAwLjYsIDEuMCwgMC40KSBpbmZpbml0ZSAuNXM7XG4gICAgICB9XG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0aXBVcCAkc3BlZWQgY3ViaWMtYmV6aWVyKDAuMCwgMC42LCAxLjAsIDAuNCkgaW5maW5pdGUgLjVzO1xuICAgICAgfVxuICAgIH1cbiAgICAmOmJlZm9yZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgYmFja2dyb3VuZDogJGFycm93Q29sb3I7XG4gICAgICB3aWR0aDogNXB4O1xuICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICBtYXJnaW4tdG9wOiAtOHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IC0zcHg7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCk7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgY29sb3I6ICRhcnJvd0NvbG9yO1xuICAgICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkO1xuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDU1JTtcbiAgICAgIG1hcmdpbi10b3A6IC02cHg7XG4gICAgICBtYXJnaW4tbGVmdDogLTEzcHg7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCkgcm90YXRlWig0NWRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBhcnJvd0Rvd24ge1xuICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpfVxuICAgIDEwMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KX1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgdGlwVXAge1xuICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNTBweCkgcm90YXRlWig0NWRlZyk7IH1cbiAgICAxMDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwcHgpIHJvdGF0ZVooNDVkZWcpOyB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGxpbmVVcCB7XG4gICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1MHB4KTsgfVxuICAgIDEwMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzBweCk7IH1cbiAgfVxufVxuXG5cbiIsIi8qIGxhdGluLWV4dCAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnRG9zaXMnO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHNyYzogbG9jYWwoJ0Rvc2lzIExpZ2h0JyksIGxvY2FsKCdEb3Npcy1MaWdodCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L1NIUXpUUUJJNzE1MmhTckl1R1VpVkJrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgTGlnaHQnKSwgbG9jYWwoJ0Rvc2lzLUxpZ2h0JyksIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvZG9zaXMvdjYvN2FKelYxNEh6QU9pd05UaVBndWNHWFloamJTcHZjNDdlZTZ4Ul84MEhudy53b2ZmMikgZm9ybWF0KCd3b2ZmMicpO1xuICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkM2LCBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIyMTIsIFUrMjIxNTtcbn1cbi8qIHNhbXBsZWQgdXNhZ2UgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogMzAwO1xuICBzcmM6IHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3N0YXRzL0Rvc2lzL25vcm1hbC8zMDApO1xuICB1bmljb2RlLXJhbmdlOiBVKzIwO1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgUmVndWxhcicpLCBsb2NhbCgnRG9zaXMtUmVndWxhcicpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2LzNpc0U5bXVNTU9xMUs3VFE3SGtLdklER0RVR2ZEa1h5Zmt6VkRlbHpmRmsud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgUmVndWxhcicpLCBsb2NhbCgnRG9zaXMtUmVndWxhcicpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L29hQkZqN0Z6OVk5X2VXM2s5SmQ5WDZDV2N5bmZfY0R4WHdDTHhpaXhHMWMud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMjEyLCBVKzIyMTU7XG59XG4vKiBsYXRpbi1leHQgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBzcmM6IGxvY2FsKCdEb3NpcyBNZWRpdW0nKSwgbG9jYWwoJ0Rvc2lzLU1lZGl1bScpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L05JM3VWT19vMlVyc3g2WjFMeXkzb1JrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgTWVkaXVtJyksIGxvY2FsKCdEb3Npcy1NZWRpdW0nKSwgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9kb3Npcy92Ni9tQWNMSldkUFdETmlESndKdmNXS2MzWWhqYlNwdmM0N2VlNnhSXzgwSG53LndvZmYyKSBmb3JtYXQoJ3dvZmYyJyk7XG4gIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQzYsIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjIxMiwgVSsyMjE1O1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgU2VtaUJvbGQnKSwgbG9jYWwoJ0Rvc2lzLVNlbWlCb2xkJyksIHVybChodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvZG9zaXMvdjYveWVTSVlldmVZU3BWTjA0WmJXVFdnaGtBejRyWW40N1p5MnJ2aWdXUWY2dy53b2ZmMikgZm9ybWF0KCd3b2ZmMicpO1xuICB1bmljb2RlLXJhbmdlOiBVKzAxMDAtMDI0RiwgVSsxRTAwLTFFRkYsIFUrMjBBMC0yMEFCLCBVKzIwQUQtMjBDRiwgVSsyQzYwLTJDN0YsIFUrQTcyMC1BN0ZGO1xufVxuLyogbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0Rvc2lzJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNjAwO1xuICBzcmM6IGxvY2FsKCdEb3NpcyBTZW1pQm9sZCcpLCBsb2NhbCgnRG9zaXMtU2VtaUJvbGQnKSwgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9kb3Npcy92Ni9PNlNPdTloWXNQSFRVNDNSMTdOUzVYWWhqYlNwdmM0N2VlNnhSXzgwSG53LndvZmYyKSBmb3JtYXQoJ3dvZmYyJyk7XG4gIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQzYsIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjIxMiwgVSsyMjE1O1xufVxuLyogbGF0aW4tZXh0ICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgQm9sZCcpLCBsb2NhbCgnRG9zaXMtQm9sZCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2L2ZQN3VkNFVUVVdHeG8tblYxam9DMVJrQXo0clluNDdaeTJydmlnV1FmNncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMTAwLTAyNEYsIFUrMUUwMC0xRUZGLCBVKzIwQTAtMjBBQiwgVSsyMEFELTIwQ0YsIFUrMkM2MC0yQzdGLCBVK0E3MjAtQTdGRjtcbn1cbi8qIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdEb3Npcyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgc3JjOiBsb2NhbCgnRG9zaXMgQm9sZCcpLCBsb2NhbCgnRG9zaXMtQm9sZCcpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL2Rvc2lzL3Y2LzIyYURSRzVYOWw3b2JsanR6N3RpaG5ZaGpiU3B2YzQ3ZWU2eFJfODBIbncud29mZjIpIGZvcm1hdCgnd29mZjInKTtcbiAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMjEyLCBVKzIyMTU7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBLGVBQWU7QUFDZixVQUFVO0VBQ1IsV0FBVyxFQUFFLE9BQU87RUFDcEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLEdBQUc7RUFDaEIsR0FBRyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLDJGQUEyRixDQUFDLGVBQWU7RUFDNUosYUFBYSxFQUFFLDRFQUE0RTs7QUFFN0YsV0FBVztBQUNYLFVBQVU7RUFDUixXQUFXLEVBQUUsT0FBTztFQUNwQixVQUFVLEVBQUUsTUFBTTtFQUNsQixXQUFXLEVBQUUsR0FBRztFQUNoQixHQUFHLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsMkZBQTJGLENBQUMsZUFBZTtFQUM1SixhQUFhLEVBQUUscUdBQXFHOztBQUV0SCxtQkFBbUI7QUFDbkIsVUFBVTtFQUNSLFdBQVcsRUFBRSxPQUFPO0VBQ3BCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLEdBQUcsRUFBRSxxREFBcUQ7RUFDMUQsYUFBYSxFQUFFLElBQUk7O0FBRXJCLGVBQWU7QUFDZixVQUFVO0VBQ1IsV0FBVyxFQUFFLE9BQU87RUFDcEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLEdBQUc7RUFDaEIsR0FBRyxFQUFF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 */","@import \"font/google-font\";\n// Variables\n$bg-body: #f9f9f9;\n\n$red: #ee4d4d;\n$blue: #2b2e48;\n$primary-color: $red;\n$secondary-color: $blue;\n\n\n// Typography\n$base-font: helvetica, arial, tahoma, verdana;\n$base-font-title: \"Dosis\", arial, tahoma, verdana;\n\n$base-font-color: #726f77;\n\n// Timeline\n$timeline-color: $primary-color;\n\n.jp-travel{\n  // Mixins and Placeholders\n  .rs-bg-img{\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n  }\n  %clearfix {\n    &:after, &:before {\n      content: '';\n      display: block;\n      width: 100%;\n      clear: both;\n    }\n  }\n\n  @mixin prefix($prop, $val) {\n    @each $prefix in '-webkit-', '-moz-', '-ms-', '' {\n      #{$prefix}#{$prop}: $val;\n    }\n  }\n  *, *:before, *:after {\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n  }\n  //google\n  .gmnoprint a, .gmnoprint span {\n      display:none;\n  }\n  .gmnoprint div {\n      background:none !important;\n  }\n  #GMapsID div div a div img{\n      display:none;\n  }\n  //google\n  //fullpage\n  #fp-nav{\n    &.right{\n      right: 5px;\n      background-color: rgba(0,0,0,0.7);\n    }\n    li{\n      margin-top: 12px;\n      margin-bottom: 12px;\n    }\n  } \n  //fullpage\n  body, html {\n    height: 100%;\n  }\n  body {\n    background: $bg-body;\n    background-size: cover;\n    margin: 0;\n    padding: 0;\n    font-family: $base-font;\n    line-height: 20px;\n    font-size: 14px;\n    color: $base-font-color;\n  }\n  .small{\n    font-size: 12px;\n  }\n  img {max-width: 100%;}\n\n  a {\n    text-decoration: none;\n  }\n\n  .container {\n    max-width: 1100px;\n    margin: 0 auto;\n    padding-top: 40px;\n  }\n  .container-fullscreen{\n  }\n  h1, h2, h3, h4 {\n    font:{\n      family: $base-font-title;\n      weight: 500;\n    }\n  }\n\n  .font-white{\n    color: #fff;\n  }  \n\n  header{\n    //opacity: 0.9;\n    background-color: rgba(0,0,0,0.3);\n    color:#fff;\n    height: 40px;\n    position: fixed;\n    width: 100%;\n    top: 0;\n    left: 0;\n    text-align: center;\n    z-index: 3;\n    padding-left: 20px;\n    padding-right: 20px;\n    nav{\n      height: 100%;\n      .nav-item{\n        padding: 0 15px;\n        height: 100%;\n        text-align: center;\n        line-height: 40px;\n        cursor: pointer;\n        a{\n          color:#fff;\n          text-decoration: none;\n          line-height: 40px;\n          font-size: 12px;\n          cursor: pointer;\n          height: 100%;\n          width: 100%;\n          position: relative;\n          display: block;\n          &:hover,&.active{\n            &:before{\n              content: '';\n              background-image: url('http://feversoul.com/jp/src/assets/img/spinner-circle.svg');\n              background-size: 36px;\n              width: 36px;\n              height: 36px;\n              background-repeat: no-repeat;\n              background-position: center;\n              display: block;\n              position: absolute;\n              top: 2px;\n              left: calc(50% - 18px);\n            }\n          }\n        }\n        \n      }\n    }\n  }\n  .map-container{\n    //background: #fff;\n    //top: 40px;\n    //left: 0;\n    // overflow-y:hidden;\n    // position: fixed;\n    width: 100%;\n    // z-index: 2;\n    .container{\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    }\n    input {\n      display: none;\n      visibility: hidden;\n    }\n    label {\n      display: block;\n      padding: 0.5em;\n      text-align: center;\n      border-bottom: 1px solid #CCC;\n      color: #666;\n      //background: #fff;\n      margin-bottom: 0px;\n    }\n    label:hover {\n      color: #000;\n    }\n    label::before {\n      font-family: Consolas, monaco, monospace;\n      font-weight: bold;\n      font-size: 15px;\n      content: \"+\";\n      vertical-align: text-top;\n      display: inline-block;\n      width: 20px;\n      height: 20px;\n      margin-left: 3px;\n      margin-right: 3px;\n      background: radial-gradient(ellipse at center, #CCC 50%, transparent 50%);\n    }\n    section {\n      padding: 0 20px;\n    }\n  }\n  #preview{\n    top: 75px;\n    height:220px;\n    position: fixed;\n    width: 220px;\n    z-index: 3;\n    background-position: center;\n    background-size: cover;\n    border: 1px solid #eee;\n    display: none;\n  }\n  .project-name {\n    text-align: center;\n    padding: 10px 0;\n  }\n\n  // Header\n\n\n  // Timeline\n\n  .fixed-line{\n    width: 3px;\n    height: 100%;\n    left: 50%;\n    top:70vh!important;\n    position: fixed;\n    z-index: 2;\n    .timeline-icon {\n      background: #ee4d4d;\n      width: 50px;\n      height: 50px;\n      position: absolute;\n      top: 0;\n      left: 50%;\n      overflow: hidden;\n      margin-left: -23px;\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      border-radius: 50%;\n      .start{\n        position: relative;\n        top: 14px;\n        left: 14px;\n        width: 20px;\n        height: 20px;\n        border-radius: 50%;\n        background-color: #fff;\n      }\n    }\n    @media screen and (max-width: 768px) {\n      left:28px\n    }\n  }\n  #timeline {\n    width: 100%;\n    margin: 30px auto;\n    position: relative;\n    padding: 0 10px;\n    @include prefix(transition, all .4s ease);\n\n    &:before {\n      content:\"\";\n      width: 3px;\n      height: 100%;\n      background: $timeline-color;\n      left: 50%;\n      top: 0;\n      position: absolute;\n    }\n\n    &:after {\n      content: \"\";\n      clear: both;\n      display: table;\n      width: 100%;\n    }\n    \n    .timeline-item {\n      margin-bottom: 50px;\n      position: relative;\n      @extend %clearfix;\n\n      .timeline-icon {\n        background: $timeline-color;\n        width: 50px;\n        height: 50px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        overflow: hidden;\n        margin-left: -23px;\n        @include prefix(border-radius, 50%);\n        .start{\n          position: relative;\n          top: 14px;\n          left: 14px;\n          width: 20px;\n          height: 20px;\n          border-radius: 50%;\n          background-color: #fff;\n        }\n        svg {\n          position: relative;\n          top: 14px;\n          left: 14px;\n        }\n      }\n\n      .timeline-content {\n        width: 45%;\n        //background: #fff;\n        color: #fff;\n        background-color: rgba(0,0,0,0.5);\n        padding: 20px;\n        @include prefix(box-shadow, 0 3px 0 rgba(0,0,0,0.1));\n        @include prefix(border-radius, 5px);\n        @include prefix(transition, all .3s ease);\n        h5 {\n          padding: 15px;\n          color: #fff;\n          margin: -20px -20px 0 -20px;\n          font-weight: 300;\n          @include prefix(border-radius, 3px 3px 0 0);\n          //background: $timeline-color;\n        }\n        p{\n          padding-top: 10px;\n          line-height: 1.75;\n        }\n        &:before {\n          content: '';\n          position: absolute;\n          left: 45%;\n          top: 20px;\n          width: 0; \n          height: 0; \n          border-top: 7px solid transparent;\n          border-bottom: 7px solid transparent; \n          border-left:7px solid #fff; \n        }\n\n        &.right {\n          float: right;\n\n          &:before {\n            content: '';\n            right: 45%;\n            left: inherit;\n            border-left: 0;\n            border-right: 7px solid #fff;\n          }\n        }\n      }\n    }\n  }\n  #mapcard{\n    .mapcard-item {\n      //margin-bottom: 50px;\n      //position: relative;\n      //height: 100vh;\n      //padding: 20px 20px 20px 20px;\n      //@extend %clearfix;\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n      .mapcard-map{\n        //opacity: 0.9;\n        height: 300px;\n        &.full-screen-bg{\n          height: 100vh;\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100vw;\n        }\n        &.large{\n          height: 70vh;\n          width: 100%;\n        }\n      }\n      .mapcard-content {\n        opacity: 0.9;\n        background: #fff;\n        padding: 20px;\n        h5 {\n          padding: 15px;\n          color: $timeline-color;\n          background: #fff;\n          margin: -20px -20px 0 -20px;\n          font-weight: 300;\n          @include prefix(border-radius, 3px 3px 0 0);\n        }\n        p{\n          padding-top: 10px;\n          line-height: 1.75;\n        }\n        &:before {\n          content: '';\n          position: absolute;\n          left: 100%;\n          top: 20px;\n          width: 0; \n          height: 0; \n          border-top: 7px solid transparent;\n          border-bottom: 7px solid transparent; \n          border-left:7px solid $timeline-color; \n        }\n\n        &.right {\n          float: right;\n\n          &:before {\n            content: '';\n            right: 100%;\n            left: inherit;\n            border-left: 0;\n            border-right: 7px solid $timeline-color;\n          }\n        }\n      }\n    }\n  }\n\n  // fullpage js\n\n  #fp-nav ul li a span, .fp-slidesNav ul li a span{\n    background: #fff!important;\n  }\n\n\n  // Buttons\n  .btn-radius {\n    height: 50px;\n    width: 50px;\n    cursor: pointer;\n    line-height: 50px;\n    text-align: center;\n    text-decoration: none;\n    background: transparent;\n    border: 2px solid lighten($primary-color, 10%);\n    color: lighten($primary-color, 10%);\n    display: inline-block;\n    position: relative;\n    text-transform: uppercase;\n    font-size: 12px;\n    @include prefix(border-radius, 50%);\n    @include prefix(transition, background .3s ease);\n    @include prefix(box-shadow, 2px 2px 0 lighten($primary-color, 10%));\n\n    &:hover {\n      box-shadow: none ;\n      top: 2px;\n      left: 2px;\n      @include prefix(box-shadow, 2px 2px 0 transparent);\n    }\n  }\n\n  .btn {\n    padding: 5px 15px;\n    text-decoration: none;\n    background: transparent;\n    border: 2px solid lighten(#fff, 10%);\n    color: lighten(#fff, 10%);\n    display: inline-block;\n    position: relative;\n    text-transform: uppercase;\n    font-size: 12px;\n    @include prefix(border-radius, 5px);\n    @include prefix(transition, background .3s ease);\n    @include prefix(box-shadow, 2px 2px 0 lighten(#fff, 10%));\n    a{\n      color: lighten(#fff, 10%);\n    }\n    &:hover {\n      box-shadow: none ;\n      top: 2px;\n      left: 2px;\n      @include prefix(box-shadow, 2px 2px 0 transparent);\n    }\n  }\n\n  @media screen and (max-width: 768px) {\n    #timeline {\n      margin: 30px;\n      padding: 0px;\n      width: 90%;\n      &:before {\n        left: 0;\n      }\n      \n      .timeline-item {\n        .timeline-content {\n          width: 90%;\n          float: right;\n          \n          &:before, &.right:before {\n            left: 10%;\n            margin-left: -6px;\n            border-left: 0;\n            border-right: 7px solid $timeline-color;\n          }\n        }\n\n        .timeline-icon {\n          left: 0;\n        }\n      }\n    }\n  }\n\n  //station\n  .station{\n    .station-item{\n      text-align: center;\n      padding: 5px;\n    }\n  }\n\n\n\n  $back: #333;\n  //$color: #b3c33a;\n  $arrowColor:#f27c7c;\n  $speed: 1s;\n\n  .go-down{\n    width: 30px;\n    height: 30px;\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 40px;\n    margin-top: -15px;\n    transform: translateY(0px);\n    animation: arrowDown $speed cubic-bezier(0.0, 0.6, 1.0, 0.4) infinite .5s;\n    cursor: pointer;\n  }\n\n  .icon-arrow {\n    @media screen and (max-width: 768px) {\n      display: none;\n    }\n    display: inline-block;\n    font-size: 26px;\n    color: $arrowColor;\n    text-align: center;\n    width: 100px;\n    height: 50px;\n    line-height: 50px;\n    /* border: 2px solid $color; */\n    overflow: hidden;\n    text-transform: uppercase;\n    transform: rotateZ(90deg);\n    /* webkit-box-shadow: 2px -2px 0 #b3c33a;\n    -moz-box-shadow: 2px -2px 0 #b3c33a;\n    -ms-box-shadow: 2px -2px 0 #b3c33a;\n    box-shadow: 2px -2px 0 #b3c33a; */\n    transition: width $speed*.5 ease-in-out,\n                margin $speed*.5 ease-in-out,\n                border-radius $speed*.25 ease-in-out,\n                color $speed*.25 ease-in-out;\n    &:hover, &.auto {\n      width: 50px;\n      border-radius: 40px;\n      color: rgba($arrowColor, 0);\n      transition: width $speed*.5 ease-in-out,\n                  margin $speed*.5 ease-in-out,\n                  border-radius $speed.25 ease-in-out,\n                  color $speed*.25 ease-in-out $speed*.25;\n      &:before {\n        animation: lineUp $speed cubic-bezier(0.0, 0.6, 1.0, 0.4) infinite .5s;\n      }\n      &:after {\n        animation: tipUp $speed cubic-bezier(0.0, 0.6, 1.0, 0.4) infinite .5s;\n      }\n    }\n    &:before {\n      position: absolute;\n      display: inline-block;\n      content: \"\";\n      background: $arrowColor;\n      width: 5px;\n      height: 35px;\n      top: 50%;\n      left: 50%;\n      margin-top: -8px;\n      margin-left: -3px;\n      transform: translateY(50px);\n    }\n    &:after {\n      position: absolute;\n      display: inline-block;\n      content: \"\";\n      width: 20px;\n      height: 20px;\n      color: $arrowColor;\n      border-top: 5px solid;\n      border-left: 5px solid;\n      transform: rotateZ(45deg);\n      top: 50%;\n      left: 55%;\n      margin-top: -6px;\n      margin-left: -13px;\n      transform: translateY(50px) rotateZ(45deg);\n    }\n  }\n\n  @keyframes arrowDown {\n    0%   { transform: translateY(-20px)}\n    100%   { transform: translateY(20px)}\n  }\n\n  @keyframes tipUp {\n    0%   { transform: translateY(50px) rotateZ(45deg); }\n    100%   { transform: translateY(-70px) rotateZ(45deg); }\n  }\n\n  @keyframes lineUp {\n    0%   { transform: translateY(50px); }\n    100%   { transform: translateY(-70px); }\n  }\n}\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(62)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./common.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./common.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(86)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(78),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/catalog/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e42ca6d4", Component.options)
  } else {
    hotAPI.reload("data-v-e42ca6d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(85)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(77),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/components/common/Food.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Food.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c558b724", Component.options)
  } else {
    hotAPI.reload("data-v-c558b724", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(73),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/components/common/Hotel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Hotel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4326c4d4", Component.options)
  } else {
    hotAPI.reload("data-v-4326c4d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(79)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(71),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/components/common/Plan.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Plan.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13d4748e", Component.options)
  } else {
    hotAPI.reload("data-v-13d4748e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(80)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(72),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/levenpang/www/vue-travel/client/views/components/plugin/GoogleMap.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GoogleMap.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fdbef4b", Component.options)
  } else {
    hotAPI.reload("data-v-2fdbef4b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content plans",
    attrs: {
      "id": "plans-container"
    }
  }, [_c('router-link', {
    staticClass: "plan-back",
    attrs: {
      "to": "/"
    }
  }, [_c('i', {
    staticClass: "fa fa-undo plan-back-icon",
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), (_vm.day) ? _c('div', {
    attrs: {
      "id": "plans-item"
    }
  }, [_c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "plans-map large",
    style: ({
      backgroundSize: 'cover',
      backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(' + _vm.plans[_vm.day - 1]['bgimg'] + ')'
    }),
    attrs: {
      "id": 1
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 1,
      "zoom": 14,
      "center": _vm.plans[_vm.day - 1]["markers"][0]["loc"],
      "from": _vm.plans[_vm.day - 1]["from"],
      "to": _vm.plans[_vm.day - 1]["to"],
      "waypts": _vm.plans[_vm.day - 1]["waypts"],
      "markers": _vm.plans[_vm.day - 1]["markers"]
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100vw",
      "height": "90px",
      "position": "relative"
    }
  }, [_c('img', {
    staticClass: "go-down",
    attrs: {
      "src": "https://image.flaticon.com/icons/svg/275/275108.svg"
    },
    on: {
      "click": _vm.goDown
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "section",
    attrs: {
      "id": "plans-content-container"
    }
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "inner-section"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "plans-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v(_vm._s(_vm.plans[_vm.day - 1]['title']))]), _vm._v(" "), (_vm.day == 1) ? _c('div', [_vm._v("\n                19:25 落機"), _c('br'), _vm._v("\n                20:30 Check In"), _c('br'), _vm._v("\n                21:00 晴空塔（8：00～22：00）-> 隅田川公園 "), _c('br')]) : _vm._e(), _vm._v(" "), (_vm.day == 2) ? _c('div', [_vm._v("\n\t                 日比谷公園散步看楓葉，Caretta 45F 觀景。"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 2,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][0]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][0]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(0, 3)
    }
  })], 1), _vm._v("\n\t                 築地市場新鮮海產 「築地站」"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 3,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lng"],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(2, 4)
    }
  })], 1), _vm._v("\n\t                 月島漫步"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 4,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lng"],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(3, 5)
    }
  })], 1), _vm._v("\n\t                 台場高達，自由女神，睇彩虹橋,大江戶溫泉物語"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 5,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(5, 8)
    }
  })], 1)]) : _vm._e(), _vm._v(" "), (_vm.day == 3) ? _c('div', [_vm._v("\n                   幕張駅 → 日本千葉幕張展覽館 → 千葉IBM附近小餐館"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 2,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][0]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][0]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(0, 3)
    }
  })], 1), _vm._v("\n                    門前仲町 → やきとり「庄助」 → 天水宮  → 天ぷら「中山」"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 3,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lng"],
      "waypts": [{
          location: _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lng"],
          stopover: true
        }
      ],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(4, 8)
    }
  })], 1), _vm._v("\n                   秋葉原駅 → Yodobashi Akiba → 神田万世橋 → 秋葉原電器街 → 秋葉原UDX → 2k540 AKI-OKA ARTISAN"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 4,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][12]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][13]["loc"]["lng"],
      "waypts": [{
          location: _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][12]["loc"]["lng"],
          stopover: true
        }
      ],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(8, 14)
    }
  })], 1), _vm._v("\n                   2k540 AKI-OKA ARTISAN → ちゃんこ割烹大内"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 5,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][13]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][13]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][14]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][14]["loc"]["lng"],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(13, 15)
    }
  })], 1)]) : _vm._e(), _vm._v(" "), (_vm.day == 4) ? _c('div', [_vm._v("\n                   豊島園駅 → 満天堂 → 吉卜力美術館"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 2,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(1, 4)
    }
  })], 1), _vm._v("\n                    鷺ノ宮駅 → みやこや → Nakano  → 平和苑（焼肉）"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 3,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lng"],
      "waypts": [{
          location: _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lng"],
          stopover: true
        }
      ],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(4, 8)
    }
  })], 1), _vm._v("\n                    沼袋駅 → J-WORLD TOKYO → 貓咪的休憩所299  → 餃子莊 ムロ"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 4,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lng"],
      "waypts": [{
          location: _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lng"],
          stopover: true
        }
      ],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(8, 12)
    }
  })], 1)]) : _vm._e(), _vm._v(" "), (_vm.day == 5) ? _c('div', [_vm._v("\n                  恵比寿駅 → さいき居酒屋 "), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 2,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][1]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(1, 3)
    }
  })], 1), _vm._v("\n                  居酒屋 →【中目黑】目黑川閒逛 + 文青個性小店  → 【自由之丘】美食甜點下午茶 + 生活雜貨超好逛 + 小威尼斯打卡拍照"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 3,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][2]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][3]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(2, 5)
    }
  })], 1), _vm._v("\n                   中目黑 → お好み焼きと鉄板焼HIROKI → 涉谷101"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 4,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][4]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][5]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(4, 7)
    }
  })], 1), _vm._v("\n                   涉谷101 → 居酒屋魚貞 → ミヤザキ商店 燒雞串 "), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 5,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][6]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lng"],
      "waypts": [{
        location: _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][7]["loc"]["lng"],
        stopover: true
      }],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(6, 9)
    }
  })], 1), _vm._v("\n                  ミヤザキ商店 → 君の名は朝聖"), _c('br'), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "300px",
      "margin": "20px auto"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": 6,
      "styles": _vm.styles,
      "from": _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][8]["loc"]["lng"],
      "to": _vm.plans[_vm.day - 1]["markers"][12]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][12]["loc"]["lng"],
      "waypts": [{
          location: _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][9]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][10]["loc"]["lng"],
          stopover: true
        },
        {
          location: _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lat"] + "," + _vm.plans[_vm.day - 1]["markers"][11]["loc"]["lng"],
          stopover: true
        }
      ],
      "markers": _vm.plans[_vm.day - 1]["markers"].slice(8, 13)
    }
  })], 1)]) : _vm._e()])])])])])])]) : _c('div', [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 1 - 淺草")]), _vm._v(" "), _c('p', [_vm._v("說到東京景點，雷門燈籠儼然成為社群軟體上最受歡迎的拍照景點；到淺草寺參拜前，先到仲見世通品嚐人形燒與銅鑼燒。之後可以前往晴空塔，朝聖東京旅遊的新地標，東京自由行不妨安排一個和服體驗行程，漫步在淺草街頭。")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 2 - 築地、月島、台場")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 3 - 千葉 - GameShow")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 4 - 三鷹、下町中街、秋葉原")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 5 - 目黑、涉谷、新宿")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 6 - 鐮倉、江之島")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 7 - 箱根、蘆之湖")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-6"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h1', [_vm._v("DAY 8 - 名古屋")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-13d4748e", module.exports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "map",
    attrs: {
      "id": 'map-' + _vm.id,
      "data-ii": _vm.panTo
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2fdbef4b", module.exports)
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content",
    attrs: {
      "id": "content-mapcard"
    }
  }, [_c('div', {
    attrs: {
      "id": "mapcard"
    }
  }, _vm._l((_vm.hotels), function(h, index) {
    return _c('div', {
      key: index,
      staticClass: "mapcard-item section",
      style: ({
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(' + h.bgimg + ')'
      }),
      attrs: {
        "data-bgimg": "http://feversoul.com/jp/src/assets/img/banner/skytree.jpg"
      }
    }, [_c('div', {
      staticClass: "inner-section"
    }, [_c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-md-5"
    }, [_c('div', {
      staticClass: "mapcard-content"
    }, [_c('h5', {
      staticClass: "h5"
    }, [_vm._v(_vm._s(_vm.hotels[index]['title']))]), _vm._v(" "), (index == 0) ? _c('p', [_vm._v("\n                  地址：東向島201,墨田(Sumida), 東京, 日本"), _c('br'), _vm._v("\n                  鄰近車站：東向島"), _c('br'), _vm._v("\n                  價錢：335RMB／晚"), _c('br'), _vm._v("\n                  CheckIn：09221500"), _c('br'), _vm._v("\n                  CheckOut：09271000\n                ")]) : _vm._e(), _vm._v(" "), (index == 1) ? _c('p', [_vm._v("\n                  地址：日本神奈川県鎌倉市腰越２丁目１３−１４"), _c('br'), _vm._v("\n                  鄰近車站：腰越"), _c('br'), _vm._v("\n                  價錢：728RMB／晚"), _c('br'), _vm._v("\n                  CheckIn：09271600"), _c('br'), _vm._v("\n                  CheckOut：09281100\n                ")]) : _vm._e(), _vm._v(" "), (index == 2) ? _c('p', [_vm._v("\n                  地址：〒250-0408 神奈川県 足柄下郡箱根町強羅1300-70"), _c('br'), _vm._v("\n                  鄰近車站：強羅"), _c('br'), _vm._v("\n                  價錢：1990RMB／晚"), _c('br'), _vm._v("\n                  CheckIn：09281700（預約）"), _c('br'), _vm._v("\n                  CheckOut：09291100"), _c('br'), _vm._v("\n                  *夕泊入席 19:30 前\n                ")]) : _vm._e(), _vm._v(" "), (index == 3) ? _c('p', [_vm._v("\n                  3-15-21, Nishiki, Naka-ku, 名古屋站/繁华街, 名古屋, 日本 460-0003"), _c('br'), _vm._v("\n                  鄰近車站：榮町"), _c('br'), _vm._v("\n                  價錢：323RMB／晚"), _c('br'), _vm._v("\n                  CheckIn：09291500（預約）"), _c('br'), _vm._v("\n                  CheckOut：09301000"), _c('br'), _vm._v("\n                  *夕泊入席 19:30 前\n                ")]) : _vm._e(), _vm._v(" "), (index == 4) ? _c('p', [_vm._v("\n                  地址：〒607-8142　京都市山科区東野中ノ井上町1-25　SAKIZO東野ビル　205号室"), _c('br'), _vm._v("\n                  鄰近車站：東野"), _c('br'), _vm._v("\n                  價錢：323RMB／晚"), _c('br'), _vm._v("\n                  CheckIn：09301600（預約）"), _c('br'), _vm._v("\n                  CheckOut：10031000"), _c('br'), _vm._v("\n                  *夕泊入席 19:30 前\n                ")]) : _vm._e()])]), _vm._v(" "), _c('div', {
      staticClass: "col-md-7"
    }, [_c('div', {
      staticClass: "mapcard-map normal-scroll",
      attrs: {
        "id": index
      }
    }, [_c('GoogleMap', {
      attrs: {
        "id": index,
        "center": _vm.center,
        "styles": _vm.styles,
        "from": _vm.from[index],
        "to": _vm.to[index],
        "waypts": _vm.waypts[index],
        "markers": _vm.markers[index]
      }
    })], 1)])]), _vm._v(" "), _c('div', {
      staticClass: "mt-5"
    }, [_c('div', {
      staticClass: "photos-gallery row"
    }, _vm._l((h.photos), function(p, index) {
      return _c('div', {
        key: index,
        staticClass: "col-6 col-sm-3",
        staticStyle: {
          "padding": "20px"
        }
      }, [_c('div', {
        staticClass: "rs-img-bg div-circle floating",
        style: ({
          width: '100%',
          paddingTop: 'calc(100% - 10px)',
          border: '5px solid #fff',
          paddingBottom: '0',
          backgroundImage: 'url(' + p + ')',
          animationDuration: 3 + index * 0.2 + 's'
        })
      })])
    }))])])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4326c4d4", module.exports)
  }
}

/***/ }),
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "schedule"
    }
  }, [_c('div', {
    staticClass: "map-container schedule-map",
    staticStyle: {
      "position": "absolute",
      "z-index": "1",
      "top": "0",
      "padding-bottom": "20px",
      "height": "100vh",
      "background-image": "linear-gradient(to right, rgba(0, 0, 0, 0.1),  rgba(0, 0, 0, 0.1)),url(http://feversoul.com/jp/src/assets/img/banner/京都.jpg)",
      "background-size": "cover",
      "overflow": "hidden"
    },
    attrs: {
      "id": "home-bg-map"
    }
  }, [_c('div', {
    staticClass: "falling-leaves"
  }), _vm._v(" "), _c('div', {
    style: ({
      width: '120%',
      height: '120%',
      transform: 'rotate(' + _vm.mapRotate + 'deg)'
    })
  }, [_c('GoogleMap', {
    attrs: {
      "panTo": _vm.panTo,
      "id": _vm.id,
      "zoom": 8,
      "center": _vm.center,
      "from": _vm.from,
      "to": _vm.to,
      "waypts": _vm.waypts,
      "markers": _vm.markers
    }
  })], 1)]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {}, [_c('div', [_c('div', {
    staticClass: "content",
    attrs: {
      "id": "content-schedule"
    }
  }, [_c('div', {
    attrs: {
      "id": "timeline"
    }
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day1(0922) 東京都 - 淺草、上野")]), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "w-100 text-right"
  }, [_c('span', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/plan/1"
    }
  }, [_vm._v("MORE")])], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "timeline-item"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day2(0923)  - 築地、台場、汐留")]), _vm._v(" "), _vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "w-100 text-right"
  }, [_c('span', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/plan/2"
    }
  }, [_vm._v("MORE")])], 1)])])])])]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day3(0924) 東京都 - 千葉 Game Show 秋葉原")]), _vm._v(" "), _vm._m(7), _vm._v(" "), _c('div', {
    staticClass: "w-100 text-right"
  }, [_c('span', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/plan/3"
    }
  }, [_vm._v("MORE")])], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "timeline-item"
  }, [_vm._m(8), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day4(0925) 東京都 - 三鷹、練馬區、中野區、池袋")]), _vm._v(" "), _vm._m(9), _vm._v(" "), _c('div', {
    staticClass: "w-100 text-right"
  }, [_c('span', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/plan/4"
    }
  }, [_vm._v("MORE")])], 1)])])])])]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_vm._m(10), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day5(0926) 東京都 - 澀谷、目黑、君の名は")]), _vm._v(" "), _vm._m(11), _vm._v(" "), _c('div', {
    staticClass: "w-100 text-right"
  }, [_c('span', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/plan/5"
    }
  }, [_vm._v("MORE")])], 1)])])])])]), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13), _vm._v(" "), _vm._m(14), _vm._v(" "), _vm._m(15), _vm._v(" "), _vm._m(16)])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "station hidden-sm-down hidden-md-up"
  }, [_c('div', {
    staticClass: "d-flex flex-wrap"
  }, [_c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gotokyo",
      "data-point": "0"
    }
  }, [_vm._v("東京都")])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item hidden-sm-down"
  }, [_c('span', {
    staticClass: "icon-arrow auto"
  })]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokamakura",
      "data-point": "1"
    }
  }, [_vm._v("湘南")])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item hidden-sm-down"
  }, [_c('span', {
    staticClass: "icon-arrow auto"
  })]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gohakone",
      "data-point": "2"
    }
  }, [_vm._v("箱根")])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item hidden-sm-down"
  }, [_c('span', {
    staticClass: "icon-arrow auto"
  })]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gonagoya",
      "data-point": "3"
    }
  }, [_vm._v("名古屋")])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item hidden-sm-down"
  }, [_c('span', {
    staticClass: "icon-arrow auto"
  })]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokyoto",
      "data-point": "4"
    }
  }, [_vm._v("京都府")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('i', {
    staticClass: "fixed-line"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n                      19:25 落機"), _c('br'), _vm._v("\n                      20:30 Check In"), _c('br'), _vm._v("\n                      21:00 晴空塔（8：00～22：00）-> 隅田川公園 "), _c('br')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n                       日比谷公園散步看楓葉，Caretta 45F 觀景。"), _c('br'), _vm._v("\n                       築地市場新鮮海產 「築地站」，波除稻荷神社"), _c('br'), _vm._v("\n                       月島漫步"), _c('br'), _vm._v("\n                       台場高達，自由女神，睇彩虹橋"), _c('br'), _vm._v(" \n                       大江戶溫泉物語"), _c('br')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n                      上午 GameShow -> 千葉IBM附近小餐館 "), _c('br'), _vm._v("\n                      下午&晚上 秋葉原 -> 神田万世橋 ->  電器街/UDX -> Yodobashi Akiba\n                    ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n                      吉卜力美術館 -> 中野區食烤肉 -> J-WorldJ-WORLD TOKYO"), _c('br')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n                      中目黑 -> 自由之丘 -> 澀谷101 -> 君の名は"), _c('br')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day6(0927) 鎌倉市 - 湘南高校前、江之島")]), _vm._v(" "), _c('p', [_vm._v("\n                       湘南高校前、江之島 "), _c('br')])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day7(0928) 箱根 - 溫泉、蘆之湖")]), _vm._v(" "), _c('p', [_vm._v("\n                       宅酒店，嘆溫泉，湖中鳥居 "), _c('br')])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day8(0929) 名古屋 - ？？？")]), _vm._v(" "), _c('p', [_vm._v("\n                      大須う "), _c('br')])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day9(0930) 京都府 - ？？？")]), _vm._v(" "), _c('p', [_vm._v("\n                      ？？？ "), _c('br')])])]), _vm._v(" "), _c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day10(1001) 京都府 - ？？？")]), _vm._v(" "), _c('p', [_vm._v("\n                      ？？？ "), _c('br')])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day11(1002) 京都府 - ？？？")]), _vm._v(" "), _c('p', [_vm._v("\n                      ？？？ "), _c('br')])])]), _vm._v(" "), _c('div', {
    staticClass: "timeline-item"
  }, [_c('div', {
    staticClass: "timeline-icon"
  }, [_c('div', {
    staticClass: "start"
  })]), _vm._v(" "), _c('div', {
    staticClass: "timeline-content right"
  }, [_c('h5', {
    staticClass: "h5"
  }, [_vm._v("Day12(1003) 東京 - 回程")]), _vm._v(" "), _c('p', [_vm._v("\n                      ？？？ "), _c('br')])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-84592bb2", module.exports)
  }
}

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "food"
    }
  }, [_c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "inner-section-fixed"
  }, [_c('div', {
    staticClass: "map-container rs-bg-img",
    staticStyle: {
      "background-image": "linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://feversoul.com/jp/src/assets/img/banner/sushi.jpg)",
      "background-size": "cover"
    }
  }, [_c('GoogleMap', {
    attrs: {
      "id": _vm.id,
      "center": _vm.restaurants[0]["loc"],
      "markers": _vm.markers,
      "zoom": _vm.zoom,
      "icon": _vm.icon
    }
  })], 1), _vm._v(" "), _vm._m(0)])]), _vm._v(" "), _vm._l((_vm.restaurants), function(h, index) {
    return _c('div', {
      key: index,
      staticClass: "section rs-bg-img",
      style: ({
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url(' + h.img + ')'
      }),
      attrs: {
        "id": index
      }
    }, [_c('div', {
      staticClass: "inner-section-fixed "
    }, [_c('div', {
      staticClass: "row",
      staticStyle: {
        "padding": "5%"
      }
    }, [_c('div', {
      staticClass: "col-md-5"
    }, [_c('div', {
      staticClass: "mapcard-content"
    }, [_c('h5', {
      staticClass: "h5 text-white"
    }, [_vm._v(_vm._s(_vm.restaurants[index]['title']))])])]), _vm._v(" "), _c('div', {
      staticClass: "col-md-7"
    }, [_c('div', {
      staticClass: "mapcard-map normal-scroll",
      staticStyle: {
        "height": "60vh"
      },
      attrs: {
        "id": index
      }
    }, [_c('GoogleMap', {
      attrs: {
        "id": index,
        "center": _vm.center,
        "styles": _vm.styles,
        "from": _vm.rfrom[index],
        "to": _vm.rto[index],
        "waypts": _vm.rwaypts[index],
        "markers": _vm.markers
      }
    })], 1)])])])])
  })], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "station",
    staticStyle: {
      "background": "#fff"
    }
  }, [_c('div', {
    staticClass: "d-flex flex-wrap"
  }, [_c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokamakura",
      "data-point": "1"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/a"
    }
  }, [_vm._v("中野區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokamakura",
      "data-point": "1"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/b"
    }
  }, [_vm._v("練馬區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokamakura",
      "data-point": "1"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/c"
    }
  }, [_vm._v("新宿區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gokamakura",
      "data-point": "1"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/d"
    }
  }, [_vm._v("澀谷區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gohakone",
      "data-point": "2"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/e"
    }
  }, [_vm._v("中央區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gonagoya",
      "data-point": "3"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/f"
    }
  }, [_vm._v("台東區")])])]), _vm._v(" "), _c('div', {
    staticClass: "col station-item"
  }, [_c('span', {
    staticClass: "btn-radius small",
    attrs: {
      "id": "gonagoya",
      "data-point": "3"
    }
  }, [_c('a', {
    attrs: {
      "href": "/food/g"
    }
  }, [_vm._v("東京外")])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c558b724", module.exports)
  }
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "container-fullscreen"
  }, [_c('header', {
    staticClass: "hidden-md-up- hidden-sm-down-"
  }, [_c('div', {
    staticClass: "d-flex flex-wrap h-100 ml-auto",
    staticStyle: {
      "width": "300px"
    }
  }, [_c('nav', {
    staticClass: "align-items-center d-flex justify-content-end ml-auto"
  }, [_c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    class: {
      'active': _vm.active == 'index'
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("路線")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    class: {
      'active': _vm.active == 'hotel'
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/hotel"
    }
  }, [_vm._v("住宿")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    class: {
      'active': _vm.active == 'food'
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/food/a"
    }
  }, [_vm._v("美食")])], 1)])])])]), _vm._v(" "), _c('div', [_c('router-view', {
    staticClass: "view"
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e42ca6d4", module.exports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0ee8316b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13d4748e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Plan.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13d4748e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Plan.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3e018de2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2fdbef4b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GoogleMap.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2fdbef4b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GoogleMap.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("35072834", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4326c4d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hotel.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4326c4d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hotel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("288130d9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-84592bb2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Schedule.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-84592bb2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Schedule.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("463dc3b4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c558b724\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Food.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c558b724\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Food.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("fb1efdd8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e42ca6d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e42ca6d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ })
/******/ ]);