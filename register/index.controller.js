(function () {
    'use strict';

    angular
        .module('app')
        .controller('Register.IndexController', Controller);

    function Controller($scope, $location, $window, $q, $http, $timeout, AuthenticationService, serviceCall) {
        var vm = this;

        $scope.loading = false;
//        $scope.user = {password: , password2: null};
        $scope.password = null;
        $scope.password2 = "";
//        $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        $scope.userDetails = {Email: "", Password: "", ConfirmPassword: ""};

        $scope.registerUser = function (evt, postData) {
            evt.preventDefault();
            console.log("Object Check ing ", $scope.userDetails, postData);
            $scope.userDetails.ConfirmPassword = $scope.userDetails.Password;

            serviceCall.registerUser($scope.userDetails, function (res) {
                console.log("Response Register Request", typeof res, res);

                if (typeof res == "string") {

                    // Working with Success message
                    if (res.indexOf("successfully") != -1) {
                        //                        console.log("res.indexOf(successfully)", res.indexOf("successfully"));
                        $scope.responseState = "success";
                        $scope.responseMessage = res;
                        $timeout(function (e) {
                            $window.location.href = "#/login";
                        }, 1000);


                    }
                } else if (typeof res == "object") {
                    // working with failed message
                    if ('model.Email' in res.ModelState) {
                        $scope.responseReason = res.ModelState["model.Email"][0];
                    } else if ('model.Password' in res.ModelState) {
                        $scope.responseReason = res.ModelState["model.Password"][0];
                    } else if ('model.ConfirmPassword' in res.ModelState) {
                        $scope.responseReason = res.ModelState["model.ConfirmPassword"][0];
                    } else if ("ExceptionMessage" in res) {
                        $scope.responseReason = res.ExceptionMessage;

                    } else {
                        $scope.responseReason = res.ModelState[""][0];
                    }
                    $scope.responseMessage = res.Message;
                    $scope.responseState = "failed";
                }
            });

        }
        $scope.checkEmailFormat = function (email) {
            console.log("Email", $scope.userDetails, registrationFrom, registrationFrom.email.$modelValue);
        }

        $scope.paidUser = function (evt, data) {
            console.log("Paidn User ", data);

            if (data.paidRegister == true) {
                $window.location.href = "#/paid-register";
            }
        }

        // This is what you will bind the filter to
        $scope.filterText = '';

        // Creating Delay to check on keyup
        var tempFilterText = '',
            filterTextTimeout;
        $scope.$watch('password2', function (val) {
            if (filterTextTimeout)
                $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function () {
                $scope.filterText = tempFilterText;
            }, 250); // delay 250 ms
        })
    }

})();

/*
 // Login Service call
 http://192.168.0.47/token
 */ 