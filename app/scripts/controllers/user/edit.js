'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', function ($scope, $location, user, Users) {
        $scope.user = user;

        $scope.saveUser = function() {
            console.log('Save user');
            Users.save($scope.user).then(function() {
                $location.path('/users/' + user._id);
                console.log('done');
            });
        };

        $scope.deleteUser = function() {
            Users.delete($scope.user).then(function() {
                $location.path('/users');
            });
        };
    }]);
