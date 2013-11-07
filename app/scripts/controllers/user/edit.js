'use strict';

angular.module('kundestyrtApp')
    .controller('UserEditCtrl', ['$scope', '$location', 'user', 'Users', function ($scope, $location, user, Users) {
        $scope.user = user;
        $scope.pwConfirm = $scope.user.password;

        $scope.saveUser = function() {
            // Verifiser alle felt
            if (!$scope.user.name) {
                $scope.$alert('Fyll inn navn');
                return;

            } else if (!$scope.user.email) {
                $scope.$alert('Fyll inn e-post');
                return;

            /* Legg merke til at man ikke trenger å fylle inn passord,
             *  man kan evt beholde det gamle (det fikser serveren) */
            } else if ($scope.user.password !== $scope.pwConfirm) {
                $scope.$alert('Passordene må være like');
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
