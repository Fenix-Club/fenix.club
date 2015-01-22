'use strict';

angular.module('fenix.httpServices')

.service('eventService', function($http) {

    this.async = function() {
      return $http.get('events.json').then(function (response) {
        return response.data;
      });
    }
});

// .factory('eventService', function($http) {
// 	var result = {};

// 	result.fetchEvents = function() {

// 		var json = $http.get('events.json')

// 		.success(function(data, status, headers, config) {
// 			console.log(data);
// 			return data;
// 		});

// 		return json;
// 	};

// 	return result;
// });