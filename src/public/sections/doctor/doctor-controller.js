(function(){

	var module = angular.module('doctor-controller',['socket-service']);

	module.controller('DoctorController',[
		'$scope',
		'socket',
		function($scope, socket){
			socket.emit('init', {
		      user_id: 1
		    }, function (result) {
		    	console.log('result',result);
		    });

		    socket.on('update',function(data){
		    	console.log(data);
		    });
		}
	]);

})();