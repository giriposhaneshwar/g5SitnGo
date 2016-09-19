(function () {
    'use strict';

    angular
        .module('app')
        .controller('SitNGo.IndexController', ["$scope", "$http", "$rootScope", "signalRService", "$timeout", "$interval", "$localStorage", function ( $scope, $http, $rootScope, signalRService, $timeout, $interval, $localStorage) {

        var question;
        var questionText;
        var message = "";
        $scope.message = message;
        $scope.question = questionText;



        var queue = [];

        queue[1] = "Waiting for Players to Join";
        queue[2] = '{ "Players" : [ { "UserId":"b9daec83-083c-4119-9176-f321314b9b74", "Status":3 }, { "UserId":"b9daec83-083c-4119-9176-f321314b9b74", "Status":3}]}';
        queue[3] = '{ "GameId":114, "PoolAmount":10, "GameTableId":6003, "Player": {"PlayerId":2211, "TableId":6003, "UserId":"b9daec83-083c-4119-9176-f321314b9b74", "ProfileImage":"", "DisplayName":"Sreekanth", "Status":3, "UserWallet":{ "FreeCoins":4960, "PaidAmount":0, "EarnAmount":0, "UserId":"b9daec83-083c-4119-9176-f321314b9b74"} }, "Opponents":[ {"PlayerId":2210, "TableId":6003, "UserId":"a228360b-806f-4abb-89f8-5849458de8b4", "ProfileImage":"", "DisplayName":"Sreedhar", "Status":3, "UserWallet": { "FreeCoins":4960, "PaidAmount":0, "EarnAmount":0, "UserId":"a228360b-806f-4abb-89f8-5849458de8b4"} } ], "Message":" Game Started"}';
        queue[4] = '{"QuestionId":"796eeb87-96e8-410c-8861-c28f690ecf02", "Description":"<mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow>", "TimetoAnswer":4000, "Choices":[ {"ChoiceId":"c3bf5cb3-5a4d-467b-b92a-56aea5368682","Title":"x2=16y "}, {"ChoiceId":"d3fb25-d5ed-4924-bde3-6eee214af05e","Title":"y2=8x "}, {"ChoiceId":"ee1fa05-bd13-4b94-a59e-8fb1ea45e57c","Title":"x2=8y "}, {"ChoiceId":"8c3dc8-cd19-43d1-9b71-e6d23e55bd36","Title":"y2=-8x "} ] }';
        queue[5] = 'd3fb25-d5ed-4924-bde3-6eee214af05e';
        queue[6] = '[{ "GameTableId":6003, "GameId":128, "userId":"a228360b-806f-4abb-89f8-5849458de8b4", "DisplayName":"Sreekanth", "timetakeninseconds":0, "Earned":2, "IsCorrectAnswer":true },{ "GameTableId":6003, "GameId":128, "userId":"b9daec83-083c-4119-9176-f321314b9b74", "DisplayName":"Sreedhar", "timetakeninseconds":1, "Earned":1, "IsCorrectAnswer":true } ]';
        queue[7] = '{"Message": "New Game Starting in 5 seconds"}';


        var i = 0;


        var game = $interval( function () {simulate(i); i+=1;}, 5000);

        function simulate(i) {

            switch(i) {
                case 1: // showMessage
                    console.log(queue[1]);
                    $scope.message  = queue[1];
                    break;
                case 2: //listPlayers
                    getActivePlayers(queue[2]);
                    getWaitingPlayers(queue[2]);
                    var jsonObj = JSON.parse(queue[2]);
                    jsonObj.myData = "ListPlayers";
                    $scope.message =  JSON.stringify(jsonObj);
                    break;
                case 3: //startGame
                    getUserDisplayNameNWallet(queue[3]);
                    getOpponentsDisplayNameNWallet(queue[3]);
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
                    displayResults(queue[6]);
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

        function getActivePlayers(json) {
            var jsonStr = JSON.parse(json);
            var Players = jsonStr["Players"];
            for (var i = 0; i < Players.length; i++) {
                if (jsonStr["Players"][i]["Status"] === 3)
                    console.log(jsonStr["Players"][i]["UserId"]);
            }

        }

        function getWaitingPlayers(json) {
            var jsonStr = JSON.parse(json);
            var Players = jsonStr["Players"];
            for (var i = 0; i < Players.length; i++) {
                if (jsonStr["Players"][i]["Status"] === 2)
                    console.log(jsonStr["Players"][i]["UserId"]);
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



    }])
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

                    var mathMLContainer = circleGroup.append("div")
                                                        .attr("id", "latex")
                                                        .attr("width", 250)
                                                        .attr("height", 125);


                    var question = circleGroup.append("foreignObject")
                                            .attr("width", 250)
                                            .attr("height", 125)
                                            .attr("x", 300)
                                            .attr("y", 125)
                                            .attr("id", "questionText")
                                            .attr("class", "question")
                                            .attr("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility")
                                            .append("xhtml:body")
                                            .style("font-family", "sans-serif")
                                            .style("font-size", "12px")
                                            .style("text-align", "center")
                                            .style("background-color", "green")
                                            .style("color", "yellow")
                                            

                     var tableText =  circleGroup.append("text")
                                .attr("dx", 370)
                                .attr("dy", 190)
                                .style("text-anchor", "middle")
                                .style("fill", "yellow");


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

                   MathJax.Hub.Queue(["Typeset",MathJax.Hub]);



                scope.$watchCollection(exp, function(newVal, oldVal){
                        console.log("new value: " + newVal);

                        try {
                            var text = displayText(newVal);
                            
                        
                            if (typeof JSON.parse(newVal)['QuestionId'] === 'string') {
                                text = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">" + text + "</math>";
                                var temp = text;
                               // $("#questionsTemplate").show(function () { $timeout(function () { MathJax.Hub.Typeset(); }, 2000); });
                                //$timeout(function () { document.getElementById("questionText").style.visbility="visible"; MathJax.Hub.Queue(["Typeset", MathJax.Hub,question.html(temp)]);}, 2000);
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub,question.html(temp)]);
                            } else {
                               tableText.text(text); 
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
                    console.log("displayText" + newVal.charAt(0) );
                    if (newVal.charAt(0) !== '{' && newVal.charAt(0) !== "[") {
                        console.log("First Char :" + newVal.charAt(0));
                        console.log("displayText String " + newVal);
                        if (newVal.charAt(0) !== "W") {
                            console.log("answer :" + newVal);
                            displayHighlightedAnswer(newVal);
                            removeElement(tableText);
                            redrawTableText(circleGroup);
                            var question = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">" + text + "</math>";
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub,question.html(question)]);
                           // tableTextNew.html(text);
                        
                        } else
                            text = newVal;
                    } else {
                        console.log("isJson :" + newVal);
                        console.log(JSON.parse(newVal)['Opponents'] instanceof Array);
                        if (JSON.parse(newVal)['Opponents'] instanceof Array ) {
                            displayPlayerPositions(newVal);
                            text = JSON.parse(newVal)['Message'];
                            console.log(text);
                        }
                        else if (typeof JSON.parse(newVal)['QuestionId'] === 'string') {
                            var question = getQuestion(newVal);
                            text = question.question;
                            //text = '<math display=\"block\">' + text + '</math>';
                            console.log("MathML question :" + text);
                            var timeToAnswer = question.timeToAnswer;
                            console.warn(timeToAnswer);
                            $timeout(function () {disableAnswer(newVal)}, timeToAnswer);

                           
                            tableText1.text(question.answerChoices[0]);
                            tableText2.text(question.answerChoices[1]);
                            tableText3.text(question.answerChoices[2]);
                            tableText4.text(question.answerChoices[3]);
                            tableText1.attr("id", "id_" + question.answerChoiceId[0]);
                            tableText2.attr("id", "id_" + question.answerChoiceId[1]);
                            tableText3.attr("id", "id_" + question.answerChoiceId[2]);
                            tableText4.attr("id", "id_" + question.answerChoiceId[3]);
                            
                            //var tableText = multilineText.enter().append("text");
                            //tableText.text(text);

                             // Wrap text in a rectangle.
                            //d3plus.textwrap()
                            //    .container(d3.select("#rectWrap"))
                            //    .draw();

                            
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

                        if (text == null || text == undefined) {
                            text = scope.question;
                            console.log("text is null :" + question);
                        }
                    }

                    return text;
                }

                function removeElement(tableText) {
                    //var remove = tableText.remove();
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


                     var tableText = resultsGroup.append("foreignObject")
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



                    var tableDiv = tableText.append("div");
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


                        console.log("display Highlighted Text " + answer);
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

                function getQuestion(json) {
                    var jsonStr = JSON.parse(json);
                    var question = [{}];
                    question.question = jsonStr["Description"];
                    question.question = question.question;
                    question.timeToAnswer = jsonStr["TimetoAnswer"];

                    console.log(question.timeToAnswer);
                    var choices = jsonStr["Choices"]
                    question.answerChoices = [];
                    question.answerChoiceId = [];
                    for (var i= 0; i< choices.length; i++) {
                        question.answerChoices[i] = choices[i]["Title"];
                        question.answerChoiceId[i] = choices[i]["ChoiceId"];
                        console.log(question, question.answerChoices[i])
                    }

                    return question;
                }

                function displayPlayerPositions(json) {
                        var centerX = 400;
                        var centerY = 195;
                        var xRadius = 250;
                        var yRadius = 125;




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
