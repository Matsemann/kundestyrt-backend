'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditPasswordCtrl', ['$scope', '$location', 'Account', 'utils', function ($scope, $location, Account, utils) {
        $scope.pw1 = $scope.pw2 = $scope.pwOld = '';

        $scope.editPassword = function() { //TODO
            if(!$scope.pwOld) {
                $scope.$alert('Skriv inn gammelt passord');
                return;
            }

            if(!$scope.pw1) {
                $scope.$alert('Skriv inn nytt passord');
                return;
            }

            var error = utils.validatePassword($scope.pw1);
            if(error) {
                $scope.$alert('Passordet ' + error);
                return;
            }

            if($scope.pw1 !== $scope.pw2) {
                $scope.$alert('Passordene må være like');
                return;
            }

            Account.editPassword($scope.pwOld, $scope.pw1).success(function() {
                $location.path('/');
            }).error(function(err) {
                $scope.alert = err.error.toString();
            });
        };
    }]);