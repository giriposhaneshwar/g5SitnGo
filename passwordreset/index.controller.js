(function () {
    'use strict';

    angular
        .module('app')
        .controller('PasswordReset.IndexController', Controller);

    function Controller($scope, $location, $window, $q, $http, $timeout, AuthenticationService, serviceCall) {
        var vm = this;

        $scope.loading = false;

        $scope.sendForgotPassword = function (evt, data) {
            evt.preventDefault();
            serviceCall.forgotPassword(data.email, function (response) {
                console.log("Response Forgot Password ", response);
            });
        }


    }

})();
