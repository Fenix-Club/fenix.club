'use strict';
angular.module('fenix.auth')
.run(['$rootScope', '$state', '$stateParams', 'AuthService', function($rootScope, $state, $stateParams, AuthService) {

  var firstAuth = true;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if(toState.data !== undefined && toState.data.requiresLogin) {
      var prevented = false;
      if(firstAuth) {
        $state.transitionTo('auth-loading');
        event.preventDefault();
        prevented = true;
        firstAuth = false;
      }
      AuthService.isLoggedIn().then(function(currentUser) {
        if(!currentUser) {
          $state.transitionTo('auth');
          event.preventDefault();
        } else {
          $rootScope.currentUser = currentUser;
          if(prevented) {
            $state.go(toState.name, toParams);
          }
        }
      });
    }
  });

  $rootScope.logout = function() {
    $rootScope.currentUser = {};
    AuthService.logout().then(function() {
      // reloadUrl('');
    }).catch(function() {
      // error during logout. Do nothing?
    });
  };

}]);
