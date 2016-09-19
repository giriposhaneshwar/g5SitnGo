(function () {

angular.module('app')
				.controller('SitNGo.IndexController', ["$scope", "signalRService", "$localStorage", function ($scope, signalRService, $localStorage) {


function initPaper() {
	paper.install(window);
    var canvas = document.getElementById('table');	
	paper.setup(canvas);	
}


initPaper();

var vm = this;

vm.joinTableData = signalRService.getJoinTableDisplayData();
console.log("Join Table Message : " + vm.joinTableData);

vm.getMessage = signalRService.getMessage();
console.log("Send Message : " + vm.getMessage);

var centerPoint = view.center;
var centerX = centerPoint.x;
var centerY = centerPoint.y;
var xRadius = 250;
var yRadius = 125;

addTable(centerX, centerY, xRadius, yRadius, '#FFFF00', vm.getMessage, '');

addPlayer(centerX, centerY,0, yRadius,170, 24, 12, 24, 'darkred', '#FFFF00', 0, 'Sreekanth', '300');

addPlayer(centerX, centerY, - yRadius*Math.tan(60) - 140, yRadius,yRadius + 15, 24, 12, 24, '#009900', '#FFFF00', 30, 'Pradeep', '750');

addPlayer(centerX, centerY, - yRadius*Math.tan(60) - 140, yRadius, - yRadius - 15, 24, 12, 24, '#009900', '#FFFF00', -30, 'Giri', '500');

addPlayer(centerX, centerY, 0, yRadius, - yRadius - 45, 24, 12, 24, '#009900', '#FFFF00', 0, 'Phani', '800');

addPlayer(centerX, centerY, yRadius*Math.tan(60) + 140, yRadius, -yRadius - 15, 24, 12, 24, '#009900', '#FFFF00', 30, 'Santosh', '800');

addPlayer(centerX, centerY, yRadius*Math.tan(60) + 140, yRadius, yRadius + 15, 24, 12, 24, '#009900', '#FFFF00', -30, 'Raja', '800');

function addTable(	centerX, 
					centerY, 
					xRadius, 
					yRadius, 
					fillColor,
					message,
					timeForNextEvent,
					clientEvent,  // The currentClient Event
					serverData	  // The ServerData if event is a server push event
				)   { 
				
	var path = new paper.Path.Ellipse({
			center: [centerX, centerY],
			radius: [xRadius, yRadius],
			fillColor: '#009900'
	});	

	var text = new PointText(new Point(centerX,centerY));
	text.style = {
		fontFamily: 'Sans Serif',
		//fontWeight: 'bold',
		fontSize: 11,
		fillColor: 'white',
		justification: 'center'
	};

	text.content = message;	
	
}

function addPlayer(	centerX, 
					centerY, 
					xRadiusOffset, 
					yRadius, 
					yRadiusOffset, 
					ellipseXRadius,
					ellipseYRadius,
					circleRadius,
					circleFillColor,
					ellipseFillColor,
					rotateDegrees,
					displayName,
					WalletAmount) {
						
	var playerCircle = new Path.Circle(new Point(centerX + xRadiusOffset, centerY + yRadiusOffset), circleRadius);
	playerCircle.fillColor = circleFillColor;
	console.log(circleFillColor);

	var playerEllipse = new Path.Ellipse({
			center: [centerX + xRadiusOffset, centerY + yRadiusOffset],
			radius: [ellipseXRadius, ellipseYRadius],
			fillColor: ellipseFillColor
	});

	playerEllipse.rotate(rotateDegrees);

	var text = new PointText(new Point(centerX + xRadiusOffset -circleRadius - 50, centerY + yRadiusOffset - 10));
	text.style = {
		fontFamily: 'Sans Serif',
		//fontWeight: 'bold',
		fontSize: 11,
		fillColor: 'black',
		justification: 'left'
	};

	// Set the content of the text item:
	text.content = displayName + '\n' + WalletAmount;	
	
}

}])
})();