'use strict';

angular.module('fenix.calendar')

.controller('calendarController', function($scope, $http, eventService) {

  $scope.eventSource = [];
  var colorPhysics = "#FF0000";
  var colorTechnology = "#00FF00";

  eventService.async().then(function(data) {

    var parsedData = _.map(data, function(currentEvent) {
        currentEvent.color = (currentEvent.eventType === "physics" ? colorPhysics : colorTechnology);
        return currentEvent;
    });

    $scope.eventSource.push(parsedData);
  });

	$scope.uiConfig = {
      calendar:{
        height: 800,
        editable: false,
        lang: "pl",
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