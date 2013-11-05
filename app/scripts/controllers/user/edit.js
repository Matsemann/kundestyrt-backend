'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', function ($scope, $location, user, Users) {
        $scope.user = user;

        $scope.saveUser = function() {
            console.log('Update user:');
            console.log($scope.user);
            Users.save($scope.user).then(function() {
                //$location.path('/users/' + user._id);
                $location.path('/users');
                console.log('done');
            });
        };

        $scope.deleteUser = function() {
            Users.delete($scope.user).then(function() {
                $location.path('/users');
            });
        };
    }]);
