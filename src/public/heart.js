(function(){
	var lib_dependencies = ['ngRoute',
							'ngStorage',
							'ui-rangeSlider',
							'xeditable',
							'nvd3ChartDirectives',
							'ngAutocomplete'],
							
	    src_dependencies = ['heart-controller',
	    					'doctor-controller',
	    					'patient-controller'
	    					];

	var app = angular.module('heart-monitor',lib_dependencies.concat(src_dependencies));

	app.config([
		'$routeProvider',
		function($routeProvider){
			$routeProvider.

			when('/', {
				templateUrl: '/sections/main/main.html'
			}).

			when('/doctor', {
				templateUrl: '/sections/doctor/doctor.html',
				controller: 'DoctorController'
			}).

			when('/patient', {
		    	templateUrl: 'sections/patient/patient.html',
		    	controller: 'PatientController'
		    }).

		    otherwise({
		        redirectTo: '/'
		    });
	}]);

	app.run([
		'editableOptions',
		'editableThemes',
		function (editableOptions, editableThemes) {

		    // in place editing configuration
		    editableOptions.theme = 'bs3';
		    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
		    editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
	}]);
	

	// Bind all click events of <a> tags so that when clicked 
	// inmediatly loose focus and don't stay with gray dots
	// around them.
	$(document).on("click","a, button",function(){
		this.blur();
	});


})();