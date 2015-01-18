'use strict';

angular.module('fenix.auth')
.controller('AuthController', function($scope, $http) {
  $scope.makeAuth = function(login, password) {
    $http.post('/api/auth', {
      email: login,
      password: password
    }).success(function(User) {

    }).catch(function() {

    });
  };
});