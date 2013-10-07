'use strict';

angular.module('kundestyrtApp')
    .controller('NewConversationCtrl', ['$scope', 'users', 'groups', function ($scope, users, groups) {
        $scope.users = users;
        $scope.groups = groups;
    }]);
