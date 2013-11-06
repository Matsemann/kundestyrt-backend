'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', 'utils', function ($scope, $location, user, Users, utils) {
        $scope.user = user;

        $scope.saveUser = function() {
            //TODO some check on the password
            
            var error = utils.validatePassword($scope.pw1);
            if(error) {
                $scope.$alert('Passordet ' + error);
                return;
            }
            Users.save($scope.user).success(function (user) {
                $location.path('/users/' + user._id);
            }).error(function (err) {
                $scope.$alert(err);
            });
        };

        $scope.deleteUser = function() {
            if (confirm('Er du sikker på at du vil slette '+user.name+'?')) {
                Users.delete($scope.user).then(function () {
                    $location.path('/users');
                });
            }
        };
    }]);
