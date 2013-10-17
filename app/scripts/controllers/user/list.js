'use strict';

angular.module('kundestyrtApp')
    .controller('UserListCtrl', ['$scope', 'users', function ($scope, users) {
        $scope.users = users;
    }]);
