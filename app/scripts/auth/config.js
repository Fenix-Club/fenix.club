'use strict';

angular.module('fenix.auth')
.config(function(stateHelperProvider) {
  stateHelperProvider.setNestedState({
    name: 'auth',
    url: '/login',
    views: {
      root: {
        templateUrl: 'templates/auth/index.html',
        controller: 'AuthController'
      }
    }
  });
});