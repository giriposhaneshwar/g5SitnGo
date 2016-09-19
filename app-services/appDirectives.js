(function () {
    'use strict';
    angular.module('app').directive('validPasswordC', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
//                    console.log(scope, elm, attrs, ctrl);
                    var noMatch = viewValue != scope.registrationFrom.password.$viewValue
                    ctrl.$setValidity('noMatch', !noMatch)
                })
            }
        }
    });
    angular.module('app').directive('emailFormat', function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var model = $parse(attrs.ngPattern);
                    var email = viewValue.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm);
//                    console.log(scope.registrationFrom.email.$viewValue);
                    ctrl.$setValidity('email', !email)

                });

            }
        }
    });

    angular.module('app').directive("mathjaxBind", function () {
     return {
         restrict: "A",
         controller: ["$scope", "$element", "$attrs",
             function ($scope, $element, $attrs) {
                 $scope.$watch($attrs.mathjaxBind, function (texExpression) {
                     $element.html(texExpression.toString().replace(/\\\\/g, '\\'));
                     //MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                     MathJax.Hub.Typeset($element[0]);
                 });
             }]
     };
 });




})();
