'use strict';

angular.module('fenix', [

  // External modules here
  'ui.router',
  'ui.router.stateHelper',
  'ui.bootstrap',
  'ui.calendar',

  // Project modules here
  'fenix.templates',
  'fenix.staticPages',
  'fenix.calendar',
  'fenix.auth',
  'fenix.landing-page'
])

.config(function($stateProvider, stateHelperProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/');

  stateHelperProvider.setNestedState({
    name: 'homepage',
    url: '/',
    views: {
      root: {
        templateUrl: 'templates/homepage.html'
      }
    }
  }, true);

});