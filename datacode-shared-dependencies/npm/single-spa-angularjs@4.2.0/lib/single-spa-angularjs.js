(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.singleSpaAngularjs = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = singleSpaAngularJS;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var defaultOpts = {
    // required opts
    angular: null,
    domElementGetter: null,
    mainAngularModule: null,
    // optional opts
    uiRouter: false,
    preserveGlobal: false,
    elementId: "__single_spa_angular_1",
    strictDi: false,
    template: undefined
  };

  function singleSpaAngularJS(userOpts) {
    if (_typeof(userOpts) !== "object") {
      throw new Error("single-spa-angularjs requires a configuration object");
    }

    var opts = _objectSpread(_objectSpread({}, defaultOpts), userOpts);

    if (!opts.angular) {
      throw new Error("single-spa-angularjs must be passed opts.angular");
    }

    if (!opts.mainAngularModule) {
      throw new Error("single-spa-angularjs must be passed opts.mainAngularModule string");
    } // A shared object to store mounted object state


    var mountedInstances = {};
    return {
      bootstrap: bootstrap.bind(null, opts, mountedInstances),
      mount: mount.bind(null, opts, mountedInstances),
      unmount: unmount.bind(null, opts, mountedInstances)
    };
  }

  function bootstrap(opts, mountedInstances, singleSpaProps) {
    return Promise.resolve().then(function () {
      var module = opts.angular.module("single-spa-angularjs");

      if (module) {
        module.config(["$provide", function ($provide) {
          $provide.value("singleSpaProps", singleSpaProps);
        }]);
      }
    });
  }

  function mount(opts, mountedInstances) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return Promise.resolve().then(function () {
      window.angular = opts.angular;
      var domElementGetter = chooseDomElementGetter(opts, props);
      var domElement = getRootDomEl(domElementGetter, props);
      var bootstrapEl = document.createElement("div");
      bootstrapEl.id = opts.elementId;
      domElement.appendChild(bootstrapEl);

      if (opts.uiRouter) {
        var uiViewEl = document.createElement("div");
        uiViewEl.setAttribute("ui-view", opts.uiRouter === true ? "" : opts.uiRouter);
        bootstrapEl.appendChild(uiViewEl);
      }

      if (opts.template) {
        bootstrapEl.innerHTML = opts.template;
      }

      if (opts.strictDi) {
        mountedInstances.instance = opts.angular.bootstrap(bootstrapEl, [opts.mainAngularModule], {
          strictDi: opts.strictDi
        });
      } else {
        mountedInstances.instance = opts.angular.bootstrap(bootstrapEl, [opts.mainAngularModule]);
      }

      mountedInstances.instance.get("$rootScope").singleSpaProps = props;
    });
  }

  function unmount(opts, mountedInstances) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return new Promise(function (resolve, reject) {
      // https://github.com/single-spa/single-spa-angularjs/issues/53
      var uiRouter = mountedInstances.instance.get("$uiRouter");

      if (uiRouter) {
        uiRouter.dispose();
      }

      mountedInstances.instance.get("$rootScope").$destroy();
      var domElementGetter = chooseDomElementGetter(opts, props);
      var domElement = getRootDomEl(domElementGetter, props);
      domElement.innerHTML = "";
      if (opts.angular === window.angular && !opts.preserveGlobal) delete window.angular;
      setTimeout(resolve);
    });
  }

  function chooseDomElementGetter(opts, props) {
    if (props.domElement) {
      return function () {
        return props.domElement;
      };
    } else if (props.domElementGetter) {
      return props.domElementGetter;
    } else if (opts.domElementGetter) {
      return opts.domElementGetter;
    } else {
      return defaultDomElementGetter(props);
    }
  }

  function defaultDomElementGetter(props) {
    var appName = props.appName || props.name;

    if (!appName) {
      throw Error("single-spa-angularjs was not given an application name as a prop, so it can't make a unique dom element container for the angularjs application");
    }

    var htmlId = "single-spa-application:".concat(appName);
    return function defaultDomEl() {
      var domElement = document.getElementById(htmlId);

      if (!domElement) {
        domElement = document.createElement("div");
        domElement.id = htmlId;
        document.body.appendChild(domElement);
      }

      return domElement;
    };
  }

  function getRootDomEl(domElementGetter, props) {
    if (typeof domElementGetter !== "function") {
      throw new Error("single-spa-angularjs: the domElementGetter for angularjs application '".concat(props.appName || props.name, "' is not a function"));
    }

    var element = domElementGetter(props);

    if (!element) {
      throw new Error("single-spa-angularjs: domElementGetter function for application '".concat(props.appName || props.name, "' did not return a valid dom element. Please pass a valid domElement or domElementGetter via opts or props"));
    }

    return element;
  }
});
//# sourceMappingURL=single-spa-angularjs.js.map