(function () {
    'use strict';
    angular
        .module('app')
        .factory('serviceCall', Service);
    function Service($http, $localStorage, $q, $cookies, localStorageService, ngAuthSettings) {
        var service = {},
            deferred = $q.defer(),
            serviceBase = ngAuthSettings.apiServiceBaseUri,
            headerInfo = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

        

        service.postRequest = function (url, data, headers) {
            headers = headers == undefined ? "" : headers;
            var rtn = $http({
                url: url,
                method: 'POST',
                data: data,
                headers: headers

            }).success(function (data, status, headers, config) {
//                console.log('\n\n\n\tservice response::::::: \n\t', data, status, headers, config, "\n\n\n\t")
//                console.log("Return Data From Server ::::", data);
                deferred.resolve(data);
                // return data
            }).error(function (data, status, headers, config) {
                // $('.err').text(status);
//                console.log("Error Status", status, "\nError DATA", data, "\nError Headers", headers, "\nError Config", config);
                deferred.reject(data);
            });
            return deferred.promise;
        }

        service.getRequest = function () {

        }

        service.checkLogin = function () {
            var loginCheck = {};
            loginCheck.user = $cookies.get('currentUser');
            loginCheck.name = $cookies.get('currentUserName');
            console.log("LoginCheck ", loginCheck);
        }
        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: false
        };
        // Method for Login User
        service.loginUser = function (loginData, cb) {
            loginData.grant_type = "password";
            console.log("Sending Data:::", loginData);
            var call = service.postRequest(serviceBase + "Api/Account/Login", loginData);

            call.then(function (response) {
                console.log("Respose from Server for Login:::::", response);
                if (response.length != 0) {
                    $localStorage.currentUser = {username: response.userName, access_token: response.access_token};
                    $http.defaults.headers.common.Authorization = response.token_type + ' ' + response.access_token;
                    $cookies.put('currentUser', response.access_token);
                    $cookies.put('currentUserName', response.userName);
                }

                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', {token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true});
                } else {
                    localStorageService.set('authorizationData', {token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false});
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;

                if (cb)
                    cb(response);
            }).catch(function (err) {
//                console.log("Failed Response form Server ", err);
                if (cb)
                    cb(err);
            });
        }

        // Method for Register Userx
        service.registerUser = function (data, cb) {
            console.log("At ServiceCall - Sending Data:::", data);
            var call = service.postRequest(serviceBase + "api/Account/Register", data);

            call.then(function (response) {
                console.log("Response from server for Register User", response);

                if (cb)
                    cb(response);
            }).catch(function (err) {
//                console.log("Failed Response form Server ", err);
                if (cb)
                    cb(err);
            });
        }

        service.logoutUser = function (cb) {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $cookies.remove('currentUser');
            $cookies.remove('currentUserName');
            $http.defaults.headers.common.Authorization = '';

            var obj = {};
            obj.status = ($cookies.get('currentUser') == undefined || "") ? "success" : "failed";

            if (cb)
                cb(obj)
        }

        service.forgotPassword = function (data, cb) {
//            console.log("Service data", data);
//api/Account/ForgotPassword?email={email}
            var call = service.postRequest(serviceBase + "api/Account/ForgotPassword?email=" + data);

            call.then(function (response) {
                console.log("Email Response Form Forgot Password", response);

                if (cb)
                    cb(response);
            }).catch(function (err) {
                console.log("Failed Response form Server ", err);
                if (cb)
                    cb(err);
            });
        }

        service.getPlayZones = function (cb) {

            var call = service.getRequest(serviceBase + "api/PlayZone");

            call.then(function (response) {
                console.log("PlayZone data", response);

                if (cb)
                    cb(response);
            }).catch(function (err) {
                console.log("Failed Response form Server ", err);
                if (cb)
                    cb(err);
            });
        }

        

        return service;

    }
})();