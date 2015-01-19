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
  stateHelperProvider.setNestedState({
    name: 'auth-loading',
    views: {
      root: {
        templateUrl: 'templates/auth/login.html'
      }
    }
  });

  stateHelperProvider.setNestedState({
    name: 'admin-panel',
    url: '/admin',
    views: {
      root: {
        templateUrl: 'templates/auth/layout.html'
      }
    },
    data: {
      requiresLogin: true
    }
  });
});