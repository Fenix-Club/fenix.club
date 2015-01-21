'use strict';

angular.module('fenix.calendar').directive('fenixCalendar', function(){
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {},
		templateUrl: 'templates/calendar.html',
		controller: 'calendarController',
		transclude: true
	};
});