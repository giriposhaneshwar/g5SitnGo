(function () {
    'use strict';

    angular
        .module('app')
        .controller('SitNGo.IndexController', ["$scope", "$http", "$rootScope", "signalRService", "$timeout", "$interval", function ( $scope, $http, $rootScope, signalRService, $timeout, $interval) {

            var vm = this;
            vm.accessToken = '';
            vm.serviceBase = 'http://g5api.azurewebsites.net';
            vm.url = '';
            vm.huburl = '';
            vm.GameTableID = 0;
            vm.zoneID = 16;
            var message = "Waiting for Players to Join";

            vm.url = '/api/Join/' + vm.zoneID;
            var signalRServiceHub = '';

            var config = {headers: {
                            'Authorization': 'Bearer  hI0r_Ya4NNvlXIDE6G7KmCwCJBTvEzGuZp3nT6nKp8B99e-GhvK1R_wRjZr3zBFKE3Vdi5118XXUnBTdHnI5eQHrDvTJ8RknjuH5aDBqn3unfEIDUy_pWXA_aKauMvcQ3G6X270f51k4zyn1UxP3y0c5lx1gYk5miWQcsMbnqxK9hTwZNK-NKrI99-yD3OA6TSZzL0KgVD9dQwcplBdJl2fmY00jVY37bPyQJ5ccbgb3L0X3xAV65wt1HGiCYdZCgUQpQVRmhRgP-11QE2-nMafRXrY6nTmYE0RRYLD5nz16dLF6SRAHnOfpw_PfWHjjxSN-pZALyJtnpNuPw-32vdtghRcDivUJyHquF04-XVY'
                            }
                };
            
            $http.get(vm.serviceBase + vm.url, config).then(function successCallback(response) {
                var results = response.data;
                var result = results["result"];
                console.log(result);

                
                signalRServiceHub = getSignalRServiceHub(result);
                
                function getSignalRServiceHub(result) {
                    vm.huburl = result.url;
                    vm.GameTableID = result.gameTableID;
                    return signalRService(vm.huburl, 'sitngo', vm.GameTableID);
                }

                signalRServiceHub.on("sendMessage", function cb(zoneMsg) {
                    console.log('sendMessage called');
                    console.log(JSON.stringify(zoneMsg));  
                    $scope.message = zoneMsg;      
                }); 

                var activePlayers = [];
                var waitPlayers = [];
                signalRServiceHub.on("sendPlayerList", function cb(zoneMsg) {
                    console.log('sendPlayerList called');
                    console.log(JSON.stringify(zoneMsg)); 
                    activePlayers = getActivePlayers(zoneMsg);
                    waitPlayers = getWaitingPlayers(zoneMsg);                     
                    $scope.message = "Sent Players List";      
                }); 

                function getActivePlayers(json) {
                    var activePlayers = [];
                    var Players = json["Players"];
                    for (var i = 0; i < Players.length; i++) {
                        if (jsonStr["Players"][i]["Status"] === 3)
                            activePlayers[i] = jsonStr["Players"][i]["UserId"];
                    }  

                    return activePlayers;                  
                }

                function getWaitingPlayers(json) {
                    var waitPlayers = [];
                    var Players = json["Players"];
                    for (var i = 0; i < Players.length; i++) {
                        if (jsonStr["Players"][i]["Status"] === 2)
                            waitPlayers[i] = jsonStr["Players"][i]["UserId"];
                    }  

                    return waitPlayers;                  
                }

                var opponentsDisplayNamesNWallet = [];

                signalRServiceHub.on("startGame", function cb(zoneMsg) {
                    console.log('startGame called');
                    console.log(JSON.stringify(startGame));  
                    var userDisplayNameNWallet = getUserDisplayNameNWallet(zoneMsg);
                    opponentsDisplayNamesNWallet = getOpponentsDisplayNamesNWallet(zoneMsg);                    
                    $scope.message = "Starting Game in 10 seconds";      
                }); 

                function getUserDisplayNameNWallet(json) {
                    var displayNameNWallet = {};
                    var user = json["Player"]["DisplayName"];
                    var wallet = json["Player"]["UserWallet"]["FreeCoins"];
                    displayNameNWallet.user = user;
                    displayNameNWallet.wallet = wallet;
                    console.log(displayNameNWallet.user, displayNameNWallet.wallet);
                    return displayNameNWallet;	
                }
                
                function getOpponentsDisplayNameNWallet(json) {
                    var displayNameNWallet = [{}];
                    var opponents = json["Opponents"];
                    
                    for (var i = 0; i< opponents.length; i++) {
                        displayNameNWallet[i].wallet = opponents[i]["UserWallet"]["FreeCoins"];
                        displayNameNWallet[i].displayName = opponents[i]["DisplayName"];
                        console.log(displayNameNWallet[i].displayName, displayNameNWallet[i].wallet);
                    }
                    
                    return displayNameNWallet;	
                }


                
                signalRServiceHub.on("sendQuestion", function cb(zoneMsg) {
                    console.log('sendQuestion called');
                    console.log(JSON.stringify(sendQuestion)); 
                    var questionNAnswerChoice = getQuestion(zoneMsg);
                    $scope.message = "Serving Question";      
                }); 

                function getQuestion(json) {
                    var question = [{}];
                    question.question = jsonStr["Description"];
                    var choices = json["Choices"]
                    question.answerChoices = [];
                    for (var i= 0; i< choices.length; i++) {
                        question.answerChoices[i] = choices[i]["Title"];
                        console.log(question, question.answerChoices[i])
                    }
                    
                    return question;
                }

                signalRServiceHub.on("send Answer", function cb(zoneMsg) {
                    console.log('sendAnswer called');
                    console.log(zoneMsg); 
                   // $scope.message = "Sending Answer";      
                }); 

                signalRServiceHub.on("sendGameResults", function cb(zoneMsg) {
                    console.log('sendGameResults called');
                    console.log(JSON.stringify(sendGameResults));  
                    var results = getResults(zoneMsg);  
                }); 

                function displayResults(json) {
	
                  	
                    var results = json["results"];
                    
                    for (var i=0; i< results.length; i++) {
                        results[i].displayName = "";
                        results[i].timetakeninseconds = "";
                        results[i].isCorrect = "";
                        results[i].Earned = "";
                        results[i].displayName = results[i]["DisplayName"];
                        results[i].timetakeninseconds = results[i]["timetakeninseconds"];
                        results[i].isCorrect = results[i]["isCorrectAnswer"];
                        results[i].Earned = results[i]["Earned"];                        
                    }
                    
                    return results;
                    
                }


               
            } , function errorCallback(response) {
                      console.log(response);
            });           
           
           $scope.message = message;



    }])
.directive('sitngoTable', function($parse) {
                console.log('directive called');
                
                var directiveDefinitionObject = {
                 
                restrict:'EA',
               
                //our data source would be an array
                //passed thru chart-data attribute
                //scope: {data: '=tableData'},

                link: function (scope, el, attr) {

                    var exp = $parse(attr.tableData);


                    var svgwidth = 1000,
                    svgheight = 800;

                    var svgContainer = d3.select(el[0])
                    .append('svg')
                    .attr('id', 'svgcontainer')
                    .attr({
                        width: svgwidth,
                        height: svgheight
                    });

                    var circleGroup = svgContainer.append("g");

                    var startTime = new Date().getTime();

                    var ellipse =   circleGroup.append("ellipse")
                                                .attr("cx", 400)
                                                .attr("cy", 300)
                                                .attr("rx", 250)
                                                .attr("ry", 125)
                                                .style("fill", 'green'); 
                    
                    var tableText = circleGroup.append("text")
                                .attr("dx", 400)
                                .attr("dy", 300)                                
                                .style("text-anchor", "middle")
                                
                    
                     var tableText1 = circleGroup.append("text")
                                .attr("dx", 350)
                                .attr("dy", 320)
                                .style("fill", "red")                                
                                .style("text-anchor", "start")
                                .style("cursor", "pointer")
                                .on("click", function (d) {var time = new Date().getTime(); var timeTaken = time - startTime; console.log("Time Taken" + timeTaken)});

                    var tableText2 = circleGroup.append("text")
                                .attr("dx", 450)
                                .attr("dy", 320)                                  
                                .style("fill", "red") 
                                .style("cursor", "pointer")                              
                                .style("text-anchor", "end")
                                .on("click", function (d) {console.log("I have been clicked")});
                    
                    var tableText3 = circleGroup.append("text")
                                .attr("dx", 350)
                                .attr("dy", 340)                                 
                                .style("fill", "red")
                                .style("cursor", "pointer")                                
                                .style("text-anchor", "start")
                                .on("click", function (d) {console.log("I have been clicked")});
                    
                    var tableText4 = circleGroup.append("text")
                                .attr("dx", 450)
                                .attr("dy", 340)                                
                                .style("fill", "red") 
                                .style("cursor", "pointer")                                
                                .style("text-anchor", "end")
                                .on("click", function (d) {console.log("I have been clicked")});
                    


                    var playerGroup = svgContainer.append("g");


                scope.$watchCollection(exp, function(newVal, oldVal){
                        console.log("new value: " + newVal);
                        var displayPlayers = JSON.parse(newVal)['myData'];
                                               
                        // display players and fill the positions - counterclockwise from center.
                       // renderPlayers(true, playerGroup);
                        
                        if (displayPlayers === 'ListPlayers') {
                            //renderPlayers(false, playerGroup);
                            displayPlayerPositions(newVal);
                        } else {
                            //tableText.remove();
                            tableText1.text("");
                            tableText2.text("");
                            tableText3.text("");
                            tableText4.text("");
                            var text = displayText(newVal);
                            tableText.text(text);
                        }

                       
                        
                });

                function isJson(jsonToCheck) {
                    var isJson = false;
                    var outPutValue = ""
                    var objectConstructor = {}.constructor;
                    if(jsonToCheck.constructor === objectConstructor){
                        outPutValue = JSON.stringify(jsonToCheck);
                        try{
                                JSON.parse(outPutValue);
                                isJson = true;
                        }catch(err){
                                isJson = false;
                        }
                    }
                    return isJson;
                }

                function displayText(newVal) {
                    var text;
                    console.log("displayText" + newVal.charAt(0) );
                    if (newVal.charAt(0) !== '{') {
                        console.log("displayText String " + newVal);
                        text = newVal; //initial display
                    } else {
                        console.log("isJson :" + newVal);
                        if (typeof JSON.parse(newVal)['Message'] === 'string') {
                            text = JSON.parse(newVal)['Message'];
                            console.log(text);
                        }
                        else if (typeof JSON.parse(newVal)['Description'] === 'string') {
                            var question = getQuestion(newVal);
                            text = question.question;
                            tableText1.text(question.answerChoices[0]);
                            tableText2.text(question.answerChoices[1]);
                            tableText3.text(question.answerChoices[2]);
                            tableText4.text(question.answerChoices[3]);

                        }
                        else if (typeof JSON.parse(newVal)["results"] === Array) {
                            
                            console.log("display Results :" + newVal);
                        }
                    }
                        
                    return text;
                }

                function displayResults(json) {
            
                    var jsonStr = JSON.parse(json);		
                    var results = jsonStr["results"];
                    
                    for (var i=0; i< results.length; i++) {
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

                function getQuestion(json) {
                    var jsonStr = JSON.parse(json);
                    var question = [{}];
                    question.question = jsonStr["Description"];
                    var choices = jsonStr["Choices"]
                    question.answerChoices = [];
                    for (var i= 0; i< choices.length; i++) {
                        question.answerChoices[i] = choices[i]["Title"];
                        console.log(question, question.answerChoices[i])
                    }
            
                    return question;
                }

                function displayPlayerPositions(listPlayers) {
                        var centerX = 400;
                        var centerY = 300;
                        var xRadius = 250;
                        var yRadius = 125;

                        /*
                        var jsonCircles = [
                                { "x_axis": centerX + 0, "y_axis": centerY + 170, "radius": 20, "color" : "green", stroke: "green" },
                                { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "green", stroke : "green"},
                                { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY - yRadius - 15, "radius": 20, "color" : "green", stroke : "green"},
                                { "x_axis": centerX, "y_axis": centerY - yRadius - 45, "radius": 20, "color" : "green", stroke : "green"},
                                {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY -yRadius - 15, "radius": 20, "color" : "green", stroke : "green"},
                                {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "green", stroke : "green"}];
                        */
                        //svgContainer.selectAll('circle').exit().remove();

                        var playerCirclesJSON = [
                            { "x_axis": centerX + 0, "y_axis": centerY + 170, "radius": 20, "color" : "green", "stroke": "green" },
                            { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "green", "stroke" : "green"}
                        ]

                        //var json = JSON.stringify(getPlayersForDisplay(listPlayers));
                       // json = json.replace("},{","}{");
                        //json = json.replace('""', "");
                        //json = json.replace("}\"\"{","}{");
                        //json = "[" + json + "]";
                        //console.log("players json : " + json);


                        //var playerJson = JSON.parse(json);

                        //console.log("playerJSON" + JSON.parse(playerJson));
                        //console.log("playerCircleJSON" + playerCirclesJSON);
                        /*
                        json = json.replace(/\\/g, "");
                        json = json.replace(/\["/g, "[");
                        json = json.replace(/\"]/g, "]");
                        json = json.replace(/\","/g, ",");
                        console.log("player json: " + json);
                        console.log("players json working" + playerCirclesJSON);
                        json = JSON.parse(json);
                        */
                        //if (playerJson === playerCirclesJSON)
                        //    console("JSON is correct");
    
                        var players = svgContainer.selectAll("circle")
                                    .data(playerCirclesJSON)
                                    .enter()
                                    .append("circle");

                        var circleAttributes = players
                                    .attr("cx", function (d) { return d.x_axis; })
                                    .attr("cy", function (d) { return d.y_axis; })
                                    .attr("r", function (d) { return d.radius; })
                                    .style("fill", function(d) { return d.color; });    
                } 

                function getPlayersForDisplay(listPlayers) {

                    console.log("displaying players");

                    // get the Player count and display counterclockwise

                    var players = (JSON.parse(listPlayers)['Players']);
                    var playerCount = players.length;

                    var jsonCircles = preparePlayerCircleJSON(playerCount); 
                    console.log(jsonCircles);
                    return jsonCircles;
                }

                function preparePlayerCircleJSON(playerCount) {
                    var centerX = 400;
                    var centerY = 300;
                    var xRadius = 250;
                    var yRadius = 125;

                    var x_axis = [];
                    x_axis[0] = centerX;
                    x_axis[1] = centerY - yRadius*Math.tan(60) - 140;
                    x_axis[2] = centerX - yRadius*Math.tan(60) - 140;
                    x_axis[3] = centerX;
                    x_axis[4] = centerX + yRadius*Math.tan(60) + 140;
                    x_axis[5] = centerX + yRadius*Math.tan(60) + 140;

                    var y_axis = [];
                    y_axis[0] = centerY + 170;
                    y_axis[1] = centerY + yRadius + 15;
                    y_axis[2] = centerY - yRadius - 15;
                    y_axis[3] = centerY - yRadius - 45;
                    y_axis[4] = centerY -yRadius - 15;
                    y_axis[5] = centerY + yRadius + 15;



                    var playerCircleJSON = [];

                    for (var i = 0; i<6; i++) {
                        playerCircleJSON[i] = '{ "x_axis":' + x_axis[i] + ', "y_axis":' + y_axis[i] + ', "radius": 20, "color" : "green", "stroke" : "green" }';
                    }

                    var json = [];

                    for (var i = 0; i < playerCount; i++) {
                        json[i] = playerCircleJSON[i]; 
                    }
                    return json;
                }


                
                 

                function renderPlayers(display) {
                    console.log('render Players');
                    if (display === true) {
                        var centerX = 400;
                        var centerY = 300;
                        var xRadius = 250;
                        var yRadius = 125;

                      /*  var jsonCircles = [
                                { "x_axis": centerX + 0, "y_axis": centerY + 170, "radius": 20, "color" : "none", stroke: "green" },
                                { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "none", stroke : "green"},
                                { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY - yRadius - 15, "radius": 20, "color" : "none", stroke : "green"},
                                { "x_axis": centerX, "y_axis": centerY - yRadius - 45, "radius": 20, "color" : "none", stroke : "green"},
                                {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY -yRadius - 15, "radius": 20, "color" : "none", stroke : "green"},
                                {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "none", stroke : "green"}];
                      */
            
                        //Add a group to hold the circles
                        var playerGroup = svgContainer.append("g");
                        var circles = playerGroup.selectAll("circle")
                                    .data(jsonCircles)
                                    .enter()
                                    .append("circle");

                        var circleAttributes = circles
                                    .attr("cx", function (d) { return d.x_axis; })
                                    .attr("cy", function (d) { return d.y_axis; })
                                    .attr("r", function (d) { return d.radius; })
                                    .style("fill", function(d) { return d.color; })
                                    .style("stroke", function(d) { return d.stroke;});
                    } else {
                            playerGroup.remove();
                    }

                }

                /*
                scope.$watchCollection(['tableWidth', 'tableHeight', 'message'], function(newValues) {

                var width = newValues[0];
                var height = newValues[1];
                var message = newValues[2];
                ellipse.attr("rx", width).attr("ry", height);
                tableText.transition().delay(1000).text(message);
                

                }, true); */
            }
        }
        return directiveDefinitionObject;
    })
})();