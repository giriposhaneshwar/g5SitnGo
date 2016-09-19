(function () {
    'use strict';
    angular
            .module('app')
            .factory('signalRService', ['$rootScope', '$localStorage', function ($rootScope, $localStorage) {
                    var data;
                    function backendFactory(backendServerUrl, hubName, GameTableID) {

                        console.log('backendFactory' + backendServerUrl + " " + hubName + " " + GameTableID);
                        var connection = $.hubConnection(backendServerUrl);

                        var accessToken = 'II-ntOoHdPppTxet78MdQvFCfAcUfKxyQXEVk5JTedeyHM54wapMQbzZRW98catIuq1Ss4EWwHegPpUcng3mMCv5DM_VHcUH5kJhzPiKMvND2EJXDssmVkcdHxkTu_q7-FjbXgCLV00_gjOKpIU6VfxHr0yaMm_hqJLvjqr_QS-NVWPhqtJ1XLHF6OsS3cwvvglhgWTMMnsd5Zxvx8VcaRY7-D_Oo4MmyZMQ8BfBEeBZT1wWO9bBUqghNrTM2iRFtuOH30SXmYkLKODeDxuNDEerHaEeM1-QErHbKw8xiMnjepTeMDZO6ngW_pTktAiuqUMOqaTgNyh0QnF_fpma5LwyP15XJ28vYMZdC9fCaW3j3f1-JYc4gi0C3CujPegT9FKRRdU3cGXIv3_mMmcofg';

                        connection.qs = {'access_token': accessToken};
                        var proxy = connection.createHubProxy(hubName);

                        connection.logging = true;

                        proxy.on("sendMessage", function (zoneMsg) {
                            console.log(zoneMsg);
                        });

                        proxy.on("playerJoinMessage", function (zoneMsg) {
                            console.log(zoneMsg);
                        });

                        proxy.on("sendGameStart", function (zoneMsg) {
                            console.log(zoneMsg);
                        });

                        proxy.on("sendQuestion", function (zoneMsg) {
                            console.log(zoneMsg);
                        });

                        proxy.on("sendAnswer", function (zoneMsg) {
                            console.log(zoneMsg);
                        });

                        proxy.on("sendGameResults", function (zoneMsg) {
                            console.log(zoneMsg);
                        });



                        connection.start({transport: ['webSockets', 'longPolling', 'foreverFrame', 'serverSentEvents'], jsonp: true, xdomain: true}).done(function () {
                            console.log('start');
                            proxy.invoke("JoinTable", GameTableID).done(function (data) {
                                storeJoinTableData(data);
                                console.log(data);
                            });
                        });

                        function storeJoinTableData(data) {
                            $localStorage.playerData = data;
                            return data;
                        }


                        return {
                            get: function (eventName) {
                                if (eventName === "JoinTable") {

                                    return $localStorage.playerData;
                                }
                            },
                            on: function (eventName, callback) {
                                console.log("on method called : " + eventName + " cb :" + callback);
                                proxy.on(eventName, function (result) {
                                    console.log(JSON.stringify(result));
                                    $rootScope.$apply(function () {
                                        if (callback) {
                                            callback(result);
                                        }
                                    });
                                });
                            },
                            invoke: function (methodName, callback) {
                                proxy.invoke(methodName)
                                        .done(function (result) {
                                            $rootScope.$apply(function () {
                                                if (callback) {
                                                    callback(result);
                                                }
                                            });
                                        });
                            }
                        };
                    }
                    ;

                    return backendFactory;

                }])
})();