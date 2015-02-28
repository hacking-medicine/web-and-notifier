(function(){


/*
 * Returns member of set with a given mean and standard deviation
 * mean: mean
 * standard deviation: std_dev 
 */
var createMemberInNormalDistribution = function(mean,std_dev){
    return mean + (gaussRandom()*std_dev);
}

/*
 * Returns random number in normal distribution centering on 0.
 * ~95% of numbers returned should fall between -2 and 2
 */
var gaussRandom = function() {
    var u = 2*Math.random()-1;
    var v = 2*Math.random()-1;
    var r = u*u + v*v;
    /*if outside interval [0,1] start over*/
    if(r == 0 || r > 1) return gaussRandom();

    var c = Math.sqrt(-2*Math.log(r)/r);
    return u*c;

    /* todo: optimize this algorithm by caching (v*c) 
     * and returning next time gaussRandom() is called.
     * left out for simplicity */
}




	var module = angular.module('patient-controller',[]);

	module.controller('PatientController',[
		'$scope',
		'$interval',
		'$http',
		function($scope, $interval, $http){

			var current = $scope.current = {};

			var updateTick = function(){

				current.heart_rate = Math.round(createMemberInNormalDistribution(90,10));

				var measurement = {
					timestamp: new Date(),
					param: 'hpm',
					value: current.heart_rate
				}
				$http.post('http://localhost:8080/monitor',{user_id: 1, measurements:[measurement]})

			}

			current.heart_rate = 80;

			$interval(updateTick, 1000);

		}
	]);

})();