'use strict';

angular.module('kundestyrtApp')
    .controller('UserNewCtrl', ['$scope', '$location', 'Users', function ($scope, $location, Users) {

        $scope.user = {
            name: '',
            content: ''
        };

        $scope.saveUser = function() {
            Users.save($scope.user).then(function(result) {
                $location.path('/users/' + result.data._id);
            });
        };
    }]);
