'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', function ($scope, $location, user, Users) {
        $scope.user = user;

        $scope.saveUser = function() {
            Users.save($scope.user).success(function (user) {
                $location.path('/users/' + user._id);
            }).error(function (err) {
                $scope.$alert(err);
            });
        };

        $scope.deleteUser = function() {
            Users.delete($scope.user).then(function () {
                $location.path('/users');
            });
        };
    }]);
