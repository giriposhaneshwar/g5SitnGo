(function () {
    'use strict';

    angular
            .module('app')
            .controller('SitNGo.IndexController', ["$scope", "$interval", "$compile", "$pbService", "$timeout", "$window", function ($scope, $interval, $compile, $pbService, $timeout, $window) {


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

                    arr[1] = '{"GameId":2276,"TimeToServeQuestion":10,"PoolAmount":10,"GameTableId":1,"Players":[{"PlayerId":618,"TableId":1,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","ProfileImage":"./assets/images/avatar.png","DisplayName":"sreekanth@mezzlabs.com","Status":3,"UserWallet":{"FreeCoins":500894,"Amount":50,"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa"}},{"PlayerId":619,"TableId":1,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"spayyavula@gmail.com","Status":3,"UserWallet":{"FreeCoins":500894,"Amount":50,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb"}}],"Message":" Game Started."}';

                    arr[2] = '{"GameId":2276,"QuestionId":"a8c6e168-7e40-461b-b21f-21c085e6b84f","Description":"The area bounded by the lines y= 2 +x,y= 2x??and??x= 2 is","TimetoAnswer":30,"Choices":[{"ChoiceId":"0e9dee8f-bbf0-4430-b447-98847fc276af","Title":"3"},{"ChoiceId":"3d49b90e-aa02-407b-abe8-bdc06c46bb8b","Title":"16"},{"ChoiceId":"2ab20994-e305-444a-8a6b-c1e7d3f5912b","Title":"4"},{"ChoiceId":"c05ede50-20c5-4e5c-a538-fdaac39b8381","Title":"8"}],"GameTableId":0,"Players":[{"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","Status":3},{"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3}],"Message":null}';

                    arr[3] = '{"GameId":2508,"AnswerId":"9815cc84-236b-4a0d-a8e3-50a4188a077a","GameTableId":9,"Players":[{"UserId":"0e73aede-4ef8-4460-8cdb-037b52c568c1","Status":3},{"UserId":"7a67f398-140b-4b85-b22b-a858206d81a2","Status":3}],"Message":null}';

                    arr[4] = '[{"GameTableId":9,"GameId":2508,"userId":"0e73aede-4ef8-4460-8cdb-037b52c568c1","DisplayName":null,"timetakeninseconds":0,"Earned":4.75,"IsCorrectAnswer":false},{"GameTableId":9,"GameId":2508,"userId":"7a67f398-140b-4b85-b22b-a858206d81a2","DisplayName":null,"timetakeninseconds":0,"Earned":4.75,"IsCorrectAnswer":false}]';

                    arr[5] = "Game will Start in few seconds.";

                    var i = 0;





                    var game = $interval(function () {
                        simulate(i);
                        i += 1;
                    }, 5000);


                    function simulate(i) {

                        switch (i) {

                            case 0: //Join  Table                 
                                $scope.selfMessage = arr[0];
                                break;
                            case 1: //startGame                   
                                $scope.headerMessage = arr[1];
                                $scope.questionMessage = arr[1];
                                break;

                            case 2: //serveQuestion
//                                var question = getQuestion(arr[4]);
//                                questionText = question.question;
//                                $localStorage.question = questionText;
//                                $scope.question = $localStorage.question;
                                $scope.questionMessage = arr[2];
                                break;
                            case 3://serveAnswer
//                                var question = getQuestion(queue[4]);
//                                questionText = question.question;
                                $scope.questionMessage = arr[3];
//                                $scope.question = questionText;
                                break;
                            case 4://displayResults
//                                var question = getQuestion(queue[4]);
//                                questionText = question.question;
                                $scope.questionMessage = arr[4];
                                $scope.headerMessage = arr[4];
                                $scope.selfMessage = arr[4];
//                                $scope.question = questionText;
                                break;
                            case 5://reset Game
                                $scope.questionMessage = arr[5];
                                clearTimer();
                        }
                    }

                    function clearTimer() {
                        $interval.cancel(game);
                    }


                }])
            .directive('opponentsData', function ($parse) {
                var directiveDefinitionObject = {
                    restrict: 'EA',
                    link: function (scope, el, attr) {
                        var exp = $parse(attr.opponentsData);
                        scope.$watchCollection(exp, function (newVal, oldVal) {
                            //var playerCount = 5;
                            var players = getPlayerInfo(newVal);
                            console.log("Oponnent Data", players);
                            scope.players = players;
                        });



                        function getPlayerInfo(newVal) {
                            var obj = (typeof newVal === "String") ? JSON.parse(newVal) : newVal;
                            var playerCount = getPlayerCount(obj);
                            var players = getPlayerPositions(playerCount);
                            var playersInfoArr = [];
                            var returnObj = {};
//                            alert(obj);
                            var playerInfo = (obj !== undefined) ? obj.Players : [];
                            var i = 0;
                            for (i = 0; i < playerCount; i++) {
                                var nObj = {};
                                nObj['player'] = playerInfo[i];
                                nObj['playerPosition'] = players[i];
                                console.log("Player new Object", nObj);
                                playersInfoArr.push(nObj);
                            }
                            returnObj['PoolAmount'] = (obj !== undefined) ? obj.PoolAmount : [];
                            returnObj['playersInfo'] = playersInfoArr;
                            return returnObj;
                        }
                        function getPlayerCount(newVal) {
//                            alert(newVal);
                            var json = (typeof newVal === "String") ? JSON.parse(newVal) : newVal;
//                            alert(json);
                            var playerCount = (json !== undefined && json["Players"] !== undefined) ? json["Players"].length : 0;
                            return playerCount;
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
                            var currentEvent = getCurrentEvent(newVal);
//                            alert(currentEvent);
                            var displayObject = getDisplayObject(newVal, currentEvent);
//                            alert(currentEvent);
                            if (currentEvent === "init") {
                                scope.message = displayObject;
                            } else if (currentEvent === "startGame") {
                                // displayObject has json object which needs to be parsed to the scope appropriately
                                var startGameJSON = parseStartGame(displayObject);
                                scope.message = startGameJSON.Message;
                                scope.PoolAmount = startGameJSON.PoolAmount;
                                scope.PlayerAttributes = startGameJSON.Players;
                            } else if (currentEvent === "serveQuestion") {
                                var questionobj = parseQuestion(displayObject);
                                scope.question = questionobj.question;
                                scope.answerChoices = question.answerChoices;
                                scope.Players = question.Players;
                            } else if (currentEvent === "serveAnswer") {

                                var answerObj = parseAnswer(displayObject);
                                scope.answer = answerObj.answer;
                                scope.Player = answerObj.Players;
                                scope.message = answerObj.Message;
                            } else if (currentEvent === "showResults") {

                                var resultsObj = parseResults(displayObject);
                                scope.timetakeninseconds = resultsObj.timetakeninseconds;
                                scope.isCorrect = resultsObj.isCorrect;
                                scope.Earned = resultsObj.Earned;
                                scope.displayName = resultsObj.displayName;

                            } else if (currentEvent === "resetGame") {
                                var resultsObj = newVal; //message
                                scope.message = newVal;
                            }

                        })

                        function displayResults(json) {

                            var results = {};

                            for (var i = 0; i < results.length; i++) {
                                results[i].displayName = "";
                                results[i].timetakeninseconds = "";
                                results[i].isCorrect = "";
                                results[i].Earned = "";
                                console.log(results[i]["DisplayName"] + i);
                                results[i].displayName = results[i]["DisplayName"];
                                results[i].timetakeninseconds = results[i]["timetakeninseconds"];
                                results[i].isCorrect = results[i]["isCorrectAnswer"];
                                results[i].Earned = results[i]["Earned"];

                                console.log(results[i].displayName, results[i].timetakeninseconds);

                            }

                            return results;

                        }

                        function parseAnswer(json) {

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
                            var question = [{}];
                            question.question = json["Description"];
                            question.answerChoices = [{}];
                            question.answerChoices = json["Choices"];


                            for (var i = 0; i < question.answerChoices.length; i++) {
                                question.answerChoices[i].Title = question.answerChoices[i]["Title"];
                                question.answerChoices[i].ChoiceId = question.answerChoices[i]["ChoiceId"];
                                console.log(question.answerChoices[i].Title, question.answerChoices[i].ChoiceId)
                            }

                            question.Players = [{}];
                            question.Players = json["Players"];


                            for (var i = 0; i < question.Players.length; i++) {
                                question.Players[i].UserId = question.Players[i]["UserId"];
                                question.Players[i].Status = question.Players[i]["Status"];
                                console.log(question.Players[i].UserId, question.Players[i].Status);
                            }

                            return question;
                        }

                        function parseStartGame(json) {

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

                                console.log(startGameJSON.Players[i].FreeCoins);
                            }
                            return startGameJSON;
                        }

                        function getCurrentEvent(newVal) {
                            //alert($localStorage.currentEvent);
                            var obj = (typeof newVal === "String") ? JSON.parse(newVal) : newVal;
                            var currentEvent;
//                            alert(typeof obj.TimeToServeQuestion);
                            if (obj !== undefined) {
                                if (typeof obj.ProfileImage === 'string') {
                                    currentEvent = "joinTable";
                                } else if (typeof obj.TimeToServeQuestion === 'number') {
                                    currentEvent = "startGame";
                                } else if (typeof obj.QuestionId === 'string') {
                                    currentEvent = "serveQuestion";
                                } else if (obj.AnswerId === 'string') {
                                    currentEvent = "serveAnswer";
                                } else if (obj instanceof Array) {
                                    currentEvent = "gameResults";
                                } else {
                                    currentEvent = "resetGame";
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
                            console.log("Self Data is ", typeof newVal, newVal);
                            var playersPositon = [{"left": 480, "top": 10, "width": 50, "height": 50}];
                            scope.selfPosition = playersPositon;
                            var wallet = getWallet(newVal);
                            scope.wallet = wallet;

                            console.log("Wallet Balence", scope.wallet, newVal)
                            function getWallet(newVal) {
                                var obj = (typeof newVal === "string") ? JSON.parse(newVal) : newVal;
                                if (obj !== undefined && obj.UserWallet) {
                                    console.log("Wallet Chcek ", typeof obj, obj);
                                    var wallet = (obj.UserWallet !== undefined) ? obj.UserWallet.FreeCoins : 0;
                                    $localStorage.selfWallet = wallet;
                                } else {
                                    var wallet = 0;
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