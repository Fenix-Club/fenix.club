'use strict';

angular.module('fenix.auth')
.controller('AuthController', function($scope, $http, AuthService, $state) {

  AuthService.isLoggedIn().then(function() {
    $state.transitionTo('admin-panel');
  });

  $scope.makeAuth = function(login, password) {
    $http.post('/api/auth', {
      email: login,
      password: password
    }).success(function(User) {
      $state.transitionTo('admin-panel');
    }).catch(function() {
      alert('Gunwo, debil z Ciebie');
    });
  };
});