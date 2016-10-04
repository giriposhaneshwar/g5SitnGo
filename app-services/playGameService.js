(function () {
    'use strict';
    angular
            .module('app')
            .factory('playGameService', ["$rootScope", "$http", "$localStorage", "signalRService", "$interval", "$timeout", function ($rootScope, $http, $localStorage, signalRService, $interval, $timeout) {
                    var vm = this;
                    var playService = {};
                    vm.accessToken = '';
                    $rootScope.gameObj = {};
                    vm.huburl = '';
                    vm.GameTableID = 0;
                    var message = "Waiting for Players to Join";

                    playService.gameUserRequest = function (url, data, cb) {
                        $http.get(url, data).then(function (response) {
                            if (cb)
                                cb(response, 'success');
                        }, function (err) {
                            if (cb)
                                cb(err, 'error');
                        });
                    }
                    var timeNow = 0;
                    playService.runTime = function (stopTime) {
                        timeNow = stopTime;
                        var countDownTime = $interval(function () {
                            $rootScope.countDownTime = timeNow;
                            timeNow--;
                            if (timeNow < 0) {
                                $interval.cancel(countDownTime);
                            }
                        }, 1000);

                    }
                    playService.startTimeRun = function (stopTime) {
                        var time = new Date();
                        var ts = time.getTime();


                        return ts;
                    }


//                    var signalRServiceHub = getSignalRServiceHub(result);
////
//                    function getSignalRServiceHub(result) {
//                        console.log("Resultss", result);
//                        vm.huburl = result.url;
//                        vm.GameTableID = result.gameTableID;
//                        vm.PlayerID = result.playerId;
////                            vm.GameTableID = result.gameTableID;
//                        return signalRService(vm.huburl, 'sitngo', vm.GameTableID, vm.PlayerID);
//                    }
                    var signalRServiceHub;
                    playService.startGame = function (data) {
//                        alert("starting Game");

                        var playerId = data.data.result.playerId;
                        var gameTableId = data.data.result.gameTableID;
                        var hubUrl = data.data.result.url;
                        signalRServiceHub = signalRService(hubUrl, 'sitngo', gameTableId, playerId);

                        console.log("signalRServiceHub", signalRServiceHub);

                        return signalRServiceHub;
                    }

                    playService.exitPlayer = function (player, gameTable, cb) {
                        signalRServiceHub.invoke("ExitTable", player, function (response) {
                            console.log("Exit Method", response);
                            if (cb)
                                cb(response);
                        });
                    }

                    playService.submitAnswered = function (data, time) {
                        var playerInfo = $localStorage.playerData;
                        var obj = {
                            "GameTableId": 6004,
                            "GameId": 12,
                            "userId": "b9daec83-083c-4119-9176-f321314b9b74",
                            "PlayerId": 320,
                            "ChoiceId": data.ChoiceId,
                            "timetakeninseconds": time,
                            "IsAnswered": true
                        };


                        console.log("submitted Answer", playerInfo, obj, data);
                    }





                    return playService;

                }]);// factory end
})();





