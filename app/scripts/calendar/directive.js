'use strict';

angular.module('fenix.calendar')

.directive('fenixCalendar', function(){
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			ngModel: '='
		},
		// templateUrl: 'assets/templates/calendar.html',
		template: '<div ui-calendar ng-model="events"/>',
		controller: 'calendarController',
		transclude: 'true'
	};
})

.controller('calendarController', ['$scope', '$http', function($scope, $http){

	$scope.events = [];

	$scope.events = [
        {
            title  : 'event1',
            start  : '2015-01-01'
        },
        {
            title  : 'event2',
            start  : '2015-01-05',
            end    : '2015-01-07'
        },
        {
            title  : 'event3',
            start  : '2015-01-09T12:30:00',
            allDay : false
        }
    ];

	// $http.get('/assets/events.json').success(function(data){
	// 	$scope.events = data;
	// });

	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
}]);