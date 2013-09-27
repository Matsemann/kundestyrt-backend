'use strict';

angular.module('kundestyrtApp', ['ng', 'ngRoute', 'ngResource'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/conversation/new', {
        templateUrl: '/views/newConv.html',
        controller: 'NewConvCtrl'
      })
      .when('/conversation/:id', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/conversation/:id/:sub', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$isActive = function(location) {
      if(location.substring(location.length - 1) === '%') {
        var start = location.substring(0, location.length - 1);
        return $location.path().substring(0, start.length) === start;
      }

      return location === $location.path();
    };

    $rootScope.$goTo = function(location) {
      $location.path(location);
    };
  }]);

if(!Date.prototype.toISOString) {
  (function() {
    function pad(number) {
      var r = String(number);
      if(r.length === 1) {
        r = '0' + r;
      }
      return r;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear()
        + '-' + pad( this.getUTCMonth() + 1 )
        + '-' + pad( this.getUTCDate() )
        + 'T' + pad( this.getUTCHours() )
        + ':' + pad( this.getUTCMinutes() )
        + ':' + pad( this.getUTCSeconds() )
        + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
    };
  })();
}