

angular.module('app')
        .controller('SitNGo.IndexController', [ "$http", "$rootScope", "signalRService", "$timeout", "$interval", function ( $http, $rootScope, signalRService, $timeout, $interval) {

          
          var vm = this;
          vm.accessToken = '';
          vm.serviceBase = 'http://g5api.azurewebsites.net';
          vm.url = '';
          vm.huburl = '';
          vm.GameTableID = 0;
          vm.zoneID = 16;

          vm.url = '/api/Join/' + vm.zoneID;

          var config = {headers: {
                        'Authorization': 'Bearer  WfrbMCDq59M0wfppShJAZ-Sz1ZrhPlBz-ri4IJxRAusBfTQLVcEuPS2h99v-SGipMMRAxRYTIpjPHiQzXUz4tGM04B_qR7VjuZ4C1NhQxBvRj4R9iRv7hEQbR0j44tYGvqCxE1KX-lTvvT5woTmcbSWkdRgaks-koHiewnVxYD9hDvrmZUNAaXqPiiuftJD0VTSoCc29smCsQmhx3mBz48Fx9-RHr-tSSBLIs-yDhLu_McHDKAMiYWs2c9nvKCdWagiMdKakv-kbM3N7SPBMs8o6Z9y8C12aK4D0E1ZWxhXbsIsoeGbtRiVvqclJUz4z8BzDUrE969E2X9Hw-VAAYf7yJHmnF_iVYUZSyCdIr-I'
                        }
            };

            $http.get(vm.serviceBase + vm.url, config).then(function successCallback(response) {
                    var results = response.data;

                    console.log(results);

                    var result = results["result"];  
                    vm.huburl = result.url;
                    vm.GameTableID = result.gameTableID;

                    console.log("GameTableID :" + vm.GameTableID);
                    var playersJson;
                    
                    var signalRServiceHub = signalRService(vm.huburl, 'sitngo', vm.GameTableID);

                    
                    signalRServiceHub.on("sendMessage", function cb(zoneMsg) {
                        console.log('sendMessage called');
                        console.log(JSON.stringify(zoneMsg));
                       
                    });
                    
                     
                    signalRServiceHub.on("sendPlayerList", function cb(playerList) {
                        console.log("UserName : " + playerList['Player']['UserName']);
                        console.log('sendPlayerList called');
                        
                    }); 

                    signalRServiceHub.on("sendPlayerWallet", function cb(playerWallet) {
                        console.log('sendPlayerWallet called');
                        console.log(JSON.stringify(playerWallet));
                    }); 

                    signalRServiceHub.on("sendPool", function cb(poolAmount) {
                        console.log('sendPool called');
                        console.log(JSON.stringify(poolAmount));
                    }); 

                    signalRServiceHub.on("sendQuestion", function cb(question) {
                        console.log('sendQuestion called');
                        console.log(JSON.stringify(question));
                    }); 

                    signalRServiceHub.on("sendAnswer", function cb(answer) {
                        console.log('sendAnswer called');
                        console.log(JSON.stringify(answer));
                    }); 

                    signalRServiceHub.on("sendGameResults", function cb(gameResults) {
                        console.log('sendGameResults called');
                        console.log(JSON.stringify(gameResults));
                    }); 

                    signalRServiceHub.on("sendPoolAmount", function cb(poolAmount) {
                        console.log('sendPoolAmount called');
                        console.log(JSON.stringify(poolAmount));
                    }); 

                    signalRServiceHub.on("sendUserWallet", function cb(userWallet) {
                        console.log('sendUserWallet called');
                        console.log(JSON.stringify(userWallet));
                    }); 

                    signalRServiceHub.on("sendUserCountdownMsg", function cb(countDownMessage) {
                        console.log('sendUserCountdownMsg called');
                        console.log(JSON.stringify(countDownMessage));
                    }); 
            }, function errorCallback(response) {
                      console.log(response);
            });
            
          
          
          
          
          
          var width = 800;
          var height = 600;
          var xRadius = 250;
          var yRadius = 125;
          var centerX = width/2;
          var centerY = height/2;

          

           //d3.select(".table").selectAll("svg").remove();

          //Make an SVG Container
         /* var svgContainer = d3.select(".table").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);
          
          var centerX = width/2;
          var centerY = height/2;
          var xRadius = 250;
          var yRadius = 125;

          //Draw the Ellipse
         /* var circle = svgContainer.append("ellipse")
                                  .attr("cx", width/2)
                                  .attr("cy", height/2)
                                  .attr("rx", xRadius)
                                  .attr("ry", yRadius)
                                  .style("fill", 'green'); 

          var jsonCircles = [
                            { "x_axis": centerX + 0, "y_axis": centerY + 170, "radius": 20, "color" : "red" },
                            { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "purple"},
                            { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY - yRadius - 15, "radius": 20, "color" : "orange"},
                            { "x_axis": centerX, "y_axis": centerY - yRadius - 45, "radius": 20, "color" : "yellow"},
                            {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY -yRadius - 15, "radius": 20, "color" : "darkgreen"},
                            {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "darkblue"}];
 
          
 
        var circles = svgContainer.selectAll("circle")
                                  .data(jsonCircles)
                                  .enter()
                                  .append("circle");

        var circleAttributes = circles
                                .attr("cx", function (d) { return d.x_axis; })
                                .attr("cy", function (d) { return d.y_axis; })
                                .attr("r", function (d) { return d.radius; })
                                .style("fill", function(d) { return d.color; });

        

        d3.select(".table").selectAll("svg").remove();

        var svg = d3.select(".table").append("svg")
            .attr("width", width)
            .attr("height", height)

        var messages = { "messages" : ["Waiting for Players to Join", "Game Starting in 10 seconds"]};
        var msg = [];
        var message;

        
        
                

         
    
        for (var i = 0; i < messages['messages'].length; i++) {
           msg.pop(messages['messages'][i]);
           console.log("Messages :" + messages['messages'][i]);
           
        }

        
        var messages = {
                "message" : 
                  {
                    "init" : "Waiting for Players to Join",
                    "startGame" : "Starting Game in 10 seconds"
                  }  
                
        }
        
         

        var json = {
            "table": [{
                "cx":  width/2,
                "cy": height/2,
                "rx": xRadius,
                "ry": yRadius,
                "label" : "Waiting for Players to Join",
                "fill": "green"
            }]
        }

        
        var elem = svg.selectAll("g")
            .data(json.table)

        
        var elemEnter = elem.enter()
            .append("g");
        
        
        var circle = elemEnter.append("ellipse")
            .attr("cx", function (d) { return d.cx  })
            .attr("cy", function (d) { return d.cy  })
            .attr("rx", function (d) { return d.rx  })
            .attr("ry", function (d) { return d.ry  })
            .attr("stroke", "black")
            .style("fill", function (d) { return d.fill }); 

      var text;
      
      $timeout(initText(), 1000);
      function initText() {
          console.log('initText() called')
          text = elemEnter.append("text")
                  .attr("dx", function (d) {
                      return d.cx
                  })
                  .attr("dy", function(d) { return d.cy})
                    .text(messages.message.init)
                    .style("text-anchor", "middle");
        $timeout(function () { text.remove()}, 3000)
        $timeout(updateText(), 5000);

      }

      
      //text.remove();

     
      
       function updateText () {
              console.log('updateText() called') 
              console.log("start Game message : " + messages.message.startGame);

              elemEnter.append("text")
                          .attr("dx", function (d) {
                              return d.cx
                          })
                          .attr("dy", function(d) { return d.cy})
                          .text(messages.message['startGame'])
                          .style("text-anchor", "middle");
       }
        


       
       var jsonCircles = [
                            { "x_axis": centerX + 0, "y_axis": centerY + 170, "radius": 20, "color" : "red" },
                            { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "purple"},
                            { "x_axis": centerX - yRadius*Math.tan(60) - 140, "y_axis": centerY - yRadius - 15, "radius": 20, "color" : "orange"},
                            { "x_axis": centerX, "y_axis": centerY - yRadius - 45, "radius": 20, "color" : "yellow"},
                            {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY -yRadius - 15, "radius": 20, "color" : "darkgreen"},
                            {"x_axis": centerX + yRadius*Math.tan(60) + 140, "y_axis": centerY + yRadius + 15, "radius": 20, "color" : "darkblue"}];
 
          
 
        var circles = svg.selectAll("circle")
                                  .data(jsonCircles)
                                  .enter()
                                  .append("circle");

        var circleAttributes = circles
                                .attr("cx", function (d) { return d.x_axis; })
                                .attr("cy", function (d) { return d.y_axis; })
                                .attr("r", function (d) { return d.radius; })
                                .style("fill", function(d) { return d.color; });

       
        /*
        $http.get('sitngo/init.json').success(function(data) {
              var initJSON = data;
              console.log(initJSON);
              var message = data['Message'];
              //displayMessage(message);
              
          });

          $http.get('sitngo/startGame.json').success(function(data) {
              var startGameJSON = data;
              console.log(startGameJSON);
              var message = data['Message'];
              console.log(message);
          }); */

            
        
      }])
      .directive('table', function() {
        return {
        };
      });

