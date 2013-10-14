'use strict';

angular.module('kundestyrtApp')
  .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.alert = '';
    $scope.login = function() {
        var data = {
            username: $scope.username,
            password: $scope.password
        };

        $http.post('/login', data).success(function() {
            $scope.$login.$complete();
        }).error(function() {
            $scope.alert = 'Galt brukernavn eller passord';
        });
    };
  }]);
