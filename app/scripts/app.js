'use strict';

angular.module('kundestyrtApp', ['ng', 'ngRoute', 'ngResource'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: '/views/test.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
