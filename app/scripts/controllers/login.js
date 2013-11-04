'use strict';

angular.module('kundestyrtApp')
  .controller('LoginCtrl', ['$scope', 'Account', function ($scope, Account) {
    $scope.login = function() {
        Account.login($scope.username, $scope.password).success(function() {
            $scope.$login.$complete();
        }).error(function() {
            $scope.$alert('Galt brukernavn eller passord');
        });
    };
  }]);
