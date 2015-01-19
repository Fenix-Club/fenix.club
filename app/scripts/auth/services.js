'use strict';

angular.module('fenix.auth')
.service('AuthService', function($q, $http) {

  var isLoggedIn = null;
  var userData = {};

  this.isLoggedIn = function() {
    return $q(function(resolve, reject) {
      if(isLoggedIn === null) {
        $http.get('/api/auth/me').success(function(user) {
          isLoggedIn = true;
          userData = user;
          resolve(user);
        }).catch(function() {
          reject();
        });
      } else if(isLoggedIn) {
        resolve(userData);
      } else {
        reject();
      }
    });
  };

  return this;
});