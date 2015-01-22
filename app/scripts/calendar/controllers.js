'use strict';

angular.module('fenix.calendar')

.controller('calendarController', function($scope, $http, eventService) {

  $scope.eventSource = [];

  eventService.async().then(function(data) {
    $scope.eventSource.push(data);
  });

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