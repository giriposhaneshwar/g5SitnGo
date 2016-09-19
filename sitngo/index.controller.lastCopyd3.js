(function () {
    'use strict';

    angular
        .module('app')
        .controller('SitNGo.IndexController', ["$scope", "$http", "$rootScope", "signalRService", "$timeout", "$interval", "$localStorage", function ( $scope, $http, $rootScope, signalRService, $timeout, $interval, $localStorage) {
        
        /*
        var question;
        var questionText;
        var message = "";
        $scope.message = message;
        $scope.question = questionText;

        var vm = this;
        vm.accessToken = '';
        vm.serviceBase = 'http://g5api.azurewebsites.net';
        vm.url = '';
        vm.huburl = '';
        vm.GameTableID = 0;
        vm.zoneID = 18;

        vm.url = '/api/Join/' + vm.zoneID;
        var signalRServiceHub = '';

        var config = {headers: {
                        'Authorization': 'Bearer II-ntOoHdPppTxet78MdQvFCfAcUfKxyQXEVk5JTedeyHM54wapMQbzZRW98catIuq1Ss4EWwHegPpUcng3mMCv5DM_VHcUH5kJhzPiKMvND2EJXDssmVkcdHxkTu_q7-FjbXgCLV00_gjOKpIU6VfxHr0yaMm_hqJLvjqr_QS-NVWPhqtJ1XLHF6OsS3cwvvglhgWTMMnsd5Zxvx8VcaRY7-D_Oo4MmyZMQ8BfBEeBZT1wWO9bBUqghNrTM2iRFtuOH30SXmYkLKODeDxuNDEerHaEeM1-QErHbKw8xiMnjepTeMDZO6ngW_pTktAiuqUMOqaTgNyh0QnF_fpma5LwyP15XJ28vYMZdC9fCaW3j3f1-JYc4gi0C3CujPegT9FKRRdU3cGXIv3_mMmcofg'
                        }
            };
        
        $http.get(vm.serviceBase + vm.url, config).then(function successCallback(response) {
            var results = response.data;
            var result = results["result"];
            console.log(result);

            
            signalRServiceHub = getSignalRServiceHub(result);
            
            function getSignalRServiceHub(result) {
                vm.huburl = result.url;
                console.warn(result.url);
                vm.GameTableID = result.gameTableID;
                return signalRService(vm.huburl, 'sitngo', vm.GameTableID);
            }

            signalRServiceHub.on("sendMessage", function cb(zoneMsg) {
                console.warn("send Message json:" + zoneMsg);
                var message = JSON.stringify(zoneMsg);
                $scope.message = message;
            });
            
            signalRServiceHub.on("playerJoinMessage", function cb(zoneMsg) {
                console.warn('playerJoinMessage called');
                console.warn(JSON.stringify(zoneMsg));  
                var message = JSON.stringify(zoneMsg);
                $scope.message = message;      
            });

           signalRServiceHub.on("sendGameStart", function (zoneMsg) {
                console.warn('sendGameStart called');
                console.warn(zoneMsg);
                $scope.message = zoneMsg; 

            });

            signalRServiceHub.on("sendQuestion", function (zoneMsg) {

                console.log(zoneMsg);
                console.warn(JSON.stringify(zoneMsg));
                $scope.message = zoneMsg;

            });

            signalRServiceHub.on("sendAnswer", function (zoneMsg) {

                console.log(zoneMsg);
                console.warn(JSON.stringify(zoneMsg));
                $scope.message = zoneMsg;

            });

            signalRServiceHub.on("sendGameResults", function (zoneMsg) {

                 console.log(zoneMsg);
                 console.warn(JSON.stringify(zoneMsg));
                 $scope.message = zoneMsg;

            });

            $scope.message = message;
        }); */
        
        var queue = [];
        queue[1]='{TimeToNextGame": 100, "Message": "Waiting for players to Join."}'; // This will change 
        queue[2]='{"PlayerId":619,"TableId":1,"UserWallet":{"FreeCoins":500899,"PaidAmount":0.00,"EarnAmount":50.00,"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb"},"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","UserName":"spayyavula@gmail.com","Email":"spayyavula@gmail.com","IsPaidUser":false,"ProfileImage":"","IsPANVerified":false,"DisplayName":null,"Status":2,"ImagePath":null,"ConnectionId":"206feb3c-55f1-4235-8796-625b27bd762f","IsConnected":true}';
        queue[3]='{"GameId":2419,"TimeToServeQuestion":10,"PoolAmount":30.0,"GameTableId":4,"Players":[{"PlayerId":1194,"TableId":4,"UserId":"c1305468-13da-0b47-c983-ad409b04a876","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Dianna Sweeney","Status":3,"UserWallet":{"FreeCoins":49993,"Amount":0.0,"UserId":"c1305468-13da-0b47-c983-ad409b04a876"}},{"PlayerId":1195,"TableId":4,"UserId":"c12e68dc-2e04-5cb2-0a2e-743064d37203","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Juanita Mooney","Status":3,"UserWallet":{"FreeCoins":49948,"Amount":0.0,"UserId":"c12e68dc-2e04-5cb2-0a2e-743064d37203"}},{"PlayerId":1196,"TableId":4,"UserId":"c129552f-ce02-a833-8a75-4a87873f8a38","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Ira Bowers","Status":3,"UserWallet":{"FreeCoins":49901,"Amount":0.0,"UserId":"c129552f-ce02-a833-8a75-4a87873f8a38"}},{"PlayerId":1197,"TableId":4,"UserId":"c12a6f36-f1d7-e795-7224-d486d4661deb","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Kimberley Hinton","Status":3,"UserWallet":{"FreeCoins":49965,"Amount":0.0,"UserId":"c12a6f36-f1d7-e795-7224-d486d4661deb"}},{"PlayerId":1198,"TableId":4,"UserId":"c12e8953-f3e6-9b66-b37d-b286945c2f2d","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Michele Vang","Status":3,"UserWallet":{"FreeCoins":49993,"Amount":0.0,"UserId":"c12e8953-f3e6-9b66-b37d-b286945c2f2d"}},{"PlayerId":1199,"TableId":4,"UserId":"c12e18f7-6e55-fc48-8092-2ce4e10780a9","ProfileImage":"https://g5r.blob.core.windows.net/imgs/65c7cc2c-2867-474d-bfe6-7e03f864264a/profilepic.jpg","DisplayName":"Sara Wilcox","Status":3,"UserWallet":{"FreeCoins":49953,"Amount":0.0,"UserId":"c12e18f7-6e55-fc48-8092-2ce4e10780a9"}}],"Message":" Game Started."}';
        queue[4]='{"GameId":2419,"QuestionId":"d3df9708-10dc-4e26-ae9c-e74e46d2d321","Description":"A parabola <math><mrow><mi>y</mi><mo>=</mo><mi>a</mi><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi><mi>x</mi><mo>+</mo><mi>c</mi></mrow></math><xml> </xml>crosses the x-axis at <math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo><mn>0</mn></mrow><mo>)</mo></mrow></mrow></math><xml> </xml><math><mrow><mrow><mo>(</mo><mrow><mi>?lt;/mi><mo>,</mo><mn>0</mn></mrow><mo>)</mo></mrow></mrow></math><xml> </xml>both to the right of the origin. A circle also passes through these two points. The length of a tangent from the origin to the circle is","TimetoAnswer":30,"Choices":[{"ChoiceId":"5d87b4c5-a47f-45c3-b3df-417a031f12c6","Title":"<math><mrow><mfrac><mi>b</mi><mi>a</mi></mfrac></mrow></math><xml> </xml>"},{"ChoiceId":"fd78b9c9-ef53-4d25-a3ab-494e50668a7c","Title":"<math><mrow><mi>a</mi><msup><mi>c</mi><mn>2</mn></msup></mrow></math><xml> </xml>"},{"ChoiceId":"005c2d39-b952-4024-98e5-81d851984c55","Title":"<math><mrow><msqrt><mrow><mfrac><mi>c</mi><mi>a</mi></mfrac></mrow></msqrt></mrow></math><xml> </xml>"},{"ChoiceId":"e3218033-1a8c-4585-867e-b9887ad915eb","Title":"<math><mrow><msqrt><mrow><mfrac><mrow><mi>b</mi><mi>c</mi></mrow><mi>a</mi></mfrac></mrow></msqrt></mrow></math><xml> </xml>"}],"GameTableId":0,"Players":[{"UserId":"c1305468-13da-0b47-c983-ad409b04a876","Status":3},{"UserId":"c12e68dc-2e04-5cb2-0a2e-743064d37203","Status":3},{"UserId":"c129552f-ce02-a833-8a75-4a87873f8a38","Status":3},{"UserId":"c12a6f36-f1d7-e795-7224-d486d4661deb","Status":3},{"UserId":"c12e8953-f3e6-9b66-b37d-b286945c2f2d","Status":3},{"UserId":"c12e18f7-6e55-fc48-8092-2ce4e10780a9","Status":3}],"Message":null}';
        queue[5]='{"GameId":2276,"AnswerId":"2ab20994-e305-444a-8a6b-c1e7d3f5912b","GameTableId":1,"Players":[{"UserId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","Status":3},{"UserId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","Status":3}],"Message":null}';
        queue[6]='[{"GameTableId":1,"GameId":2276,"userId":"cd50445e-8ebc-4dfa-9d01-ef31ee9690aa","DisplayName":"Sreedhar","timetakeninseconds":0,"Earned":4.75,"IsCorrectAnswer":false},{"GameTableId":1,"GameId":2276,"userId":"bc9862f9-aef0-4daa-81af-8a72d6d4e0bb","DisplayName":"Roger","timetakeninseconds":0,"Earned":4.75,"IsCorrectAnswer":false}]';
        queue[7]='Game will Start in few seconds.';

        var i = 0;
        var message;
        var questionText;
        $scope.message = message;
        $scope.question = question;
        var question;

        var game = $interval( function () {simulate(i); i+=1;}, 1000);

        function simulate(i) {

            switch(i) {
                case 1: // showMessage
                    console.log(queue[1]);
                    $scope.message  = queue[1];
                    break;
                case 2: //player joined (self)                    
                    var jsonObj = JSON.parse(queue[2]);
                    jsonObj.myData = "ListPlayers";
                    $scope.message =  JSON.stringify(jsonObj);
                    break;
                case 3: //startGame                   
                    $scope.message =  queue[3];
                    break;
                case 4: //serveQuestion
                    var question = getQuestion(queue[4]);
                    questionText = question.question;
                    $localStorage.question = questionText;
                    $scope.question = $localStorage.question;
                    $scope.message =  queue[4];
                    break;
                case 5://serveAnswer
                    console.log(queue[5]);
                     var question = getQuestion(queue[4]);
                    questionText = question.question;
                    $scope.message =  queue[5];
                    $scope.question = questionText;
                    break;
                case 6://displayResults
                    var question = getQuestion(queue[4]);
                    questionText = question.question;
                    $scope.message = queue[6];
                    $scope.question = questionText;
                    break;
                case 7://reset Game
                    $scope.message = queue[7];
                    clearTimer();

            }
        }

         function clearTimer() {
            $interval.cancel(game);
        }
        
        function getQuestion(jsonStr) {

            var json = JSON.parse(jsonStr);
            var question = [{}];
            question.question = json["Description"];
            question.answerChoices = [{}];	
            question.answerChoices = json["Choices"];
            
            
            for (var i= 0; i< question.answerChoices.length; i++) {
                question.answerChoices[i].Title = question.answerChoices[i]["Title"];
                question.answerChoices[i].ChoiceId = question.answerChoices[i]["ChoiceId"];
                console.log(question.answerChoices[i].Title, question.answerChoices[i].ChoiceId)
            }
            
            question.Players = [{}];
            question.Players = json["Players"];
            
            
            for (var i = 0; i< question.Players.length; i++) {
                question.Players[i].UserId = question.Players[i]["UserId"];
                question.Players[i].Status = question.Players[i]["Status"];
                console.log(question.Players[i].UserId, question.Players[i].Status);
            }
            
            return question;
        }



        }  
    ])
        .directive('sitngoTable', function($parse, $timeout) {
                console.log('directive called');

                var directiveDefinitionObject = {

                restrict:'EA',

                //our data source would be an array
                //passed thru chart-data attribute
                //scope: {data: '=tableData'},

                link: function (scope, el, attr) {

                    var exp = $parse(attr.tableData);


                    var svgwidth = 800,
                    svgheight = 600;

                    var svgContainer = d3.select(el[0])
                    .append('svg')
                    .attr('id', 'svgcontainer')
                    .attr({
                        width: svgwidth,
                        height: svgheight
                    });

                    var exitGroup = svgContainer.append("g");

                    var exitButton = exitGroup.append("svg:a")
                                            .attr("xlink:href", function(d){return "#/playZone";})
                                            .append("rect").attr("fill", "darkred")
                                            .attr("x", 50).attr("y", 50).attr("width", 50).attr("height", 25);

                    var exitText = exitGroup.append("text")
                                            .style("fill", "white")
                                            .attr("dx", 60)
                                            .attr("dy", 67)
                                            .text("EXIT");

                    var circleGroup = svgContainer.append("g");

                    var selectedId;

                    var startTime = new Date().getTime();

                    var ellipse =   circleGroup.append("ellipse")
                                                .attr("cx", 400)
                                                .attr("cy", 195)
                                                .attr("rx", 250)
                                                .attr("ry", 125)
                                                .style("fill", 'green');

                    /*
                    var mathMLContainer = circleGroup.append("div")
                                                        .attr("id", "latex")
                                                        .attr("width", 250)
                                                        .attr("height", 125);
                    */

                    var tableText = circleGroup.append("foreignObject")
                                            .attr("width", 250)
                                            .attr("height", 125)
                                            .attr("x", 250)
                                            .attr("y", 125)
                                            .attr("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility")
                                            .append("xhtml:body")
                                            .style("font-family", "sans-serif")
                                            .style("font-size", "12px")
                                            .style("text-align", "center")
                                            .style("background-color", "green")
                                            .style("color", "yellow");



                    /*
                    var multilineText = svgContainer.append("g");
                    var tableTextContainer = multilineText.append("rect")
                                                .attr("id", "rectWrap")
                                                .attr("width", 300)
                                                .attr("height", 80)
                                                .attr("x", 250)
                                                .attr("y", 175)
                                                .attr("fill", "green");
                     */

                     var tableText1 = circleGroup.append("text")
                                .attr("dx", 350)
                                .attr("dy", 215)
                                .style("text-anchor", "start")
                                .style("cursor", "pointer")
                                .on("click", function (d) { d3.select(this).attr("name", "tableText1"); d3.select(this).style("fill", "white"); var time = new Date().getTime(); var timeTaken = time - startTime; console.log("Time Taken" + timeTaken)});

                    var tableText2 = circleGroup.append("text")
                                .attr("dx", 450)
                                .attr("dy", 215)
                                .style("cursor", "pointer")
                                .style("text-anchor", "end")
                                .on("click", function (d) {d3.select(this).attr("name", "tableText2"); d3.select(this).style("fill", "white"); console.log("I have been clicked")});

                    var tableText3 = circleGroup.append("text")
                                .attr("dx", 350)
                                .attr("dy", 235)
                                .style("cursor", "pointer")
                                .style("text-anchor", "start")
                                .on("click", function (d) {d3.select(this).attr("name", "tableText3"); d3.select(this).style("fill", "white"); console.log("I have been clicked")});

                    var tableText4 = circleGroup.append("text")
                                .attr("dx", 450)
                                .attr("dy", 235)
                                .style("cursor", "pointer")
                                .style("text-anchor", "end")
                                .on("click", function (d) {d3.select(this).attr("name", "tableText4"); d3.select(this).style("fill", "white"); console.log("I have been clicked")});

                    var playerGroup = svgContainer.append("g");
                    var resultsGroup = svgContainer.append("g");

                    MathJax.Hub.Config({
                        tex2jax: {
                        inlineMath: [['$','$'], ['\\(','\\)']],
                        processEscapes: true
                        }
                    });

                   //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);



                scope.$watchCollection(exp, function(newVal, oldVal){
                        console.log("new value: " + JSON.stringify(newVal));

                        try {
                            var text = displayText(newVal);
                            console.warn("display Text :" + text);
                        
                            if (typeof JSON.parse(newVal)['QuestionId'] === 'string') {
                                //var question = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">" + text + "</math>";
                                MathJax.Hub.Queue(["Typeset",MathJax.Hub,tableText.html(text)]);
                            } else { 
                               tableText.html(text); 
                            }

                            }
                            catch (ex) {
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
                        //console.log("displayText" + newVal.charAt(0) );
                        
                        console.log("isJson :" + newVal);

                        try {
                            console.warn("Parsing JSON");
                            var json = JSON.parse(newVal);
                        }
                        catch (ex) {
                            console.warn("Exception parsing JSON");
                            text = newVal;
                            return text;
                        }

                        if (typeof json['Message'] === 'string' && 
                            typeof json['TimeToNextGame'] === 'number') {
                              text = json['Message'];
                              console.log(text);  
                              return text;

                        }
                        else if (typeof json['TimeToServeQuestion'] === 'number' ) {
                            //text = JSON.parse(newVal)['DisplayName'];
                            console.log("playerJoinMessage JSON" + JSON.stringify(json));
                            var self = 1;
                            var jsonToDrawCircles = preparePlayerCircleJSON(self);
                            displaySelf(jsonToDrawCircles);
                            console.log(text);
                            return "";
                        }

                        //console.log(JSON.parse(newVal)['Opponents'] instanceof Array);
                        /*

                        if (typeof JSON.parse(newVal)['Message'] === 'string' && 
                            typeof JSON.parse(newVal)['TimeToNextGame'] === 'number') {
                              text = JSON.parse(newVal)['Message'];
                              console.log(text);  

                        }
                        else if (typeof JSON.parse(newVal)['TimeToServeQuestion'] === 'number' ) {
                            text = JSON.parse(newVal)['Message'];
                            console.log(text);
                        }
                        else if (typeof JSON.parse(newVal)['QuestionId'] === 'string') {
                            var question = getQuestion(newVal);
                            text = question.question;
                            //text = '<math display=\"block\">' + text + '</math>';
                            console.log("MathML question :" + text);
                            var timeToAnswer = question.timeToAnswer*100;
                            console.warn(timeToAnswer);
                            $timeout(function () {disableAnswer(newVal)}, timeToAnswer);

                           
                            tableText1.text(question.answerChoices[0].Title);
                            tableText2.text(question.answerChoices[1].Title);
                            tableText3.text(question.answerChoices[2].Title);
                            tableText4.text(question.answerChoices[3].Title);
                            tableText1.attr("id", "id_" + question.answerChoices[0].ChoiceId);
                            tableText2.attr("id", "id_" + question.answerChoices[1].ChoiceId);
                            tableText3.attr("id", "id_" + question.answerChoices[2].ChoiceId);
                            tableText4.attr("id", "id_" + question.answerChoices[3].ChoiceId);

                            console.warn("Answer Id selector: " + question.answerChoices[0].ChoiceId);
                            console.warn("Answer Id selector: " + question.answerChoices[1].ChoiceId);
                            console.warn("Answer Id selector: " + question.answerChoices[2].ChoiceId);
                            console.warn("Answer Id selector: " + question.answerChoices[3].ChoiceId);

                            //var tableText = multilineText.enter().append("text"); 
                            //tableText.text(text);

                             // Wrap text in a rectangle.
                            //d3plus.textwrap()
                            //    .container(d3.select("#rectWrap"))
                            //    .draw();

                            
                        }
                        else if (JSON.parse(newVal)["AnswerId"] === 'string') {
                            console.log("answer :" + newVal);

                            var json = JSON.parse(newVal);

                            temp = displayHighlightedAnswer(json["AnswerId"]);
                           // removeElement(tableText);
                            redrawTableText(circleGroup);
                            var question = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">" + temp + "</math>";
                            $timeout( function () { renderMathJax(); }, 2000);
                            
                            $timeout(function () {MathJax.Hub.Queue(["Typeset", MathJax.Hub,tableText.html(question)])}, 2100);
                        }
                        else if (JSON.parse(newVal) instanceof Array) {

                            console.log("display Results :" + newVal);
                            clearTable(circleGroup);
                            clearPlayers(playerGroup);
                            displayResultsTable(resultsGroup, newVal);


                        }
                        else if (typeof JSON.parse(newVal)["Message"] === 'string')
                        {
                            console.log("Reset Game simulation");
                            clearResults(resultsGroup);
                            var resetGame = svgContainer.append("text")
                                .attr("dx", 350)
                                .attr("dy", 215)
                                .style("text-anchor", "middle")
                                .style("font-color", "green");

                            resetGame.text(JSON.parse(newVal)["Message"]);
                        }
                        else if (newVal.charAt(0) !== '{' && newVal.charAt(0) !== "[") {
                        console.log("First Char :" + newVal.charAt(0));
                        console.log("displayText String " + newVal);
                        text = newVal;
                    } else {

                        if (text == null || text == undefined) {
                            text = scope.question;
                            console.log("text is null :" + question);
                        }
                    }

                    */

                    return text;
                }

                function renderMathJax() {
                    MathJax.Hub.Typeset();
                }

                function removeElement(tableText) {
                    tableText.remove();
                }

                function redrawTableText(circleGroup) {
                    var tableTextNew = circleGroup.append("foreignObject")
                                            .attr("width", 250)
                                            .attr("height", 125)
                                            .attr("x", 250)
                                            .attr("y", 125)
                                            .attr("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility")
                                            .append("xhtml:body")
                                            .style("font-family", "sans-serif")
                                            .style("font-size", "12px")
                                            .style("text-align", "center")
                                            .style("background-color", "green")
                                            .style("color", "yellow");    
                }

                // the table rows, typically loaded from data file using d3.csv
                function displayResultsTable(resultsGroup, json) {


                     var results      = resultsGroup.append("foreignObject")
                                            .attr("width", 600)
                                            .attr("height", 600)
                                            .attr("x", 150)
                                            .attr("y", 125)
                                            .append("xhtml:body")
                                            .style("font-family", "sans-serif")
                                            .style("font-size", "12px")
                                            .style("text-align", "center")
                                            .style("background-color", "green")
                                            .style("color", "black");



                    var tableDiv = results.append("div");
                                           // .attr("id", "results").attr("class", "absolute");

                    var tableTitle = tableDiv.append("text")
                                .attr("dx", 350)
                                .attr("dy", 215)
                                .style("text-anchor", "middle");

                    tableTitle.text("Game Results").style("color", "yellow").style("font-size", "20px");

                     var table = tableDiv.append("table");
                     var thead = table.append("thead").append("tr");
                     var tbody = table.append("tbody");


                    var testData = [
                                    ["Name","Time(milliseconds)","Prize Money (Coins)","Correct"],
                                    ["Sreekanth","2511","10","Yes"],
                                    ["Sreedhar","2622","8","Yes"]
                                ];

                    console.log("Dynamic results json : " + JSON.stringify(prepareResultsTableJSON(json)));

                    console.log(testData);

                    var testJsonStr = prepareResultsTableJSON(json);
                    console.log(testJsonStr);

                    // first create the table rows
                    var tr = tbody.selectAll("tr")
                            .data(testJsonStr)
                            .enter()
                            .append("tr")
                            .style("color", function(d, i) {
                                if (i%2===0){return "black";}
                                else{return "yellow";}
                                });;



                    // Now create the table cells

                    var td = tr.selectAll("td")
                            .data(function(d, i) { return d; })
                            .enter()
                            .append("td")
                            .text(function(d) {return d;})
                            .style("font-size","14px");


                }


                function prepareResultsTableJSON(jsonStr) {

                    var resultsJson = [];

                    resultsJson[0] = ["Name","Time(milliseconds)","Prize Money (Coins)","Correct"];

                    var json = JSON.parse(jsonStr);

                    for (var i=0; i < json.length; i++) {
                        resultsJson[i+1] = prepareResultsRow(json[i]).split(',');
                    }

                    return resultsJson;
                }

                function prepareResultsRow(json) {
                    var row = "";
                    row = row + '' + json["DisplayName"]+ ',';
                    row = row + '' + json["timetakeninseconds"] + ',';
                    row = row + '' + json["Earned"] + ',';
                    row = row + '' + json["IsCorrectAnswer"] + '';
                    console.warn("prepare results row :" + row);



                    return row;
                    
                }

                function clearTable(table) {
                    table.remove();
                }

                function clearPlayers(players) {
                    players.remove();
                }

                function clearResults(resultsGroup) {
                    resultsGroup.remove();
                }

                function disableAnswer(json) {
                    disableSelect(tableText1);
                    disableSelect(tableText2);
                    disableSelect(tableText3);
                    disableSelect(tableText4);
                }

                function disableSelect(el) {
                    el.style("fill", "gray");
                    el.on("click", null);
                    el.style("cursor", "none")
                }



                function displayHighlightedAnswer(answer) {
                        //highlight the correct answer
                        //get the id of each table text
                        var selectedText = [];

                        selectedText[0] = tableText1.attr("name");
                        selectedText[1] = tableText2.attr("name");
                        selectedText[2] = tableText3.attr("name");
                        selectedText[3] = tableText3.attr("name");

                        for (var i =0; i < selectedText.length; i++) {
                            if (selectedText[i] != null) {
                                switch(i) {
                                    case 0:
                                         tableText1.style("fill", "red");
                                         break;
                                    case 1:
                                        tableText2.style("fill", "red");
                                        break;
                                    case 2:
                                        tableText3.style("fill", "red");
                                        break;
                                    case 3:
                                        tableText4.style("fill", "red");
                                        break;
                                }
                            }
                        }


                        console.warn("display Highlighted Text " + answer);
                        var selector = "#" + "id_" + answer;
                        console.warn("selector :" + selector);
                        var correctAnswerText = circleGroup.select( selector).style("fill", "blue");
                        var question = scope.question;
                        console.warn("question : " + question);
                        //if (question !== undefined)
                        //    question = '<math display=\"block\"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
                        //question = "$$ x = \\sum_{i \\in A} i^{2} $$";
                        //question = "<math display=\"block\">" + question + "</math>";
                       // question = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">" + question + "</math>";
                        //MathJax.Hub.Queue(["Typeset",MathJax.Hub,tableText.html(question)]);


                        return question;

                }

                function displayResults(json) {

                   var results = JSON.parse(json);

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

                function getQuestion(jsonStr) {
                    var json = JSON.parse(jsonStr);
                    var question = [{}];
                    question.question = json["Description"];
                    question.timeToAnswer = json["TimetoAnswer"];
                    question.answerChoices = [{}];	
                    question.answerChoices = json["Choices"];
                    
                    
                    for (var i= 0; i< question.answerChoices.length; i++) {
                        question.answerChoices[i].Title = question.answerChoices[i]["Title"];
                        question.answerChoices[i].ChoiceId = question.answerChoices[i]["ChoiceId"];
                        console.log(question.answerChoices[i].Title, question.answerChoices[i].ChoiceId)
                    }
                    
                    question.Players = [{}];
                    question.Players = json["Players"];
                    
                    
                    for (var i = 0; i< question.Players.length; i++) {
                        question.Players[i].UserId = question.Players[i]["UserId"];
                        question.Players[i].Status = question.Players[i]["Status"];
                        console.log(question.Players[i].UserId, question.Players[i].Status);
                    }
                    
                    return question;
                }

                function displaySelf(json) {
                        console.warn(json);                  
                        var jsonStr = JSON.parse(getPlayersForDisplay(json));
                        var self = playerGroup.selectAll("circle")
                                    .data(jsonStr);

                        players.enter().append("circle").attr("cx", function (d) { return d.x_axis; })
                                                        .attr("cy", function (d) { return d.y_axis; })
                                                        .attr("r", function (d) { return d.radius; })
                                                        .style("fill", function(d) { return d.color; });

                        players.exit().remove();



                       console.warn("getting user display values ")

                        var userDisplayNameNWallet = getUserDisplayNameNWallet(json);
                        console.warn(userDisplayNameNWallet);
                        var userDisplayName = userDisplayNameNWallet.user;
                        var userWallet = userDisplayNameNWallet.wallet;
                        console.warn(userDisplayName, userWallet);

                         var selfDisplayText = playerGroup.append("text")
                                                .attr("dx", 310)
                                                .attr("dy", 370)
                                                .text(userDisplayName);

                        var selfWalletText = playerGroup.append("text")
                                                .attr("dx", 310)
                                                .attr("dy", 390)
                                                .text(userWallet);
                } 
                


                function displayPlayerPositions(json) {


                        var jsonStr = JSON.parse(getPlayersForDisplay(json));
                        var players = playerGroup.selectAll("circle")
                                    .data(jsonStr);

                        players.enter().append("circle").attr("cx", function (d) { return d.x_axis; })
                                                        .attr("cy", function (d) { return d.y_axis; })
                                                        .attr("r", function (d) { return d.radius; })
                                                        .style("fill", function(d) { return d.color; });

                        players.exit().remove();



                       console.warn("getting user display values ")

                        var userDisplayNameNWallet = getUserDisplayNameNWallet(json);
                        console.warn(userDisplayNameNWallet);
                        var opponentsDisplayNameNWallet = getOpponentsDisplayNameNWallet(json);
                        var userDisplayName = userDisplayNameNWallet.user;
                        var userWallet = userDisplayNameNWallet.wallet;
                        var opponentsDisplayName = [];
                        var opponentsWallet = [];

                        for (var i = 0; i < opponentsDisplayNameNWallet.length; i++) {
                            opponentsDisplayName[i] = opponentsDisplayNameNWallet[i].displayName;
                            opponentsWallet[i] = opponentsDisplayNameNWallet[i].wallet;
                        }

                        console.warn(userDisplayName, userWallet);

                         var player1DisplayText = playerGroup.append("text")
                                                .attr("dx", 310)
                                                .attr("dy", 370)
                                                .text(userDisplayName);

                        var player1WalletText = playerGroup.append("text")
                                                .attr("dx", 310)
                                                .attr("dy", 390)
                                                .text(userWallet);


                        var player2DisplayText = playerGroup.append("text")
                                                .attr("dx", 130)
                                                .attr("dy", 340)
                                                .text(opponentsDisplayName[0]);

                        var player2WalletText = playerGroup.append("text")
                                                .attr("dx", 130)
                                                .attr("dy", 360)
                                                .text(opponentsWallet[0]);





                }

                function getPlayersForDisplay(json) {

                    console.log("displaying players");

                    // get the Player count and display counterclockwise

                    var players = (JSON.parse(json)['Opponents']);
                    var playerCount = players.length + 1;

                    var jsonCircles = preparePlayerCircleJSON(playerCount);
                    console.log(jsonCircles);
                    return jsonCircles;
                }

                function preparePlayerCircleJSON(playerCount) {
                    var centerX = 400;
                    var centerY = 195;
                    var xRadius = 250;
                    var yRadius = 125;

                    var x_axis = [];
                    x_axis[0] = centerX;
                    x_axis[1] = centerX - yRadius*Math.tan(60) - 140;
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
                    var playerCirclesStr = "[";

                    for (var i = 0; i<playerCount; i++) {
                        playerCircleJSON[i] = '{ "x_axis":' + x_axis[i] + ', "y_axis":' + y_axis[i] + ', "radius": 20, "color" : "green", "stroke" : "green" }';
                        playerCirclesStr = playerCirclesStr + playerCircleJSON[i] + ",";
                    }

                    playerCirclesStr = playerCirclesStr.substring(0, playerCirclesStr.length - 1);

                    playerCirclesStr = playerCirclesStr + "]";


                    return playerCirclesStr;
                }





                function renderPlayers(display) {
                    console.log('render Players');
                    if (display === true) {
                        var centerX = 400;
                        var centerY = 270;
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

                function getUserDisplayNameNWallet(json) {
                    var displayNameNWallet = {};
                    var jsonStr = JSON.parse(json);
                    var user = jsonStr["Player"]["DisplayName"];
                    var wallet = jsonStr["Player"]["UserWallet"]["FreeCoins"];
                    displayNameNWallet.user = user;
                    displayNameNWallet.wallet = wallet;
                    console.log(displayNameNWallet.user, displayNameNWallet.wallet);
                    return displayNameNWallet;
                }

                function getOpponentsDisplayNameNWallet(json) {
                    var displayNameNWallet = [{}];
                    var jsonStr = JSON.parse(json);
                    var opponents = jsonStr["Opponents"];

                    for (var i = 0; i< opponents.length; i++) {
                        displayNameNWallet[i].wallet = opponents[i]["UserWallet"]["FreeCoins"];
                        displayNameNWallet[i].displayName = opponents[i]["DisplayName"];
                        console.log(displayNameNWallet[i].displayName, displayNameNWallet[i].wallet);
                    }

                    return displayNameNWallet;
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
