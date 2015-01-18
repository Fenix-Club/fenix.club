'use strict';

angular.module('fenix.calendar')

.directive('fenixCalendar', function(){
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {},
		templateUrl: 'templates/calendar.html',
		controller: 'calendarController',
		transclude: true
	};
})

.controller('calendarController', function($scope, $http) {

	var y = 2015;
	var m = 0;
	var d = 10;

  $scope.events = [
          {title: 'All Day Event',start: new Date(y, m, 1)},
          {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
          {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
  ];
  $scope.eventSource = [ $scope.events ];

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
});