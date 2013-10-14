'use strict';

angular.module('kundestyrtApp')
  .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.login = function() {
        var data = {
            username: $scope.username,
            password: $scope.password
        };

        $http.post('/login', data).success(function() {
            $scope.$login.$complete();
        });
    };
  }]);
