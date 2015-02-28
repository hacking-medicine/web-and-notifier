(function(){

	var module = angular.module('doctor-controller',['socket-service']);

	var length = 0;
	var temp = 0

	module.filter('range', function() {
 		return function(input, total) {
 		total = parseInt(total);
 		total = length;
 		for (var i=0; i<total; i++)
 			input.push(i);
 		return input;
 		};
 	});

	module.controller('DoctorController',[
		'$scope',
		'socket',
		function($scope,socket){

			socket.emit('init', {
		      user_id: 1
		    }, function (result) {
		    	console.log('result',result);
		    });

		    var paramMap = {
		    	'qrs complex': 'qrs',
		    	'qt interval': 'qt',
		    	'p wave': 'pw',
		    	'pr interval': 'pr',
		    	'bpm': 'bpm'
		    }

		    
		    socket.on('update',function(data){
		    	if (temp == 0){
		    		length += 1;	
		    	}
		    	temp = (temp + 1) % 5;
		    	
		    	console.log(data);
		    	var measurement = data.value;
		    	var patient = $scope.patients[0];
		    	patient[paramMap[measurement.param]].unshift(measurement.value);
		    });

			$scope.patients=[{name: 'Pedro', surname: 'Rojo', bpm: [90, 89, 90], pw:[0.10, 0.08, 0.9], pr:[0.15, 0,16, 0,17], qrs:[0.09, 0.07, 0.06], qt:[0.4, 0.4,0.4]}, {name: 'Marco', surname: 'Polo', bpm: [2, 89, 90], pw:[0.10, 0.08, 0.9], pr:[0.15, 0,16, 0,17], qrs:[0.09, 0.07, 0.06], qt:[0.4, 0.4,0.4]}, {name: 'Sara', surname: 'Sanz', bpm: [120, 89, 90], pw:[2, 0.08, 0.9], pr:[0.19, 0,16, 0,17], qrs:[0.06, 0.07, 0.06], qt:[0.37, 0.4,0.4]}];
			$scope.current={patient : $scope.patients[0]};

		}
	]);

})();