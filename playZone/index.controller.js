(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlayZone.IndexController', ["$scope", 'serviceCall', '$http',  
                                function ($scope, serviceCall, $http) {
            console.log('playzone controller');
             var vm = this;   

           // var playZones = playZoneService.getPlayZones();

          //  console.log(playZones);
                
            
           // $scope.subjects = subjects;
            
            var config = {headers: {
                        'Authorization': 'Bearer ePwA1YWr3tZXIMK9V7uFTZZ0EE2DL6v8272E6LdHU1E-mcJmd8R82Q5-LaOurzbX5SS5lv02uWxTlSlWtR1x4FIh4l4kP_AMJx3_EzTxhLWizrXweqv-z_pzywcbJ2JbijHjFHPULJOexx6_WeAy2lu09E28rJyaph8B-mGEDSHeyajeMC18pa0C_mPgdAb5B8uR__HB_q3KTmSsth190MNt0OBUaK2vnaShWvZOtdTzBRASd6mB4OiIe57uXpMKh0EyYWaAJbd5w5u1XKzD1ZZX44KnNQmFba3QjAFGB2vUdwwo60tgKf6gIFe_QFNe7iTOEpGSGwVo-T4gexWF-L19o3GEInBE0MXi9yEBQ3o'
                        }
            };   
            
             
           var subjects = []; 
           var subjectsList = [];
           var flavors = [];
           var flavorItems = [];
           
           var chemistryFlavors = [];
           var mathFlavor = [];
           var physicsFlavor = [];
           var chemistryFlavor = [];
           var stakesForFlavor = [];

           $http.get('http://g5api.azurewebsites.net/api/PlayZone', config).then(function successCallback(response) {
                    var results = response.data;

                    console.log(results);

                    var result = results["result"];
                    subjectsList = result[0]['subjects'];
                   

                    console.log(subjectsList);   

                    for (var i=0; i < subjectsList.length; i++) {                        
                        console.log(subjectsList[i]['title']);
                        subjects[i] = subjectsList[i]['title']; 
                        console.log("subjects : " + subjects[i]); 
                        flavors[i] = subjectsList[i]['flavors']; 
                                        
                    } 

                    flavorItems = getFlavors(subjectsList);
                    mathFlavor = flavorItems[0];
                    physicsFlavor = flavorItems[1];
                    chemistryFlavor = flavorItems[2];
                    var flavorItem;
                    //stakesForFlavor = getStakesForFlavor(flavorItem, subjectsList);
                  
                   

                   $scope.subjects = subjects; 
                   $scope.mathsFlavors = mathFlavor;
                   $scope.physicsFlavors = physicsFlavor;
                   $scope.chemistryFlavors = chemistryFlavor;
                   //$scope.stakes = stakesForFlavor;


                    

            }, function errorCallback(response) {
                    console.log(response);
            });

            function getStakesForFlavors(flavorItems, subjectList) {
                for (var i = 0; i< flavorItems.length; i++) {
                   for (var j=0; j < flavorItems[i].length; j++) {
                       //console.log(JSON.stringify(flavorItems[i][j]));
                       getStakesForFlavor(flavorItems[i][j], subjectList);

                   }
                }
            }

            function getStakesForFlavor(flavorItem, subjectList) {
                var stakes = [];
                console.log("SubjectList length : " + subjectList.length);
                for (var i = 0; i < subjectList.length; i++) {
                    console.log("Subjects " + i + JSON.stringify(subjectList[i]['title']));
                    console.log("Flavors " + i + JSON.stringify(subjectList[i]['flavors']));
                    for (var j = 0; j < subjectList[i]['flavors'].length; j++) {
                        if (subjectList[i]['flavors'][j]['title'] === flavorItem) {
                            console.log(JSON.stringify(subjectList[i]['flavors'][j]['stakes']));
                            
                            for (var k = 0; k < subjectList[i]['flavors'][j]['stakes'].length; k++ ) {
                                console.log("Flavors :" + JSON.stringify(subjectList[i]['flavors'][j]['stakes'][k]['title']));
                                stakes[k] = subjectList[i]['flavors'][j]['stakes'][k]['title'];
                            }                 
                        }
                    }
                }
                return stakes;
            }

            function getFlavorItems(arr) {
                var flavors = [];
                for (var i = 0; i < arr.length; i++) {
                    flavors[i] = arr[i]['title'];
                }
                return flavors
            }

            function getFlavors(arr) {
                var flavors = [];
                var mathFlavor = [];
                var physicsFlavor = [];
                var chemistryFlavor = [];
                var i =0;var j=0;var k=0;
               // console.log(JSON.stringify(arr));
               
                while (i<3) {
                    
                    mathFlavor[i] = arr[0]['flavors'][i]['title'];
                    //console.log(JSON.stringify(mathFlavor[i]));
                    i++;
                }
                while (i<6) {
                    physicsFlavor[j] = arr[1]['flavors'][i]['title'];
                    //console.log(JSON.stringify(physicsFlavor[j]));
                    i++;j++;
                } 
                while (i<9) {
                    chemistryFlavor[k] = arr[2]['flavors'][i]['title'];
                    //console.log(JSON.stringify(chemistryFlavor[k]));
                    i++;k++;
                }  
                flavors[0] = mathFlavor;
                flavors[1] = physicsFlavor;
                console.log(physicsFlavor.length);
                flavors[2] = chemistryFlavor;
                return flavors;
            }

            
            $scope.showFlavors = function (event) {
                var elem = event.currentTarget || event.srcElement
                //alert(elem.id);
                if (elem.id == 'Maths') {
                    $scope.showMaths = showMaths();
                } else if (elem.id == 'Physics') {
                     $scope.showPhysics = showPhysics();
                } else if (elem.id == 'Chemistry') {
                    $scope.showChemistry = showChemistry();
                }

            }

            $scope.showStakes = function(event) {
                var elem = event.currentTarget || event.srcElement;
                //alert(elem.id);
                $scope.showStart = true;                
                var stakes = [];
                stakes = getStakesForFlavor(elem.id, subjectsList);
                for (var i = 0; i < stakes.length; i++) {
                    console.log(stakes[i]);
                }
                $scope.stakes = stakes;                
            }

            $scope.showTopics = false;
            $scope.mathsTopics = false;
            $scope.physicsTopics = false;
            $scope.chemistryTopics = false;
            $scope.showStart = false;

            var showMaths = function () {
                $scope.showTopics = true;
                $scope.mathsTopics = true;
                $scope.physicsTopics = false;
                $scope.chemistryTopics = false;
                $scope.showStart = false;
                $scope.mathsFlavors = mathFlavor;
            };

            
            
            var showPhysics = function () {
                $scope.showTopics = true;
                $scope.mathsTopics = false;
                $scope.physicsTopics = true;
                $scope.chemistryTopics = false;
                $scope.showStart = false;
            };
            
            var showChemistry = function () {
                $scope.showTopics = true;
                $scope.chemistryTopics = true;
                $scope.mathsTopics = false;
                $scope.physicsTopics = false;
                $scope.showStart = false;
            };
            
    }])
})();