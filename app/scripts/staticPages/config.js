'use strict';

angular.module('fenix.staticPages')

.config(function(stateHelperProvider) {

  stateHelperProvider.setNestedState({
  	name: 'staticPage',
  	url: '/static/*template',
  	views: {
  		root: {
  			templateUrl: function($stateParams) {
  				return 'statics/' + $stateParams.template + '.html';
  			}
  		}
  	}
  }, true);

});