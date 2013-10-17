'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', function ($scope, $location, user, Users) {
        $scope.user = user;

        $scope.saveUser = function() {
            Users.save($scope.user).then(function() {
                $location.path('/users/' + user._id);
            });
        };

        $scope.deleteUser = function() {
            Users.delete($scope.user).then(function() {
                $location.path('/users');
            });
        };
    }]);
