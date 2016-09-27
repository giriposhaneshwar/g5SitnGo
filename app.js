    var serviceBase = 'http://g5api.azurewebsites.net/';

(function () {
    'use strict';
    console.log('app init');
//        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E', 'angular-jwt', 'angular-storage'])
    angular
        .module('app', [ 'ui.router', 'ngMessages', 'ngStorage', 'angular-jwt', 'angular-storage', 'ngKookies', 'LocalStorageModule', 'ngCookies', 'angularProgressbar'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
        console.log('config ..');
       
        // default route
        $urlRouterProvider.otherwise("/login");


        // app routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'register/index.view.html',
                controller: 'Register.IndexController',
                controllerAs: 'vm'
            })
            .state('forgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'passwordreset/forgotPassword.html',
                controller: 'PasswordReset.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('passwordreset', {
                url: '/passwordreset',
                templateUrl: 'passwordreset/index.view.html',
                controller: 'PasswordReset.IndexController',
                controllerAs: 'vm'
            })
            .state('authComplete', {
                url: '/authComplete',
                templateUrl: 'login/authComplete.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            }) 
            .state('playZone', {
                url:'/playZone',
                templateUrl: 'playZone/index.view.html',
                controller: 'PlayZone.IndexController',
                controllerAs: 'vm'
            })
            .state('games', {
                url:'/games',
                templateUrl: 'games/index.view.html',
                controller: 'Games.IndexController',
                controllerAs: 'vm'
            })
            .state('sitngotest', {
                url:'/sitngotest',
                templateUrl: 'sitngoTest/index.view.html',
                controller: 'SitNGoTest.IndexController',
                controllerAs: 'vm'
            })
            .state('sitngo', {
                url:'/sitngo',
                templateUrl: 'sitngo/index.view.html',
                controller: 'SitNGo.IndexController',
                controllerAs: 'vm'
            }); 
    }


    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

//            console.log("Location change", event, next, current);
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
               // $location.path('/login');
            }
        });
    }
// Interceptors enabling to track the request
//    angular.module('app').config([
//        '$httpProvider', function ($httpProvider) {
//            $httpProvider.interceptors.push('RequestInterceptor');
//        }
//    ]);
//    angular.module('app').factory('RequestInterceptor',
//        ['$kookies', function ($kookies) {
//                return {
//                    request: function ($config) {
//
//                        $config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//                        console.log("Config", $config);
//                        return $config;
//                    }
//                };
//            }]);

//var serviceBase = 'http://localhost:26264/';
//    var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
    var serviceBase = 'http://g5api.azurewebsites.net/';
//    var serviceBase = 'http://g5api.azurewebsites.net/';
    angular.module('app').constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        clientId: 'WebApp'
    });


    angular.module('app').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    angular.module('app').run(['authService', function (authService) {
            console.log('authService');
            authService.fillAuthData();
        }]); 
})();