//                $http.get(vm.serviceBase + vm.url, config).then(function successCallback(response) {
//                    console.log("HTTP Responses ------------------------------------\n", response);
//                    var results = response.data;
//                    var result = results["result"];
//                    console.log(result);
//
//
//                    signalRServiceHub = getSignalRServiceHub(result);
//
//                    function getSignalRServiceHub(result) {
//                        console.log("Resultss", result);
//                        vm.huburl = result.url;
//                        vm.GameTableID = result.gameTableID;
//                        vm.PlayerID = result.playerId;
////                            vm.GameTableID = result.gameTableID;
//                        return signalRService(vm.huburl, 'sitngo', vm.GameTableID, vm.PlayerID);
//                    }
//
//                    signalRServiceHub.on("Exit", function cb(zoneMsg) {
//                        console.log('Exit called');
////                            console.log(JSON.stringify(sendQuestion));
////                            var questionNAnswerChoice = getQuestion(zoneMsg);
//                        $scope.message = "Serving Question";
//                    });
//
//                    signalRServiceHub.on("sendMessage", function cb(zoneMsg) {
//                        console.log('sendMessage called');
//                        console.log(JSON.stringify(zoneMsg));
//                        $scope.message = zoneMsg;
//                    });
//
//                    var activePlayers = [];
//                    var waitPlayers = [];
////                        signalRServiceHub.on("sendPlayerList", function cb(zoneMsg) {
////                            console.log('sendPlayerList called');
////                            console.log(JSON.stringify(zoneMsg));
////                            activePlayers = getActivePlayers(zoneMsg);
////                            waitPlayers = getWaitingPlayers(zoneMsg);
////                            $scope.message = "Sent Players List";
////                        });
//
//                    function getActivePlayers(json) {
//                        var activePlayers = [];
//                        var Players = json["Players"];
//                        for (var i = 0; i < Players.length; i++) {
//                            if (jsonStr["Players"][i]["Status"] === 3)
//                                activePlayers[i] = jsonStr["Players"][i]["UserId"];
//                        }
//
//                        return activePlayers;
//                    }
//
//                    function getWaitingPlayers(json) {
//                        var waitPlayers = [];
//                        var Players = json["Players"];
//                        for (var i = 0; i < Players.length; i++) {
//                            if (jsonStr["Players"][i]["Status"] === 2)
//                                waitPlayers[i] = jsonStr["Players"][i]["UserId"];
//                        }
//
//                        return waitPlayers;
//                    }
//
//
//                    signalRServiceHub.on("JoinPlayerToTable", function cb(zoneMsg) {
//                        console.log('StartGame called');
//                        console.log(zoneMsg);
////                            var userDisplayNameNWallet = getUserDisplayNameNWallet(zoneMsg);
////                            opponentsDisplayNamesNWallet = getOpponentsDisplayNamesNWallet(zoneMsg);
//                        $scope.message = "Starting Game in 10 seconds";
//                    });
//
//
//                    var opponentsDisplayNamesNWallet = [];
//
//                    signalRServiceHub.on("StartGame", function cb(zoneMsg) {
//                        console.log('StartGame called');
//                        console.log(zoneMsg);
////                            var userDisplayNameNWallet = getUserDisplayNameNWallet(zoneMsg);
////                            opponentsDisplayNamesNWallet = getOpponentsDisplayNamesNWallet(zoneMsg);
//                        $scope.message = "Starting Game in 10 seconds";
//                    });
//
//                    function getUserDisplayNameNWallet(json) {
//                        var displayNameNWallet = {};
//                        var user = json["Player"]["DisplayName"];
//                        var wallet = json["Player"]["UserWallet"]["FreeCoins"];
//                        displayNameNWallet.user = user;
//                        displayNameNWallet.wallet = wallet;
//                        console.log(displayNameNWallet.user, displayNameNWallet.wallet);
//                        return displayNameNWallet;
//                    }
//
//                    function getOpponentsDisplayNameNWallet(json) {
//                        var displayNameNWallet = [{}];
//                        var opponents = json["Opponents"];
//
//                        for (var i = 0; i < opponents.length; i++) {
//                            displayNameNWallet[i].wallet = opponents[i]["UserWallet"]["FreeCoins"];
//                            displayNameNWallet[i].displayName = opponents[i]["DisplayName"];
//                            console.log(displayNameNWallet[i].displayName, displayNameNWallet[i].wallet);
//                        }
//
//                        return displayNameNWallet;
//                    }
//
//
//
//                    signalRServiceHub.on("sendQuestion", function cb(zoneMsg) {
//                        console.log('sendQuestion called');
////                            console.log(JSON.stringify(sendQuestion));
////                            var questionNAnswerChoice = getQuestion(zoneMsg);
//                        $scope.message = "Serving Question";
//                    });
//
//                    function getQuestion(json) {
//                        var question = [{}];
//                        question.question = jsonStr["Description"];
//                        var choices = json["Choices"]
//                        question.answerChoices = [];
//                        for (var i = 0; i < choices.length; i++) {
//                            question.answerChoices[i] = choices[i]["Title"];
//                            console.log(question, question.answerChoices[i])
//                        }
//
//                        return question;
//                    }
//
//                    signalRServiceHub.on("send Answer", function cb(zoneMsg) {
//                        console.log('sendAnswer called');
//                        console.log(zoneMsg);
//                        // $scope.message = "Sending Answer";      
//                    });
//
//                    signalRServiceHub.on("sendGameResults", function cb(zoneMsg) {
//                        console.log('sendGameResults called');
////                            console.log(JSON.stringify(sendGameResults));
////                            var results = getResults(zoneMsg);
//                    });
//
//                    function displayResults(json) {
//
//
//                        var results = json["results"];
//
//                        for (var i = 0; i < results.length; i++) {
//                            results[i].displayName = "";
//                            results[i].timetakeninseconds = "";
//                            results[i].isCorrect = "";
//                            results[i].Earned = "";
//                            results[i].displayName = results[i]["DisplayName"];
//                            results[i].timetakeninseconds = results[i]["timetakeninseconds"];
//                            results[i].isCorrect = results[i]["isCorrectAnswer"];
//                            results[i].Earned = results[i]["Earned"];
//                        }
//
//                        return results;
//
//                    }
//
//
//
//                }, function errorCallback(response) {
//                    console.log(response);
//                });
//
//                function connectToHub() {
//
//                }