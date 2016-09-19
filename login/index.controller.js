(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($scope, $location, $window, $localStorage, $q, $http, $cookies, $interval, AuthenticationService, serviceCall, authService, ngAuthSettings) {
        var vm = this;

        $scope.loading = false;

        $scope.init = function () {
            // check if the user is logged in or not
            if ($cookies.get('currentUser') != undefined || "" || null) {
                $window.location.href = "#/home";
            }
        }
        $scope.init();

        $scope.login = function (evt, username, password) {
            evt.preventDefault();
            var obj = {username: username, password: password, RememberMe: true};
            console.log("Sending the Request to ServiceCall", obj);
            $scope.loading = true;
            serviceCall.loginUser(obj, function (res) {
                console.log("Loign controller response", res);
                if (res.access_token != null || undefined || "") {
                    $scope.loading = false;
                    $scope.errStatus = 'success';
                    $window.location.href = "#/home";
                } else {
                    $scope.errMessage = res.Message;
                    $scope.errStatus = 'failed';
                }
            });
        }

        $scope.authExternalProvider = function (provider) {
            var loc = $window.location.href;
            var url = loc.split("#");

//            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';
            var redirectUri = url[0] + 'authComplete.html';

            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                + "&response_type=token&client_id=" + ngAuthSettings.clientId
                + "&redirect_uri=" + redirectUri;
            window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };

        // check for fragment every 100ms
        var _interval = $interval(_checkForFragment, 100);

        function _checkForFragment() {
            var fragment = localStorage.getItem("auth_fragment");
            if (fragment && (fragment = JSON.parse(fragment))) {

                // clear the fragment from the storage
                localStorage.removeItem("auth_fragment");

                // continue as usual
                $scope.authCompletedCB(fragment);

                // stop looking for fragmet
                _clearInterval();
            }
        }

        function _clearInterval() {
            $interval.cancel(_interval);
        }

        $scope.$on("$destroy", function () {
            // clear the interval when $scope is destroyed
            _clearInterval();
        });

        $scope.authCompletedCB = function (fragment) {
            console.log("Fragment ", fragment);
//            $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/login');

            } else {
                //Obtain access token and redirect to orders
                var externalData = {provider: fragment.provider, externalAccessToken: fragment.external_access_token};
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/home');

                },
                    function (err) {
                        $scope.message = err.error_description;
                    });
            }

//            });
        }
    }

})();

/*
 // Login Service call
 http://192.168.0.47/token
 */ 