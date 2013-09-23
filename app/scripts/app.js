'use strict';

angular.module('kundestyrtApp', ['ng', 'ngRoute', 'ngResource'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$isActive = function(location) {
      return location == $location.path();
    };
  }]);
