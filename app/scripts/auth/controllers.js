'use strict';

angular.module('fenix.auth')
.controller('AuthController', function($scope, $http, AuthService) {

  AuthService.isLoggedIn().then(function() {
    alert('Logged In!');
  }).catch(function() {
    alert('NOT LOGGED IN');
  });

  $scope.makeAuth = function(login, password) {
    $http.post('/api/auth', {
      email: login,
      password: password
    }).success(function(User) {

    }).catch(function() {

    });
  };
});