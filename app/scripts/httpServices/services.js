'use strict';

angular.module('fenix.httpServices')

.factory('eventService', function($http) {
	var result = {};

	result.fetchEvents = function() {

		return $http.get('/events.json')

		.success(function(data, status, headers, config) {
			return data;
		});
	};

	return result;
});