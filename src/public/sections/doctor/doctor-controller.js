(function(){

	var module = angular.module('doctor-controller',[]);

	module.controller('DoctorController',[
		'$scope',
		function($scope){

			$scope.patients=[{name: 'Maria', surname: 'Rojo', bpm: [90, 89, 90], pw:[0.10, 0.08, 0.9], pr:[0.15, 0,16, 0,17], qrs:[0.09, 0.07, 0.06], qt:[0.4, 0.4,0.4]}, {name: 'Marco', surname: 'Polo', bpm: [2, 89, 90], pw:[0.10, 0.08, 0.9], pr:[0.15, 0,16, 0,17], qrs:[0.09, 0.07, 0.06], qt:[0.4, 0.4,0.4]}, {name: 'Sara', surname: 'Sanz', bpm: [120, 89, 90], pw:[2, 0.08, 0.9], pr:[0.19, 0,16, 0,17], qrs:[0.06, 0.07, 0.06], qt:[0.37, 0.4,0.4]}];
			$scope.current={};

		}
	]);

})();