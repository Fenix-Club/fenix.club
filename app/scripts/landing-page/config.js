'use strict';

angular.module('fenix.landing-page')
.config(function(stateHelperProvider) {
  stateHelperProvider.setNestedState({
    url: '/lp',
    name: 'landing-page',
    views: {
      'root': {
        templateUrl: 'templates/landing-page.html'
      }      
    }
  });
});