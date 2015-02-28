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

				current.heart_rate = Math.round(createMemberInNormalDistribution(90, 10));
				current.p_wave = Math.round((createMemberInNormalDistribution(0.09, 0.02))*100)/100;
				current.pr = Math.round((createMemberInNormalDistribution(0.16, 0.04))*100)/100;
				current.qrs = Math.round((createMemberInNormalDistribution(0.08, 0.02))*100)/100;
				current.qt = Math.round((createMemberInNormalDistribution(0.4, 0.1))*100)/100;

				var params = [{p: 'bpm', v:current.heart_rate},{p: 'p wave', v:current.p_wave}, {p: 'pr interval', v:current.pr}, {p: 'qrs complex', v:current.qrs}, {p: 'qt interval', v:current.qt}];

				date = new Date();

				for (var i = 0; i < params.length; i++) {
					var measurement = {
						timestamp: date,
						param: params[i].p,
						value: params[i].v
					}
					$http.post('http://localhost:8080/monitor',{user_id: 1, measurements:[measurement]})
				};
			}

			current.heart_rate = 80;
			current.p_wave = 0.08;
			current.pr = 0.15;
			current.qrs = 0.09;
			current.qt = 0.4;

			$interval(updateTick, 1000);

		}
	]);

})();