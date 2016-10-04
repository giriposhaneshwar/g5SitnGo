(function () {
    'use strict';
    angular
            .module('app')
            .factory('signalRService', ['$rootScope', '$localStorage', function ($rootScope, $localStorage) {
                    var data;
                    function backendFactory(backendServerUrl, hubName, GameTableID, PlayerID) {

                        console.log('backendFactory' + backendServerUrl + " " + hubName + " " + GameTableID + " " + PlayerID);
                        var connection = $.hubConnection(backendServerUrl);
                        var accessToken = 'dxR8JzzmEMNjtAyk6gFWhvKHjgVFsSeKzINa7j3Qh0_gPfOWnL9liEAC3dqythfHy_8bbMgFjDoHudDvCGWTv_mQgLjObQxQcNhov-mmFfmfTbumuwZYU2v5ZYPb2avnyQMnE9bTknx-swg5NAW_3nXnbMA55o_ikFbVbe9nLtLCfIh8eb1ptE4txx_98SA8YoKafDJIhmkvHkebI0WnPtzal3gobQ_NCvD6xYmjmVGOSIRJU2O5l0VmAKGb64K1zMeXfs4BXx0ca0JCb0ZbhzkWmTJ6FS1vzDSoSiqdQcg2Ldcu5YHlkKTjGCGzVm8agDGOpMk4JotCL-mHR-Ixgy9KhDCyH-2UmD1VVVky34oba3T7jWe82RRQY1TclTS53PXAiLJodxepAP_xLNQ15Q';
                        connection.qs = {'access_token': accessToken};
                        var proxy = connection.createHubProxy(hubName);
                        connection.logging = true;
                        proxy.on("JoinPlayerToTable", function (zoneMsg) {
                            var method = "JoinPlayerToTable";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendMessage", function (zoneMsg) {
                            var method = "sendMessage";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("playerJoinMessage", function (zoneMsg) {
                            var method = "playerJoinMessage";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendGameStart", function (zoneMsg) {
                            var method = "sendGameStart";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("StartGame", function (zoneMsg) {
                            var method = "StartGame";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendQuestion", function (zoneMsg) {
                            var method = "sendQuestion";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendAnswer", function (zoneMsg) {
                            var method = "sendAnswer";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendGameResults", function (zoneMsg) {
                            var method = "sendGameResults";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            updateResponse(method, zoneMsg);
                        });
                        proxy.on("sendExitMessage", function (zoneMsg) {
                            var method = "sendExitMessage";
//                            alert(method, JSON.stringify(zoneMsg));
                            console.log(method, zoneMsg);
                            $rootScope.gameMessage = {message: zoneMsg, method: method}
                        });
                        connection.start({transport: ['webSockets', 'longPolling', 'foreverFrame', 'serverSentEvents'], jsonp: true, xdomain: true}).done(function () {
                            alert('start');
                            proxy.invoke("JoinPlayerToTable", GameTableID, PlayerID).done(function (data) {
                                var method = "JoinPlayerToTable";
                                storeJoinTableData(data);
                                updateResponse(method, data);
                                console.log(method, data);
                            });
                        });
                        function storeJoinTableData(data) {
                            $localStorage.playerData = data;
                            return data;
                        }
                        function updateResponse(method, data) {
                            $rootScope.$apply(function () {
                                $rootScope.gameMessage = {method: method, message: data};
                            });
                        }


                        return {
//                            get: function (eventName) {
//                                if (eventName === "JoinTable") {
//
//                                    return $localStorage.playerData;
//                                }
//                            },
                            on: function (eventName, callback) {
                                console.log("on method called : " + eventName + " cb :" + callback());
                                proxy.on(eventName, function (result) {
                                    console.log("Start Game REsponse", result);
                                    $rootScope.$apply(function () {
                                        if (callback) {
                                            alert("CallaBack");
                                            callback(result);
                                        }
                                    });
                                });
                            },
                            invoke: function (methodName, params, callback) {

                                if (methodName === "ExitTable") {
                                    proxy.invoke(methodName, params)
                                            .done(function (result) {
                                                $rootScope.$apply(function () {
                                                    if (callback) {
                                                        callback(result);
                                                    }
                                                });
                                            });
                                } else if (methodName === "SubmitAnswer") {
                                    proxy.invoke(methodName, params)
                                            .done(function (result) {
                                                $rootScope.$apply(function () {
                                                    if (callback) {
                                                        callback(result);
                                                    }
                                                });
                                            });
                                }

                            }
                        }
                    }

                    return backendFactory;
                }])
})();