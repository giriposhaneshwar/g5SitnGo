(function () {
    'use strict';
    angular
            .module('app')
            .controller('SitNGo.IndexController',
                    ["$scope", "$rootScope", "$http", "$interval", "$compile", "signalRService", "playGameService", "$timeout", "$window", "$localStorage",
                        function ($scope, $rootScope, $http, $interval, $compile, signalRService, playGameService, $timeout, $window, $localStorage) {
                            var vm = this;
                            vm.zoneID = 16;
                            vm.url = '/api/Join/' + vm.zoneID;
                            var signalRServiceHub = '';
                            var config = {headers: {
                                    'Authorization': 'Bearer  dxR8JzzmEMNjtAyk6gFWhvKHjgVFsSeKzINa7j3Qh0_gPfOWnL9liEAC3dqythfHy_8bbMgFjDoHudDvCGWTv_mQgLjObQxQcNhov-mmFfmfTbumuwZYU2v5ZYPb2avnyQMnE9bTknx-swg5NAW_3nXnbMA55o_ikFbVbe9nLtLCfIh8eb1ptE4txx_98SA8YoKafDJIhmkvHkebI0WnPtzal3gobQ_NCvD6xYmjmVGOSIRJU2O5l0VmAKGb64K1zMeXfs4BXx0ca0JCb0ZbhzkWmTJ6FS1vzDSoSiqdQcg2Ldcu5YHlkKTjGCGzVm8agDGOpMk4JotCL-mHR-Ixgy9KhDCyH-2UmD1VVVky34oba3T7jWe82RRQY1TclTS53PXAiLJodxepAP_xLNQ15Q'
                                }
                            };

                            playGameService.gameUserRequest(serviceBase + vm.url, config, function (response, state) {
                                console.log("Rssssss", response);
                                if (response.data.errorCode === 200) {
                                    $rootScope.gameObj = response;
                                    $localStorage.gamePlayerInfo = {player: response.data.result.playerId, gameTable: response.data.result.gameTableID}
                                    playGameService.startGame($rootScope.gameObj);
                                } else {
                                    $rootScope.errMessage = response.data.errorMessage;
//                                    alert("error");
                                    console.log("ERRROr ", response);
                                }
                            });


                            $scope.$watch('$root.gameObj', function (newVal, oldVal) {
                                // on root varialbel change trigger the method789
                                console.log("New Val", newVal);
                                if ($rootScope.gameObj !== undefined) {

                                }
                            });
                            $scope.$watch('$root.errMessage', function (newVal, oldVal) {
                                // on root varialbel change trigger the method789
                                if (newVal !== undefined) {
                                    alert(newVal);
                                }
                            });
                            $scope.$watch('$root.timerStartCount', function (newVal, oldVal) {
                                // on root varialbel change trigger the method789
                                if (newVal !== undefined) {
                                    $scope.updateCounter = newVal;
                                }
                            });

                            $scope.getMasterScope = function () {
                                console.log("Master Scope", $rootScope.gameMessage);
                            }

                            $scope.arr = {};
                            $scope.answeredTime = {};

                            $scope.answeredQuestion = function (evt, data) {
                                evt.preventDefault();
                                $scope.answeredTime['end'] = playGameService.startTimeRun();
                                console.log("Answered is ", data, $scope.answeredTime);

                                playGameService.submitAnswered(data, $scope.answeredTime);
                            }


                            $scope.$watch('$root.gameMessage', function (newVal, oldVal) {
                                if (newVal !== undefined) {
//                                    alert(JSON.stringify(newVal));
                                    switch (newVal.method) {
                                        case "JoinPlayerToTable":
//                                        alert("join player to table");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.selfMessage = $scope.arr["JoinPlayerToTable"];
                                            $scope.methodType = newVal.method;
                                            break;
                                        case "sendMessage":
//                                        alert("sendMessage");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendMessage"];
                                            $scope.methodType = newVal.method;
                                            break;
                                        case "playerJoinMessage":
//                                        alert("player join message");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["playerJoinMessage"];
                                            $scope.methodType = newVal.method;

                                            break;
                                        case "sendGameStart":
//                                        alert("send game start");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendGameStart"];
                                            $scope.methodType = newVal.method;

                                            break;
                                        case "StartGame":
//                                        alert("start game");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["StartGame"];
                                            $scope.methodType = newVal.method;

                                            break;
                                        case "sendQuestion":
//                                        alert("send question");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendQuestion"];
                                            $scope.methodType = newVal.method;
                                            $scope.answeredTime['start'] = playGameService.startTimeRun();
//                                            alert($rootScope.timerStartCount);
                                            break;
                                        case "sendAnswer":
//                                        alert("send answer");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendAnswer"];
                                            $scope.methodType = newVal.method;

                                            break;
                                        case "sendGameResults":
//                                        alert("send game results");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendGameResults"];
                                            $scope.methodType = newVal.method;

                                            break;
                                        case "sendExitMessage":
//                                        alert("send exit message");
                                            $scope.arr[newVal.method] = newVal.message;
                                            $scope.questionMessage = $scope.arr["sendExitMessage"];
                                            $scope.methodType = newVal.method;
                                            break;
                                    }
                                    console.log("ScopeUpdate si ++++++++++++++++++++++++", $scope.arr);
                                }
                            });


                            $scope.exitCurrentGame = function () {
                                var playerObj = ($localStorage.gamePlayerInfo !== undefined) ? $localStorage.gamePlayerInfo : $rootScope.gameObj.data.result.playerId;
                                playGameService.exitPlayer(playerObj.player, playerObj.gameTable, function (response) {
                                    if (response.status == "success") {
                                        alert("Player Exited");
                                    } else {
                                        alert("please try again later");
                                    }
                                });
                            };

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
                                var oponentWalletStorage = [];
                                angular.forEach(data, function (a, b) {
                                    angular.forEach(playersInfo, function (i, n) {
                                        if (a.UserId == i.UserId) {
//                                            console.log("Oponent Storage", i, a);
                                            i.FreeCoins = parseFloat(i.FreeCoins) + parseFloat(a.Earned);
                                            oponentWalletStorage.push(i);
                                        }
                                    });
                                });
//                                console.log("Final Oponent Data", oponentWalletStorage);
                                $localStorage.oponentWalletStore = oponetWalletStorage;
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
//                                var mathEle = $(el[0]).attr('id');
//                                console.log("MATH", mathEle);
//                                MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathEle.find('#questionText')]);
//                                MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathEle.find('.answerBtn')]);

                                var currentEvent = getCurrentEvent(newVal);
                                scope.state = "";
                                scope.stateMessage = "";
//                                alert(typeof newVal);
                                console.log("Question at Directive is ::::::::::::::::\n", typeof newVal, newVal);
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