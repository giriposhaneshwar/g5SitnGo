(function () {
    'use strict';
    angular
            .module('app')
            .controller('SitNGo.IndexController', ["$scope", "$http", "$interval", "$compile", "signalRService", "$timeout", "$window", function ($scope, $http, $interval, $compile, signalRService, $timeout, $window) {




                    var vm = this;
                    vm.accessToken = '';
                    vm.serviceBase = 'http://g5.azurewebsites.net';
                    vm.url = '';
                    vm.huburl = '';
                    vm.GameTableID = 0;
                    vm.zoneID = 16;
                    var message = "Waiting for Players to Join";

                    vm.url = '/api/Join/' + vm.zoneID;
                    var signalRServiceHub = '';
                    var config = {headers: {
                            'Authorization': 'Bearer  511TP1AhdGIgjyxbSVx_HfZr7XnkFzWF7LC7r8uPnCPiQjC5-tFxgvaUUFCL6qvEhnbMY3MUxCE40MQZWUsfsBbHCCjlK5btIiX8cBYSWFy5A-mgDTkjxqO_37w_swqZP1ADxiDTvjseChqzSB-lWwRC8nJMiDVCuycnrF1vhO0DwNqDdN779T6OJ9i76xMKtDgL88FY7b374fddea5g9EB9wgb86dQtBCupYxHvlBLboPhdwQhrBd5PAwXLmchwHrMXTM4hrEqjUEirPSSg35ghr7ZUCBn3rBewDfo8OjbYCimxoIvqsMO-mghoubivHNfB1Dy6wq0K0E3HROpU7mzDqQUtqbVS5tBETY9AeF8YtLLeJI6QemuOgc2kiV5DeWgHsR4JQc6O__IcxG2Tmg'
                        }
                    };
//
//                    $http.get(vm.serviceBase + vm.url, config).then(function successCallback(response) {
//                        console.log("HTTP Responses ------------------------------------\n", response);
//                        var results = response.data;
//                        var result = results["result"];
//                        console.log(result);
//
//
//                        signalRServiceHub = getSignalRServiceHub(result);
//
//                        function getSignalRServiceHub(result) {
//                            vm.huburl = result.url;
//                            vm.GameTableID = result.gameTableID;
//                            return signalRService(vm.huburl, 'sitngo', vm.GameTableID);
//                        }
//
//                        signalRServiceHub.on("sendMessage", function cb(zoneMsg) {
//                            console.log('sendMessage called');
//                            console.log(JSON.stringify(zoneMsg));
//                            $scope.message = zoneMsg;
//                        });
//
//                        var activePlayers = [];
//                        var waitPlayers = [];
//                        signalRServiceHub.on("sendPlayerList", function cb(zoneMsg) {
//                            console.log('sendPlayerList called');
//                            console.log(JSON.stringify(zoneMsg));
//                            activePlayers = getActivePlayers(zoneMsg);
//                            waitPlayers = getWaitingPlayers(zoneMsg);
//                            $scope.message = "Sent Players List";
//                        });
//
//                        function getActivePlayers(json) {
//                            var activePlayers = [];
//                            var Players = json["Players"];
//                            for (var i = 0; i < Players.length; i++) {
//                                if (jsonStr["Players"][i]["Status"] === 3)
//                                    activePlayers[i] = jsonStr["Players"][i]["UserId"];
//                            }
//
//                            return activePlayers;
//                        }
//
//                        function getWaitingPlayers(json) {
//                            var waitPlayers = [];
//                            var Players = json["Players"];
//                            for (var i = 0; i < Players.length; i++) {
//                                if (jsonStr["Players"][i]["Status"] === 2)
//                                    waitPlayers[i] = jsonStr["Players"][i]["UserId"];
//                            }
//
//                            return waitPlayers;
//                        }
//
//                        var opponentsDisplayNamesNWallet = [];
//
//                        signalRServiceHub.on("startGame", function cb(zoneMsg) {
//                            console.log('startGame called');
//                            console.log(JSON.stringify(startGame));
//                            var userDisplayNameNWallet = getUserDisplayNameNWallet(zoneMsg);
//                            opponentsDisplayNamesNWallet = getOpponentsDisplayNamesNWallet(zoneMsg);
//                            $scope.message = "Starting Game in 10 seconds";
//                        });
//
//                        function getUserDisplayNameNWallet(json) {
//                            var displayNameNWallet = {};
//                            var user = json["Player"]["DisplayName"];
//                            var wallet = json["Player"]["UserWallet"]["FreeCoins"];
//                            displayNameNWallet.user = user;
//                            displayNameNWallet.wallet = wallet;
//                            console.log(displayNameNWallet.user, displayNameNWallet.wallet);
//                            return displayNameNWallet;
//                        }
//
//                        function getOpponentsDisplayNameNWallet(json) {
//                            var displayNameNWallet = [{}];
//                            var opponents = json["Opponents"];
//
//                            for (var i = 0; i < opponents.length; i++) {
//                                displayNameNWallet[i].wallet = opponents[i]["UserWallet"]["FreeCoins"];
//                                displayNameNWallet[i].displayName = opponents[i]["DisplayName"];
//                                console.log(displayNameNWallet[i].displayName, displayNameNWallet[i].wallet);
//                            }
//
//                            return displayNameNWallet;
//                        }
//
//
//
//                        signalRServiceHub.on("sendQuestion", function cb(zoneMsg) {
//                            console.log('sendQuestion called');
//                            console.log(JSON.stringify(sendQuestion));
//                            var questionNAnswerChoice = getQuestion(zoneMsg);
//                            $scope.message = "Serving Question";
//                        });
//
//                        function getQuestion(json) {
//                            var question = [{}];
//                            question.question = jsonStr["Description"];
//                            var choices = json["Choices"]
//                            question.answerChoices = [];
//                            for (var i = 0; i < choices.length; i++) {
//                                question.answerChoices[i] = choices[i]["Title"];
//                                console.log(question, question.answerChoices[i])
//                            }
//
//                            return question;
//                        }
//
//                        signalRServiceHub.on("send Answer", function cb(zoneMsg) {
//                            console.log('sendAnswer called');
//                            console.log(zoneMsg);
//                            // $scope.message = "Sending Answer";      
//                        });
//
//                        signalRServiceHub.on("sendGameResults", function cb(zoneMsg) {
//                            console.log('sendGameResults called');
//                            console.log(JSON.stringify(sendGameResults));
//                            var results = getResults(zoneMsg);
//                        });
//
//                        function displayResults(json) {
//
//
//                            var results = json["results"];
//
//                            for (var i = 0; i < results.length; i++) {
//                                results[i].displayName = "";
//                                results[i].timetakeninseconds = "";
//                                results[i].isCorrect = "";
//                                results[i].Earned = "";
//                                results[i].displayName = results[i]["DisplayName"];
//                                results[i].timetakeninseconds = results[i]["timetakeninseconds"];
//                                results[i].isCorrect = results[i]["isCorrectAnswer"];
//                                results[i].Earned = results[i]["Earned"];
//                            }
//
//                            return results;
//
//                        }
//
//
//
//                    }, function errorCallback(response) {
//                        console.log(response);
//                    });


                    ///////////////////////////////



                    $scope.code = 'Demonstrate two-way da binding';
//                    var message = {header: {}, question: {}, self: {}};
                    var headerMessage, questionMessage, selfMessage;
                    var questionText;
                    $scope.headerMessage = headerMessage;
                    $scope.questionMessage = questionMessage;
                    $scope.selfMessage = selfMessage;
                    $scope.timeToAnswer = 4000;
                    $window.timeToAnswer = $scope.timeToAnswer;
                    var arr = [];
                    arr[0] = '{"PlayerId":618,"TableId":1,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","ProfileImage":"./assets/images/avatar.png","DisplayName":"giriy","Status":3,"UserWallet":{"FreeCoins":500894,"Amount":50,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa"}}';
                    arr[1] = '{"GameId":2276,"TimeToServeQuestion":10,"PoolAmount":10,"GameTableId":1,"Players":[{"PlayerId":618,"TableId":1,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","ProfileImage":"./assets/images/avatar.png","DisplayName":"sreekanth@mezzlabs.com","Status":3,"UserWallet":{"FreeCoins":500894,"Amount":50,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa"}},{"PlayerId":619,"TableId":1,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"spayyavula@gmail.com","Status":3,"UserWallet":{"FreeCoins":500894,"Amount":50,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb"}},{"PlayerId":620,"TableId":1,"UserId":"rt2345f9-aef0-4daa-81af-8a72d6d4e0bb","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"giri@gmail.com","Status":3,"UserWallet":{"FreeCoins":23560,"Amount":80,"UserId":"rt2345f9-aef0-4daa-81af-8a72d6d4e0bb"}}],"Message":" Game Started."}';
                    arr[2] = '{"GameId":2276,"QuestionId":"a8c6e168-7e40-461b-b21f-21c085e6b84f","Description":"The area bounded by the lines y= 2 +x,y= 2x??and??x= 2 is","TimetoAnswer":30,"Choices":[{"ChoiceId":"0e9dee8f-bbf0-4430-b447-98847fc276af","Title":"3"},{"ChoiceId":"3d49b90e-aa02-407b-abe8-bdc06c46bb8b","Title":"16"},{"ChoiceId":"2ab20994-e305-444a-8a6b-c1e7d3f5912b","Title":"4"},{"ChoiceId":"c05ede50-20c5-4e5c-a538-fdaac39b8381","Title":"8"}],"GameTableId":0,"Players":[{"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","Status":3},{"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3},{"UserId":"rt2345f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3}],"Message":null}';
                    arr[3] = '{"GameId":2508,"AnswerId":"0e9dee8f-bbf0-4430-b447-98847fc276af","GameTableId":9,"Players":[{"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","Status":3},{"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3},{"UserId":"rt2345f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3}],"Message":null}';
                    arr[4] = '[{"GameTableId":9,"GameId":2508,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","DisplayName":null,"timetakeninseconds":2000,"Earned":4.75,"IsCorrectAnswer":false},{"GameTableId":9,"GameId":2508,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","DisplayName":null,"timetakeninseconds":0,"Earned":4.75,"IsCorrectAnswer":false},{"GameTableId":9,"GameId":2508,"UserId":"rt2345f9-aef0-4daa-81af-8a72d6d4e0bb","DisplayName":null,"timetakeninseconds":0,"Earned":0,"IsCorrectAnswer":true}]';
//                    arr[5] = "Game will Start in few seconds.";
                    var i = 0;
                    $scope.timeLimit = 5;
                    var game = $interval(function () {
                        simulate(i);
                        i += 1;
                    }, ($scope.timeLimit * 1000));
                    function simulate(i) {

//                        alert($scope.timeLimit);
                        switch (i) {
                            case 0: //Join  Table                 
                                $scope.selfMessage = arr[0];
                                break;
                            case 1: //startGame    
                                var dt = (typeof arr[1] === 'string') ? JSON.parse(arr[1]) : arr[1];
                                $scope.timeLimit = dt.TimeToServeQuestion;
                                $scope.headerMessage = arr[1];
                                $scope.questionMessage = arr[1];
                                break;
                            case 2: //serveQuestion
//                                var question = getQuestion(arr[4]);
//                                questionText = question.question;
//                                $localStorage.question = questionText;
//                                $scope.question = $localStorage.question;

                                var dt = (typeof arr[1] === 'string') ? JSON.parse(arr[2]) : arr[2];
                                $scope.timeLimit = dt.TimetoAnswer;
                                $scope.headerMessage = arr[2];
                                $scope.questionMessage = arr[2];
                                break;
                            case 3://serveAnswer
//                                var question = getQuestion(queue[4]);
//                                questionText = question.question;
                                $scope.headerMessage = arr[3];
                                $scope.questionMessage = arr[3];
                                $scope.timeLimit = 5;
//                                $scope.question = questionText;
                                break;
                            case 4://displayResults
//                                var question = getQuestion(queue[4]);
//                                questionText = question.question;
                                $scope.questionMessage = arr[4];
                                $scope.headerMessage = arr[4];
                                $scope.selfMessage = arr[4];
//                                $scope.question = questionText;
                                clearTimer();
                                break;
//                            case 5://reset Game
//                                $scope.questionMessage = arr[5];
                        }
                    }

                    function clearTimer() {
                        $interval.cancel(game);
                    }


                }])
            .directive('opponentsData', function ($parse, $localStorage) {
                var directiveDefinitionObject = {
                    restrict: 'EA',
                    link: function (scope, el, attr) {
                        var exp = $parse(attr.opponentsData);
                        scope.$watchCollection(exp, function (newVal, oldVal) {
                            //var playerCount = 5;
                            if (newVal !== undefined) {
                                newVal = (typeof newVal === "string") ? JSON.parse(newVal) : newVal;
//                                console.log("Oponents Data is ", typeof newVal, newVal);
                                // number of players includeing self in "Players" key
                                if (newVal.hasOwnProperty('TimeToServeQuestion')) {
                                    var oponents = getOponents(newVal.Players);
                                    var oponentsWalletInfo = oponentWallet(oponents);
                                    scope.oponentsWalletInfo = oponentsWalletInfo;
                                    var players = getPlayerInfo(oponents);
                                    players['PoolAmount'] = newVal.PoolAmount;
                                    scope.players = players;
                                } else if (!newVal.hasOwnProperty('UserWallet')) {
                                    var oponentWalletUpdate = updateOponentWallet(scope.oponentsWalletInfo, newVal);
                                }
                            }
                        });
                        function updateOponentWallet(playersInfo, data) {
                            if (data instanceof Array) {
                                // adding the vales on display results
                                alert(1);
                                angular.forEach(data, function (a, b) {
                                    angular.forEach(playersInfo, function (i, n) {
                                        if (a.UserId == i.UserId) {
                                            alert(a.UserId + "\n" + i.UserId);
                                        }
                                    });
                                });
                            }
                        }
                        function getOponents(playerData) {
//                            console.log(typeof playerData, playerData);
                            var oponentsArr = [];
                            for (var player in playerData) {
                                var playerInfo = playerData[player];
                                if (playerInfo.UserId != $localStorage.selfUserId) {
                                    oponentsArr.push(playerData[player]);
                                }
                            }
                            return oponentsArr;
                        }
                        function oponentWallet(oponents) {
                            console.log("Oponents are", oponents);
                            var oponentArr = [];
                            angular.forEach(oponents, function (a, b) {
                                oponentArr.push(a.UserWallet);
                            });

                            $localStorage.oponentWalletStore = oponentArr;
                            return oponentArr;
                        }
                        function getPlayerInfo(newVal) {
                            var playerCount = getPlayerCount(newVal);
                            var playerPosition = getPlayerPositions(playerCount);
                            var playersInfoArr = [];
                            var returnObj = {};
//                            alert(obj);
                            var i = 0;
                            for (i = 0; i < playerCount; i++) {
                                var nObj = {};
                                nObj['player'] = newVal[i];
                                nObj['playerPosition'] = playerPosition[i];
                                playersInfoArr.push(nObj);
                            }
                            returnObj['playersInfo'] = playersInfoArr;
                            return returnObj;
                        }
                        function getPlayerCount(newVal) {
                            // if the arguments is stirng in future you can handle and converto to array

                            return newVal.length;
                        }

                        function getPlayerPositions(count) {
                            var positions = [{}];
                            positions = getPositions(count);
                            return positions;
                        }

                        function getPositions(count) {
                            switch (count) {
                                case 1:
                                    return [{"left": 480, "top": 50, "width": 50, "height": 50, "seat": 1}];
                                case 2:
                                    return [{"left": 240, "top": 63, "width": 50, "height": 50, "seat": 2},
                                        {"left": 480, "top": 50, "width": 50, "height": 50, "seat": 1}];
                                case 3:
                                    return [{"left": 240, "top": 63, "width": 50, "height": 50, "seat": 2},
                                        {"left": 480, "top": 50, "width": 50, "height": 50, "seat": 1},
                                        {"left": 720, "top": 63, "width": 50, "height": 50, "seat": 3}];
                                case 4:
                                    return [{"left": 0, "top": 110, "width": 50, "height": 50, "seat": 4},
                                        {"left": 240, "top": 63, "width": 50, "height": 50, "seat": 2},
                                        {"left": 480, "top": 50, "width": 50, "height": 50, "seat": 1},
                                        {"left": 720, "top": 63, "width": 50, "height": 50, "seat": 3}];
                                case 5:
                                    return [{"left": 0, "top": 110, "width": 50, "height": 50, "seat": 4},
                                        {"left": 240, "top": 63, "width": 50, "height": 50, "seat": 2},
                                        {"left": 480, "top": 50, "width": 50, "height": 50, "seat": 1},
                                        {"left": 720, "top": 63, "width": 50, "height": 50, "seat": 3},
                                        {"left": 950, "top": 110, "width": 50, "height": 50, "seat": 5}];
                            }
                        }
                    },
                    templateUrl: 'directives/opponents.html'
                }
                return directiveDefinitionObject;
            })
            .directive('questionData', function ($parse, $timeout, $localStorage) {
                var directiveDefinitionObject = {
                    restrict: 'EA',
                    link: function (scope, el, attr) {
                        var exp = $parse(attr.questionData);
                        scope.$watchCollection(exp, function (newVal, oldVal) {
                            if (newVal !== undefined) {

                                var currentEvent = getCurrentEvent(newVal);
                                scope.state = "";
                                scope.stateMessage = "";
//                                alert(typeof newVal);
                                var newVal = (typeof newVal !== "string") ? JSON.parse(newVal) : newVal;
                                var displayObject = getDisplayObject(newVal, currentEvent);
                                console.log("Curretn Event", currentEvent);
                                if (currentEvent === "joinTable") {
                                    scope.questionMessage = displayObject;
                                } else if (currentEvent === "startGame") {
                                    // displayObject has json object which needs to be parsed to the scope appropriately
                                    var startGameJSON = parseStartGame(displayObject);
                                    scope.questionMessage = startGameJSON.Message;
                                    scope.PoolAmount = startGameJSON.PoolAmount;
                                    scope.PlayerAttributes = startGameJSON.Players;
                                    scope.state = currentEvent;
                                    scope.stateMessage = startGameJSON.Message;
                                } else if (currentEvent === "serveQuestion") {
                                    var questionobj = parseQuestion(displayObject);
                                    scope.question = questionobj.question;
                                    scope.answerChoices = questionobj.answerChoices;
                                    scope.Players = questionobj.Players;
                                    scope.state = currentEvent;
                                    scope.stateMessage = questionobj.question;
                                } else if (currentEvent === "serveAnswer") {

                                    var answerObj = parseAnswer(displayObject);
                                    scope.answer = answerObj.answer;
                                    scope.Player = answerObj.Players;
                                    scope.state = currentEvent;
                                    checkAnserResult(scope.answerChoices, scope.answer, scope.answered);
//                                    scope.questionMessage = answerObj.answer;

                                    console.log("Answer Message", answerObj, scope.questionMessage);
                                } else if (currentEvent === "showResults") {

                                    var resultsObj = parseResults(displayObject);
                                    scope.timetakeninseconds = resultsObj.timetakeninseconds;
                                    scope.isCorrect = resultsObj.isCorrect;
                                    scope.Earned = resultsObj.Earned;
                                    scope.displayName = resultsObj.displayName;

                                } else if (currentEvent === "resetGame") {
                                    var resultsObj = newVal; //message
                                    scope.questionMessage = newVal;
                                }

                            }
                        });
                        function displayResults(json) {

                            var results = {};
                            for (var i = 0; i < results.length; i++) {
                                results[i].displayName = "";
                                results[i].timetakeninseconds = "";
                                results[i].isCorrect = "";
                                results[i].Earned = "";
//                                // console.log(results[i]["DisplayName"] + i);
                                results[i].displayName = results[i]["DisplayName"];
                                results[i].timetakeninseconds = results[i]["timetakeninseconds"];
                                results[i].isCorrect = results[i]["isCorrectAnswer"];
                                results[i].Earned = results[i]["Earned"];
//                                // console.log(results[i].displayName, results[i].timetakeninseconds);
                            }

                            return results;
                        }
                        scope.attemptAnswerButton = false;
                        scope.attemptAnswer = function (evt, data, key) {
                            if (!scope.attemptAnswerButton) {
                                scope.attemptAnswerButton = true;
                                scope.attempted = key;
                                scope.answered = data.ChoiceId;

                                var selectedEle = angular.element("#opt_" + key);
                                selectedEle.parent().children().addClass('notAttempt');
                                selectedEle.removeClass('notAttempt').addClass('attempt');
                                scope.showResult = (scope.answer === scope.answered);
                                scope.setClass = "attempt";
                            }
                        }
                        // method for showing the write or wrong answer with color codes
                        function checkAnserResult(choices, val, ans) {
                            var selectedEle = angular.element(".opt");
                            angular.forEach(selectedEle, function (ele, indx) {
                                var choseAnswer = angular.element(ele).attr('optval');
                                var choseIndex = angular.element(ele).attr('optpos');
                                var element = angular.element(ele);
                                if (choseIndex == scope.attempted) {
                                    if (scope.answer == scope.answered) {
                                        element.addClass('currect');
                                    } else {
                                        element.addClass('wrong');
                                    }
                                } else {
                                    if (scope.answer == choseAnswer) {
                                        element.addClass('currect');
                                    }
                                }
                            });
                        }

                        function parseAnswer(json) {
                            json = (typeof json === "Object") ? json : JSON.parse(json);
                            var answerObj = {};
                            var Players = [{}];
                            Players = json['Players'];
                            var Message = json['Message'];
                            for (var i = 0; i < Players.length; i++) {
                                Players[i].UserId = Players[i]["UserId"];
                                Players[i].Status = Players[i]["Status"];
                            }

                            answerObj.Message = Message;
                            answerObj.answer = json['AnswerId'];
                            answerObj.Players = Players;
                            return answerObj;
                        }

                        function parseQuestion(json) {
                            json = (typeof json === "Object") ? json : JSON.parse(json);
                            var question = [{}];
                            question.question = json["Description"];
                            question.answerChoices = [{}];
                            question.answerChoices = json["Choices"];
                            for (var i = 0; i < question.answerChoices.length; i++) {
                                question.answerChoices[i].Title = question.answerChoices[i]["Title"];
                                question.answerChoices[i].ChoiceId = question.answerChoices[i]["ChoiceId"];
                                // console.log(question.answerChoices[i].Title, question.answerChoices[i].ChoiceId)
                            }

                            question.Players = [{}];
                            question.Players = json["Players"];
                            for (var i = 0; i < question.Players.length; i++) {
                                question.Players[i].UserId = question.Players[i]["UserId"];
                                question.Players[i].Status = question.Players[i]["Status"];
                                // console.log(question.Players[i].UserId, question.Players[i].Status);
                            }

                            return question;
                        }

                        function parseStartGame(json) {
                            json = (typeof json === "Object") ? json : JSON.parse(json);
                            var startGameJSON = {};
                            startGameJSON.TimeToServeQuestion = json['TimeToServeQuestion'];
                            startGameJSON.PoolAmount = json['PoolAmount'];
                            startGameJSON.Message = json['Message'];
                            startGameJSON.Players = [{}];
                            startGameJSON.Players = json['Players'];
                            for (var i = 0; i < startGameJSON.Players.length; i++) {
                                startGameJSON.Players[i].UserId = startGameJSON.Players[i]["UserId"];
                                startGameJSON.Players[i].ProfileImage = startGameJSON.Players[i]["ProfileImage"];
                                startGameJSON.Players[i].displayName = startGameJSON.Players[i]["DisplayName"];
                                startGameJSON.Players[i].Status = startGameJSON.Players[i]["Status"];
                                startGameJSON.Players[i].FreeCoins = startGameJSON.Players[i]['UserWallet']['FreeCoins'];
                                startGameJSON.Players[i].PaidAmount = startGameJSON.Players[i]['UserWallet']['PaidAmount'];
                                startGameJSON.Players[i].EarnAmount = startGameJSON.Players[i]['UserWallet']['EarnAmount'];
                                // console.log(startGameJSON.Players[i].FreeCoins);
                            }
                            return startGameJSON;
                        }

                        function getCurrentEvent(newVal) {
                            //t($localStorage.currentEvent);
                            var obj = (typeof newVal === "string") ? JSON.parse(newVal) : newVal;
                            var currentEvent;
//                            alert(typeof obj.TimeToServeQuestion);
                            if (obj !== undefined) {
                                console.log("getCurrentEvent Metod", typeof obj, obj);
                                if (obj.hasOwnProperty('UserWallet')) {
                                    currentEvent = "joinTable";
                                } else if (obj.hasOwnProperty('TimeToServeQuestion')) {
                                    currentEvent = "startGame";
                                } else if (obj.hasOwnProperty('QuestionId')) {
                                    currentEvent = "serveQuestion";
                                } else if (obj.hasOwnProperty('AnswerId')) {
                                    currentEvent = "serveAnswer";
                                } else if (obj instanceof Array) {
                                    currentEvent = "gameResults";
                                }
                            }

                            return currentEvent;
                        }

                        function isJson(jsonToCheck) {
                            var isJson = false;
                            var outPutValue = "";
                            var objectConstructor = {}.constructor;
                            if (jsonToCheck.constructor === objectConstructor) {
                                outPutValue = JSON.stringify(jsonToCheck);
                                try {
                                    JSON.parse(outPutValue);
                                    isJson = true;
                                } catch (err) {
                                    isJson = false;
                                }
                            }
                            return isJson;
                        }

                        function getDisplayObject(newVal, currentEvent) {
                            var json;
                            if (typeof newVal !== "Object")
                                json = (typeof newVal === "String") ? JSON.parse(newVal) : newVal;
                            if (currentEvent === "init") {
                                return newVal; // string message
                            } else if (currentEvent in ["startGame", "serveQuestion", "serveAnswer", "showResults"]) {
                                return json;
                            } else {
                                return newVal; // for resetGame
                            }
                        }
                    },
                    templateUrl: 'directives/questions.html'
                }
                return directiveDefinitionObject;
            })
            .directive('selfData', function ($parse, $localStorage) {
                var directiveDefinitionObject = {
                    restrict: 'EA',
                    link: function (scope, el, attr) {
                        var exp = $parse(attr.selfData);
                        scope.$watchCollection(exp, function (newVal, oldVal) {
                            // console.log("Self Data is ", typeof newVal, newVal);
                            var playersPositon = [{"left": 480, "top": 10, "width": 50, "height": 50}];
                            scope.selfPosition = playersPositon;
                            var wallet = getWallet(newVal);
                            scope.wallet = wallet;
                            // console.log("Wallet Balence", scope.wallet, newVal)

                            function getWallet(newVal) {
                                var obj = (typeof newVal === "string") ? JSON.parse(newVal) : newVal;
                                if (obj !== undefined && obj.UserWallet) {
                                    // console.log("Wallet Chcek ", typeof obj, obj);
                                    var wallet = (obj.UserWallet !== undefined) ? obj.UserWallet.FreeCoins : 0;
                                    $localStorage.selfWallet = wallet;
//                                    wallet = $localStorage.selfWallet;
                                    $localStorage.selfUserId = obj.UserId;
                                } else { // show results
                                    // console.log("user object on 4th request", obj);
                                    if (obj !== undefined) {
                                        for (var i = 0; i < obj.length; i++) {
                                            if (obj[i]['UserId'] === $localStorage.selfUserId) {
                                                var wallet = $localStorage.selfWallet;
                                                $localStorage.selfWallet = parseFloat(wallet) + parseFloat(obj[i].Earned);
                                                wallet = $localStorage.selfWallet;
                                            }
                                        }
                                    } else {
                                        var wallet = 0;
                                    }
                                }

                                return wallet;
                            }

                        })
                    },
                    templateUrl: 'directives/self.html'
                }
                return directiveDefinitionObject;
            })


})()