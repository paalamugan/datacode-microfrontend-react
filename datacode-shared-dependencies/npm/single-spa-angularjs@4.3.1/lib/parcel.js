(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["angular"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("angular"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.angular);
    global.parcel = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_angular) {
  "use strict";

  _angular = _interopRequireDefault(_angular);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var module = _angular["default"].module("single-spa-angularjs", []);

  module.directive("singleSpaParcel", function () {
    return {
      restrict: "E",
      template: "<div></div>",
      scope: {
        mountParcel: "=",
        parcelConfig: "=",
        props: "="
      },
      controller: ["$scope", "$element", "singleSpaProps", function ($scope, $element, singleSpaProps) {
        if (!$scope.parcelConfig) {
          throw Error("single-spa-angularjs: The <single-spa-parcel> directive requires a parcelConfig object or function");
        }

        var mountParcel = $scope.mountParcel || singleSpaProps.mountParcel;

        if (!mountParcel) {
          throw Error("single-spa-angularjs: The <single-spa-parcel> directive requires a mountParcel function");
        }

        var parcel = mountParcel($scope.parcelConfig, getParcelProps());
        $scope.$on("$destroy", parcel.unmount);
        $scope.$watch("props", function () {
          if (parcel.update) {
            parcel.update(getParcelProps());
          }
        });

        function getParcelProps() {
          var result = {
            domElement: $element[0]
          };

          if ($scope.props) {
            for (var k in $scope.props) {
              result[k] = $scope.props[k];
            }
          }

          return result;
        }
      }]
    };
  });
});
//# sourceMappingURL=parcel.js.map