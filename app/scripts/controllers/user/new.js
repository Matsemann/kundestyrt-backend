'use strict';

angular.module('kundestyrtApp')
    .controller('UserNewCtrl', ['$scope', '$location', 'Users', function ($scope, $location, Users) {
        // angular.extend($scope.user, {
        //     name: '',
        //     email: '',
        //     pw1: '',
        //     pw2: '',
        //     admin: false
        // });

        $scope.saveUser = function() {
            // verifiser alle felt
            if (!$scope.user.name) {
                $scope.$alert('Fyll inn navn');
                return;

            } else if (!$scope.user.email) {
                $scope.$alert('Fyll inn e-post');
                return;

            } else if (!$scope.user.password) {
                $scope.$alert('Fyll inn passord');
                return;

            } else if ($scope.user.password !== $scope.pwConfirm) {
                $scope.$alert('Passordene må være like');
                return;

            }


            Users.save($scope.user)
            .success(function(result) {
                $location.path('/users/' + result._id);
            }).error(function(err) {
                $scope.$alert(err);
            });
        };
    }]);
