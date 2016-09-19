(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($scope, $location, $window, $cookies, $q, $http, $interval, $localStorage, AuthenticationService, serviceCall, authService, ngAuthSettings) {
        var vm = this;


        $scope.initController = function () {

            $scope.loggedUser = $cookies.get('currentUserName');
            console.log("$localStorage.currentUserName", $scope.loggedUser);
            if ($scope.loggedUser === ("" || null || undefined)) {
                $location.path("#/login");
            }
        }
        $scope.initController();
        $scope.refrestConnection = function () {
            $window.location.reload();

        }


        $scope.logoutUser = function () {

            serviceCall.logoutUser(function (res) {
                console.log("Logging user out", res);
                if (res.status == "success") {
                    $location.path("#/login");
                } else {
                    alert("Could no loggout");
                }
            });
        }
    }

})();